import * as React from 'react';
import { Box } from '@mui/material';
import Typography from '@mui/material/Typography';
import NumberInput from '../components/NumberInput';
import Paper from '@mui/material/Paper';

function PVSettings() {
    return (
        <Paper elevation={4}>
            <Box sx={{padding : 2}}>
                <Typography variant="h5">PV Settings</Typography>
                <Typography variant="body1">PV Peak Size: </Typography>
                <NumberInput />
                <Typography variant="body1">Number of inverters: 16</Typography>
            </Box>
        </Paper>
    );
}
export default PVSettings;