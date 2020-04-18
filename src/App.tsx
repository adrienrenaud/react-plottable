import './App.css';

import { ChartB } from './ChartB'
import React from 'react';

function App() {
  return (
    <div className="App">
      <ChartB data={[{x: 1, y: 1}, {x: 2, y: 2}]} />
    </div>
  );
}

export default App;
