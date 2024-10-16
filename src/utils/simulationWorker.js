import { 
    LOAD_PROFILE, POWER_FACTOR_MIN, POWER_FACTOR_MAX, 
    MIN_POWER_THRESHOLD, NEXT_ONLINE_THRESHOLD ,
    CHARGE_STATE_LIMIT
} from "../constants";
import Logger from "./logger";
self.onmessage = function (e) {
    try {
        console.log("Worker received message: ", e.data);
        //const variables = e.data;
        const variables = Object.freeze({
            utilityExportLimit: 200,
            singleESSEnergy: 144,
            singleESSPeakPower: 250,
            essModuleCount: 2,
            peakLoad: 800,
            totalFeederBreakers: 4,
            utility: false,
            peakPVPower: 1000,
            cloudingFactor: 1,
            singleGensetPower: 500,
            gensetCount: 4,
            granularity: 1,
            
        });

        //initial state
        let state = Object.freeze({
            activeFeederBreakers: variables.totalFeederBreakers,
            remainingESSEnergy: variables.singleESSEnergy * variables.essModuleCount,
            essChargeState: 1,
        });

        const dataset = Array.from({ length: 24 }, (_, index) => {
            try {
                const result = computeValue({ ...state, variables, index });
                state = Object.freeze({ 
                    ...state, 
                    remainingESSEnergy: result.remainingESSEnergy, 
                    activeFeederBreakers: result.activeFeederBreakers,
                    essChargeState: result.essChargeState,
                });
                return result;
            } catch (error) {
                console.error('Error in computeValue at index ${index}: ', error.message);
                throw error;
            }
            
        });

        self.postMessage(dataset);
    } catch (error) {
        Logger.error("Error in simulation worker: ", error.message);
        self.postMessage({ error: error.message });
    }
    
};

function powerFactor(realLoad, reactiveLoad) {
    if (realLoad === 0 && reactiveLoad === 0) {
        return 0;
    } else {
        return Math.sqrt(realLoad ** 2 / (realLoad ** 2 + reactiveLoad ** 2));
    }
    
};

