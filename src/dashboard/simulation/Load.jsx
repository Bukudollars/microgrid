import * as React from 'react';
import { Box, Tooltip, Typography, Paper } from '@mui/material';
import { useSettings } from '../../contexts/SettingsContext';
import { LOAD_PROFILE, POWER_FACTOR_MIN, POWER_FACTOR_MAX } from '../../constants';
import { useSimulationState } from '../../contexts/SimulationContext';

function Load() {
    const { loadPeakLevel } = useSettings();
    //const realLoad = loadPeakLevel * LOAD_PROFILE.find(entry=> entry.hour === 1).residential;
    const { simulationData, loading, currentIndex } = useSimulationState();
    const validData = simulationData.length > 0 && currentIndex < simulationData.length && !loading;
    const realLoad =  validData ? simulationData[currentIndex].realLoad : 0;
    const powerFactor = validData ? simulationData[currentIndex].loadPowerFactor : 0;
    const reactiveLoad = validData ? simulationData[currentIndex].reactiveLoad : 0;
    const activeFeederBreakers = validData ? simulationData[currentIndex].activeFeederBreakers : 0;
    const totalFeederBreakers = 4
    return (
        <Paper elevation={4}>
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
        </Paper>
    );
}
export default Load;