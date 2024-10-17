import * as React from 'react';
import { Box, ButtonGroup, Button, Typography } from '@mui/material';
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
    const { simulationData, loading } = useSimulationState();
    const { startSimulation } = useSimulationDispatch();

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

    return (
        <Box sx={{margin: 2}}>
            <Box>
                <ButtonGroup>
                    <Button onClick={handleStart} disabled={loading}><PlayArrow /></Button>
                    <Button><Pause /></Button>
                    <Button><Replay /></Button>
                </ButtonGroup>
            </Box>
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