import Logger from './logger';
import { MINUTES_PER_HOUR, HOURS_PER_DAY, DAYS_PER_MONTH } from '../constants';

self.onmessage = function (e) {
    Logger.log("Rolling average worker received message");
    const dailyWindowSize = MINUTES_PER_HOUR * HOURS_PER_DAY;
    const monthlyWindowSize = dailyWindowSize * DAYS_PER_MONTH;
    const rollingAverages = [];
    let genSumDaily = 0;
    let pvSumDaily = 0;
    let genSumMonthly = 0;
    let pvSumMonthly = 0;

    try {
        Logger.log("Rolling average worker received message");
        for (let i = 0; i  < e.data.length; i++) {
            genSumDaily += e.data[i].gensetRealPowerContribution;
            pvSumDaily += e.data[i].providedPVPower;
            genSumMonthly += e.data[i].gensetRealPowerContribution;
            pvSumMonthly += e.data[i].providedPVPower;

            let dailyGenAverage, dailyPVAverage;
            if (i < dailyWindowSize) {
                dailyGenAverage = genSumDaily / (i + 1);
                dailyPVAverage = pvSumDaily / (i + 1);
            } else {
                genSumDaily -= e.data[i - dailyWindowSize].gensetRealPowerContribution;
                pvSumDaily -= e.data[i - dailyWindowSize].providedPVPower;
                dailyGenAverage = genSumDaily / dailyWindowSize;
                dailyPVAverage = pvSumDaily / dailyWindowSize;
            }

            let monthlyGenAverage, monthlyPVAverage;
            if (i < monthlyWindowSize) {
                monthlyGenAverage = genSumMonthly / (i + 1);
                monthlyPVAverage = pvSumMonthly / (i + 1);
            } else {
                genSumMonthly -= e.data[i - monthlyWindowSize].gensetRealPowerContribution;
                pvSumMonthly -= e.data[i - monthlyWindowSize].providedPVPower;
                monthlyGenAverage = genSumMonthly / monthlyWindowSize;
                monthlyPVAverage = pvSumMonthly / monthlyWindowSize;
            }
            rollingAverages.push({
                dailyGenAverage,
                dailyPVAverage,
                monthlyGenAverage,
                monthlyPVAverage
            });
        }
        self.postMessage(rollingAverages);
    } catch (error) {
        Logger.error("Error in rolling average worker: ", error);
    }
};