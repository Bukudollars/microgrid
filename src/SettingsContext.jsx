import React, {createContext, useReducer, useContext} from 'react';
import PropTypes from 'prop-types';

const SettingsContext = createContext();
const SettingsDispatchContext = createContext();

const initialState = {
    generatorCount: 1,
    pvPeakSize: 1,
};

function settingsReducer(state, action) {
    switch (action.type) {
        case 'SET_GENERATOR_COUNT':
            return {...state, generatorCount: action.payload};
        case 'SET_PV_PEAK_SIZE':
            return {...state, pvPeakSize: action.payload};
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