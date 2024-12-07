import { useState } from 'react';
import Lists from './Problem7Components/Lists';
import SelectedValue from './Problem7Components/Selected';
import data from './problem7_mock_data.json';

//Create Context here

export default function Problem7() {
  const [selectedData, setSelectedData] = useState({});

  return (
    <>
      <p>Apply UseContext here</p>

      <div style={{ display: 'block' }}>
        <SelectedValue />
      </div>
      <div style={{ display: 'block' }}>
        <Lists />
      </div>
    </>
  );
}
