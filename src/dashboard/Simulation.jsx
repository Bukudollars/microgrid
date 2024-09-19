import * as React from 'react';
import { Box } from '@mui/material';
import Typography from '@mui/material/Typography';
import YieldDistribution from './simulation/YieldDistribution';

function Simulation() {
    return (
        <Box>
            <Typography variant="h1">Simulation</Typography>
            <img src="./simulation.png" alt="Simulation placeholder" />
            <YieldDistribution />
            <Typography variant="h5">Load</Typography>
            <Typography variant="h5">Utility</Typography>
            <Typography variant="h5">Gen</Typography>
            <Typography variant="h5">PV</Typography>
            <Typography variant="h5">ESS</Typography>
        </Box>
    );
}
export default Simulation;