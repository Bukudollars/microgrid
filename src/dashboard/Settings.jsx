import * as React from 'react';
import { Box } from '@mui/material';
import Typography from '@mui/material/Typography';
import GeneratorSettings from './settings/GeneratorSettings';
import PVSettings from './settings/PVSettings';
import ESSSettings from './settings/ESSSettings';
import LoadSettings from './settings/LoadSettings';
import SiteSettings from './settings/SiteSettings';
import UtilitySettings from './settings/UtilitySettings';
import EnvironmentSettings from './settings/EnvironmentSettings';
import SimulationSettings from './settings/SimulationSettings';
import Grid from '@mui/material/Grid2';

function Settings() {

    return (
        <Box sx={{margin: 2, padding: 2, userSelect: 'none'}}>
            <Typography variant="h4">Settings</Typography>
            <Grid container spacing={2} justifyContent={'left'}>
                <Grid size="auto" display="flex" justifyContent="left" alignItems="flex-start">
                    <GeneratorSettings />
                </Grid>
                <Grid size="auto" display="flex" justifyContent="left" alignItems="flex-start">
                    <PVSettings />
                </Grid>
                <Grid size="auto" display="flex" justifyContent="left" alignItems="flex-start">
                    <ESSSettings />
                </Grid>
                <Grid size="auto" display="flex" justifyContent="left" alignItems="flex-start">
                    <LoadSettings />
                </Grid>
                <Grid size="auto" display="flex" justifyContent="left" alignItems="flex-start">
                    <SiteSettings />
                </Grid>
                <Grid size="auto" display="flex" justifyContent="left" alignItems="flex-start">
                    <UtilitySettings />
                </Grid>
                <Grid size="auto" display="flex" justifyContent="left" alignItems="flex-start">
                    <EnvironmentSettings />
                </Grid>
                <Grid size="auto" display="flex" justifyContent="left" alignItems="flex-start">
                    <SimulationSettings />
                </Grid>
            </Grid>
        </Box>
    );
}
export default Settings;