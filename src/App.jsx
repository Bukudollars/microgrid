import * as React from 'react';
import { SimulationProvider } from './contexts/SimulationContext';  
import { SettingsProvider } from './contexts/SettingsContext';
import Dashboard from './dashboard/Dashboard2';


export default function App() {
  return (
    <SettingsProvider>
      <SimulationProvider>
        <Dashboard />
      </SimulationProvider>
    </SettingsProvider>
    
  );
}