import * as React from 'react';
import { Box, Stack, Paper, Tooltip } from '@mui/material';
import Typography from '@mui/material/Typography';
import GasMeterIcon from '@mui/icons-material/GasMeter';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import { Gauge, gaugeClasses } from '@mui/x-charts/Gauge'
import { BarChart } from '@mui/x-charts/BarChart';
import { useSimulationState } from '../../contexts/SimulationContext';
import isTouch from '../../hooks/isTouch';

function YieldDistribution() {
    const isTouchDevice = isTouch();

    const { simulationData, rollingAverage, currentIndex } = useSimulationState();


    const instantYieldDistribution = (
        (((simulationData?.[currentIndex]?.gensetRealPowerContribution ?? 0) 
            + (simulationData?.[currentIndex]?.providedPVPower ?? 0)) 
            > 0)) 
        ? (simulationData?.[currentIndex]?.gensetRealPowerContribution ?? 0)
            / ((simulationData?.[currentIndex]?.gensetRealPowerContribution ?? 0) 
                + (simulationData?.[currentIndex]?.providedPVPower ?? 0)) 
        : .5;
    const genDailyrollingAverage = rollingAverage?.[currentIndex]?.dailyGenAverage ?? 0;
    const pvDailyrollingAverage = rollingAverage?.[currentIndex]?.dailyPVAverage ?? 0;
    const genMonthlyrollingAverage = rollingAverage?.[currentIndex]?.monthlyGenAverage ?? 0;
    const pvMonthlyrollingAverage = rollingAverage?.[currentIndex]?.monthlyPVAverage ?? 0;
    //console.log("genDailyrollingAverage", rollingAverage[0]);

    return (
        <Paper elevation={4} sx={{py: 1}}>
            <Stack direction="column" spacing={0} sx={{justifyContent: "center", alignItems: "center", mx: 0, px: 0, touchAction: "auto"}}>
                <Typography variant="h5">Yield Distribution</Typography>
                {/* <img src="./yield-distribution.png" alt="Yield Distribution placeholder" /> */}
                {/* <Tooltip title="Instant Yield Distribution" arrow> */}
                    <Box
                        sx={{touchAction: "auto"}}
                    >
                        <Gauge 
                            width={250}
                            height={100}
                            startAngle={-100}
                            endAngle={100}
                            value={instantYieldDistribution * 100} 
                            sx={() => ({
                                [`& .${gaugeClasses.valueArc}`]: {
                                    fill: 'blue'
                                },
                                [`& .${gaugeClasses.referenceArc}`]: {
                                    fill: 'green'
                                },
                                mx: 0,
                                px: 0,
                                '& svg': { touchAction: 'auto' }
                            })}
                            text={(instantYieldDistribution * 100).toFixed(0) + "% | " + (100 - instantYieldDistribution * 100).toFixed(0) + "%"}
                            // {...(isTouchDevice ? { tooltip: {trigger: 'none'}} : {})}

                        />
                    </Box>
                {/* </Tooltip> */}
                <Typography variant="body1">Current Yield</Typography>
                <Stack direction="row" sx={{justifyContent: "center", alignItems: "center"}} spacing={17} pt={2}>
                    
                    <Stack direction="column" spacing = {1} sx={{justifyContent: "center", alignItems: "center"}}>
                        <Tooltip title="Generator Daily Average Yield" arrow>
                            <Typography variant="body1">{genDailyrollingAverage.toFixed(0)} MWh</Typography>
                        </Tooltip>
                        <GasMeterIcon sx={{color: 'blue', fontSize: '60px'}} />
                        <Tooltip title="Generator Monthly Average Yield" arrow>
                            <Typography variant="body1">{genMonthlyrollingAverage.toFixed(0)} MWh</Typography>
                        </Tooltip>
                    </Stack>
                    
                    
                    <Stack direction="column" spacing={1} sx={{justifyContent: "center", alignItems: "center"}}>
                        <Tooltip title="PV Daily Average Yield" arrow>
                            <Typography variant="body1">{pvDailyrollingAverage.toFixed(0)} MWh</Typography>
                        </Tooltip>
                            <WbSunnyIcon sx={{color: 'green', fontSize: '60px'}}/>
                        <Tooltip title="PV Monthly Average Yield" arrow>
                            <Typography variant="body1">{pvMonthlyrollingAverage.toFixed(0)} MWh</Typography>
                        </Tooltip>
                    </Stack>
                    
                    
                </Stack>

                <Stack direction="column" sx={{alignItems: "center"}}>
                        
                        <BarChart 
                            width={370}
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
                                    valueFormatter: (value) => value ? value.toFixed(0) + " MWh" : "0 MWh"
                                }, 
                                {
                                    data: [pvMonthlyrollingAverage], 
                                    stack: 'stack1', 
                                    color: 'green', 
                                    label: 'PV',
                                    valueFormatter: (value) => value ? value.toFixed(0) + " MWh" : "0 MWh"
                                }]}
                            slotProps = {{ legend: {hidden: true}}}
                            sx={{'&&': {touchAction: 'auto'}}}
                            {...(isTouchDevice ? { tooltip: {trigger: 'none'}} : {})}
                            
                        />
                        <Typography variant="body1">Monthly Rolling Average</Typography>
                    </Stack>
                
                
                
                
            </Stack>
        </Paper>
    );
}

export default YieldDistribution;