import * as React from 'react';
import { Box } from '@mui/material';
import Typography from '@mui/material/Typography';
import NumberInput from '../components/NumberInput';
import Switch from '@mui/material/Switch';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Paper from '@mui/material/Paper';

function UtilitySettings() {
    const label = { inputProps: { 'aria-label': 'Switch demo' } };
    return (
        //<Paper elevation={4}>
            <Box sx={{textAlign: 'left', padding : 2}}>
                <Typography variant="h5">Utility Settings</Typography>
                <Typography variant="body1">Export Limit: </Typography>
                <NumberInput />
                <FormGroup>
                    <FormControlLabel control={<Switch />} label="Is Present" />
                </FormGroup>
            </Box>
        //</Paper>
    );
}
export default UtilitySettings;