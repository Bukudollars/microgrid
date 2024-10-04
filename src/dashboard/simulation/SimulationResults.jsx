import * as React from 'react';
import { Box, Typography, Table, TableContainer, TableHead, TableRow, TableCell, TableBody } from '@mui/material';

const SimulationResults = ({data}) => {
    return (
        <Box>
            <Typography variant="h5">Simulation Results</Typography>
            {data.length === 0? (
                <Typography variant="body1">No data availible</Typography>
            ) : (
                <TableContainer>
                    <Table sx={{ minWidth: 650}} aria-label="Simulation Table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Time</TableCell>
                                <TableCell>Active Feeder Breakers</TableCell>
                                <TableCell>Remaining ESS Energy</TableCell>
                                <TableCell>Total ESS Energy</TableCell>
                                <TableCell>Total Genset Power</TableCell>
                                <TableCell>ESS Charge State</TableCell>
                                <TableCell>Real Load</TableCell>
                                <TableCell>Power Factor</TableCell>
                                <TableCell>Reactive Load</TableCell>
                                <TableCell>Available PV Power</TableCell>
                                <TableCell>ESS Reactive Power Contribution</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.map((value, index) => (
                                <TableRow key={index}>
                                    <TableCell>{index}</TableCell>
                                    <TableCell>{value.activeFeederBreakers}</TableCell>
                                    <TableCell>{value.remainingESSEnergy.toFixed(0)}</TableCell>
                                    <TableCell>{value.totalESSEnergy}</TableCell>
                                    <TableCell>{value.totalGensetPower}</TableCell>
                                    <TableCell>{value.essChargeState}</TableCell>
                                    <TableCell>{value.realLoad.toFixed(0)}</TableCell>
                                    <TableCell>{value.powerFactor.toFixed(2)}</TableCell>
                                    <TableCell>{value.reactiveLoad.toFixed(0)}</TableCell>
                                    <TableCell>{value.availablePVPower.toFixed(0)}</TableCell>
                                    <TableCell>{value.essReactivePowerContribution.toFixed(0)}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </Box>
    );
};

export default SimulationResults;