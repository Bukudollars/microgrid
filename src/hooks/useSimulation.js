import { SettingsPowerRounded } from '@mui/icons-material';
import { useState, useEffect, useRef } from 'react';
import Logger from '../utils/logger';

const useSimulation = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const workerRef = useRef(null);
    const [error, setError] = useState(null);

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
        setError(null);

        if(workerRef.current) {
            workerRef.current.terminate();
        }
        workerRef.current = new Worker(new URL('../utils/simulationWorker.js', import.meta.url), { type: 'module' });
        workerRef.current.postMessage(variables);

        workerRef.current.onmessage = function (e) {
            const result = e.data;
            if (result.error) {
                setError(result.error);
                Logger.error("Worker error: ", result.error);
            } else {
                setData(result);
            }
            
            setLoading(false);
            workerRef.current.terminate();
            workerRef.current = null;
        };

        workerRef.current.onerror = function (error) {
            console.error("Worker error: ", error);
            setError(error.message);
            setLoading(false);
            workerRef.current.terminate();
            workerRef.current = null;
        };
    };
    return { data, loading, error, startSimulation };
};

export default useSimulation;