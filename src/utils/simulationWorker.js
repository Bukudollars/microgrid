import { LOAD_PROFILE, POWER_FACTOR_MIN, POWER_FACTOR_MAX } from "../constants";
self.onmessage = function (e) {
    console.log("Worker received message: ", e.data);
    const variables = e.data;

    const initialState = {
        activeFeederBreakers: 4,
        remainingESSEnergy: 50,
        totalESSEnergy: 100,
        totalGensetPower: 200,
        essChargeState: 1,
    };

    const dataset = Array.from({ length: 24 }, (_, index) => {
        return computeValue({ ...initialState, variables, index });
    });

    self.postMessage(dataset);
};

function computeValue({
    activeFeederBreakers,
    remainingESSEnergy,
    totalESSEnergy,
    totalGensetPower,
    essChargeState,
    variables,
    index
}) {
    //Determine the load requirements 
    const realLoad = LOAD_PROFILE[index % 24].commercial * 1000 * 0.95 * 1;
    const powerFactor = Math.random() * (POWER_FACTOR_MAX.commercial - POWER_FACTOR_MIN.commercial) + POWER_FACTOR_MIN.commercial;
    const reactiveLoad = Math.sqrt((realLoad / powerFactor) ** 2 - realLoad ** 2);

    //Determine available PV power
    //Assume 500kW system with 70% efficiency. Time of day factor is unknown.
    const availablePVPower = 500 * Math.random() * (1) * 0.7;

    //Placeholder logic for the simulation
    const utility = true;
    const gensetCount = 4;
    const essModuleCount = 4 ;
    let newActiveFeederBreakers = activeFeederBreakers;

    //Placeholder values for the ESS
    let essReactivePowerContribution = 0;
    let essRealPowerContribution = 0;
    const peakESSRealPower = 500;
    let newRemainingESSEnergy = remainingESSEnergy;
    
    //Work through the on-utility logic
    if (utility) {
        //no load shedding for utility mode; all breakers active.  
        newActiveFeederBreakers = 4;
        //if more PV than the load requires, first recharge ESS, then export to utility
        if (realLoad - availablePVPower < 0) {
            //Recharge ESS with excess PV power, export any remaining to utility
            if (remainingESSEnergy < totalESSEnergy) {
                //ESS provides reactive power to load
                essReactivePowerContribution = reactiveLoad;
                //flows into ESS with a maximum value of the Peak ESS Real Power value.
                essRealPowerContribution = Math.min(availablePVPower - realLoad, peakESSRealPower);
                newRemainingESSEnergy = remainingESSEnergy + ( 1/1 * essRealPowerContribution);
                
            }

        }

    } else {
        if (gensetCount === 0) {

        } else if (gensetCount > 0 && essModuleCount === 0) {

        } else if (gensetCount > 0 && essModuleCount > 0) {

        }
    }

    return {
        index,
        activeFeederBreakers: newActiveFeederBreakers,
        remainingESSEnergy: newRemainingESSEnergy,
        totalESSEnergy,
        totalGensetPower,
        essChargeState,
        realLoad: realLoad,
        powerFactor: powerFactor,
        reactiveLoad: reactiveLoad,
        availablePVPower: availablePVPower,
        essReactivePowerContribution,
    };
}