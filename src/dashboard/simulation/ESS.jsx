import * as React from 'react';
import { Box, Tooltip, Paper, Stack } from '@mui/material';
import Typography from '@mui/material/Typography';
import { useSimulationState } from '../../contexts/SimulationContext';
import { BarChart } from '@mui/x-charts/BarChart';

function ESS() {
    const { simulationData, loading, currentIndex, peakESSPower } = useSimulationState();
    const validData = simulationData.length > 0 && currentIndex < simulationData.length && !loading;
    const realLoad =  validData ? simulationData[currentIndex].essRealPowerContribution : 0;
    const reactiveLoad = validData ? simulationData[currentIndex].essReactivePowerContribution : 0;
    const powerFactor = validData ? simulationData[currentIndex].essPowerFactor : 0;
    const essCharge = validData ? simulationData[currentIndex].remainingESSEnergy / simulationData[currentIndex].totalESSEnergy: 0;

    return (
        <Paper elevation={4}>
            <Stack
                direction="row"
                justifyContent="center"
                alignItems="flex-start"
            >
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
                    <Tooltip title="ESS Charge" arrow>
                        <Typography variant="body1">Charge: {(essCharge * 100).toFixed(0)}%</Typography>
                    </Tooltip>
                </Box>
                <Box>
                    <BarChart
                        width={150}
                        height={200}
                        yAxis={[{
                            min: -peakESSPower, 
                            max: peakESSPower,
                            colorMap: {
                                type: 'piecewise',
                                thresholds: [0],
                                colors: ['green', 'red']
                        }}]}
                        xAxis={[{scaleType: 'band', disableLine: true, disableTicks: true, data: [""]}]}
                        series={[{data: [realLoad]}]}
                    />
                </Box>
            </Stack>
            
        </Paper>
    );
}
export default ESS;