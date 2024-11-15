import * as React from 'react';
import { Box, Stack, Paper, Tooltip } from '@mui/material';
import Typography from '@mui/material/Typography';
import GasMeterIcon from '@mui/icons-material/GasMeter';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import { Gauge, gaugeClasses } from '@mui/x-charts/Gauge'
import { BarChart } from '@mui/x-charts/BarChart';
import { useSimulationState } from '../../contexts/SimulationContext';
import isTouch from '../../hooks/isTouch';

function OperationSavings({width, height}) {
    const isTouchDevice = isTouch();

    const { simulationData, rollingAverage, currentIndex } = useSimulationState();

    const operation_savings = 10.00;


    return (
        <Paper elevation={4} sx={{width: width || '100%'}}>
            <Stack
                direction="row"
                justifyContent="center"
                alignItems="flex-start"
            >
                <Box sx={{textAlign: 'left', padding: 2, margin: 2}}>
                    <Typography variant="h5">Operating <br/> Savings</Typography>
                    <br/>
                    <Tooltip title="Operation Savings" arrow>
                        <Typography variant="body1">(S)  {operation_savings.toFixed(2)} $</Typography>
                    </Tooltip>
                </Box>
                <Box>
                    <BarChart 
                        width={150}
                        height={200}
                        yAxis={[{}]}
                        xAxis={[{scaleType: 'band', disableLine: true, disableTicks: true, data: [""]}]}
                        series={[
                            {data: [operation_savings], label: "Savings", valueFormatter: (value) => value ? value.toFixed(2) + " $" : "0 $", stack: 'stack1', color: 'green'},
                        ]}
                        slotProps={{ legend: { hidden: true } }}
                        {...(isTouchDevice ? { tooltip: {trigger: 'none'}} : {})}
                        sx={{'&&': { touchAction: 'auto' }}}
                    />
                </Box>
            </Stack>
        </Paper>
    );
}

export default OperationSavings;