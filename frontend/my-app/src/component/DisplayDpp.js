import React from 'react';
import '../styles/DisplayDpp.css';

function DataDisplay({ data }) {
  return (
    data.length > 0 ? (
      <div className="dpp-container">
        <h2 className="dpp-heading">Digital Product Passports Details</h2>
        <table className="data-table">
          <thead>
            <tr>
              <th className="table-header">Start Time</th>
              <th className="table-header">End Time</th>
              <th className="table-header">Hydrogen Volume (kg)</th>
              <th className="table-header">Client Name</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td>{item.startTime}</td>
                <td>{item.endTime}</td>
                <td>{item.hydrogenVolume}</td>
                <td>{item.clientName}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    ) : null
  );
}

export default DataDisplay;
