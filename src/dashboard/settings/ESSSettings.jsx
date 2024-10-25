import * as React from 'react';
import { Box } from '@mui/material';
import Typography from '@mui/material/Typography';
import NumberInput from '../components/NumberInput';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import { MODULE_TYPES } from '../../constants';
//import Paper from '@mui/material/Paper';
import { useSettings, useSettingsDispatch } from '../../contexts/SettingsContext';

function ESSSettings() {
    const { essModuleCount, essModuleType } = useSettings();
    
    const dispatch = useSettingsDispatch();
    const handleChangeESSModuleCount = (event, value) => {
        console.log("ESS Module Count: ", value);
        dispatch({type: 'SET_ESS_MODULE_COUNT', payload: value});
    }

    const handleChangeModuleType = (event) => {
        const value = event.target.value;

        if (MODULE_TYPES.includes(value)) {
            console.log(value)
            dispatch({type: 'SET_ESS_MODULE_TYPE', payload: value});
        } else {
            console.error("Invalid module type: ", value);
        }
    }
    return (
        //<Paper elevation={4}>
            <Box sx={{textAlign: 'left', padding : 2}}>
                <Typography variant="h5">ESS Settings</Typography>
                <Typography variant="body1">Module Count: </Typography>
                <NumberInput 
                    aria-label="ESS Module Count"
                    placeHolder="ESS Module Count"
                    value={essModuleCount}
                    onChange={handleChangeESSModuleCount}
                />
                <FormControl sx={{ m: 1, minWidth: 150 }} size = "small">
                    <InputLabel id="module-type-label">Module Type</InputLabel>
                    <Select
                        labelId="module-type-label"
                        id="module-type"
                        value={essModuleType}
                        label="Module Type"
                        onChange={handleChangeModuleType}
                    >

                    {MODULE_TYPES.map((module_type) => (
                        <MenuItem key={`${module_type.type}-${module_type.power}-${module_type.energy}`} value={module_type}>
                            {`${module_type.type}: ${module_type.power}kW, ${module_type.energy} kW-hr`}
                            </MenuItem>
                    ))}

                    {/* <MenuItem value={"Grid Stability: 250kW, 144 kW-hr"}>Grid Stability: 250kW, 144 kW-hr</MenuItem>
                    <MenuItem value={"Grid Stability: 500kW, 288 kW-hr"}>Grid Stability: 500kW, 288 kW-hr</MenuItem>
                    <MenuItem value={"Energy Time Shift: 250kW, 288 kW-hr"}>Energy Time Shift: 250kW, 288 kW-hr</MenuItem>
                    <MenuItem value={"Energy Time Shift: 250kW, 1010 kW-hr"}>Energy Time Shift: 250kW, 1010 kW-hr</MenuItem>
                    <MenuItem value={"Energy Time Shift: 1000kW, 1152 kW-hr"}>Energy Time Shift: 1000kW, 1152 kW-hr</MenuItem> */}

                    </Select>
                </FormControl>
            </Box>
        //</Paper>
    );
}
export default ESSSettings;