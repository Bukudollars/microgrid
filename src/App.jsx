import * as React from 'react';
import { SimulationProvider } from './contexts/SimulationContext';  
import { SettingsProvider } from './contexts/SettingsContext';
import Dashboard from './dashboard/Dashboard';
import { HashRouter } from 'react-router-dom';


export default function App() {
  return (
    <HashRouter>
      <SettingsProvider>
        <SimulationProvider>
          <Dashboard />
        </SimulationProvider>
      </SettingsProvider>
    </HashRouter>
    
    
  );
}