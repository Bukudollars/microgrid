import * as React from 'react';
import { Box } from '@mui/material';
import Typography from '@mui/material/Typography';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import NumberInput from '../components/NumberInput';
//import Paper from '@mui/material/Paper';
import { useSettings, useSettingsDispatch } from '../../SettingsContext';

function SiteSettings() {
    const [frequency, setFrequency] = React.useState(60);
    const handleChangeFrequency = (event) => {
        setFrequency(event.target.value);
    }
    const { siteVAC } = useSettings();
    const dispatch = useSettingsDispatch();
    const handleChangeSiteVAC = (event, value) => {
        console.log("Site VAC: ", value);
        dispatch({type: 'SET_SITE_VAC', payload: value});
    }
    return (
        //<Paper elevation={4}>
            <Box sx={{textAlign: 'left', padding : 2}}>
                <Typography variant="h5">Site Settings</Typography>
                <FormControl sx={{ m: 1, minWidth: 150 }} size = "small">
                    <InputLabel id="frequency-label">Frequency</InputLabel>
                    <Select
                        labelId="frequency-label"
                        id="frequency"
                        value={frequency}
                        label="Frequency"
                        onChange={handleChangeFrequency}
                    >
                    <MenuItem value={60}>60 Hz</MenuItem>
                    <MenuItem value={50}>50 Hz</MenuItem>
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
        //</Paper>
    );
}
export default SiteSettings;