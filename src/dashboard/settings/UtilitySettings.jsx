import * as React from 'react';
import { Box } from '@mui/material';
import Typography from '@mui/material/Typography';
import NumberInput from '../components/NumberInput';
import Switch from '@mui/material/Switch';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useSettings, useSettingsDispatch } from '../../contexts/SettingsContext';

function UtilitySettings({exportLimit, setExportLimit, isPresent, setIsPresent}) {

    const handleChangeExportLimit = (event, value) => {
        setExportLimit(value)
    };

    const handleIsPresentChange = (event) => {
        const value = event.target.checked;
        setIsPresent(value)
    };

    return (
        <Box sx={{ textAlign: 'left', padding: 2 }}>
            <Typography variant="h5">Utility Settings</Typography>
            <Typography variant="body1">Export Limit: </Typography>
            <NumberInput
                aria-label="Export Limit"
                placeholder="Export Limit"
                value={exportLimit}
                onChange={handleChangeExportLimit}
            />
            <FormGroup>
                <FormControlLabel
                    control={<Switch checked={isPresent} onChange={handleIsPresentChange} />}
                    label="Is Present"
                />
            </FormGroup>
        </Box>
    );
}

export default UtilitySettings;
