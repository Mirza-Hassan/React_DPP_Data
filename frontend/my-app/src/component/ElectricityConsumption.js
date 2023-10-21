import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/ElectricityConsumption.css';

function ElectricityConsumption() {
  const [csvData, setCsvData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;

  useEffect(() => {
    axios.get('http://localhost:3001/csv')
      .then((response) => {
        setCsvData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching CSV data:', error);
      });
  }, []);

  const paginateData = () => {
    const startIndex = (currentPage - 1) * recordsPerPage;
    const endIndex = startIndex + recordsPerPage;
    return csvData.slice(startIndex, endIndex);
  };

  const calculateRenewablePercentage = () => {
    if (csvData.length === 0) return 'Data is empty';
    let totalElectricityConsumption = 0;
    let renewableElectricityConsumption = 0;
    csvData.forEach((row, index) => {
      const totalElectricity = parseFloat(row.total_elec_cons_kw);
      const renewableElectricity = parseFloat(row.solar_elec_cons_kw);
      const gridElectricity = parseFloat(row.grid_elec_cons_kw);
      if (!isNaN(totalElectricity) && !isNaN(renewableElectricity) && !isNaN(gridElectricity)) {
        totalElectricityConsumption += totalElectricity;
        renewableElectricityConsumption += renewableElectricity;
      } else {
        console.error(`Error at row ${index + 2}: Invalid data in CSV`);
      }
    });
    if (totalElectricityConsumption === 0) return 'Total consumption is 0';
    const percentageRenewable = (renewableElectricityConsumption / totalElectricityConsumption) * 100;
    return `${percentageRenewable.toFixed(2)}%`;
  };

  return (
    <div className="electricity-container">
      <h2>Hydrogen Production & Electricity Consumption Analysis</h2>
      <table className="electricity-table">
        <thead>
          <tr>
            <th>Time</th>
            <th>H2 Production (kg)</th>
            <th>Total Electric Consumption (kW)</th>
            <th>Grid Electric Consumption (kW)</th>
            <th>Solar Electric Consumption (kW)</th>
          </tr>
        </thead>
        <tbody>
          {paginateData().map((row, index) => (
            <tr key={index}>
              <td>{row.time}</td>
              <td>{row.h2_prod_kg}</td>
              <td>{row.total_elec_cons_kw}</td>
              <td>{row.grid_elec_cons_kw}</td>
              <td>{row.solar_elec_cons_kw}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination-buttons">
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous Page
        </button>
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage * recordsPerPage >= csvData.length}
        >
          Next Page
        </button>
      </div>
      <div>
        <h3>Percentage of Renewable Electricity Consumption:</h3>
        <p className="percentage">{calculateRenewablePercentage()}</p>
      </div>
    </div>
  );
}

export default ElectricityConsumption;
