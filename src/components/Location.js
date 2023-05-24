import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Location = () => {
  const [provinces, setProvinces] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState('');
  const [districts, setDistricts] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [wards, setWards] = useState([]);
  const [selectedWard, setSelectedWard] = useState('');

  useEffect(() => {
    fetchProvinces();
  }, []);

  const fetchProvinces = () => {
    axios.get('https://provinces.open-api.vn/api/')
      .then(response => {
        setProvinces(response.data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  const fetchDistricts = (provinceId) => {
    axios.get(`https://provinces.open-api.vn/api/p/${provinceId}/d`)
      .then(response => {
        setDistricts(response.data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  const fetchWards = (districtId) => {
    axios.get(`https://provinces.open-api.vn/api/d/${districtId}/w`)
      .then(response => {
        setWards(response.data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  const handleProvinceChange = (e) => {
    const selectedProvinceId = e.target.value;
    setSelectedProvince(selectedProvinceId);
    setSelectedDistrict('');
    setSelectedWard('');

    if (selectedProvinceId) {
      fetchDistricts(selectedProvinceId);
    } else {
      setDistricts([]);
    }
  };

  const handleDistrictChange = (e) => {
    const selectedDistrictId = e.target.value;
    setSelectedDistrict(selectedDistrictId);
    setSelectedWard('');

    if (selectedDistrictId) {
      fetchWards(selectedDistrictId);
    } else {
      setWards([]);
    }
  };

  const handleWardChange = (e) => {
    setSelectedWard(e.target.value);
  };

  return (
    <div>
      <label htmlFor="province">Province:</label>
      <select id="province" value={selectedProvince} onChange={handleProvinceChange}>
        <option value="">Select</option>
        {provinces.map(province => (
          <option key={province.code} value={province.code}>{province.name}</option>
        ))}
      </select>

      <label htmlFor="district">District:</label>
      <select id="district" value={selectedDistrict} onChange={handleDistrictChange} disabled={!selectedProvince}>
        <option value="">Select</option>
        {districts.map(district => (
          <option key={district.code} value={district.code}>{district.name}</option>
        ))}
      </select>

      <label htmlFor="ward">Ward:</label>
      <select id="ward" value={selectedWard} onChange={handleWardChange} disabled={!selectedDistrict}>
        <option value="">Select</option>
        {wards.map(ward => (
          <option key={ward.code} value={ward.code}>{ward.name}</option>
        ))}
      </select>

      <div>
        <h3>Selected Location:</h3>
        <p>Province: {selectedProvince}</p>
        <p>District: {selectedDistrict}</p>
        <p>Ward: {selectedWard}</p>
      </div>
    </div>
  );
};

export default Location;
