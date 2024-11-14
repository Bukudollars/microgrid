import * as React from 'react';
import { Box, Stack, Paper, Tooltip } from '@mui/material';
import Typography from '@mui/material/Typography';
import GasMeterIcon from '@mui/icons-material/GasMeter';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import { Gauge, gaugeClasses } from '@mui/x-charts/Gauge'
import { BarChart } from '@mui/x-charts/BarChart';
import { useSimulationState } from '../../contexts/SimulationContext';
import isTouch from '../../hooks/isTouch';

function OperationCost({height}) {
    const isTouchDevice = isTouch();

    const { simulationData, rollingAverage, currentIndex } = useSimulationState();


    return (
        <Paper elevation={4} sx={{py: 0, height: height || '100%'}}>
            <Stack direction="column" spacing={0} sx={{justifyContent: "center", alignItems: "center", mx: 0, px: 0, touchAction: "auto"}}>
                <Typography variant="body1">Current Yield</Typography>

            </Stack>
        </Paper>
    );
}

export default OperationCost;