import * as React from 'react';
import { Box } from '@mui/material';
import Typography from '@mui/material/Typography';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import NumberInput from '../components/NumberInput';
//import Paper from '@mui/material/Paper';
import { useSettings, useSettingsDispatch } from '../../contexts/SettingsContext';
import { SITE_FREQUENCY_OPTIONS } from '../../constants/siteConstants';

function SiteSettings({siteVAC, setSiteVAC, siteFrequency, setSiteFrequency}) {
    // const { siteVAC, siteFrequency } = useSettings();
    // const dispatch = useSettingsDispatch();

    const handleChangeFrequency = (event) => {
        const value = parseInt(event.target.value, 10);
        // if (SITE_FREQUENCY_OPTIONS.includes(value)) {
        //     console.log("Site Frequency: ", value);
        //     dispatch({type: 'SET_SITE_FREQUENCY', payload: value});
        // } else {
        //     console.error("Invalid site frequency: ", value);
        // }
        setSiteFrequency(value)
    }
    const handleChangeSiteVAC = (event, value) => {
        // console.log("Site VAC: ", value);
        // dispatch({type: 'SET_SITE_VAC', payload: value});
        setSiteVAC(value)
    }
    return (
        <Box sx={{textAlign: 'left', padding : 2}}>
            <Typography variant="h5">Site Settings</Typography>
            <FormControl sx={{ m: 1, minWidth: 150 }} size = "small">
                <InputLabel id="frequency-label">Frequency</InputLabel>
                <Select
                    labelId="frequency-label"
                    id="frequency"
                    value={siteFrequency}
                    label="Frequency"
                    onChange={handleChangeFrequency}
                >
                    {SITE_FREQUENCY_OPTIONS.map((option) => (
                        <MenuItem key={option} value={option}>{option} Hz</MenuItem>
                    ))}
                </Select>
            </FormControl>
            <Typography variant="body1">VAC: </Typography>
            <NumberInput 
                aria-label="Site VAC"
                placeholder="Site VAC"
                value={siteVAC}
                onChange={handleChangeSiteVAC}
            />
        </Box>
    );
}
export default SiteSettings;
