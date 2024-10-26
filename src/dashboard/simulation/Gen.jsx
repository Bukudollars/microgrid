import * as React from 'react';
import { Box, Paper, Tooltip, Stack } from '@mui/material';
import Typography from '@mui/material/Typography';
import { useSimulationState } from '../../contexts/SimulationContext';
import { BarChart } from '@mui/x-charts/BarChart';

function Gen() {
    const { simulationData, loading, currentIndex, gensetCount, peakGensetPower } = useSimulationState();
    const validData = simulationData.length > 0 && currentIndex < simulationData.length && !loading;
    const realLoad =  validData ? simulationData[currentIndex].gensetRealPowerContribution : 0;
    const reactiveLoad = validData ? simulationData[currentIndex].gensetReactivePowerContribution : 0;
    const powerFactor = validData ? simulationData[currentIndex].gensetPowerFactor : 0;
    const gensetsRequired = validData ? simulationData[currentIndex].gensetsRequired : 0;

    return (
        <Paper elevation={4}>
            <Stack
                direction="row"
                justifyContent="center"
                alignItems="center"
            >
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
                        <Typography variant="body1">Gensets: {gensetsRequired} / {gensetCount}</Typography>
                    </Tooltip>
                    {/* <img src="./gen.png" alt="Gen placeholder" /> */}
                </Box>
                <Box>
                    <BarChart
                        width={150}
                        height={200}
                        yAxis={[{max: peakGensetPower}]}
                        xAxis={[{scaleType: 'band', disableLine: true, disableTicks: true, data: [""]}]}
                        series={[{data: [realLoad]}]}
                    />
                </Box>
            </Stack>
            
        </Paper>
    );
}
export default Gen;