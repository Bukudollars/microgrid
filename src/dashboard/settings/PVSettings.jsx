import * as React from 'react';
import { Box } from '@mui/material';
import Typography from '@mui/material/Typography';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import NumberInput from '../../dashboard/components/NumberInput';

function PVSettings() {
    return (
        <Box>
            <Typography variant="h5">PV Settings</Typography>
            <Typography variant="body1">PV Peak Size: </Typography>
            <NumberInput />
            <Typography variant="body1">Number of inverters: 16</Typography>
        </Box>
    );
}
export default PVSettings;