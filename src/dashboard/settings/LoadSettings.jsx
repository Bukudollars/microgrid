import * as React from 'react';
import { Box } from '@mui/material';
import Typography from '@mui/material/Typography';
import NumberInput from '../components/NumberInput';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';

function LoadSettings() {
    const [loadProfile, setLoadProfile] = React.useState("Commercial");
    const handleChangeLoadProfile = (event) => {
        setLoadProfile(event.target.value);
    }
    return (
        <Box>
            <Typography variant="h5">Load Settings</Typography>
            <Typography variant="body1">Load Peak Level: </Typography>
            <NumberInput />
            <FormControl sx={{ m: 1, minWidth: 150 }} size = "small">
                <InputLabel id="load-profile-label">Load Profile</InputLabel>
                <Select
                    labelId="load-profile-label"
                    id="load-profile"
                    value={loadProfile}
                    label="Load Profile"
                    onChange={handleChangeLoadProfile}
                >
                <MenuItem value={"Commercial"}>Commercial</MenuItem>
                <MenuItem value={"Residential"}>Residential</MenuItem>
                <MenuItem value={"Industrial"}>Industrial</MenuItem>
                <MenuItem value={"Community"}>Community</MenuItem>
                </Select>
            </FormControl>
        </Box>
    );
}
export default LoadSettings;