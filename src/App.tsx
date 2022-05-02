import Dropdown, { IDropdownList } from './shared/components/Dropdown/Dropdown';
import { Calendar, TestQuery } from './shared/components';

import './App.css';
import { ErrorBoundary, TestStore } from 'components';
import { useState } from 'react';

const list: IDropdownList[] = [
  { value: 1 },
  {
    value: 2,
    list: [
      { value: 3 },
      {
        value: 4,
        list: [{ value: 5 }]
      }
    ]
  },
  { value: 3 }
];

const App = () => {
  console.log('Render: App');

  const [openNewStore, setOpenNewStore] = useState(false);

  return (
    <ErrorBoundary>
      <div className="App">
        <header className="App-header">
          <div className="store">
            <TestStore name="store 1" />
            <TestStore name="store 2" />
            {openNewStore && <TestStore name="store 3" />}
            {!openNewStore && (
              <button onClick={() => setOpenNewStore(true)}>
                Open new component with store
              </button>
            )}
          </div>
          <TestQuery />
          <Dropdown list={list}>drop</Dropdown>
          <Calendar />
        </header>
      </div>
    </ErrorBoundary>
  );
};

export default App;
