import * as React from 'react';
import { Box, Tooltip } from '@mui/material';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';

function Load() {
    return (
        <Paper elevation={4}>
        <Box sx={{textAlign: 'left', margin: 2, padding: 2}}>
            <Typography variant="h5">Load</Typography>
            <Tooltip title="Real Load" arrow>
                <Typography variant="body1">(P) 776 kW</Typography>
            </Tooltip>
            <Tooltip title="Reactive Load" arrow>
                <Typography variant="body1">(Q) 444 kVAR 4/4</Typography>
            </Tooltip>
            <Tooltip title="Power Factor" arrow>
                <Typography variant="body1">(PF) 0.87</Typography>
            </Tooltip>
            {/* <img src="./load.png" alt="Load placeholder" /> */}
        </Box>
        </Paper>
    );
}
export default Load;