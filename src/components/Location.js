import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Input } from '@material-ui/core';
import { TextField, Field} from '@material-ui/core';
import "../styles/AddressBook.css";



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

  // Gửa địa chia qua conponent  EditAddressForm:
  

  return (
    <div className='location_div'>
      <div className='general_div'>
        <label className='label_input' htmlFor="province">Tỉnh/Thành phố:</label>
        <select
          id="province"
          value={values.province}
          onChange={handleProvinceChange}
        >
          <option value="">Chọn</option>
          {provinces.map((province) => (
            <option key={province.code} value={province.code}>
              {province.name}
            </option>
          ))}
        </select>
        <br></br>
      </div>
      
      <div className='general_div'>
        <label className='label_input' htmlFor="district">Quận/Huyện/Thị xã/Thành phố:</label>
        <select
          id="district"
          value={values.district}
          onChange={handleDistrictChange}
          disabled={!values.province}
        >
          <option value="">Chọn</option>
          {districts.map((district) => (
            <option key={district.code} value={district.code}>
              {district.name}
            </option>
          ))}
        </select>
        <br></br>
      </div>
      
      <div>
        <label htmlFor="ward">Địa chỉ cụ thể (Đường, số nhà, thôn, Xã/Phường/Thị trấn):</label>
        <TextField className='TextFieldWard' variant='outlined' multiline rows={3}></TextField>
      </div>

      {/* <Field as={TextField} name='ward' variant='outlined' /> */}
                {/* // error={props.errors.name && props.touched.name}
                // helperText={<ErrorMessage name='name' />} required /> */}
      {/* <select
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
      </select> */}

    </div>
  );
};

export default Location;
