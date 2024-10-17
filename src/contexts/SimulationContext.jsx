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

export const SimulationProvider = ({ children }) => {
    const [simulationData, setSimulationData] = useState([]);
    const [loading, setLoading] = useState(false);

    const startSimulation = (variables) => {
        setLoading(true);
        const worker = new Worker(new URL('../utils/simulationWorker.js', import.meta.url), { type: 'module' });
        worker.postMessage(variables);
        
        worker.onmessage = (e) => {
            setSimulationData(e.data);
            setLoading(false);
            worker.terminate();
        };

        worker.onerror = (error) => {
            console.error("Worker error: ", error);
            setLoading(false);
            worker.terminate();
        };
    };

    return(
        <SimulationStateContext.Provider value={{ simulationData, loading}}>
            <SimulationDispatchContext.Provider value={{ startSimulation }}>
                {children}
            </SimulationDispatchContext.Provider>
        </SimulationStateContext.Provider>
    );
};