import * as React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { Link } from 'react-router-dom';

export default function Home() {
    return (
        <Box
            sx={{
                flex: 'center',
                width: '100%',
                height: '100%',
                padding: 4,
            }}
        >
            <Typography variant='h3' marginBottom={2}>Microgrid Simulator</Typography>
            <Typography variant='h5' align='center'>Welcome to the Microgrid Simulator!</Typography>
            <Typography variant='body1' align='center' paddingX={6}>
                This application is a simulation tool for microgrid systems. 
                There are several components that can be configured and simulated, 
                including generators, photovoltaic systems, energy storage systems, loads, and the utility grid. 
                The simulation results can be viewed in real-time on the simulation page.
            </Typography>
            <Box paddingTop={2} sx={{userSelect: 'none'}}>
                <Grid container spacing={{xs: 2, md: 3}} columns={{ xs: 4, sm: 8, md: 12}}justifyContent={'center'}>
                    <Grid size={{ xs: 2, sm: 4, md: 4}}>
                        <Link to="/simulation">
                            <Box>
                                <Paper>
                                    <Typography variant='h6'>Simulation</Typography>
                                    <Typography variant='body2'>Run Microgrid Simulation</Typography>
                                    <img src="./simulation.png" alt="Simulation Thumnail" width={'100%'}/>
                                </Paper>
                            </Box>
                        </Link>
                    </Grid>
                </Grid>

            </Box>

        </Box>
    );
};