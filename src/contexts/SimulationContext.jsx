import React, { createContext, useContext, useState } from 'react';

const SimulationStateContext = createContext();
const  SimulationDispatchContext = createContext();


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

const actionTypes = {
    INITIALIZE_ENTITIES: 'INITIALIZE_ENTITIES',

};

const startRollingAverageWorker = (data, setRollingAverage, setLoading) => {
    console.log("Starting rolling average worker");
    const rollingAverageWorker = new Worker(new URL('../utils/rollingAverageWorker.js', import.meta.url), { type: 'module' });
    rollingAverageWorker.postMessage(data);

    rollingAverageWorker.onmessage = (e) => {
        console.log("Rolling average received: ");
        setRollingAverage(e.data);
        console.log(e.data);
        setLoading(false);
        rollingAverageWorker.terminate();
    };
    rollingAverageWorker.onerror = (error) => {
        console.error("Rolling average worker error: ", error);
        rollingAverageWorker.terminate();
    };
};


export const SimulationProvider = ({ children }) => {
    const [rollingAverage, setRollingAverage] = useState([]);
    const [loading, setLoading] = useState(false);
    const [simulationData, setSimulationData] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [gensetCount, setGensetCount] = useState(0);
    

    const safeSetCurrentIndex = (newIndex) => {
        if (newIndex >= 0 && newIndex < simulationData.length) {
            setCurrentIndex(newIndex);
        } else if (simulationData.length > 0 && newIndex >= simulationData.length) {
            console.warn("Index out of bounds: ${newIndex}");
        }
    };

    const startSimulation = (variables) => {
        setLoading(true);
        setGensetCount(variables.gensetCount);
        const worker = new Worker(new URL('../utils/simulationWorker.js', import.meta.url), { type: 'module' });
        worker.postMessage(variables);
        
        worker.onmessage = (e) => {
            setSimulationData(e.data);
            startRollingAverageWorker(e.data, setRollingAverage, setLoading);
            
            worker.terminate();
        };

        worker.onerror = (error) => {
            console.error("Worker error: ", error);
            setLoading(false);
            worker.terminate();
        };
    };

    return(
        <SimulationStateContext.Provider value={{ simulationData, rollingAverage, loading, currentIndex, gensetCount}}>
            <SimulationDispatchContext.Provider value={{ startSimulation, setCurrentIndex: safeSetCurrentIndex }}>
                {children}
            </SimulationDispatchContext.Provider>
        </SimulationStateContext.Provider>
    );
};