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
import Grid from '@mui/material/Grid2';

function Settings() {
    return (
        <Box>
            <Typography variant="h4">Settings</Typography>
            <Grid container spacing={2}>
                <Grid size="auto" display="flex" justifyContent="center" alignItems="center">
                    <GeneratorSettings />
                </Grid>
                <Grid size="auto" display="flex" justifyContent="center" alignItems="center">
                    <PVSettings />
                </Grid>
                <Grid size="auto" display="flex" justifyContent="center" alignItems="center">
                    <ESSSettings />
                </Grid>
                <Grid size="auto" display="flex" justifyContent="center" alignItems="center">
                    <LoadSettings />
                </Grid>
                <Grid size="auto" display="flex" justifyContent="center" alignItems="center">
                    <SiteSettings />
                </Grid>
                <Grid size="auto" display="flex" justifyContent="center" alignItems="center">
                    <UtilitySettings />
                </Grid>
                <Grid size="auto" display="flex" justifyContent="center" alignItems="center">
                    <EnvironmentSettings />
                </Grid>
            </Grid>
        </Box>
    );
}
export default Settings;