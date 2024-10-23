import * as React from 'react';
import { Box, Paper, Tooltip } from '@mui/material';
import Typography from '@mui/material/Typography';
import { useSimulationState } from '../../contexts/SimulationContext';

function PV() {
    const { simulationData, loading, currentIndex } = useSimulationState();
    const validData = simulationData.length > 0 && currentIndex < simulationData.length && !loading;
    const realLoad =  validData ? simulationData[currentIndex].providedPVPower : 0;
    const reactiveLoad = 0;
    const powerFactor = 1;
    
    return (
        <Paper elevation={4}>
            <Box sx={{margin: 2, padding: 2, textAlign: 'left'}}>
                <Typography variant="h5">PV</Typography>
                <Tooltip title="Real Load" arrow>
                    <Typography variant="body1">(P) {realLoad.toFixed(0)}</Typography>
                </Tooltip>
                <Tooltip title="Reactive Load" arrow>
                    <Typography variant="body1">(Q) {reactiveLoad} kVAr 16/16</Typography>
                </Tooltip>
                <Tooltip title="Power Factor" arrow>
                    <Typography variant="body1">(PF) {powerFactor}</Typography>
                </Tooltip>
                {/* <img src="./pv.png" alt="PV placeholder" /> */}
            </Box>
        </Paper>
    );
}

export default PV;