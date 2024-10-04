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
import useSimulation from '../hooks/useSimulation';

function Simulation() {
    const { data, loading, startSimulation } = useSimulation();
    const handleStart = () => {
        const initialVariables = {};
        startSimulation(initialVariables);
    };
    return (
        <Box sx={{margin: 2}}>
            <Box>
                <ButtonGroup>
                    <Button onClick={handleStart}><PlayArrow /></Button>
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
            <Box>
                {loading? (
                    <Typography variant="body1">Loading...</Typography>
                ) : (
                    <SimulationResults data={data} />
                )}
                
            </Box>
        </Box>
    );
}
export default Simulation;