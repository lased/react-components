import { useState } from 'react';

import { TestStore } from 'components';

const ProtectedPage = () => {
  console.log('Render: Protected');

  const [openNewStore, setOpenNewStore] = useState(false);

  return (
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
  );
};

export default ProtectedPage;
