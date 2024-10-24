import React, {createContext, useReducer, useContext} from 'react';
import PropTypes from 'prop-types';
import { GENERATOR_SIZES, MODULE_TYPES, LOAD_PROFILE_OPTIONS, SITE_FREQUENCY_OPTIONS } from '../constants';

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
    essModuleType: MODULE_TYPES[0],
    //load settings
    loadPeakLevel: 800,
    loadProfile: LOAD_PROFILE_OPTIONS[0],
    //site settings
    siteFrequency: SITE_FREQUENCY_OPTIONS[0],
    siteVAC: 480,
    //utility settings
    exportLimit: 200,
    cloudingFactor: 0,
    isPresent: false,
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
        case 'SET_ESS_MODULE_TYPE':
            if (MODULE_TYPES.includes(action.payload)) {
                return {...state, essModuleType: action.payload};
            } else {
                console.error("Invalid module type: ", action.payload);
                return state;
            }
        case 'SET_LOAD_PEAK_LEVEL':
            return {...state, loadPeakLevel: action.payload};
        case 'SET_LOAD_PROFILE':
            if (LOAD_PROFILE_OPTIONS.includes(action.payload)) {
                return {...state, loadProfile: action.payload};
            } else {
                console.error("Invalid load profile: ", action.payload);
                return state;
            }
        case 'SET_SITE_FREQUENCY':
            if (SITE_FREQUENCY_OPTIONS.includes(action.payload)) {
                return {...state, siteFrequency: action.payload};
            } else {
                console.error("Invalid site frequency: ", action.payload);
                return state;
            }
        case 'SET_SITE_VAC':
            return {...state, siteVAC: action.payload};
        case 'SET_EXPORT_LIMIT':
            return {...state, exportLimit: action.payload};
        case 'SET_CLOUDING_FACTOR':
            if (Number.isInteger(action.payload) && action.payload >= 0 && action.payload <= 100) {
                return { ...state, cloudingFactor: action.payload };
            } else {
                console.error("Invalid clouding factor: ", action.payload);
                return state;
            }
        case 'SET_IS_PRESENT':
            return { ...state, isPresent: action.payload };
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
