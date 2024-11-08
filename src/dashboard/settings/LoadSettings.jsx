import * as React from 'react';
import { Box } from '@mui/material';
import Typography from '@mui/material/Typography';
import NumberInput from '../components/NumberInput';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import { useSettings, useSettingsDispatch } from '../../contexts/SettingsContext';
import { LOAD_PROFILE_OPTIONS } from '../../constants';

function LoadSettings({loadPeakLevel, setLoadPeakLevel, loadProfile, setLoadProfile}) {

    const handleChangeLoadPeakLevel = (event, value) => {
        setLoadPeakLevel(value)
    }

    const handleChangeLoadProfile = (event) => {
        const value = event.target.value;
        setLoadProfile(value)
    }
    
    return (
        //<Paper elevation={4}>
            <Box sx={{textAlign: 'left',  padding : 2}}>
                <Typography variant="h5">Load Settings</Typography>
                <Typography variant="body1">Load Peak Level: </Typography>
                <NumberInput 
                    aria-label="Load Peak Level"
                    placeholder="Load Peak Level"
                    value={loadPeakLevel}
                    onChange={handleChangeLoadPeakLevel}
                />
                <FormControl sx={{ m: 1, minWidth: 150 }} size = "small">
                    <InputLabel id="load-profile-label">Load Profile</InputLabel>
                    <Select
                        labelId="load-profile-label"
                        id="load-profile"
                        value={loadProfile}
                        label="Load Profile"
                        onChange={handleChangeLoadProfile}
                    >

                    {LOAD_PROFILE_OPTIONS.map((load_profile_type) => (
                        <MenuItem key={load_profile_type} value={load_profile_type}>{load_profile_type}</MenuItem>
                    ))}

                    {/* <MenuItem value={"Commercial"}>Commercial</MenuItem>
                    <MenuItem value={"Residential"}>Residential</MenuItem>
                    <MenuItem value={"Industrial"}>Industrial</MenuItem>
                    <MenuItem value={"Community"}>Community</MenuItem> */}

                    </Select>
                </FormControl>
            </Box>
        //</Paper>
    );
}
export default LoadSettings;