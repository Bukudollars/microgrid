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
    let genSum = 0;
    let pvSum = 0;
    let essSum = 0;
    let utilitySum = 0;

    try {
        Logger.log("Rolling average worker received message");
        for (let i = 0; i  < e.data.length; i++) {
            genSumDaily += e.data[i].gensetRealPowerContribution / MINUTES_PER_HOUR;
            pvSumDaily += e.data[i].providedPVPower / MINUTES_PER_HOUR;
            genSumMonthly += e.data[i].gensetRealPowerContribution / MINUTES_PER_HOUR;
            pvSumMonthly += e.data[i].providedPVPower / MINUTES_PER_HOUR;

            genSum += e.data[i].gensetRealPowerContribution / MINUTES_PER_HOUR;
            pvSum += e.data[i].providedPVPower / MINUTES_PER_HOUR;
            if (e.data[i].essPowerContribution > 0) {
                essSum += e.data[i].essPowerContribution / MINUTES_PER_HOUR;
            }
            if (e.data[i].utilityRealPowerContribution > 0) {
                utilitySum += e.data[i].utilityRealPowerContribution / MINUTES_PER_HOUR;
            }

            let dailyGenAverage, dailyPVAverage;
            if (i < dailyWindowSize) {
                dailyGenAverage = genSumDaily / 1000;
                dailyPVAverage = pvSumDaily / 1000;
            } else {
                genSumDaily -= e.data[i - dailyWindowSize].gensetRealPowerContribution / MINUTES_PER_HOUR;
                pvSumDaily -= e.data[i - dailyWindowSize].providedPVPower / MINUTES_PER_HOUR;
                dailyGenAverage = genSumDaily / 1000;
                dailyPVAverage = pvSumDaily / 1000;
            }

            let monthlyGenAverage, monthlyPVAverage;
            if (i < monthlyWindowSize) {
                monthlyGenAverage = genSumMonthly / 1000;
                monthlyPVAverage = pvSumMonthly / 1000;
            } else {
                genSumMonthly -= e.data[i - monthlyWindowSize].gensetRealPowerContribution / MINUTES_PER_HOUR;
                pvSumMonthly -= e.data[i - monthlyWindowSize].providedPVPower / MINUTES_PER_HOUR;
                monthlyGenAverage = genSumMonthly / 1000;
                monthlyPVAverage = pvSumMonthly / 1000;
            }
            rollingAverages.push({
                dailyGenAverage,
                dailyPVAverage,
                monthlyGenAverage,
                monthlyPVAverage,
                genSum,
                pvSum,
                essSum,
                utilitySum
            });
        }
        self.postMessage(rollingAverages);
    } catch (error) {
        Logger.error("Error in rolling average worker: ", error);
    }
};