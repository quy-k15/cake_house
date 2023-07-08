import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Input } from '@material-ui/core';
import { TextField, Field} from '@material-ui/core';
import "../styles/AddressBook.css";




const Location = ({
  values,
  setFieldValue,
  initialProvinces,
  initialDistricts,
  initialWards,
  onLocationChange
}) => {
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [provinceName, setProvinceName] = useState('');
  const [districtName, setDistrictName] = useState('');
  const [wardValue, setWardValue] = useState('');
  // const [provinces, setProvinces] = useState([]);
  // const [districts, setDistricts] = useState([]);
  // const [wards, setWards] = useState([]);
  // const getlocation = async () => {
  //   setProvincesname(provinces.name);
    

  // }

  useEffect(() => {
    fetchProvinces();
  }, []);

  const fetchProvinces = () => {
    axios
      .get('https://provinces.open-api.vn/api/')
      .then((response) => {
        setProvinces(response.data);
        // console.log("provinces",provinces)
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
        // console.log("districts",districts)
        setWards([]); // Reset the wards when changing the district
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  // const fetchWards = (districtId) => {
  //   axios
  //     .get(`https://provinces.open-api.vn/api/districts/${districtId}/wards`)
  //     .then((response) => {
  //       setWards(response.data);
  //     })
  //     .catch((error) => {
  //       console.error('Error:', error);
  //     });
  // };

  const handleProvinceChange = (e) => {
    const selectedProvinceId = e.target.value;
    const selectedProvince = provinces.find((province) => province.code.toString() === selectedProvinceId.toString());
    
    setFieldValue('province', selectedProvinceId);
    setFieldValue('district', '');
    setFieldValue('ward', '');
    setDistricts([]);
    setWards([]);
    // console.log("selectedProvinceId",selectedProvinceId)
    // console.log("selectedProvince",selectedProvince)
    
    if (selectedProvinceId) {
      fetchDistricts(selectedProvinceId);
      setProvinceName(selectedProvince ? selectedProvince.name : '');
    } else {
      setProvinceName('');
    }
    
    onLocationChange({
      province: selectedProvince ? selectedProvince.name : '',
      district: '',
      ward: '',
      wardText: ''
    });
  };

  const handleDistrictChange = (e) => {
    const selectedDistrictId = e.target.value;
    const selectedDistrict = districts.find((district) => district.code.toString() === selectedDistrictId.toString());
    
    setFieldValue('district', selectedDistrictId);
    setFieldValue('ward', '');
    setWards([]);
    
    if (selectedDistrictId) {
      setDistrictName(selectedDistrict ? selectedDistrict.name : '');
    } else {
      setDistrictName('');
    }
    
    onLocationChange({
      province: provinceName,
      district: selectedDistrict ? selectedDistrict.name : '',
      ward: null,
      wardText: ''
    });
  };

  

  
  

  // const handleWardChange = (e) => {
  //   const selectedWardId = e.target.value;
  //   setFieldValue('ward', selectedWardId);
  //   onLocationChange({
  //     province: values.province,
  //     district: values.district,
  //     ward: selectedWardId,
  //     wardText: values.ward,
  //   });
  // };
  const handleWardChange = (e) => {
    const selectedWardValue = e.target.value;
    setFieldValue('ward', selectedWardValue);
    setWardValue(selectedWardValue);

    onLocationChange({
      province: provinceName,
      district: districtName,
      ward: selectedWardValue,
      wardText: ''
    });
  };
 

  // Gửa địa chia qua conponent  EditAddressForm:
  // useEffect(() => {
  //   fetchProvinces();
  // }, []);

  // const fetchProvinces = () => {
  //   axios
  //     .get('https://provinces.open-api.vn/api/')
  //     .then((response) => {
  //       setProvinces(response.data);
  //     })
  //     .catch((error) => {
  //       console.error('Error:', error);
  //     });
  // };

  // const fetchDistricts = (provinceId) => {
  //   axios
  //     .get(`https://provinces.open-api.vn/api/p/${provinceId}?depth=2`)
  //     .then((response) => {
  //       const { districts } = response.data;
  //       setDistricts(districts);
  //       setWards([]); // Reset the wards when changing the district
  //     })
  //     .catch((error) => {
  //       console.error('Error:', error);
  //     });
  // };

  // const fetchWards = (districtId) => {
  //   axios
  //     .get(`https://provinces.open-api.vn/api/districts/${districtId}/wards`)
  //     .then((response) => {
  //       setWards(response.data);
  //     })
  //     .catch((error) => {
  //       console.error('Error:', error);
  //     });
  // };

  // const handleProvinceChange = (e) => {
  //   const selectedProvinceId = e.target.value;
  //   setFieldValue('province', selectedProvinceId);
  //   setFieldValue('district', '');
  //   setFieldValue('ward', '');
  //   setDistricts([]);
  //   setWards([]);

  //   if (selectedProvinceId) {
  //     fetchDistricts(selectedProvinceId);
  //   }
  // };

  // const handleDistrictChange = (e) => {
  //   const selectedDistrictId = e.target.value;
  //   setFieldValue('district', selectedDistrictId);
  //   setFieldValue('ward', '');
  //   setWards([]);

  //   if (selectedDistrictId) {
  //     fetchWards(selectedDistrictId);
  //   }
  // };

  // const handleWardChange = (e) => {
  //   const selectedWardId = e.target.value;
  //   setFieldValue('ward', selectedWardId);
  // };

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
          {/* {provinces.map((province) => (
            <option key={province.code} value={province.code}>
              {province.name}
            </option>
          ))} */}
           {provinces && provinces.map((province) => (
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
          {/* {districts.map((district) => (
            <option key={district.code} value={district.code}>
              {district.name}
            </option>
          ))} */}
              {districts && districts.map((district) => (
                <option key={district.code} value={district.code}>
                {district.name}
            </option>
          ))}
        </select>
        <br></br>
      </div>
      
      <div>
        <label htmlFor="ward">Địa chỉ cụ thể (Đường, số nhà, thôn, Xã/Phường/Thị trấn):</label>
        <TextField className='TextFieldWard' variant='outlined' multiline rows={3}  value={values.ward}
          onChange={handleWardChange}
          disabled={!values.district}></TextField>
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
