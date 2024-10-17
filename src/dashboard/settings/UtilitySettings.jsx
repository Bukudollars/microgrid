import * as React from 'react';
import { Box } from '@mui/material';
import Typography from '@mui/material/Typography';
import NumberInput from '../components/NumberInput';
import Switch from '@mui/material/Switch';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Paper from '@mui/material/Paper';
import { useSettings, useSettingsDispatch } from '../../contexts/SettingsContext';

function UtilitySettings() {
    const { exportLimit } = useSettings();
    const dispatch = useSettingsDispatch();
    const handleChangeExportLimit = (event, value) => {
        console.log("Export Limit: ", value);
        dispatch({type: 'SET_EXPORT_LIMIT', payload: value});
    }
    const label = { inputProps: { 'aria-label': 'Switch demo' } };
    return (
        //<Paper elevation={4}>
            <Box sx={{textAlign: 'left', padding : 2}}>
                <Typography variant="h5">Utility Settings</Typography>
                <Typography variant="body1">Export Limit: </Typography>
                <NumberInput 
                    aria-label="Export Limit"
                    placeholder="Export Limit"
                    value={exportLimit}
                    onChange={handleChangeExportLimit}
                />
                <FormGroup>
                    <FormControlLabel control={<Switch />} label="Is Present" />
                </FormGroup>
            </Box>
        //</Paper>
    );
}
export default UtilitySettings;