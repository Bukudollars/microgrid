import * as React from 'react';
import { Box, Stack, Paper, Tooltip } from '@mui/material';
import Typography from '@mui/material/Typography';
import { BarChart } from '@mui/x-charts/BarChart';
import { useSimulationState } from '../../contexts/SimulationContext';
import isTouch from '../../hooks/isTouch';

const GENERATOR_COST_PER_KW = 0.22;
const UTILITY_COST_PER_KW = 0.15;

function OperationCost({width, height}) {
    const isTouchDevice = isTouch();
    const { rollingAverage, currentIndex } = useSimulationState();

    // Calculate aggregated cost using rolling averages
    const totalCost = (
        (rollingAverage?.[currentIndex]?.genSum ?? 0) * GENERATOR_COST_PER_KW +
        (rollingAverage?.[currentIndex]?.utilitySum ?? 0) * UTILITY_COST_PER_KW
    );

    return (
        <Paper elevation={4} sx={{width: width || '100%'}}>
            <Stack
                direction="row"
                justifyContent="center"
                alignItems="flex-start"
            >
                <Box sx={{textAlign: 'left', padding: 2, margin: 2}}>
                    <Typography variant="h5">Operating <br /> Cost</Typography>
                    <br/>
                    <Tooltip title="Total Cost" arrow>
                        <Typography variant="body1">(C) ${totalCost.toFixed(2)}</Typography>
                    </Tooltip>
                </Box>
                <Box>
                    <BarChart 
                        width={150}
                        height={200}
                        yAxis={[{}]}
                        xAxis={[{scaleType: 'band', disableLine: true, disableTicks: true, data: [""]}]}
                        series={[
                            {data: [totalCost], label: "Cost", valueFormatter: (value) => value ? "$" + value.toFixed(2) : "$0.00", stack: 'stack1', color: 'red'},
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

export default OperationCost;