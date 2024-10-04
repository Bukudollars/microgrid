import { useState, useEffect, useRef } from 'react';

const useSimulation = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const workerRef = useRef(null);

    // Cleanup worker on unmount
    useEffect(() => {
        return () => {
            if (workerRef.current) {
                workerRef.current.terminate();
                workerRef.current = null;
            }
        };
    },[]);

    const startSimulation = (variables) => {
        setLoading(true);

        if(workerRef.current) {
            workerRef.current.terminate();
        }
        workerRef.current = new Worker(new URL('../utils/simulationWorker.js', import.meta.url), { type: 'module' });
        workerRef.current.postMessage(variables);

        workerRef.current.onmessage = function (e) {
            const result = e.data;
            setData(result);
            setLoading(false);
            workerRef.current.terminate();
            workerRef.current = null;
        };

        workerRef.current.onerror = function (error) {
            console.error("Worker error: ", error);
            setLoading(false);
            workerRef.current.terminate();
            workerRef.current = null;
        };
    };
    return { data, loading, startSimulation };
};

export default useSimulation;