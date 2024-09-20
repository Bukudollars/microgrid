import * as React from 'react';
import { Box } from '@mui/material';
import Typography from '@mui/material/Typography';
import NumberInputBasic from '../components/NumberInput';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';

function ESSSettings() {
    const [moduleType, setModuleType] = React.useState("Grid Stability: 250kW, 144 kW-hr");
    const handleChangeModuleType = (event) => {
        setModuleType(event.target.value);
    }
    return (
        <Paper elevation={4}>
            <Box sx={{padding : 2}}>
            
                <Typography variant="h5">ESS Settings</Typography>
                <Typography variant="body1">Module Count: </Typography>
                <NumberInputBasic />
                <FormControl sx={{ m: 1, minWidth: 150 }} size = "small">
                    <InputLabel id="module-type-label">Module Type</InputLabel>
                    <Select
                        labelId="module-type-label"
                        id="module-type"
                        value={moduleType}
                        label="Module Type"
                        onChange={handleChangeModuleType}
                    >
                    <MenuItem value={"Grid Stability: 250kW, 144 kW-hr"}>Grid Stability: 250kW, 144 kW-hr</MenuItem>
                    <MenuItem value={"Grid Stability: 500kW, 288 kW-hr"}>Grid Stability: 500kW, 288 kW-hr</MenuItem>
                    <MenuItem value={"Energy Time Shift: 250kW, 288 kW-hr"}>Energy Time Shift: 250kW, 288 kW-hr</MenuItem>
                    <MenuItem value={"Energy Time Shift: 250kW, 1010 kW-hr"}>Energy Time Shift: 250kW, 1010 kW-hr</MenuItem>
                    <MenuItem value={"Energy Time Shift: 1000kW, 1152 kW-hr"}>Energy Time Shift: 1000kW, 1152 kW-hr</MenuItem>
                    </Select>
                </FormControl>
            

            </Box>
        </Paper>
    );
}
export default ESSSettings;