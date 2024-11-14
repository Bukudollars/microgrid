import * as React from 'react';
import { Box, ButtonGroup, Button, Slider, Tooltip, CircularProgress, Stack } from '@mui/material';
import { PlayArrow, Pause, Replay } from '@mui/icons-material';
import YieldDistribution from './simulation/YieldDistribution';
import Load from './simulation/Load';
import Utility from './simulation/Utility';
import Gen from './simulation/Gen';
import PV from './simulation/PV';
import ESS from './simulation/ESS';
import Carbon from './simulation/Carbon';
import Grid from '@mui/material/Grid2';
import { useSimulationDispatch, useSimulationState, useCurrentIndex, useCurrentIndexDispatch } from '../contexts/SimulationContext';
import { MINUTES_PER_HOUR, HOURS_PER_DAY } from '../constants';
import { useSettings } from '../contexts/SettingsContext';
import OperationCost from './simulation/OperationCost';

function Simulation() {

    const tileMinWidth = 370;

    const { simulationData, loading } = useSimulationState();
    const { startSimulation } = useSimulationDispatch();
    const currentIndex = useCurrentIndex();
    const setCurrentIndex = useCurrentIndexDispatch();

    const [isPlaying, setIsPlaying] = React.useState(false);
    const [sliderValue, setSliderValue] = React.useState(currentIndex);
    const [sliderChanging, setSliderChanging] = React.useState(false);
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
        exportLimit,
        cloudingFactor,
        isPresent,
        simulationTime
    } = useSettings();

    const variables = {
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
    };

    const playBackMarks = [
        {
            value: 0, 
            label: currentIndex <= 0 || (simulationData?.length ?? 0) <= 0 ? "0d 00:00" :
                `${Math.floor(currentIndex / (60 * 24))}d ${String(Math.floor(currentIndex / 60) % 24).padStart(2, '0')}:${String(currentIndex % 60).padStart(2, '0')}`
        },
        {
            value: (simulationData?.length ?? 0) - 1,
            label: (simulationData?.length ?? 0) <= 0 ? "0d 00:00" :
                `-${Math.floor(((simulationData?.length ?? 0) - 1 - currentIndex) / (60 * 24))}d ${String(Math.floor(((simulationData?.length ?? 0) - 1 - currentIndex) / 60) % 24).padStart(2, '0')}:${String((simulationData.length - 1 - currentIndex) % 60).padStart(2, '0')}`
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
        setCurrentIndex(localIndex);
    }, [localIndex]);

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
        setSliderValue(0);
    };

    const handleSliderChange = (event, newValue) => {
        setSliderChanging(true);
        setSliderValue(newValue);
    };

    const handleSliderChangeCommitted = (event, newValue) => {
        
        setSliderChanging(false);
        setLocalIndex(newValue);
        // setIsPlaying(false);
    }


    React.useEffect(() => {
        let intervalId;
        let refreshRate = 1;
        if (playbackSpeed <= 1) {
            refreshRate = 2 ** playbackSpeed;
        } else {
            refreshRate = 2 ** 2;
        }
        if (isPlaying && (simulationData?.length ?? 0) > 0) {
            intervalId = setInterval(() => {
                setLocalIndex((prevIndex) => {
                    if (prevIndex >= (simulationData?.length ?? 0) - 1) {
                        setIsPlaying(false);
                        if (!sliderChanging) setSliderValue((simulationData?.length ?? 0) - 1);
                        return (simulationData?.length ?? 0) - 1;   
                    }
                    const newIndex = prevIndex + (2 ** playbackSpeed) / refreshRate;
                    if (!sliderChanging) setSliderValue(newIndex);
                    return newIndex;
                });

            }, 1000 / refreshRate);
        }
        return () => {
            if (intervalId) {
                clearInterval(intervalId);
            }
        };
    }, [isPlaying, (simulationData?.length ?? 0), playbackSpeed, sliderChanging]);

    const handlePlayPauseClick = () => {
        if(!loading && (simulationData?.length ?? 0) > 0) {
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
        if ((simulationData?.length ?? 0) <= 0) {
            handleStart();
        }
    }, []);

      const tooltipContent = (() => {
        const time = minutesToTime(sliderValue);
        return `Time: ${time.days}d ${String(time.hours).padStart(2, '0')}:${String(time.minutes).padStart(2, '0')}`;
      })();

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
            px: 0,
        }}>
            <Tooltip title={tooltipContent} arrow followCursor placement='top'>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        margin: 'auto',
                        width: '95%',
                        pt: 3,
                        px: 3
                    }}
                >
                    <Slider 
                        value={
                            typeof sliderValue === 'number' ? sliderValue : 0
                            // typeof localIndex === 'number' ? 
                            // localIndex 
                            // : 0
                        }
                        aria-labelledby='time-slider'
                        valueLabelDisplay='off'
                        min={0}
                        max={(simulationData?.length ?? 0) - 1}
                        onChange={handleSliderChange}
                        onChangeCommitted={handleSliderChangeCommitted}
                        disabled={loading || (simulationData?.length ?? 0) === 0}
                        width={300}
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
                        disabled={loading || (simulationData?.length ?? 0) === 0}
                        onClick={handlePlayPauseClick}
                    >
                        {!isPlaying ? <PlayArrow /> : <Pause />}
                        </Button>
                    {/* <Button disabled={loading || simulationData.length === 0}><Pause /></Button> */}
                    <Tooltip title="Restart Simulation" arrow>
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
                            disabled={loading || (simulationData?.length ?? 0) === 0}
                            marks={playSpeedMarks}
                            />
                    </Box>
                </Tooltip>
                
            </Stack>
            <Stack
                direction={{ xs: 'column', sm: 'column', md: 'row', lg: 'row', xl: 'row' }}
                spacing={1}
                mx={{ xs: 0, sm: 0, md: 1, lg: 1, xl: 1 }}
                sx={{opacity: loading || (simulationData?.length ?? 0) === 0 ? 0.25 : 1,
                    mt: 1,
                    alignItems: 'top',
                    justifyContent: 'center',
                    // alignContent: 'center',
                }}
            >

                    <Box minWidth={tileMinWidth} width="100%" pt={1}>
                        <Stack direction="column" sx={{ height: '100%' }} spacing={2}>
                            <YieldDistribution height="65%" />
                            <OperationCost width="50%" height="31%" />
                        </Stack>
                    </Box>

                    <Grid container spacing={2}
                        justifyContent={{xs: 'center', sm: 'center', md: 'center', lg: 'left'}}
                        padding={{xs: 0, sm: 0, md: 0, lg: 1}}
                        alignItems='center'
                        
                    >
                        <Grid size='auto' minWidth={tileMinWidth}>
                            <Load />
                        </Grid>
                        <Grid size='auto'minWidth={tileMinWidth}>
                            <Utility />
                        </Grid>
                        <Grid size='auto'minWidth={tileMinWidth}>
                            <Gen />
                        </Grid>
                        <Grid size='auto'minWidth={tileMinWidth}>
                            <PV />
                        </Grid>
                        <Grid size='auto'minWidth={tileMinWidth}>
                            <ESS />
                        </Grid>
                        <Grid size='auto'minWidth={tileMinWidth}>
                            <Carbon />
                        </Grid>
                    </Grid>

            </Stack>
            
        </Box>
    );
}
export default Simulation;