import * as React from 'react';
import { Box, Tooltip, Paper } from '@mui/material';
import Typography from '@mui/material/Typography';
import { useSimulationState } from '../../contexts/SimulationContext';

function ESS() {
    const { simulationData, loading, currentIndex } = useSimulationState();
    const validData = simulationData.length > 0 && currentIndex < simulationData.length && !loading;
    const realLoad =  validData ? simulationData[currentIndex].essRealPowerContribution : 0;
    const reactiveLoad = validData ? simulationData[currentIndex].essReactivePowerContribution : 0;
    const powerFactor = validData ? simulationData[currentIndex].essPowerFactor : 0;

    return (
        <Paper elevation={4}>
            <Box sx={{textAlign: 'left', padding: 2, margin: 2}}>
                <Typography variant="h5">ESS</Typography>
                <Tooltip title="Real Load" arrow>
                        <Typography variant="body1">(P) {realLoad.toFixed(0)} kW</Typography>
                    </Tooltip>
                    <Tooltip title="Reactive Load" arrow>
                        <Typography variant="body1">(Q) {reactiveLoad.toFixed(0)} kVAr</Typography>
                    </Tooltip>
                    <Tooltip title="Power Factor" arrow>
                        <Typography variant="body1">(PF) {powerFactor.toFixed(2)}</Typography>
                    </Tooltip>
                {/* <img src="./ess.png" alt="ESS placeholder" /> */}
            </Box>
        </Paper>
    );
}
export default ESS;