function computeValue({
    activeFeederBreakers,
    remainingESSEnergy,
    essChargeState,
    variables,
    index
}) {
    Logger.log("Index: ", index);
    //Determine the load requirements 
    //Real Load (P) = (Load Profile %) * (Peak Load) * (Load Variation) * Active Feeder Breakers / Total Feeder Breakers
    Logger.log("Peak Load: ", variables.peakLoad); 
    Logger.log("Active Feeder Breakers: ", activeFeederBreakers);
    Logger.log("Total Feeder Breakers: ", variables.totalFeederBreakers);
    const loadPerBreaker = LOAD_PROFILE[index % 24].commercial * variables.peakLoad * 0.95 / variables.totalFeederBreakers;
    const realLoad = loadPerBreaker * activeFeederBreakers;
    Logger.log("Real Load: ", realLoad);

    //Power Factor (PF) = random value based on table in load section 
    const loadPowerFactor = Math.random() * (POWER_FACTOR_MAX.commercial - POWER_FACTOR_MIN.commercial) + POWER_FACTOR_MIN.commercial;
    const reactiveLoad = Math.sqrt((realLoad / loadPowerFactor) ** 2 - realLoad ** 2);

    //Determine available PV power
    //Hourly PV Power
    const pvTimeOfDayFactor = Math.max(Math.sin(((index % 24) - 6) * 15 * Math.PI / 180), 0);
    //Available PV Power (P) = (PV Power) * (PV Time of Day Factor) * (Clouding Factor)
    const availablePVPower = variables.peakPVPower * pvTimeOfDayFactor * variables.cloudingFactor;

    //Placeholder logic for the simulation
    let newActiveFeederBreakers = activeFeederBreakers;

    //Placeholder values for the ESS
    const totalESSEnergy = variables.singleESSEnergy * variables.essModuleCount;
    const peakESSRealPower = variables.singleESSPeakPower * variables.essModuleCount;
    let essReactivePowerContribution = 0;
    let essRealPowerContribution = 0;
    let newRemainingESSEnergy = remainingESSEnergy;
    let essPowerFactor = 0;
    let newEssChargeState = essChargeState;
    
    //Placeholder values for the utility
    let utilityRealPowerContribution = 0;
    let utilityReactivePowerContribution = 0;
    let utilityPowerFactor = 0;
    let providedPVPower = 0;

    //Constant values for gensets
    const totalGensetPower = variables.singleGensetPower * variables.gensetCount;
    const minGensetLoad = variables.singleGensetPower * MIN_POWER_THRESHOLD;
    const nextGensetOnlinePower = variables.singleGensetPower * NEXT_ONLINE_THRESHOLD;
    let gensetRealPowerRequirement = 0;
    let gensetsRequired = 0;
    let gensetRealPowerContribution = 0;
    let gensetReactivePowerContribution = 0;
    let gensetPowerFactor = 0;

    Logger.log("availablePVPower: ", availablePVPower);
    Logger.log("activeFeederBreakers: ", activeFeederBreakers);
    Logger.log("realLoad: ", realLoad);
    Logger.log("remainingESSEnergy: ", remainingESSEnergy);
    
    //Work through the on-utility logic
    if (variables.utility) {
        Logger.log("Utility is available");
        //no load shedding for utility mode; all breakers active.  
        newActiveFeederBreakers = variables.totalFeederBreakers;
        //if more PV than the load requires, first recharge ESS, then export to utility
        if (realLoad < availablePVPower) {
            Logger.log("realLoad < availablePVPower");
            //Recharge ESS with excess PV power, export any remaining to utility
            if (remainingESSEnergy < totalESSEnergy) {
                //ESS provides reactive power to load
                essReactivePowerContribution = reactiveLoad;
                //flows into ESS with a maximum value of the Peak ESS Real Power value.
                essRealPowerContribution = Math.min(availablePVPower - realLoad, peakESSRealPower);
                newRemainingESSEnergy = remainingESSEnergy + ( 1 / variables.granularity * essRealPowerContribution);
                essPowerFactor = powerFactor(essRealPowerContribution, essReactivePowerContribution);
                
                if (newRemainingESSEnergy > totalESSEnergy) {
                    newRemainingESSEnergy = totalESSEnergy;
                }
                //check to see if there is still extra power for utility, if yes, then export power up to the Utility Export Limit
                if (availablePVPower - realLoad - essRealPowerContribution > 0) {
                    utilityRealPowerContribution = Math.min(availablePVPower - realLoad - essRealPowerContribution, variables.utilityExportLimit);
                    utilityReactivePowerContribution = 0;
                    utilityPowerFactor = powerFactor(utilityRealPowerContribution, utilityReactivePowerContribution);
                }
                providedPVPower = realLoad + essRealPowerContribution + utilityRealPowerContribution;
            } else {
                //ESS is recharged, excess power flows out to utility up to the Utility Export Limit
                utilityRealPowerContribution = -Math.min(availablePVPower - realLoad, variables.utilityExportLimit);
                utilityReactivePowerContribution = reactiveLoad;
                utilityPowerFactor = powerFactor(utilityRealPowerContribution, utilityReactivePowerContribution);
                providedPVPower = realLoad - utilityRealPowerContribution;
            }

        } 
        //not enough PV to cover the load
        else {
            Logger.log("not enough PV to cover the load");
            //no PV power available
            if (availablePVPower <= 0) {
                Logger.log("no PV power available");
                
                //if no PV power and ESS not charged, start re-charging the ESS. 
                if (newRemainingESSEnergy < totalESSEnergy) {
                    Logger.log("no PV power and ESS not charged");
                    //flows back into ESS
                    essRealPowerContribution = -Math.min(peakESSRealPower, (totalESSEnergy - remainingESSEnergy)); 
                    essReactivePowerContribution = 0;
                    essPowerFactor = powerFactor(essRealPowerContribution, essReactivePowerContribution);
                    utilityRealPowerContribution = realLoad + Math.min(peakESSRealPower, totalESSEnergy - remainingESSEnergy);
                    utilityReactivePowerContribution = reactiveLoad;
                    utilityPowerFactor = powerFactor(utilityRealPowerContribution, utilityReactivePowerContribution);
                    newRemainingESSEnergy = remainingESSEnergy + (1 / variables.granularity * peakESSRealPower);
                    if (newRemainingESSEnergy > totalESSEnergy) {
                        newRemainingESSEnergy = totalESSEnergy;
                    }
                } 
                //if ESS is charged utility supports load
                else { 
                    utilityRealPowerContribution = realLoad;
                    utilityReactivePowerContribution = reactiveLoad;
                }
                utilityPowerFactor = powerFactor(utilityRealPowerContribution, utilityReactivePowerContribution);
            } 
            //PV and utility both available
            //If on PV power then do not recharge ESS, but might discharge ESS
            else {
                Logger.log("PV and utility both available");
                //If the delta between the real load and available PV power is less than the peak ESS real power, discharge the ESS if it is above 30% remaining energy.
                if (realLoad - availablePVPower < peakESSRealPower && remainingESSEnergy / totalESSEnergy > 0.3) {
                    providedPVPower = availablePVPower;
                    essRealPowerContribution = Math.min(realLoad - availablePVPower, remainingESSEnergy);
                    essReactivePowerContribution = reactiveLoad;
                    essPowerFactor = powerFactor(essRealPowerContribution, essReactivePowerContribution);
                    newRemainingESSEnergy = remainingESSEnergy - (1 / variables.granularity * (essRealPowerContribution));
                    utilityRealPowerContribution = 0;
                    utilityReactivePowerContribution = 0; 
                } 
                //do not recharge ESS if on utility and PV
                else {
                    providedPVPower = availablePVPower;
                    utilityRealPowerContribution = realLoad - availablePVPower;
                    utilityReactivePowerContribution = reactiveLoad;
                    utilityPowerFactor = powerFactor(utilityRealPowerContribution, utilityReactivePowerContribution);
                }
            }
        }

    } 
    //No utility power available
    else {
        Logger.log("No utility power available");
        // Addresses the scenario of no gensets, only PV and energy storage.  
        // Energy storage will be discharging until charge state reaches zero, at which point some load will be removed.   
        // First step is to determine if load can be added.
        if (variables.gensetCount === 0) {
            Logger.log("No gensets, only PV and energy storage");
            //Check to see if there are any unpowered loads
            if (activeFeederBreakers < variables.totalFeederBreakers) {
                Logger.log("activeFeederBreakers < variables.totalFeederBreakers");
                //if there is enough excess PV capacity to cover the addition of one feeder breaker, add one to the number of active feeder breakers.
                if (availablePVPower - realLoad >= loadPerBreaker) {
                    newActiveFeederBreakers++;  
                } 
                //If the PV alone cannot support an additional load breaker, check to see if the PV and energy storage can support an additional load breaker.
                else if(remainingESSEnergy > 0 && availablePVPower + peakESSRealPower - realLoad >= loadPerBreaker) {
                    newActiveFeederBreakers++;
                }
            }
            // more PV than the load requires run on PV. 
            if (realLoad < availablePVPower) {
                 
                //Check to see if the ESS requires charging.
                if (remainingESSEnergy < totalESSEnergy) {
                    //ESS provides reactive power to load
                    essReactivePowerContribution = reactiveLoad;
                    //flows into ESS with a maximum value of the Peak ESS Real Power value. 
                    essRealPowerContribution = -Math.min(availablePVPower - realLoad, peakESSRealPower, totalESSEnergy - remainingESSEnergy);
                    essPowerFactor = powerFactor(essRealPowerContribution, essReactivePowerContribution);
                    newRemainingESSEnergy = remainingESSEnergy - (1 / variables.granularity * essRealPowerContribution);
                    //remaining ESS energy should not be greater than total ESS energy.  
                    if (newRemainingESSEnergy > totalESSEnergy) {
                        newRemainingESSEnergy = totalESSEnergy;
                    }
                    providedPVPower = realLoad - essRealPowerContribution;
                } 
                //ESS does not require charging
                else {
                    providedPVPower = realLoad;
                    essRealPowerContribution = 0;
                    essReactivePowerContribution = reactiveLoad;
                    essPowerFactor = powerFactor(essRealPowerContribution, essReactivePowerContribution);
                }
            }
            //less PV than the load requires; run on PV + energy storage until energy storage runs out, then shed load.
            else {
                Logger.log("less PV than the load requires");
                //if ESS is discharged, shed load
                if (remainingESSEnergy <= 0) {
                    Logger.log("ESS is discharged, shed load");
                    // Number of active feeder breakers equals the total PV power available divided by the load requirement per circuit 
                    // breaker (real load / active breakers).   
                    // This should be rounded down to the nearest whole number.  The Active Feeder Breaker value can be zero.  
                    newActiveFeederBreakers = Math.floor(availablePVPower / loadPerBreaker);
                    providedPVPower = realLoad;
                    essRealPowerContribution = 0;
                    essReactivePowerContribution = reactiveLoad;
                    essPowerFactor = powerFactor(essRealPowerContribution, essReactivePowerContribution);
                }
                //ESS has charge
                else {
                    //if there is not enough capacity between the PV and ESS to support the load, shed load.  
                    if (realLoad > availablePVPower + peakESSRealPower || realLoad > availablePVPower + remainingESSEnergy) {
                        Logger.log("not enough capacity between the PV and ESS to support the load, shed load");
                        // Number of active feeder breakers equals the total PV power available plus the peak ESS real power, 
                        // divided by the load requirement per circuit breaker (real load / active breakers).   
                        // This should be rounded down to the nearest whole number.  The Active Feeder Breaker value can be zero.
                        newActiveFeederBreakers = Math.floor(Math.min(availablePVPower + peakESSRealPower, availablePVPower + remainingESSEnergy) / loadPerBreaker);
                        providedPVPower = availablePVPower;
                        //Power flows out of the ESS
                        essRealPowerContribution = Math.min(realLoad - availablePVPower, remainingESSEnergy);
                        essReactivePowerContribution = reactiveLoad;
                        essPowerFactor = powerFactor(essRealPowerContribution, essReactivePowerContribution);
                        newRemainingESSEnergy = remainingESSEnergy - (1 / variables.granularity * essRealPowerContribution);
                    }
                    //PV and energy storage is sufficient to power load.  
                    else {
                        Logger.log("PV and energy storage is sufficient to power load");
                        providedPVPower = availablePVPower;
                        //power flows out of the ESS
                        essRealPowerContribution = realLoad - availablePVPower;
                        essReactivePowerContribution = reactiveLoad;
                        essPowerFactor = powerFactor(essRealPowerContribution, essReactivePowerContribution);
                        newRemainingESSEnergy = remainingESSEnergy - (1 / variables.granularity * essRealPowerContribution);
                        
                    }
                }
            }

        } 

        // start scenario with generator sets only, no ESS.   In this scenario, a minimum of one generator set will be operational at any given time, 
        // running at the Minimum Genset Real Load (P)    
        else if (variables.gensetCount > 0 && variables.essModuleCount === 0) {
            Logger.log("Generator sets only, no ESS");
            //Check to see how much power the gensets need to provide
            gensetRealPowerRequirement = realLoad - availablePVPower;
            //Check to see if there are any unpowered loads
            if (activeFeederBreakers < variables.totalFeederBreakers) {
                // if there is enough excess PV capacity and total genset power to cover the addition of one feeder breaker, 
                // add one to the number of active feeder breakers.   
                if (availablePVPower + totalGensetPower - realLoad >= loadPerBreaker) {
                    newActiveFeederBreakers++;
                }
            }
            //there is enough PV to power load; run one generator set at 30% load, PV makes up the balance
            if (gensetRealPowerRequirement <=0) {
                gensetsRequired = 1;
                providedPVPower = Math.max(realLoad - minGensetLoad, 0);
                gensetRealPowerContribution = minGensetLoad;
                gensetReactivePowerContribution = reactiveLoad;
                gensetPowerFactor = powerFactor(gensetRealPowerContribution, gensetReactivePowerContribution);
            } 
            // there is not enough PV to power load, first determine if load should be shed, then determine how may generator sets are online.  
            // Run the gensets at a minimum of 30% load, bring next unit online at 70% load.  Once the last unit is brought online, run all units up to 100%.
            else {
                Logger.log("not enough PV to power load");
                //More power is required than available; shed load
                if (gensetRealPowerRequirement > totalGensetPower) {
                    // Number of active feeder breakers equals the total PV power available plus total genset power, 
                    // divided by the load requirement per circuit breaker (real load / active breakers).   
                    // This should be rounded down to the nearest whole number.  The Active Feeder Breaker value can be zero.
                    newActiveFeederBreakers = Math.floor((availablePVPower + totalGensetPower) / loadPerBreaker);
                }
                //Number of gensets required is the lesser of genset power requirement / next genset online and the total number of generator sets.  
                gensetsRequired = Math.min(variables.gensetCount, Math.ceil(gensetRealPowerRequirement / nextGensetOnlinePower));
                //Genset power provided is the larger of either the generator set minimum load or the generator set power requirement.  
                gensetRealPowerContribution = Math.max(gensetsRequired * minGensetLoad, gensetRealPowerRequirement);
                providedPVPower = Math.max(realLoad - gensetRealPowerContribution, 0);
                gensetReactivePowerContribution = reactiveLoad;
                gensetPowerFactor = powerFactor(gensetRealPowerContribution, gensetReactivePowerContribution);
            }

        } 
        //Scenario with gensets, PV, and energy storage
        else if (variables.gensetCount > 0 && variables.essModuleCount > 0) {
            Logger.log("Gensets, PV, and energy storage");
            //check #1 to see if additional load can be added.  ESS has energy, and can provide power
            if (remainingESSEnergy > 0 && activeFeederBreakers < variables.totalFeederBreakers) {
                //if there is enough excess PV capacity, total genset power, and energy storage power 
                //to cover the addition of one feeder breaker, add one to the number of active feeder breakers.   
                if (availablePVPower + totalGensetPower + peakESSRealPower - realLoad >= loadPerBreaker) {
                    newActiveFeederBreakers++;
                }
            }
            //Check #2 for additional load.  ESS is discharged and cannot provide power.   
            else if (activeFeederBreakers < variables.totalFeederBreakers) {
                //if there is enough excess PV capacity and total genset power to cover the 
                //addition of one feeder breaker, add one to the number of active feeder breakers.
                if (availablePVPower + totalGensetPower - realLoad >= loadPerBreaker) {
                    newActiveFeederBreakers++;
                }
            }
            //Check to see how much power the gensets need to provide; does not include ESS power at this point.  
            gensetRealPowerRequirement = realLoad - availablePVPower;
            //more PV than the load requires run on PV and ESS.
            if (gensetRealPowerRequirement <= 0) {
                Logger.log("more PV than the load requires, run on PV and ESS");
                gensetsRequired = 0;
                if (remainingESSEnergy < variables.totalESSEnergy) {
                    //ESS provides reactive power to load
                    essReactivePowerContribution = reactiveLoad;
                    //flows into ESS with a maximum value of the Peak ESS Real Power value.   
                    essRealPowerContribution = -Math.min(availablePVPower - realLoad, peakESSRealPower, totalESSEnergy - remainingESSEnergy);
                    essPowerFactor = powerFactor(essRealPowerContribution, essReactivePowerContribution);
                    newRemainingESSEnergy = remainingESSEnergy - (1 / variables.granularity * essRealPowerContribution);
                    //remaining ESS energy should not be greater than total ESS energy.  
                    if (newRemainingESSEnergy > totalESSEnergy) {
                        newRemainingESSEnergy = totalESSEnergy;
                    }
                    providedPVPower = realLoad - essRealPowerContribution;
                    gensetRealPowerContribution = 0;
                    gensetReactivePowerContribution = 0;
                    gensetPowerFactor = 0;
                    //Check to see if the ESS has exceeded the charge state limit and is ready to discharge.
                    if (remainingESSEnergy / variables.totalESSEnergy > CHARGE_STATE_LIMIT) {
                        newEssChargeState = 1;
                    }
                }
                //ESS does not require charging
                else {
                    Logger.log("ESS does not require charging");
                    providedPVPower = realLoad;
                    essRealPowerContribution = 0;
                    essReactivePowerContribution = reactiveLoad;
                    essPowerFactor = powerFactor(essRealPowerContribution, essReactivePowerContribution);
                    gensetRealPowerContribution = 0;
                    gensetRealPowerContribution = 0;
                    gensetReactivePowerContribution = 0;
                    gensetPowerFactor = 0;
                }
            }
            //PV does not have enough power to run the load; run on PV + genset and/or energy storage
            else {
                Logger.log("PV does not have enough power to run the load, run on PV + genset and/or energy storage");
                // Scenario when ESS has charge, is ready to discharge, and could support load.  
                // If the PV + ESS can support the load, the ESS will discharge down to 30% load.  
                // When a genset starts, it will run at a minimum of 30% power.   
                // If a genset is running, it will run up to 70% before the ESS attempts to pick up load.  
                // ESS will attempt to pick up load before the next generator set will start (if above 30% load).   
                // When on gen + PV, ESS will recharge up to a max. of 70% genset load.  
                if (essChargeState === 1) {

                }
            }

        }
    }
    
    Logger.log("essRealPowerContribution: ", essRealPowerContribution);
    Logger.log("essReactivePowerContribution: ", essReactivePowerContribution);
    Logger.log("newRemainingESSEnergy: ", newRemainingESSEnergy);
    Logger.log("newActiveFeederBreakers: ", newActiveFeederBreakers);
    Logger.log("gensetRealPowerRequirement: ", gensetRealPowerRequirement);
    Logger.log("gensetsRequired: ", gensetsRequired);
    Logger.log("nextGensetOnlinePower: ", nextGensetOnlinePower);


    return {
        index,
        activeFeederBreakers: newActiveFeederBreakers,
        remainingESSEnergy: newRemainingESSEnergy,
        totalESSEnergy,
        totalGensetPower,
        essChargeState,
        realLoad: realLoad,
        loadPowerFactor: loadPowerFactor,
        reactiveLoad: reactiveLoad,
        availablePVPower: availablePVPower,
        essReactivePowerContribution,
        essRealPowerContribution,
        essPowerFactor,
        utilityRealPowerContribution,
        utilityReactivePowerContribution,
        utilityPowerFactor,
        providedPVPower,
        gensetRealPowerContribution,
        gensetReactivePowerContribution,
        gensetPowerFactor,
        gensetsRequired,
        essChargeState: newEssChargeState,
    };
}