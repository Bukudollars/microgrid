import Logger from './logger';
import { MINUTES_PER_HOUR, HOURS_PER_DAY } from '../constants';

self.onmessage = function (e) {
    console.log("Rolling average worker received message");
    const windowSize = MINUTES_PER_HOUR * HOURS_PER_DAY;
    const rollingAverages = [];
    let windowSum = 0;

    try {
        Logger.log("Rolling average worker received message");
        for (let i = 0; i  < e.data.length; i++) {
            windowSum += e.data[i].gensetRealPowerContribution;
            if (i < windowSize) {
                rollingAverages.push(windowSum / (i + 1));
            } else {
                windowSum = windowSum - e.data[i - windowSize].gensetRealPowerContribution;
                rollingAverages.push(windowSum / windowSize);
            }
        }
        console.log(e.data[0]);
        self.postMessage(rollingAverages);
    } catch (error) {
        Logger.error("Error in rolling average worker: ", error);
    }
};