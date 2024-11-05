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
import { GENERATOR_SIZES, LOAD_PROFILE_OPTIONS, MODULE_TYPES, SITE_FREQUENCY_OPTIONS } from '../constants';

function Settings() {
    const { cloudingFactor, essModuleCount, essModuleType, 
            generatorCount, generatorSize, loadPeakLevel, 
            loadProfile, pvPeakSize, simulationTime, 
            siteVAC, siteFrequency, exportLimit, isPresent } = useSettings();
    
    const dispatch = useSettingsDispatch();

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


    const handleSaveSettings = (event) => {
        event.preventDefault()
        
        if (typeof cloudingFactorState === 'number' && !isNaN(cloudingFactorState) && cloudingFactorState >= 0 && cloudingFactorState <= 1) {
            dispatch({ type: 'SET_CLOUDING_FACTOR', payload: cloudingFactorState });
        } else {
            console.error("Invalid clouding factor: ", cloudingFactorState);
        }

        if (MODULE_TYPES.includes(essModuleTypeState)) {
            console.log(essModuleTypeState)
            dispatch({type: 'SET_ESS_MODULE_TYPE', payload: essModuleTypeState});
        } else {
            console.error("Invalid module type: ", essModuleTypeState);
        }

        if (GENERATOR_SIZES.includes(generatorSizeState)) {
            console.log("Generator Size: ", generatorSizeState);
            dispatch({type: 'SET_GENERATOR_SIZE', payload: generatorSizeState});
        } else {
            console.error("Invalid generator size: ", generatorSizeState);
        }

        if (LOAD_PROFILE_OPTIONS.includes(loadProfileState)) {
            dispatch({type: 'SET_LOAD_PROFILE', payload: loadProfileState});
        } else {
            console.error("Invalid load profile: ", loadProfileState);
        }

        if (SITE_FREQUENCY_OPTIONS.includes(siteFrequencyState)) {
            console.log("Site Frequency: ", siteFrequencyState);
            dispatch({type: 'SET_SITE_FREQUENCY', payload: siteFrequencyState});
        } else {
            console.error("Invalid site frequency: ", siteFrequencyState);
        }

        dispatch({type:  'SET_ESS_MODULE_COUNT', payload: essModuleCountState});
        dispatch({type:  'SET_GENERATOR_COUNT',  payload: generatorCountState});
        dispatch({type:  'SET_LOAD_PEAK_LEVEL',  payload: loadPeakLevelState});
        dispatch({type:  'SET_PV_PEAK_SIZE',     payload: pvPeakSizeState});
        dispatch({type:  'SET_SIMULATION_TIME',  payload: simulationTimeState});
        dispatch({type:  'SET_SITE_VAC',         payload: siteVACState});
        dispatch({type:  'SET_EXPORT_LIMIT',     payload: exportLimitState });
        dispatch({type:  'SET_IS_PRESENT',       payload: isPresentState });

    }

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
                <Button variant="contained" onClick={handleSaveSettings}>Save Settings</Button>
            </div>
        </>
    );
}

export default Settings;