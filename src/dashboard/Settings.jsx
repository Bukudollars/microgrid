import * as React from 'react';
import { useState } from 'react';
import { Box, Button } from '@mui/material';
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
import { useSettings, useSettingsDispatch } from '../contexts/SettingsContext';

function Settings() {
    const { cloudingFactor, essModuleCount, essModuleType, 
            generatorCount, generatorSize, loadPeakLevel, 
            loadProfile, pvPeakSize, simulationTime, 
            siteVAC, siteFrequency, exportLimit, isPresent } = useSettings();

    const [generatorCountState, setGeneratorCountState] = useState(generatorCount);
    const [generatorSizeState,  setGeneratorSizeState]  = useState(generatorSize);
    const [pvPeakSizeState,     setPvPeakSizeState]     = useState(pvPeakSize);
    const [essModuleCountState, setEssModuleCountState] = useState(essModuleCount);
    const [essModuleTypeState,  setEssModuleTypeState]  = useState(essModuleType);
    const [cloudingFactorState, setCloudingFactorState] = useState(cloudingFactor);
    const [loadPeakLevelState,  setLoadPeakLevelState]  = useState(loadPeakLevel);
    const [loadProfileState,    setLoadProfileState]    = useState(loadProfile);
    const [simulationTimeState, setSimulationTimeState] = useState(simulationTime);
    const [siteVACState,        setSiteVACState]        = useState(siteVAC);
    const [siteFrequencyState,  setSiteFrequencyState]  = useState(siteFrequency);
    const [exportLimitState,    setExportLimitState]    = useState(exportLimit);
    const [isPresentState,      setIsPresentState]      = useState(isPresent);

    return (
        <>
            <Box sx={{margin: 2, padding: 2, userSelect: 'none'}}>
                <Typography variant="h4">Settings</Typography>
                <Grid container spacing={2} justifyContent={'left'}>
                    <Grid size="auto" display="flex" justifyContent="left" alignItems="flex-start">
                        <GeneratorSettings generatorCount={generatorCountState} setGeneratorCount={setGeneratorCountState} 
                                           generatorSize={generatorSizeState}   setGeneratorSize={setGeneratorSizeState}/>
                    </Grid>
                    <Grid size="auto" display="flex" justifyContent="left" alignItems="flex-start">
                        <PVSettings pvPeakSize={pvPeakSizeState} setPvPeakSize={setPvPeakSizeState}/>
                    </Grid>
                    <Grid size="auto" display="flex" justifyContent="left" alignItems="flex-start">
                        <ESSSettings essModuleCount={essModuleCountState} setEssModuleCount={setEssModuleCountState}
                                     essModuleType={essModuleTypeState}   setEssModuleType={setEssModuleTypeState}/>
                    </Grid>
                    <Grid size="auto" display="flex" justifyContent="left" alignItems="flex-start">
                        <LoadSettings loadPeakLevel={loadPeakLevelState} setLoadPeakLevel={setLoadPeakLevelState}
                                      loadProfile={loadProfileState} setLoadProfile={setLoadProfileState}/>
                    </Grid>
                    <Grid size="auto" display="flex" justifyContent="left" alignItems="flex-start">
                        <SiteSettings siteVAC={siteVACState}             setSiteVAC={setSiteVACState}
                                      siteFrequency={siteFrequencyState} setSiteFrequency={setSiteFrequencyState}/>
                    </Grid>
                    <Grid size="auto" display="flex" justifyContent="left" alignItems="flex-start">
                        <UtilitySettings exportLimit={exportLimitState} setExportLimit={setExportLimitState}
                                         isPresent={isPresentState}     setIsPresent={setIsPresentState}/>
                    </Grid>
                    <Grid size="auto" display="flex" justifyContent="left" alignItems="flex-start">
                        <EnvironmentSettings cloudingFactor={cloudingFactorState} setCloudingFactor={setCloudingFactorState}/>
                    </Grid>
                    <Grid size="auto" display="flex" justifyContent="left" alignItems="flex-start">
                        <SimulationSettings simulationTime={simulationTimeState} setSimulationTime={setSimulationTimeState}/>
                    </Grid>
                </Grid>
            </Box> 
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Button variant="contained">Save Settings</Button>
            </div>
        </>
    );
}

export default Settings;