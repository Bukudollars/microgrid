import * as React from 'react';
import { useState, useEffect } from 'react';
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
import Alert from '@mui/material/Alert';
import { MIN_SIMULATION_TIME, MAX_SIMULATION_TIME } from '../constants';

import SaveSettingsModal from './components/SaveSettingsModal';


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

    const [alertOpen, setAlertOpen] = useState(false)
    const [alertMsg,  setAlertMsg]  = useState("")
    const [alertSvr,  setAlertSvr]  = useState("")

    const [open, setOpen] = useState(false)


    const handleSaveSettings = (event) => {
        event.preventDefault()

        if (!(typeof cloudingFactorState === 'number' && !isNaN(cloudingFactorState) && cloudingFactorState >= 0 && cloudingFactorState <= 1)) {
            setAlertOpen(true)
            setAlertSvr("error")
            setAlertMsg("Invalid clouding factor: ")
            console.error("Invalid clouding factor: ", cloudingFactorState);
            return;
        }

        if (!MODULE_TYPES.includes(essModuleTypeState)) {
            setAlertOpen(true)
            setAlertSvr("error")
            setAlertMsg("Invalid module type")
            console.error("Invalid module type: ", essModuleTypeState);
            return;
        }

        if (!GENERATOR_SIZES.includes(generatorSizeState)) {
            setAlertOpen(true)
            setAlertSvr("error")
            setAlertMsg("Invalid generator size")
            console.error("Invalid generator size: ", generatorSizeState);
            return;
        }

        if (!LOAD_PROFILE_OPTIONS.includes(loadProfileState)) {
            setAlertOpen(true)
            setAlertSvr("error")
            setAlertMsg("Invalid load profile")
            console.error("Invalid load profile: ", loadProfileState);
            return;
        }

        if (!SITE_FREQUENCY_OPTIONS.includes(siteFrequencyState)) {
            setAlertOpen(true)
            setAlertSvr("error")
            setAlertMsg("Invalid site frequency")
            console.error("Invalid site frequency: ", siteFrequencyState);
            return;
        }

        if (!(typeof cloudingFactorState === 'number' && !isNaN(cloudingFactorState) && cloudingFactorState >= 0 && cloudingFactorState <= 1)) {
            setAlertOpen(true)
            setAlertSvr("error")
            setAlertMsg("Invalid clouding factor")
            console.error("Invalid clouding factor: ", cloudingFactorState);
            return;
        }

        if (!(Number.isInteger(simulationTimeState) && simulationTimeState >= MIN_SIMULATION_TIME && simulationTimeState <= MAX_SIMULATION_TIME)) {
            setAlertOpen(true)
            setAlertSvr("error")
            setAlertMsg("Invalid simulation time")
            console.error("Invalid simulation time: ", simulationTimeState);  
            return;
        }

        dispatch({type:  'SET_CLOUDING_FACTOR',  payload: cloudingFactorState});
        dispatch({type:  'SET_ESS_MODULE_TYPE',  payload: essModuleTypeState});
        dispatch({type:  'SET_GENERATOR_SIZE',   payload: generatorSizeState});
        dispatch({type:  'SET_LOAD_PROFILE',     payload: loadProfileState});
        dispatch({type:  'SET_SITE_FREQUENCY',   payload: siteFrequencyState});
        dispatch({type:  'SET_ESS_MODULE_COUNT', payload: essModuleCountState});
        dispatch({type:  'SET_GENERATOR_COUNT',  payload: generatorCountState});
        dispatch({type:  'SET_LOAD_PEAK_LEVEL',  payload: loadPeakLevelState});
        dispatch({type:  'SET_PV_PEAK_SIZE',     payload: pvPeakSizeState});
        dispatch({type:  'SET_SIMULATION_TIME',  payload: simulationTimeState});
        dispatch({type:  'SET_SITE_VAC',         payload: siteVACState});
        dispatch({type:  'SET_EXPORT_LIMIT',     payload: exportLimitState });
        dispatch({type:  'SET_IS_PRESENT',       payload: isPresentState });

        setAlertOpen(true)
        setAlertSvr("success")
        setAlertMsg("Settings updated successfully")
        setOpen(true)
    }

    useEffect(() => {}, [alertOpen])

    return (
        <>
            <SaveSettingsModal open={open} setOpen={setOpen}/>
            {alertOpen && (
                <Alert severity={alertSvr} onClose={() => {setAlertOpen(false)}}>{alertMsg}</Alert>
            )}
            
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