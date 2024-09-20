import * as React from 'react';
import { Box, Paper, Tooltip } from '@mui/material';
import Typography from '@mui/material/Typography';

function Gen() {
    return (
        <Paper elevation={4}>
            <Box sx={{textAlign: 'left', padding: 2, margin: 2}}>
                <Typography variant="h5">Gen</Typography>
                <Tooltip title="Real Load" arrow>
                    <Typography variant="body1">(P) 135 kW</Typography>
                </Tooltip>
                <Tooltip title="Reactive Load" arrow>
                    <Typography variant="body1">(Q) 0.00 kVAr 1/5</Typography>
                </Tooltip>
                <Tooltip title="Power Factor" arrow>
                    <Typography variant="body1">(PF) 0.00</Typography>
                </Tooltip>
                {/* <img src="./gen.png" alt="Gen placeholder" /> */}
            </Box>
        </Paper>
    );
}
export default Gen;