import * as React from 'react';
import { Box, Typography, Paper, Button } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { useNavigate } from 'react-router-dom';

export default function Home() {
    const navigate = useNavigate();
    return (
        <Box
            sx={{
                flex: 'center',
                width: '100%',
                height: '100%',
                padding: 4,
            }}
        >
            <Typography variant='h3' marginBottom={2} align='center'>Microgrid Simulator</Typography>
            <Typography variant='h5' align='center'>Welcome to the Microgrid Simulator!</Typography>
            <Typography variant='body1' align='center' paddingX={6}>
                This application is a simulation tool for microgrid systems. 
                There are several components that can be configured and simulated, 
                including generators, photovoltaic systems, energy storage systems, loads, and the utility grid. 
                The simulation results can be viewed in real-time on the simulation page.
            </Typography>
            <Box paddingTop={2} 
                sx={{userSelect: 'none'}}
            >
                <Grid container spacing={{xs: 2, md: 3}} columns={{ xs: 4, sm: 8, md: 12}}justifyContent={'center'}>
                    <Grid size={{ xs: 2, sm: 4, md: 4}}>
                        <Button
                            onClick={() => navigate('/simulation')}
                            sx={{width: '100%'}}
                        >
                            <Box>
                                <Paper>
                                    <Typography variant='h6'>Simulation</Typography>
                                    <Typography variant='body2'>Run Microgrid Simulation</Typography>
                                    <img src="./simulation.png" alt="Simulation Thumnail" width={'100%'}/>
                                </Paper>
                            </Box>
                        </Button>
                            
                    </Grid>
                    <Grid size={{ xs: 2, sm: 4, md: 4}}>
                        <Button
                            onClick={() => navigate('/settings')}
                            sx={{width: '100%'}}
                        >
                            <Box>
                                <Paper>
                                    <Typography variant='h6'>Settings</Typography>
                                    <Typography variant='body2'>Modify Simulation Settings</Typography>
                                    <img src="./settings.png" alt="Settings Thumnail" width={'100%'}/>
                                </Paper>
                            </Box>
                        </Button>
                            
                    </Grid>
                </Grid>

            </Box>

        </Box>
    );
};