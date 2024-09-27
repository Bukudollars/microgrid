import React, {createContext, useReducer, useContext} from 'react';
import PropTypes from 'prop-types';
import { GENERATOR_SIZES } from './constants';

const SettingsContext = createContext();
const SettingsDispatchContext = createContext();

const initialState = {
    //generator settings
    generatorCount: 5,
    generatorSize: 450,
    //pv settings
    pvPeakSize: 400,
    //ess settings
    essModuleCount: 2,
    //load settings
    loadPeakLevel: 800,
    //site settings
    siteVAC: 480,
    //utility settings
    exportLimit: 200,
};

function settingsReducer(state, action) {
    switch (action.type) {
        case 'SET_GENERATOR_COUNT':
            return {...state, generatorCount: action.payload};
        case 'SET_GENERATOR_SIZE':
            if (GENERATOR_SIZES.includes(action.payload)) {
                return {...state, generatorSize: action.payload};
            } else {
                console.error("Invalid generator size: ", action.payload);
                return state;
            }
        case 'SET_PV_PEAK_SIZE':
            return {...state, pvPeakSize: action.payload};
        case 'SET_ESS_MODULE_COUNT':
            return {...state, essModuleCount: action.payload};
        case 'SET_LOAD_PEAK_LEVEL':
            return {...state, loadPeakLevel: action.payload};
        case 'SET_SITE_VAC':
            return {...state, siteVAC: action.payload};
        case 'SET_EXPORT_LIMIT':
            return {...state, exportLimit: action.payload};
        default:
            throw new Error(`Unhandled action type: ${action.type}`);
    }
}

export function SettingsProvider({children}) {
    const [state, dispatch] = useReducer(settingsReducer, initialState);
    return (
        <SettingsContext.Provider value={state}>
            <SettingsDispatchContext.Provider value={dispatch}>
                {children}
            </SettingsDispatchContext.Provider>
        </SettingsContext.Provider>
    );

}

SettingsProvider.propTypes = {
    children: PropTypes.node.isRequired
};

export function useSettings() {
    const context = useContext(SettingsContext);
    if (context === undefined) {
        throw new Error('useSettings must be used within a SettingsProvider');
    }
    return context;
}

export function useSettingsDispatch() {
    const context = useContext(SettingsDispatchContext);
    if (context === undefined) {
        throw new Error('useSettingsDispatch must be used within a SettingsProvider');
    }
    return context;
}