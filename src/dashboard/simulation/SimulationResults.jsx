import * as React from 'react';
import PropTypes from 'prop-types';
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
                                {/* <TableCell>Active Feeder Breakers</TableCell> */}
                                <TableCell>Remaining ESS Energy</TableCell>
                                <TableCell>Total ESS Energy</TableCell>
                                <TableCell>Total Genset Power</TableCell>
                                <TableCell>ESS Charge State</TableCell>
                                <TableCell>Real Load</TableCell>
                                <TableCell>Power Factor</TableCell>
                                <TableCell>Reactive Load</TableCell>
                                <TableCell>Available PV Power</TableCell>
                                <TableCell>ESS Reactive Power Contribution</TableCell>
                                <TableCell>ESS Real Power Contribution</TableCell>
                                <TableCell>ESS Power Factor</TableCell>
                                <TableCell>Utility Real Power Contribution</TableCell>
                                <TableCell>Utility Reactive Power Contribution</TableCell>
                                <TableCell>Utility Power Factor</TableCell>
                                <TableCell>Provided PV Power</TableCell>
                                <TableCell>Active Feeder Breakers</TableCell>
                                <TableCell>Genset Real Power Contribution</TableCell>
                                <TableCell>Gensets Reactive Power Contribution</TableCell>
                                <TableCell>Gensets Required</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.map((value, index) => (
                                <TableRow key={index}>
                                    <TableCell>{index}</TableCell>
                                    {/* <TableCell>{value.activeFeederBreakers}</TableCell> */}
                                    <TableCell>{value.remainingESSEnergy.toFixed(0)}</TableCell>
                                    <TableCell>{value.totalESSEnergy}</TableCell>
                                    <TableCell>{value.totalGensetPower}</TableCell>
                                    <TableCell>{value.essChargeState}</TableCell>
                                    <TableCell>{value.realLoad.toFixed(0)}</TableCell>
                                    <TableCell>{value.loadPowerFactor.toFixed(2)}</TableCell>
                                    <TableCell>{value.reactiveLoad.toFixed(0)}</TableCell>
                                    <TableCell>{value.availablePVPower.toFixed(0)}</TableCell>
                                    <TableCell>{value.essReactivePowerContribution.toFixed(0)}</TableCell>
                                    <TableCell>{value.essRealPowerContribution.toFixed(0)}</TableCell>
                                    <TableCell>{value.essPowerFactor.toFixed(2)}</TableCell>
                                    <TableCell>{value.utilityRealPowerContribution.toFixed(0)}</TableCell>
                                    <TableCell>{value.utilityReactivePowerContribution.toFixed(0)}</TableCell>
                                    <TableCell>{value.utilityPowerFactor.toFixed(2)}</TableCell>
                                    <TableCell>{value.providedPVPower.toFixed(0)}</TableCell>
                                    <TableCell>{value.activeFeederBreakers}</TableCell>
                                    <TableCell>{value.gensetRealPowerContribution.toFixed(0)}</TableCell>
                                    <TableCell>{value.gensetReactivePowerContribution.toFixed(0)}</TableCell>
                                    <TableCell>{value.gensetsRequired}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </Box>
    );
};
SimulationResults.propTypes = {
    data: PropTypes.arrayOf(PropTypes.shape({
        remainingESSEnergy: PropTypes.number.isRequired,
        totalESSEnergy: PropTypes.number.isRequired,
        totalGensetPower: PropTypes.number.isRequired,
        essChargeState: PropTypes.number.isRequired,
        realLoad: PropTypes.number.isRequired,
        loadPowerFactor: PropTypes.number.isRequired,
        reactiveLoad: PropTypes.number.isRequired,
        availablePVPower: PropTypes.number.isRequired,
        essReactivePowerContribution: PropTypes.number.isRequired,
        essRealPowerContribution: PropTypes.number.isRequired,
        essPowerFactor: PropTypes.number.isRequired,
        utilityRealPowerContribution: PropTypes.number.isRequired,
        utilityReactivePowerContribution: PropTypes.number.isRequired,
        utilityPowerFactor: PropTypes.number.isRequired,
        providedPVPower: PropTypes.number.isRequired,
        activeFeederBreakers: PropTypes.number.isRequired,
        gensetRealPowerContribution: PropTypes.number.isRequired,
        gensetReactivePowerContribution: PropTypes.number.isRequired,
        gensetsRequired: PropTypes.number.isRequired,
    })).isRequired,
};

export default SimulationResults;