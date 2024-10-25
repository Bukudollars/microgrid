import * as React from 'react';
import { Box, Paper, Tooltip } from '@mui/material';
import Typography from '@mui/material/Typography';
import { useSimulationState } from '../../contexts/SimulationContext';

function Gen() {
    const { simulationData, loading, currentIndex, gensetCount } = useSimulationState();
    const validData = simulationData.length > 0 && currentIndex < simulationData.length && !loading;
    const realLoad =  validData ? simulationData[currentIndex].gensetRealPowerContribution : 0;
    const reactiveLoad = validData ? simulationData[currentIndex].gensetReactivePowerContribution : 0;
    const powerFactor = validData ? simulationData[currentIndex].gensetPowerFactor : 0;
    const gensetsRequired = validData ? simulationData[currentIndex].gensetsRequired : 0;

    return (
        <Paper elevation={4}>
            <Box sx={{textAlign: 'left', padding: 2, margin: 2}}>
                <Typography variant="h5">Gen</Typography>
                <Tooltip title="Real Load" arrow>
                    <Typography variant="body1">(P) {realLoad.toFixed(0)} kW</Typography>
                </Tooltip>
                <Tooltip title="Reactive Load" arrow>
                    <Typography variant="body1">(Q) {reactiveLoad.toFixed(0)} kVAr</Typography>
                </Tooltip>
                <Tooltip title="Power Factor" arrow>
                    <Typography variant="body1">(PF) {powerFactor.toFixed(2)}</Typography>
                </Tooltip>
                <Tooltip title="Gensets Required" arrow>
                    <Typography variant="body1">Gensets Required: {gensetsRequired} / {gensetCount}</Typography>
                </Tooltip>
                {/* <img src="./gen.png" alt="Gen placeholder" /> */}
            </Box>
        </Paper>
    );
}
export default Gen;