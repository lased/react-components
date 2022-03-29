import React from 'react';

import Dropdown, { IDropdownList } from './components/Dropdown/Dropdown';
import Calendar from './Calendar';

import './App.css';

const list: IDropdownList[] = [
  { value: 1 },
  {
    value: 2, list: [
      { value: 3 },
      {
        value: 4, list: [
          { value: 5 },
        ]
      },
    ]
  },
  { value: 3 },
]

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Dropdown list={list}>
          drop
        </Dropdown>
        {/* <Calendar /> */}
      </header>
    </div>
  );
}

export default App;
