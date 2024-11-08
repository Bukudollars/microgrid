import * as React from 'react';
import { Box, Tooltip, Stack } from '@mui/material';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { useSimulationState } from '../../contexts/SimulationContext';
import { BarChart } from '@mui/x-charts/BarChart';
import isTouch from '../../hooks/isTouch';

function Utility() {
    const { simulationData, currentIndex, peakLoad, utilityExportLimit } = useSimulationState();

    const realLoad =  simulationData?.[currentIndex]?.utilityRealPowerContribution ?? 0;
    const reactiveLoad = simulationData?.[currentIndex]?.utilityReactivePowerContribution ?? 0;
    const powerFactor = simulationData?.[currentIndex]?.utilityPowerFactor ?? 0;
    const isTouchDevice = isTouch();
    return (
        <Paper elevation={4}>
            <Stack
                direction="row"
                justifyContent="center"
                alignItems="flex-start"
            >
                <Box sx={{textAlign: 'left', margin: 2, padding: 2}}>
                    <Typography variant="h5">Utility</Typography>
                    <Tooltip title="Real Load" arrow>
                        <Typography variant="body1">(P) {realLoad.toFixed(0)}</Typography>
                    </Tooltip>
                    <Tooltip title="Reactive Load" arrow>
                        <Typography variant="body1">(Q) {reactiveLoad.toFixed(0)}</Typography>
                    </Tooltip>
                    <Tooltip title="Power Factor" arrow>
                        <Typography variant="body1">(PF) {powerFactor.toFixed(2)}</Typography>
                    </Tooltip>
                    {/* <img src="./utility.png" alt="Utility placeholder" /> */}
                </Box>
                <Box>
                    <BarChart
                        width={150}
                        height={200}
                        yAxis={[{
                            min: -utilityExportLimit, 
                            max: peakLoad, 
                            colorMap: {
                                type: 'piecewise',
                                thresholds: [0],
                                colors: ['green', 'red']
                        }}]}
                        xAxis={[{scaleType: 'band', disableLine: true, disableTicks: true, data: [""]}]}
                        series={[{data: [realLoad], label: "Real Load", valueFormatter: (value) => value ? value.toFixed(0) + " kW" : "0 kW"}]}
                        slotProps={{ legend: { hidden: true } }}
                        {...(isTouchDevice ? { tooltip: {trigger: 'none'}} : {})}
                        sx={{'&&': { touchAction: 'auto' }}}
                    />
                </Box>
            </Stack>
        </Paper>
    );
}
export default Utility;