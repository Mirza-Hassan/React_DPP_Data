import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ElectricityConsumption from './component/ElectricityConsumption';
import DppForm from './component/DppForm';
import DataDisplay from './component/DisplayDpp';

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    if (!data) {
      async function fetchData() {
        try {
          const response = await axios.get('http://localhost:3001/api/dpp');
          setData(response.data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }
      fetchData();
    }
  }, []);

  const addData = (newData) => {
    setData([...data, newData]);
  };

  return (
    <div>
      <ElectricityConsumption />
      <DppForm addData={addData} />
      <DataDisplay data={data} />
    </div>
  );
}

export default App;
