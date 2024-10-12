import { LOAD_PROFILE, POWER_FACTOR_MIN, POWER_FACTOR_MAX } from "../constants";
import Logger from "./logger";
self.onmessage = function (e) {
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
        gensetCount: 0,
        
    });

    //initial state
    let state = Object.freeze({
        activeFeederBreakers: variables.totalFeederBreakers,
        remainingESSEnergy: variables.singleESSEnergy * variables.essModuleCount,
        essChargeState: 1,
    });

    const dataset = Array.from({ length: 24 }, (_, index) => {
        const result = computeValue({ ...state, variables, index });
        state = Object.freeze({ 
            ...state, 
            remainingESSEnergy: result.remainingESSEnergy, 
            activeFeederBreakers: result.activeFeederBreakers });
        return result;
    });

    self.postMessage(dataset);
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
    const realLoad = LOAD_PROFILE[index % 24].commercial * variables.peakLoad * 0.95 * (activeFeederBreakers / variables.totalFeederBreakers);
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
    let essPowerFactor = 1;
    
    //Placeholder values for the utility
    let utilityRealPowerContribution = 0;
    let utilityReactivePowerContribution = 0;
    let utilityPowerFactor = 1;
    let providedPVPower = 0;

    //Constant values for gensets
    const totalGensetPower = variables.singleGensetPower * variables.gensetCount;
    const minGensetLoad = variables.singleGensetPower * 0.3;
    const nextGensetOnlinePower = variables.singleGensetPower * 0.7;
    
    
    
    //Work through the on-utility logic
    if (variables.utility) {
        //no load shedding for utility mode; all breakers active.  
        newActiveFeederBreakers = 4;
        //if more PV than the load requires, first recharge ESS, then export to utility
        if (realLoad < availablePVPower) {
            //Recharge ESS with excess PV power, export any remaining to utility
            if (remainingESSEnergy < totalESSEnergy) {
                //ESS provides reactive power to load
                essReactivePowerContribution = reactiveLoad;
                //flows into ESS with a maximum value of the Peak ESS Real Power value.
                essRealPowerContribution = Math.min(availablePVPower - realLoad, peakESSRealPower);
                newRemainingESSEnergy = remainingESSEnergy + ( 1/1 * essRealPowerContribution);
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
            //no PV power available
            if (availablePVPower <= 0) {
                Logger.log("newRemainingESSEnergy: ", newRemainingESSEnergy);
                Logger.log("remainingESSEnergy: ", remainingESSEnergy);
                //if no PV power and ESS not charged, start re-charging the ESS. 
                if (newRemainingESSEnergy < totalESSEnergy) {
                    //flows back into ESS
                    essRealPowerContribution = -Math.min(peakESSRealPower, (totalESSEnergy - remainingESSEnergy)); 
                    essReactivePowerContribution = 0;
                    essPowerFactor = powerFactor(essRealPowerContribution, essReactivePowerContribution);
                    utilityRealPowerContribution = realLoad + Math.min(peakESSRealPower, totalESSEnergy - remainingESSEnergy);
                    utilityReactivePowerContribution = reactiveLoad;
                    utilityPowerFactor = powerFactor(utilityRealPowerContribution, utilityReactivePowerContribution);
                    newRemainingESSEnergy = remainingESSEnergy + (1/1 * peakESSRealPower);
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
                Logger.log("newRemainingESSEnergy after: ", newRemainingESSEnergy);
                Logger.log("remainingESSEnergy after: ", remainingESSEnergy);
            } 
            //PV and utility both available
            //If on PV power then do not recharge ESS, but might discharge ESS
            else {
                //If the delta between the real load and available PV power is less than the peak ESS real power, discharge the ESS if it is above 30% remaining energy.
                if (realLoad - availablePVPower < peakESSRealPower && remainingESSEnergy / totalESSEnergy > 0.3) {
                    providedPVPower = availablePVPower;
                    essRealPowerContribution = realLoad - availablePVPower;
                    essReactivePowerContribution = reactiveLoad;
                    essPowerFactor = powerFactor(essRealPowerContribution, essReactivePowerContribution);
                    newRemainingESSEnergy = remainingESSEnergy - (1/1 * (essRealPowerContribution));
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
                if (activeFeederBreakers > 0) {
                    if (availablePVPower - realLoad >= realLoad * (1 / activeFeederBreakers)) {
                        newActiveFeederBreakers++;  
                    } 
                    //If the PV alone cannot support an additional load breaker, check to see if the PV and energy storage can support an additional load breaker.
                    else if(remainingESSEnergy > 0) {
                        if (availablePVPower + peakESSRealPower - realLoad >= realLoad * (1 / activeFeederBreakers)) {
                            newActiveFeederBreakers++;
                        }
                    }
                } else {
                    if (availablePVPower - realLoad >= realLoad * (1 / variables.totalFeederBreakers)) {
                        newActiveFeederBreakers++;  
                    } 
                    else if(remainingESSEnergy > 0) {
                        if (availablePVPower + peakESSRealPower - realLoad >= realLoad * (1 / variables.totalFeederBreakers)) {
                            newActiveFeederBreakers++;
                        }
                    }
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
                    newRemainingESSEnergy = remainingESSEnergy - (1/1 * essRealPowerContribution);
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
                    if (realLoad !== 0) {
                        newActiveFeederBreakers = Math.floor(availablePVPower * activeFeederBreakers / realLoad);
                    } else {
                        newActiveFeederBreakers = 0;
                    }
                    
                    Logger.log("availablePVPower: ", availablePVPower);
                    Logger.log("activeFeederBreakers: ", activeFeederBreakers);
                    Logger.log("realLoad: ", realLoad);
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
                        if (realLoad !== 0) {
                            newActiveFeederBreakers = Math.floor(Math.min(availablePVPower + peakESSRealPower, availablePVPower + remainingESSEnergy) * activeFeederBreakers / realLoad);
                        } else {
                            newActiveFeederBreakers = 0;
                        }
                        
                        providedPVPower = availablePVPower;
                        //Power flows out of the ESS
                        essRealPowerContribution = Math.min(realLoad - availablePVPower, remainingESSEnergy);
                        essReactivePowerContribution = reactiveLoad;
                        essPowerFactor = powerFactor(essRealPowerContribution, essReactivePowerContribution);
                        newRemainingESSEnergy = remainingESSEnergy - (1/1 * essRealPowerContribution);
                    }
                    //PV and energy storage is sufficient to power load.  
                    else {
                        Logger.log("PV and energy storage is sufficient to power load");
                        providedPVPower = availablePVPower;
                        //power flows out of the ESS
                        essRealPowerContribution = realLoad - availablePVPower;
                        essReactivePowerContribution = reactiveLoad;
                        essPowerFactor = powerFactor(essRealPowerContribution, essReactivePowerContribution);
                        newRemainingESSEnergy = remainingESSEnergy - (1/1 * essRealPowerContribution);
                        Logger.log("remainingESSEnergy: ", remainingESSEnergy);
                    }
                }
            }

        } else if (variables.gensetCount > 0 && variables.essModuleCount === 0) {

        } else if (variables.gensetCount > 0 && variables.essModuleCount > 0) {

        }
        if (newRemainingESSEnergy < 0) {
            newRemainingESSEnergy = 0;
        }
        Logger.log("newActiveFeederBreakers: ", newActiveFeederBreakers);
    }

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
    };
}