import * as React from 'react';
import { SimulationProvider } from './contexts/SimulationContext';  
import { SettingsProvider } from './contexts/SettingsContext';
import Dashboard from './dashboard/Dashboard';
import { BrowserRouter as Router } from 'react-router-dom';


export default function App() {
  return (
    <Router basename='/microgrid/'>
      <SettingsProvider>
        <SimulationProvider>
          <Dashboard />
        </SimulationProvider>
      </SettingsProvider>
    </Router>
    
    
  );
}