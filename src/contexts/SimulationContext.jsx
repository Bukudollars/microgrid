import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import Logger from '../utils/logger';
import PropTypes from 'prop-types';

const SimulationStateContext = createContext();
const  SimulationDispatchContext = createContext();
const CurrentIndexContext = createContext();


export const useSimulationState = () => {
    const context = useContext(SimulationStateContext);
    if (context === undefined) {
        throw new Error('useSimulationState must be used within a SimulationProvider');
    }
    return context;
};

export const useSimulationDispatch = () => {
    const context = useContext(SimulationDispatchContext);
    if (context === undefined) {
        throw new Error('useSimulationDispatch must be used within a SimulationProvider');
    }
    return context;
};

export const useCurrentIndex = () => {
    const context = useContext(CurrentIndexContext);
    if (context === undefined) {
        throw new Error('useCurrentIndexRead must be used within a SimulationProvider');
    }
    return context.currentIndex;
};

export const useCurrentIndexDispatch = () => {
    const context = useContext(CurrentIndexContext);
    if (context === undefined) {
        throw new Error('useCurrentIndexDispatch must be used within a SimulationProvider');
    }
    return context.setCurrentIndex;
}

// const actionTypes = {
//     INITIALIZE_ENTITIES: 'INITIALIZE_ENTITIES',

// };

const startRollingAverageWorker = (data, setRollingAverage, setLoading) => {
    Logger.log("Starting rolling average worker");
    const rollingAverageWorker = new Worker(new URL('../utils/rollingAverageWorker.js', import.meta.url), { type: 'module' });
    rollingAverageWorker.postMessage(data);

    rollingAverageWorker.onmessage = (e) => {
        Logger.log("Rolling average received: ");
        setRollingAverage(e.data);
        Logger.log(e.data);
        setLoading(false);
        rollingAverageWorker.terminate();
    };
    rollingAverageWorker.onerror = (error) => {
        Logger.error("Rolling average worker error: ", error);
        rollingAverageWorker.terminate();
    };
};


export const SimulationProvider = ({ children }) => {
    SimulationProvider.propTypes = {
        children: PropTypes.node.isRequired,
    };

    

    const [rollingAverage, setRollingAverage] = useState([]);
    const [loading, setLoading] = useState(false);
    const [simulationData, setSimulationData] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [gensetCount, setGensetCount] = useState(0);
    const [peakLoad, setPeakLoad] = useState(0);
    const [peakPVPower, setPeakPVPower] = useState(0);
    const [utilityExportLimit, setUtilityExportLimit] = useState(0);
    const [peakGensetPower, setPeakGensetPower] = useState(0);
    const [peakESSPower, setPeakESSPower] = useState(0);

    const simulationStateValue = React.useMemo(() => ({
        simulationData,
        rollingAverage,
        loading,
        currentIndex,
        gensetCount,
        peakGensetPower,
        peakLoad,
        peakPVPower,
        utilityExportLimit,
        peakESSPower,
      }), [
        simulationData,
        rollingAverage,
        loading,
        currentIndex,
        gensetCount,
        peakGensetPower,
        peakLoad,
        peakPVPower,
        utilityExportLimit,
        peakESSPower,
      ]);

    

    const safeSetCurrentIndex = React.useCallback((newIndex) => {
        const length = simulationDataLengthRef.current;
        if (newIndex >= 0 && newIndex < length) {
            setCurrentIndex(newIndex);
        } else if (simulationData.length > 0 && newIndex >= length) {
            console.warn("Index out of bounds: ${newIndex}");
        }
    }, [simulationData.length]);

    const startSimulation = useCallback((variables) => {
        setLoading(true);
        setGensetCount(variables.gensetCount);
        setPeakLoad(variables.peakLoad);
        setPeakPVPower(variables.peakPVPower);
        setUtilityExportLimit(variables.utilityExportLimit);
        setPeakGensetPower(variables.singleGensetPower * variables.gensetCount);
        setPeakESSPower(variables.singleESSPeakPower * variables.essModuleCount);
        const worker = new Worker(new URL('../utils/simulationWorker.js', import.meta.url), { type: 'module' });
        worker.postMessage(variables);
        
        worker.onmessage = (e) => {
            setSimulationData(e.data);
            startRollingAverageWorker(e.data, setRollingAverage, setLoading);
            
            worker.terminate();
        };

        worker.onerror = (error) => {
            Logger.error("Worker error: ", error);
            setLoading(false);
            worker.terminate();
        };
    }, []);

    const simulationDispatchValue = React.useMemo(() => ({
        startSimulation,
        setCurrentIndex: safeSetCurrentIndex,
        }), [startSimulation, safeSetCurrentIndex]);
        
    const simulationDataLengthRef = React.useRef(simulationData.length);
    useEffect(() => {
        simulationDataLengthRef.current = simulationData.length;
    }, [simulationData.length]);

    return(
        <SimulationStateContext.Provider value={ 
            simulationStateValue
        }>
            <SimulationDispatchContext.Provider value={ simulationDispatchValue}>
                <CurrentIndexContext.Provider value={{ currentIndex, setCurrentIndex: safeSetCurrentIndex }}>
                    {children}
                </CurrentIndexContext.Provider>
            </SimulationDispatchContext.Provider>
        </SimulationStateContext.Provider>
    );
};