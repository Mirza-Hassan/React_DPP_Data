import React, { useState } from 'react';
import axios from 'axios';
import '../styles/DppForm.css';

function DppForm({ addData }) {
  const initialFormData = {
    startTime: '',
    endTime: '',
    hydrogenVolume: '',
    clientName: '',
  };

  const [inputData, setInputData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    setInputData({ ...inputData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
    setSuccessMessage('');
  };

  const validateForm = () => {
    const newErrors = {};

    if (!inputData.startTime.trim()) {
      newErrors.startTime = 'Start Time is required.';
    }
    if (!inputData.endTime.trim()) {
      newErrors.endTime = 'End Time is required.';
    }
    if (inputData.startTime && inputData.endTime) {
      if (new Date(inputData.endTime) <= new Date(inputData.startTime)) {
        newErrors.endTime = 'End Time must be greater than Start Time.';
      }
    }
    if (!inputData.hydrogenVolume.trim()) {
      newErrors.hydrogenVolume = 'Hydrogen Volume is required.';
    }
    if (!inputData.clientName.trim()) {
      newErrors.clientName = 'Client Name is required.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const response = await axios.post('http://localhost:3001/api/dpp/create', inputData);
        addData(response.data);
        setInputData(initialFormData);
        setSuccessMessage('Data successfully added.');
      } catch (error) {
        console.error('Error submitting data:', error);
        setSuccessMessage('');
      }
    }
  };

  return (
    <div className="dpp-form-container">
      <form className="dpp-form" onSubmit={handleSubmit}>
        <h1>Digital Product Passports (DPP)</h1>
        <label>
          Start Time:
          <input
            type="datetime-local"
            name="startTime"
            value={inputData.startTime}
            onChange={handleChange}
          />
          {errors.startTime && <p className="error">{errors.startTime}</p>}
        </label>
        <label>
          End Time:
          <input
            type="datetime-local"
            name="endTime"
            value={inputData.endTime}
            onChange={handleChange}
          />
          {errors.endTime && <p className="error">{errors.endTime}</p>}
        </label>
        <label>
          Hydrogen Volume (kg):
          <input
            type="number"
            name="hydrogenVolume"
            value={inputData.hydrogenVolume}
            onChange={handleChange}
            placeholder="Enter Hydrogen Volume"
          />
          {errors.hydrogenVolume && <p className="error">{errors.hydrogenVolume}</p>}
        </label>
        <label>
          Client Name:
          <input
            type="text"
            name="clientName"
            value={inputData.clientName}
            onChange={handleChange}
            placeholder="Enter Client Name"
          />
          {errors.clientName && <p className="error">{errors.clientName}</p>}
        </label>
        <button type="submit">Add Data</button>
        {successMessage && <p className="success-message">{successMessage}</p>}
      </form>
    </div>
  );
}

export default DppForm;
