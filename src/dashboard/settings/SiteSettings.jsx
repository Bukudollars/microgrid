import * as React from 'react';
import { Box } from '@mui/material';
import Typography from '@mui/material/Typography';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import NumberInput from '../components/NumberInput';

function SiteSettings() {
    const [frequency, setFrequency] = React.useState(60);
    const handleChangeFrequency = (event) => {
        setFrequency(event.target.value);
    }
    return (
        <Box>
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
            <NumberInput />
        </Box>
    );
}
export default SiteSettings;