import * as React from 'react';
import { Box, Paper, Tooltip, Stack } from '@mui/material';
import Typography from '@mui/material/Typography';
import { useSimulationState } from '../../contexts/SimulationContext';
import { BarChart } from '@mui/x-charts/BarChart';

function Gen() {
    const { simulationData, currentIndex, gensetCount, peakGensetPower } = useSimulationState();
    //const validData = simulationData.length > 0 && currentIndex < simulationData.length && !loading;
    const realLoad =  simulationData?.[currentIndex]?.gensetRealPowerContribution ?? 0;
    const reactiveLoad = simulationData?.[currentIndex]?.gensetReactivePowerContribution ?? 0;
    const powerFactor = simulationData?.[currentIndex]?.gensetPowerFactor ?? 0;
    const gensetsRequired = simulationData?.[currentIndex]?.gensetsRequired ?? 0;

    return (
        <Paper elevation={4}>
            <Stack
                direction="row"
                justifyContent="center"
                alignItems="flex-start"
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
                        series={[{data: [realLoad], label: "Real Load", valueFormatter: (value) => value ? value.toFixed(0) + " kW" : "0 kW"}]}
                        slotProps={{ legend: { hidden: true } }}
                    />
                </Box>
            </Stack>
            
        </Paper>
    );
}
export default Gen;