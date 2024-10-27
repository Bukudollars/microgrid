import * as React from 'react';
import { Box, Paper, Tooltip, Stack } from '@mui/material';
import Typography from '@mui/material/Typography';
import { useSimulationState } from '../../contexts/SimulationContext';
import { BarChart } from '@mui/x-charts/BarChart';

function PV() {
    const { simulationData, loading, currentIndex, peakPVPower } = useSimulationState();
    // const validData = simulationData.length > 0 && currentIndex < simulationData.length && !loading;
    const realLoad =  simulationData?.[currentIndex]?.providedPVPower ?? 0;
    const reactiveLoad = 0;
    const powerFactor = 1;
    
    return (
        <Paper elevation={4}>
            <Stack
                direction="row"
                justifyContent="center"
                alignItems="flex-start"
            >
                <Box sx={{margin: 2, padding: 2, textAlign: 'left'}}>
                    <Typography variant="h5">PV</Typography>
                    <Tooltip title="Real Load" arrow>
                        <Typography variant="body1">(P) {realLoad.toFixed(0)}</Typography>
                    </Tooltip>
                    <Tooltip title="Reactive Load" arrow>
                        <Typography variant="body1">(Q) {reactiveLoad} kVAr</Typography>
                    </Tooltip>
                    <Tooltip title="Power Factor" arrow>
                        <Typography variant="body1">(PF) {powerFactor}</Typography>
                    </Tooltip>
                    {/* <img src="./pv.png" alt="PV placeholder" /> */}
                </Box>
                <Box>
                    <BarChart
                        width={150}
                        height={200}
                        yAxis={[{max: peakPVPower}]}
                        xAxis={[{scaleType: 'band', disableLine: true, disableTicks: true, data: [""]}]}
                        series={[{data: [realLoad], label: "Real Load", valueFormatter: (value) => value ? value.toFixed(0) + " kW" : "0 kW"}]}
                        slotProps={{ legend: { hidden: true } }}
                    />
                </Box>
            </Stack>
        </Paper>
    );
}

export default PV;