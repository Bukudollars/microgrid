import * as React from 'react';
import { Box } from '@mui/material';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';
import { useSettings, useSettingsDispatch } from '../../contexts/SettingsContext';

function EnvironmentSettings() {
    const { cloudingFactor } = useSettings();
    const dispatch = useSettingsDispatch();

    const handleCloudingFactorChange = (event, newValue) => {
        if (Number.isInteger(newValue) && newValue >= 0 && newValue <= 100) {
            dispatch({ type: 'SET_CLOUDING_FACTOR', payload: newValue });
        } else {
            console.error("Invalid clouding factor: ", newValue);
        }
    };

    return (
        <Box sx={{ textAlign: 'left', padding: 2 }}>
            <Typography variant="h5">Environment Settings</Typography>
            <Typography variant="body1">Clouding Factor: {cloudingFactor}</Typography>
            <Slider
                aria-label="Clouding Factor"
                value={cloudingFactor}
                onChange={handleCloudingFactorChange}
                min={0}
                max={100}
                step={1}
            />
        </Box>
    );
}

export default EnvironmentSettings;
