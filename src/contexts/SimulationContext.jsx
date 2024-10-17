import React, { createContext, useContext, useState } from 'react';

const SimulationContext = createContext();

export const useSimulation = () => {
    return useContext(SimulationContext);
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
        <SimulationContext.Provider value={{ simulationData, loading, startSimulation }}>
            {children}
        </SimulationContext.Provider>
    );
};