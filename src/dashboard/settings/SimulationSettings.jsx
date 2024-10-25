import * as React from 'react';
import { Box, Typography } from '@mui/material';
import NumberInput from '../components/NumberInput';
import { MIN_SIMULATION_TIME, MAX_SIMULATION_TIME } from '../../constants/simulationConstants';
import { useSettings, useSettingsDispatch } from '../../contexts/SettingsContext';

export default function SimulationSettings() {
    const { simulationTime } = useSettings();
    const dispatch = useSettingsDispatch();
    const handleChangeSimulationTime = (event, value) => {
        console.log("Simulation Time: ", value);
        dispatch({type: 'SET_SIMULATION_TIME', payload: value});
    }
    return (
        <Box sx={{textAlign: 'left', padding: 2}}>
            <Typography variant='h5'>Simulation Settings</Typography>
            <Typography variant='body1'>Simulation Days:</Typography>
            <NumberInput
                min={MIN_SIMULATION_TIME}
                max={MAX_SIMULATION_TIME}
                aria-label='Simulation Time'
                placeholder='Simulation Time'
                value={simulationTime}
                onChange={handleChangeSimulationTime}
            />
        </Box>
    );
}