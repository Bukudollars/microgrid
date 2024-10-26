import * as React from 'react';
import { Box, ButtonGroup, Button, Slider, Tooltip, CircularProgress, Stack } from '@mui/material';
import { PlayArrow, Pause, Replay } from '@mui/icons-material';
import YieldDistribution from './simulation/YieldDistribution';
import Load from './simulation/Load';
import Utility from './simulation/Utility';
import Gen from './simulation/Gen';
import PV from './simulation/PV';
import ESS from './simulation/ESS';
import Grid from '@mui/material/Grid2';
import { useSimulationDispatch, useSimulationState } from '../contexts/SimulationContext';
import { MINUTES_PER_HOUR, HOURS_PER_DAY } from '../constants';
import { useSettings } from '../contexts/SettingsContext';

function Simulation() {
    const { simulationData, loading, currentIndex } = useSimulationState();
    const { startSimulation, setCurrentIndex } = useSimulationDispatch();
    const [isPlaying, setIsPlaying] = React.useState(false);
    const [localIndex, setLocalIndex] = React.useState(currentIndex);
    const [playbackSpeed, setPlaybackSpeed] = React.useState(0);
    const [showSpinner, setShowSpinner] = React.useState(false);
    const { 
        generatorCount,
        generatorSize,
        pvPeakSize,
        essModuleCount,
        essModuleType,
        loadPeakLevel,
        loadProfile,
        siteFrequency,
        siteVAC,
        exportLimit,
        cloudingFactor,
        isPresent,
        simulationTime
    } = useSettings();

    const [variables, setVariables] = React.useState({
        utilityExportLimit: exportLimit,
        singleESSEnergy: essModuleType.energy,
        singleESSPeakPower: essModuleType.power,
        essModuleCount: essModuleCount,
        peakLoad: loadPeakLevel,
        totalFeederBreakers: 4,
        utility: isPresent,
        peakPVPower: pvPeakSize,
        cloudingFactor: cloudingFactor,
        singleGensetPower: generatorSize,
        gensetCount: generatorCount,
        granularity: MINUTES_PER_HOUR,
        simulationTime: MINUTES_PER_HOUR * HOURS_PER_DAY * simulationTime,
        loadProfile: loadProfile,
    });

    const playBackMarks = [
        {
            value: 0, 
            label: currentIndex <= 0 || simulationData.length <= 0 ? "0d 00:00" :
                `${Math.floor(currentIndex / (60 * 24))}d ${String(Math.floor(currentIndex / 60) % 24).padStart(2, '0')}:${String(currentIndex % 60).padStart(2, '0')}`
        },
        {
            value: simulationData.length - 1,
            label: simulationData.length <= 0 ? "0d 00:00" :
                `-${Math.floor((simulationData.length - 1 - currentIndex) / (60 * 24))}d ${String(Math.floor((simulationData.length - 1 - currentIndex) / 60) % 24).padStart(2, '0')}:${String((simulationData.length - 1 - currentIndex) % 60).padStart(2, '0')}`
        }
    ];

    const playSpeedMarks = Object.freeze([
        {
            value: 0,
            label: '1X',
        },
        {
            value: 5,
            label: '32X',
        },
        {
            value: 10,
            label: '1024X',
        }
    ]);

    React.useEffect(() => {
        let timer;
        if (loading) {
            timer = setTimeout(() => {
                setShowSpinner(true);
            }, 300);
        } else {
            clearTimeout(timer);
            setShowSpinner(false);
        }
        return () => clearTimeout(timer);
    }, [loading]);

    const handleStart = () => {
        startSimulation(variables);
        setLocalIndex(0);
        setIsPlaying(false);
    };

    const handleSliderChange = (event, newValue) => {
        setLocalIndex(newValue);
        setCurrentIndex(newValue);
        setIsPlaying(false);
    }

    React.useEffect(() => {
        let intervalId;
        let refreshRate = 1;
        if (playbackSpeed === 0) {
            refreshRate = 1;
        } else if (playbackSpeed <= 3) {
            refreshRate = 2 ** playbackSpeed;
        } else {
            refreshRate = 2 ** 4;
        }
        if (isPlaying && simulationData.length > 0) {
            intervalId = setInterval(() => {
                setLocalIndex(prevIndex => {
                    if (prevIndex >= simulationData.length - 1) {
                        setIsPlaying(false);
                        return prevIndex;
                    }
                    return prevIndex + (2 ** playbackSpeed) / refreshRate;
                });
                
            }, 1000 / refreshRate);
        }
        return () => {
            if (intervalId) {
                clearInterval(intervalId);
            }
        };
    }, [isPlaying, simulationData.length, playbackSpeed]);

    React.useEffect(() => {
        setCurrentIndex(localIndex);
    }, [localIndex, setCurrentIndex]);

    const handlePlayPauseClick = () => {
        if(!loading && simulationData.length > 0) {
            setIsPlaying(!isPlaying);
        }
    };
    function calculateValue(value) {
        return 2 ** value;
    }
    const handlePlaybackSpeedChange = (event, newValue) => {
        if (typeof newValue === 'number') {
            setPlaybackSpeed(newValue);
        }
    }

    function minutesToTime(minutes) {
        return {
            days: Math.floor(minutes / (MINUTES_PER_HOUR * HOURS_PER_DAY)),
            hours: Math.floor(minutes / MINUTES_PER_HOUR) % HOURS_PER_DAY,
            minutes: minutes % MINUTES_PER_HOUR
        };
    }

    React.useEffect(() => {
        if (simulationData.length <= 0) {
            handleStart();
        }
    }, []);

    if (showSpinner) {
        return (
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100vh',
                    width: '100vw'
                }}
            >
                <CircularProgress />
            </Box>
        );
    }
    return (
        
        <Box sx={{
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            userSelect: 'none',
            px: 4,
        }}>
            <Tooltip title="Time" arrow followCursor>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        margin: 'auto',
                        width: '95%',
                        pt: 3
                    }}
                >
                    <Slider 
                        value={
                            typeof localIndex === 'number' ? 
                            localIndex 
                            : 0
                        }
                        aria-labelledby='time-slider'
                        valueLabelDisplay='auto'
                        min={0}
                        max={simulationData.length - 1}
                        onChange={handleSliderChange}
                        disabled={loading || simulationData.length === 0}
                        width={300}
                        // valueLabelFormat={(localIndex) => {
                        //     const time = minutesToTime(localIndex);
                        //     return `${time.days}d ${String(time.hours).padStart(2, '0')}:${String(time.minutes).padStart(2, '0')}`;
                        // }}
                        marks={playBackMarks}
                    />
                    
                </Box>
            </Tooltip>
            <Stack 
                direction='column'
                alignContent='center'
                justifyContent='center'
                alignItems='center'
            >
                <ButtonGroup>
                    <Button 
                        disabled={loading || simulationData.length === 0}
                        onClick={handlePlayPauseClick}
                    >
                        {!isPlaying? <PlayArrow /> : <Pause />}
                        </Button>
                    {/* <Button disabled={loading || simulationData.length === 0}><Pause /></Button> */}
                    <Tooltip title="New Simulation" arrow>
                        <Button onClick={handleStart} disabled={loading}><Replay /></Button>
                    </Tooltip>
                </ButtonGroup>
                <Tooltip title="Playback Speed" arrow>
                    <Box sx={{ 
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        margin:'auto',
                        // height: '100vh',
                        width: 250,
                    }}>
                            <Slider 
                            value={playbackSpeed}
                            min={0}
                            step={1}
                            max={10}
                            scale={calculateValue}
                            onChange={handlePlaybackSpeedChange}
                            valueLabelDisplay='auto'
                            aria-labelledby='playback-speed-slider'
                            disabled={loading || simulationData.length === 0}
                            marks={playSpeedMarks}
                            />
                    </Box>
                </Tooltip>
                
            </Stack>
            <Box
                sx={{opacity: loading || simulationData.length === 0 ? 0.25 : 1}}
            >
                <Grid container spacing={1}
                    justifyContent={'center'}
                >
                    <Grid size='auto'>
                        <YieldDistribution />
                    </Grid>
                    <Grid container spacing={1}
                        justifyContent={'center'}
                    >
                        <Grid size='auto'>
                            <Load />
                        </Grid>
                        <Grid size='auto'>
                            <Utility />
                        </Grid>
                        <Grid size='auto'>
                            <Gen />
                        </Grid>
                        <Grid size='auto'>
                            <PV />
                        </Grid>
                        <Grid size='auto'>
                            <ESS />
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
            
        </Box>
    );
}
export default Simulation;