import * as React from 'react';
import { Paper, Stack, Typography, Box, Tooltip } from '@mui/material';
import { useSimulationState } from '../../contexts/SimulationContext';
import { GEN_CO2_PER_KWH, UTILITY_CO2_PER_KWH, POUNDS_PER_TON } from '../../constants';
import { BarChart } from '@mui/x-charts';

export default function Carbon() {
    const { rollingAverage, currentIndex } = useSimulationState();
    const carbonOutput = (
        (rollingAverage?.[currentIndex]?.genSum ?? 0) * GEN_CO2_PER_KWH 
        + (rollingAverage?.[currentIndex]?.utilitySum ?? 0) * UTILITY_CO2_PER_KWH
        ) / POUNDS_PER_TON;
    const carbonSavings = -(
        (rollingAverage?.[currentIndex]?.pvSum ?? 0) * GEN_CO2_PER_KWH
        + (rollingAverage?.[currentIndex]?.essSum ?? 0) * GEN_CO2_PER_KWH
        ) / POUNDS_PER_TON;
    
    return (
        <Paper elevation={4}>
            <Stack
                direction="row"
                justifyContent="center"
                alignItems="flex-start"
            >
                <Box sx={{textAlign: 'left', padding: 2, margin: 2}}>
                    <Typography variant="h5">Carbon</Typography>
                    <Tooltip title="Emissions" arrow>
                        <Typography variant="body1">(E) {carbonOutput.toFixed(1)} t</Typography>
                    </Tooltip>
                    <Tooltip title="Savings" arrow>
                        <Typography variant="body1">(S) {carbonSavings.toFixed(1)} t</Typography>
                    </Tooltip>
                    <Tooltip title="Net Emissions" arrow>
                        <Typography variant="body1">(N) {(carbonOutput + carbonSavings).toFixed(1)} t</Typography>
                    </Tooltip>
                </Box>
                <Box>
                    <BarChart 
                        width={150}
                        height={200}
                        yAxis={[{
                            // min: 0,
                            // max: Math.max(carbonOutput, carbonSavings),
                            // colorMap: {
                            //     type: 'piecewise',
                            //     thresholds: [0],
                            //     colors: ['red', 'green']
                            // }
                        }]}
                        xAxis={[{scaleType: 'band', disableLine: true, disableTicks: true, data: [""]}]}
                        series={[
                            {data: [carbonOutput], label: "Emissions", valueFormatter: (value) => value ? value.toFixed(0) + " tons" : "0 tons", stack: 'stack1', color: 'red'},
                            {data: [carbonSavings], label: "Savings", valueFormatter: (value) => value ? value.toFixed(0) + " tons" : "0 tons", stack: 'stack1', color: 'green'},
                            
                            
                        ]}
                        slotProps={{ legend: { hidden: true } }}
                    />
                </Box>
                
            </Stack>
        </Paper>
        
    );
}