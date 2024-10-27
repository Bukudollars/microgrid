import * as React from 'react';
import { Box, Tooltip, Typography, Paper, Stack } from '@mui/material';
import { useSettings } from '../../contexts/SettingsContext';
import { LOAD_PROFILE, POWER_FACTOR_MIN, POWER_FACTOR_MAX } from '../../constants';
import { useSimulationState } from '../../contexts/SimulationContext';
import { BarChart } from '@mui/x-charts/BarChart';

function Load() {
    //const realLoad = loadPeakLevel * LOAD_PROFILE.find(entry=> entry.hour === 1).residential;
    const { simulationData, loading, currentIndex, peakLoad } = useSimulationState();
    const validData = simulationData.length > 0 && currentIndex < simulationData.length && !loading;
    const realLoad =  validData ? simulationData[currentIndex]?.realLoad ?? 0 : 0;
    const powerFactor = validData ? simulationData[currentIndex]?.loadPowerFactor ?? 0 : 0;
    const reactiveLoad = validData ? simulationData[currentIndex]?.reactiveLoad ?? 0 : 0;
    const activeFeederBreakers = validData ? simulationData[currentIndex]?.activeFeederBreakers ?? 0 : 0;
    const totalFeederBreakers = 4
    return (
        <Paper elevation={4}>
            <Stack
                direction="row"
                justifyContent="center"
                alignItems="flex-start"
            >
                <Box sx={{textAlign: 'left', margin: 2, padding: 2}}>
                    <Typography variant="h5">Load</Typography>
                    <Tooltip title="Real Load" arrow>
                        <Typography variant="body1">(P) {realLoad.toFixed(0)} kW</Typography>
                    </Tooltip>
                    <Tooltip title="Reactive Load" arrow>
                        <Typography variant="body1">(Q) {reactiveLoad.toFixed(0)} kVAr</Typography>
                    </Tooltip>
                    <Tooltip title="Power Factor" arrow>
                        <Typography variant="body1">(PF) {powerFactor.toFixed(2)}</Typography>
                    </Tooltip>
                    <Tooltip title="Active Feeder Breakers" arrow>
                        <Typography variant="body1">Breakers: {activeFeederBreakers} / {totalFeederBreakers}</Typography>
                    </Tooltip>
                    {/* <img src="./load.png" alt="Load placeholder" /> */}
                </Box>
                <Box>
                    <BarChart
                        width={150}
                        height={200}
                        yAxis={[{max: peakLoad}]}
                        xAxis={[{scaleType: 'band', disableLine: true, disableTicks: true, data: [""]}]}
                        series={[{data: [realLoad], label: "Real Load", valueFormatter: (value) => value ? value.toFixed(0) + " kW" : "0 kW"}]}
                        slotProps={{ legend: { hidden: true } }}
                    />
                </Box>
            </Stack>
            
        </Paper>
    );
}
export default Load;