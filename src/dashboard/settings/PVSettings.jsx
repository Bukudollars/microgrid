import * as React from 'react';
import { Box } from '@mui/material';
import Typography from '@mui/material/Typography';
import NumberInput from '../components/NumberInput';
//import Paper from '@mui/material/Paper';
import { useSettings, useSettingsDispatch } from '../../contexts/SettingsContext';

function PVSettings({pvPeakSize, setPvPeakSize}) {
    
    const handleChangePVPeakSize = (event, value) => {
        setPvPeakSize(value)
    }

    return (
        //<Paper elevation={4}>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                textAlign: 'left', 
                padding : 2
            }}>
                <Typography variant="h5">PV Settings</Typography>
                <Typography variant="body1">PV Peak Size: </Typography>
                <NumberInput 
                    min={0}
                    aria-label="PV Peak Size"
                    placeholder="PV Peak Size"
                    value={pvPeakSize}
                    onChange={handleChangePVPeakSize}
                />
                <Typography variant="body1">Number of inverters: 16</Typography>
            </Box>
        //</Paper>
    );
}
export default PVSettings;