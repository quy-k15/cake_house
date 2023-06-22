import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Location = ({ values, setFieldValue }) => {
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);

  useEffect(() => {
    fetchProvinces();
  }, []);

  const fetchProvinces = () => {
    axios
      .get('https://provinces.open-api.vn/api/')
      .then((response) => {
        setProvinces(response.data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const fetchDistricts = (provinceId) => {
    axios
      .get(`https://provinces.open-api.vn/api/p/${provinceId}?depth=2`)
      .then((response) => {
        const { districts } = response.data;
        setDistricts(districts);
        setWards([]); // Reset the wards when changing the district
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const fetchWards = (districtId) => {
    axios
      .get(`https://provinces.open-api.vn/api/districts/${districtId}/wards`)
      .then((response) => {
        setWards(response.data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const handleProvinceChange = (e) => {
    const selectedProvinceId = e.target.value;
    setFieldValue('province', selectedProvinceId);
    setFieldValue('district', '');
    setFieldValue('ward', '');
    setDistricts([]);
    setWards([]);

    if (selectedProvinceId) {
      fetchDistricts(selectedProvinceId);
    }
  };

  const handleDistrictChange = (e) => {
    const selectedDistrictId = e.target.value;
    setFieldValue('district', selectedDistrictId);
    setFieldValue('ward', '');
    setWards([]);

    if (selectedDistrictId) {
      fetchWards(selectedDistrictId);
    }
  };

  const handleWardChange = (e) => {
    const selectedWardId = e.target.value;
    setFieldValue('ward', selectedWardId);
  };

  return (
    <div>
      <label htmlFor="province">Province:</label>
      <select
        id="province"
        value={values.province}
        onChange={handleProvinceChange}
      >
        <option value="">Select</option>
        {provinces.map((province) => (
          <option key={province.code} value={province.code}>
            {province.name}
          </option>
        ))}
      </select>

      <label htmlFor="district">District:</label>
      <select
        id="district"
        value={values.district}
        onChange={handleDistrictChange}
        disabled={!values.province}
      >
        <option value="">Select</option>
        {districts.map((district) => (
          <option key={district.code} value={district.code}>
            {district.name}
          </option>
        ))}
      </select>

      <label htmlFor="ward">Ward:</label>
      <select
        id="ward"
        value={values.ward}
        onChange={handleWardChange}
        disabled={!values.district}
      >
        <option value="">Select</option>
        {wards.map((ward) => (
          <option key={ward.code} value={ward.code}>
            {ward.name}
          </option>
        ))}
      </select>

      <div>
        <h3>Selected Location:</h3>
        <p>Province: {values.province}</p>
        <p>District: {values.district}</p>
        <p>Ward: {values.ward}</p>
      </div>
    </div>
  );
};

export default Location;
