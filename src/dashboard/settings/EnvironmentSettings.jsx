import * as React from 'react';
import { useState } from 'react';
import { Box } from '@mui/material';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';
import { useSettings, useSettingsDispatch } from '../../contexts/SettingsContext';

function EnvironmentSettings({cloudingFactor, setCloudingFactor}) {
    
    const handleCloudingFactorChange = (event, newValue) => {
        setCloudingFactor(newValue)
    };

    return (
        <Box sx={{ textAlign: 'left', padding: 2 }}>
            <Typography variant="h5">Environment Settings</Typography>
            <Typography variant="body1">Clouding Factor: {(cloudingFactor * 100).toFixed(0)}%</Typography>
            <Slider
                aria-label="Clouding Factor"
                value={cloudingFactor}
                onChange={handleCloudingFactorChange}
                min={0}
                max={1}
                step={0.01}
            />
        </Box>
    );
}

export default EnvironmentSettings;
