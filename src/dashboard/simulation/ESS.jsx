import * as React from 'react';
import { Box, Tooltip, Paper } from '@mui/material';
import Typography from '@mui/material/Typography';

function ESS() {
    return (
        <Paper elevation={4}>
            <Box sx={{textAlign: 'left', padding: 2, margin: 2}}>
                <Typography variant="h5">ESS</Typography>
                <Tooltip title="Real Load" arrow>
                        <Typography variant="body1">(P) 446 kW</Typography>
                    </Tooltip>
                    <Tooltip title="Reactive Load" arrow>
                        <Typography variant="body1">(Q) 0.00 kVAr</Typography>
                    </Tooltip>
                    <Tooltip title="Power Factor" arrow>
                        <Typography variant="body1">(PF) 1 56.96%</Typography>
                    </Tooltip>
                {/* <img src="./ess.png" alt="ESS placeholder" /> */}
            </Box>
        </Paper>
    );
}
export default ESS;