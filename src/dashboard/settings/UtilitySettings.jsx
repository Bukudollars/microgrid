import * as React from 'react';
import { Box } from '@mui/material';
import Typography from '@mui/material/Typography';
import NumberInput from '../components/NumberInput';
import Switch from '@mui/material/Switch';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

function UtilitySettings() {
    const label = { inputProps: { 'aria-label': 'Switch demo' } };
    return (
        <Box>
            <Typography variant="h5">Utility Settings</Typography>
            <Typography variant="body1">Export Limit: </Typography>
            <NumberInput />
            <FormGroup>
                <FormControlLabel control={<Switch />} label="Is Present" />
            </FormGroup>
        </Box>
    );
}
export default UtilitySettings;