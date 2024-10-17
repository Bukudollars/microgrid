import * as React from 'react';
import { Box } from '@mui/material';
import SimulationResults from './simulation/SimulationResults';
import { useSimulationState } from '../contexts/SimulationContext';

export default function TableView() {
    const { simulationData, loading } = useSimulationState();
    return (
        <Box>
            {loading? (
                <Typography variant="body1">Loading...</Typography>
            ) : (
                <SimulationResults data={simulationData} />
            )}
                
        </Box>
    );
}