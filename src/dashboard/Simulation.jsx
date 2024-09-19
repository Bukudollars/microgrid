import * as React from 'react';
import { Box } from '@mui/material';
import YieldDistribution from './simulation/YieldDistribution';
import Load from './simulation/Load';
import Utility from './simulation/Utility';
import Gen from './simulation/Gen';
import PV from './simulation/PV';
import ESS from './simulation/ESS';
import Grid from '@mui/material/Grid2';

function Simulation() {
    return (
        <Box>
            <Grid container spacing={2}>
                <Grid size={12}>
                    <YieldDistribution />
                </Grid>
                <Grid item xs={6}>
                    <Load />
                </Grid>
                <Grid item xs={6}>
                    <Utility />
                </Grid>
                <Grid item xs={6}>
                    <Gen />
                </Grid>
                <Grid item xs={6}>
                    <PV />
                </Grid>
                <Grid item xs={6}>
                    <ESS />
                </Grid>
            </Grid>
        </Box>
    );
}
export default Simulation;