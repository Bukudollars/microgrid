import Logger from './logger';
import { MINUTES_PER_HOUR, HOURS_PER_DAY } from '../constants';

self.onmessage = function (e) {
    console.log("Rolling average worker received message");
    const windowSize = MINUTES_PER_HOUR * HOURS_PER_DAY;
    const rollingAverages = [];
    let genSum = 0;
    let pvSum = 0;

    try {
        Logger.log("Rolling average worker received message");
        for (let i = 0; i  < e.data.length; i++) {
            genSum += e.data[i].gensetRealPowerContribution;
            pvSum += e.data[i].providedPVPower;
            if (i < windowSize) {
                rollingAverages.push({dailyGenAverage: genSum / (i + 1), dailyPVAverage: pvSum / (i + 1)});
            } else {
                genSum = genSum - e.data[i - windowSize].gensetRealPowerContribution;
                pvSum = pvSum - e.data[i - windowSize].providedPVPower;
                rollingAverages.push({dailyGenAverage: genSum / windowSize, dailyPVAverage: pvSum / windowSize});
            }
        }
        console.log(e.data[0]);
        self.postMessage(rollingAverages);
    } catch (error) {
        Logger.error("Error in rolling average worker: ", error);
    }
};