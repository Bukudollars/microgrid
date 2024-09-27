import * as React from 'react';
import { Box, Tooltip, Typography, Paper } from '@mui/material';
import { useSettings } from '../../SettingsContext';
import { LOAD_PROFILE, POWER_FACTOR_MIN, POWER_FACTOR_MAX } from '../../constants';

function Load() {
    const { loadPeakLevel } = useSettings();
    const realLoad = loadPeakLevel * LOAD_PROFILE.find(entry=> entry.hour === 1).residential;
    const powerFactor = Math.random() * (POWER_FACTOR_MAX.residential - POWER_FACTOR_MIN.residential) + POWER_FACTOR_MIN.residential;
    const reactiveLoad = Math.sqrt((realLoad / powerFactor) ** 2 - realLoad ** 2);
    return (
        <Paper elevation={4}>
        <Box sx={{textAlign: 'left', margin: 2, padding: 2}}>
            <Typography variant="h5">Load</Typography>
            <Tooltip title="Real Load" arrow>
                <Typography variant="body1">(P) {realLoad} kW</Typography>
            </Tooltip>
            <Tooltip title="Reactive Load" arrow>
                <Typography variant="body1">(Q) {reactiveLoad.toFixed(0)} kVAr 4/4</Typography>
            </Tooltip>
            <Tooltip title="Power Factor" arrow>
                <Typography variant="body1">(PF) {powerFactor.toFixed(2)}</Typography>
            </Tooltip>
            {/* <img src="./load.png" alt="Load placeholder" /> */}
        </Box>
        </Paper>
    );
}
export default Load;