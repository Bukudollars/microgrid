import React, { useState } from 'react';
import { Box, Stack, Paper, Tooltip } from '@mui/material';
import Typography from '@mui/material/Typography';
import GasMeterIcon from '@mui/icons-material/GasMeter';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import { Gauge, gaugeClasses } from '@mui/x-charts/Gauge'
import { BarChart } from '@mui/x-charts/BarChart';
import { useSimulationState } from '../../contexts/SimulationContext';

function YieldDistribution() {

    const { simulationData, rollingAverage, loading, currentIndex } = useSimulationState();
    const validData = simulationData.length > 0 && currentIndex < simulationData.length && !loading;
    const instantYieldDistribution = validData && simulationData[currentIndex].gensetRealPowerContribution + simulationData[currentIndex].providedPVPower > 0 
    ? simulationData[currentIndex].gensetRealPowerContribution 
        / (simulationData[currentIndex].gensetRealPowerContribution + simulationData[currentIndex].providedPVPower) 
    : .5;
    const genDailyrollingAverage = validData ? rollingAverage[currentIndex].dailyGenAverage : 0;
    const pvDailyrollingAverage = validData ? rollingAverage[currentIndex].dailyPVAverage : 0;
    const genMonthlyrollingAverage = validData ? rollingAverage[currentIndex].monthlyGenAverage : 0;
    const pvMonthlyrollingAverage = validData ? rollingAverage[currentIndex].monthlyPVAverage : 0;
    //console.log("genDailyrollingAverage", rollingAverage[0]);

    return (
        <Paper elevation={4} sx={{padding: 2}}>
            <Stack sx={{justifyContent: "center", alignItems: "center"}}>
                <Typography variant="h5">Yield Distribution</Typography>
                {/* <img src="./yield-distribution.png" alt="Yield Distribution placeholder" /> */}
                <Stack direction="row" sx={{justifyContent: "center", alignItems: "end"}} spacing={3}>
                    <Tooltip title="Generator Yield" arrow>
                        <Box>
                            <Typography variant="body1">{genDailyrollingAverage.toFixed(0)} MWh</Typography>
                            <GasMeterIcon fontSize='large' sx={{color: 'blue'}} />
                        </Box>
                    </Tooltip>
                    <Box>
                        <Gauge 
                            width={250}
                            height={200}
                            startAngle={-100}
                            endAngle={100}
                            value={instantYieldDistribution * 100} 
                            sx={(theme) => ({
                                [`& .${gaugeClasses.valueArc}`]: {
                                    fill: 'blue'
                                },
                                [`& .${gaugeClasses.referenceArc}`]: {
                                    fill: 'green'
                                }
                            })}
                            text={(instantYieldDistribution * 100).toFixed(0) + "% | " + (100 - instantYieldDistribution * 100).toFixed(0) + "%"}
                        />
                    </Box>
                    <Tooltip title="PV Yield" arrow>
                        <Box>
                            <Typography variant="body1">{pvDailyrollingAverage.toFixed(0)} MWh</Typography>
                            <WbSunnyIcon fontSize='large' sx={{color: 'green'}}/>
                        </Box>
                    </Tooltip>
                    
                </Stack>
                <Typography variant="body1">Daily</Typography>
                <Stack direction="row" sx={{justifyContent: "center", alignItems: "center"}}>
                    <Typography variant="body1">{genMonthlyrollingAverage.toFixed(0)} MWh</Typography>
                    <BarChart 
                        width={300}
                        height={150}
                        // dataset={dataset}
                        layout="horizontal"
                        yAxis={[{scaleType: 'band', data: [""], disableLine: true, disableTicks: true}] }
                        xAxis={[{max: genMonthlyrollingAverage + pvMonthlyrollingAverage}]}
                        series={[{data: [genMonthlyrollingAverage], stack: 'stack1', color: 'blue'}, {data: [pvMonthlyrollingAverage], stack: 'stack1', color: 'green'}]}
                    />
                    <Typography variant="body1">{pvMonthlyrollingAverage.toFixed(0)} MWh</Typography>
                </Stack>
                <Typography variant="body1">Monthly</Typography>
                
            </Stack>
        </Paper>
    );
}

export default YieldDistribution;