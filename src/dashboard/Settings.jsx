import * as React from 'react';
import { Box } from '@mui/material';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import GeneratorSettings from './settings/GeneratorSettings';
import PVSettings from './settings/PVSettings';
import ESSSettings from './settings/ESSSettings';
import LoadSettings from './settings/LoadSettings';
import SiteSettings from './settings/SiteSettings';
import UtilitySettings from './settings/UtilitySettings';

function Settings() {
    return (
        <Box>
            <Container maxWidth="sm">
                <Typography variant="h4">Settings</Typography>
                <Stack spacing={2}>
                    <GeneratorSettings />
                    <PVSettings />
                    <ESSSettings />
                    <LoadSettings />
                    <SiteSettings />
                    <UtilitySettings />
                    <Typography variant="h2">Environment Settings</Typography>
                </Stack>

            </Container>
        </Box>
    );
}
export default Settings;