import React, { useState } from 'react';
import { Box, Stack, Paper, Tooltip, Hidden } from '@mui/material';
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
            <Stack direction="column" sx={{justifyContent: "center", alignItems: "center", mx: 3}}>
                <Typography variant="h5">Yield Distribution</Typography>
                {/* <img src="./yield-distribution.png" alt="Yield Distribution placeholder" /> */}
                <Stack direction="row" sx={{justifyContent: "center", alignItems: "center"}} spacing={3}>
                    
                    <Stack direction="column" spacing = {4} sx={{justifyContent: "center", alignItems: "center", pt: 7}}>
                        <Tooltip title="Generator Daily Average Yield" arrow>
                            <Typography variant="body1">{genDailyrollingAverage.toFixed(0)} MWh</Typography>
                        </Tooltip>
                        <GasMeterIcon sx={{color: 'blue', fontSize: '60px'}} />
                        <Tooltip title="Generator Monthly Average Yield" arrow>
                            <Typography variant="body1">{genMonthlyrollingAverage.toFixed(0)} MWh</Typography>
                        </Tooltip>
                    </Stack>
                    
                    <Stack direction="column" sx={{alignItems: "center"}}>
                        <Tooltip title="Instant Yield Distribution" arrow>
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
                        </Tooltip>
                        <Typography variant="body1">Current Yield</Typography>
                        <BarChart 
                            width={300}
                            height={150}
                            // dataset={dataset}
                            layout="horizontal"
                            yAxis={[{scaleType: 'band', data: [''], disableLine: true, disableTicks: true}] }
                            xAxis={[{
                                max: genMonthlyrollingAverage + pvMonthlyrollingAverage, 
                                // valueFormatter: (value) => value.toFixed(0) + " MWh",
                            }]}
                            series={[
                                {
                                    data: [genMonthlyrollingAverage], 
                                    stack: 'stack1', 
                                    color: 'blue', 
                                    label: 'Generator', 
                                    valueFormatter: (value) => value.toFixed(0) + " MWh"
                                }, 
                                {
                                    data: [pvMonthlyrollingAverage], 
                                    stack: 'stack1', 
                                    color: 'green', 
                                    label: 'PV',
                                    valueFormatter: (value) => value.toFixed(0) + " MWh"
                                }]}
                            slotProps = {{ legend: {hidden: true}}}
                        />
                        <Typography variant="body1">Monthly Rolling Average</Typography>
                    </Stack>
                    <Stack direction="column" spacing={4} sx={{justifyContent: "center", alignItems: "center", pt: 7}}>
                        <Tooltip title="PV Daily Average Yield" arrow>
                            <Typography variant="body1">{pvDailyrollingAverage.toFixed(0)} MWh</Typography>
                        </Tooltip>
                            <WbSunnyIcon sx={{color: 'green', fontSize: '60px'}}/>
                        <Tooltip title="PV Monthly Average Yield" arrow>
                            <Typography variant="body1">{pvMonthlyrollingAverage.toFixed(0)} MWh</Typography>
                        </Tooltip>
                    </Stack>
                    
                    
                </Stack>
                
                
                
                
            </Stack>
        </Paper>
    );
}

export default YieldDistribution;