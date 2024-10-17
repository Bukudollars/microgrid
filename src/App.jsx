import * as React from 'react';
import DashboardLayoutBasic from './dashboard/Dashboard';
import { SimulationProvider } from './contexts/SimulationContext';  


export default function App() {
  return (
    <SimulationProvider>
      <DashboardLayoutBasic />
    </SimulationProvider>
      
  );
}