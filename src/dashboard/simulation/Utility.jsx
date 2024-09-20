import * as React from 'react';
import { Box, Tooltip } from '@mui/material';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';

function Utility() {
    return (
        <Paper elevation={4}>
            <Box sx={{textAlign: 'left', margin: 2, padding: 2}}>
                <Typography variant="h5">Utility</Typography>
                <Tooltip title="Real Load" arrow>
                    <Typography variant="body1">(P) 0.00</Typography>
                </Tooltip>
                <Tooltip title="Reactive Load" arrow>
                    <Typography variant="body1">(Q) 0.00</Typography>
                </Tooltip>
                <Tooltip title="Power Factor" arrow>
                    <Typography variant="body1">(PF) 0.00</Typography>
                </Tooltip>
                {/* <img src="./utility.png" alt="Utility placeholder" /> */}
            </Box>
        </Paper>
    );
}
export default Utility;