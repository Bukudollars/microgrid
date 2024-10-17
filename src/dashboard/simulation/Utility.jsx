import * as React from 'react';
import { Box, Tooltip } from '@mui/material';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { useSimulationState } from '../../contexts/SimulationContext';

function Utility() {
    const { simulationData, loading, currentIndex } = useSimulationState();
    const validData = simulationData.length > 0 && currentIndex < simulationData.length && !loading;
    const realLoad =  validData ? simulationData[currentIndex].utilityRealPowerContribution : 0;
    const reactiveLoad = validData ? simulationData[currentIndex].utilityReactivePowerContribution : 0;
    const powerFactor = validData ? simulationData[currentIndex].utilityPowerFactor : 0;
    return (
        <Paper elevation={4}>
            <Box sx={{textAlign: 'left', margin: 2, padding: 2}}>
                <Typography variant="h5">Utility</Typography>
                <Tooltip title="Real Load" arrow>
                    <Typography variant="body1">(P) {realLoad.toFixed(0)}</Typography>
                </Tooltip>
                <Tooltip title="Reactive Load" arrow>
                    <Typography variant="body1">(Q) {reactiveLoad.toFixed(0)}</Typography>
                </Tooltip>
                <Tooltip title="Power Factor" arrow>
                    <Typography variant="body1">(PF) {powerFactor.toFixed(2)}</Typography>
                </Tooltip>
                {/* <img src="./utility.png" alt="Utility placeholder" /> */}
            </Box>
        </Paper>
    );
}
export default Utility;