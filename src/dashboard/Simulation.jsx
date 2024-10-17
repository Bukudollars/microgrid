import * as React from 'react';
import { Box, ButtonGroup, Button, Typography, Slider, Tooltip } from '@mui/material';
import { PlayArrow, Pause, Replay } from '@mui/icons-material';
import YieldDistribution from './simulation/YieldDistribution';
import Load from './simulation/Load';
import Utility from './simulation/Utility';
import Gen from './simulation/Gen';
import PV from './simulation/PV';
import ESS from './simulation/ESS';
import Grid from '@mui/material/Grid2';
import SimulationResults from './simulation/SimulationResults';
import { useSimulationDispatch, useSimulationState } from '../contexts/SimulationContext';
import { HOURS_PER_HOUR, MINUTES_PER_HOUR } from '../constants';

function Simulation() {
    const { simulationData, loading, currentIndex } = useSimulationState();
    const { startSimulation, setCurrentIndex } = useSimulationDispatch();

    const [variables, setVariables] = React.useState({
        utilityExportLimit: 200,
        singleESSEnergy: 144,
        singleESSPeakPower: 250,
        essModuleCount: 2,
        peakLoad: 800,
        totalFeederBreakers: 4,
        utility: true,
        peakPVPower: 1000,
        cloudingFactor: 1,
        singleGensetPower: 500,
        gensetCount: 4,
        granularity: MINUTES_PER_HOUR,
        simulationTime: 60,
    });

    const handleStart = () => {
        startSimulation(variables);
    };

    const handleSliderChange = (event, newValue) => {
        setCurrentIndex(newValue);
    }

    return (
        <Box sx={{margin: 2}}>
            <Box>
                <Slider 
                    value={typeof currentIndex === 'number' ? currentIndex : 0}
                    aria-labelledby='time-slider'
                    valueLabelDisplay='on'
                    min={0}
                    max={simulationData.length - 1}
                    onChange={handleSliderChange}
                    disabled={loading || simulationData.length === 0}
                />
            </Box>
            <Box>
                <ButtonGroup>
                    <Button disabled={loading || simulationData.length === 0}><PlayArrow /></Button>
                    <Button disabled={loading || simulationData.length === 0}><Pause /></Button>
                    <Tooltip title="Restart Simulation" arrow>
                        <Button onClick={handleStart}><Replay /></Button>
                    </Tooltip>
                </ButtonGroup>
                
            </Box>
            <Typography variant="body">Day: {Math.floor(currentIndex / (60 * 24))} Time: {String(Math.floor(currentIndex / 60) % 24).padStart(2, '0')}:{String(currentIndex % 60).padStart(2, '0')}</Typography>
            <Grid container spacing={2}>
                <Grid size={12}>
                    <YieldDistribution />
                </Grid>
                <Grid size='auto'>
                    <Load />
                </Grid>
                <Grid size='auto'>
                    <Utility />
                </Grid>
                <Grid size='auto'>
                    <Gen />
                </Grid>
                <Grid size='auto'>
                    <PV />
                </Grid>
                <Grid size='auto'>
                    <ESS />
                </Grid>
            </Grid>
        </Box>
    );
}
export default Simulation;