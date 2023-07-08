import React from 'react';
import { Grid, Paper, Button, Typography, Input } from '@material-ui/core';
import { TextField} from '@material-ui/core';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Location from "../components/Location";
import { Label } from '@material-ui/icons';
import "../styles/AddressBook.css";
import { collection,addDoc , getDocs,getDoc,updateDoc, doc,query, where, } from 'firebase/firestore/lite'; 
import { UserAuth } from "../context/AuthContext";
import { db } from "../firebase";
import { useState,useEffect } from "react";


const EditAddressForm = () => {
  // const paperStyle = { padding: '0 15px 40px 15px', width: 200 };
  const btnStyle = { marginTop: 50 };
  const phoneRegExp = /^[0]{1}[0-9]{9}/;
  const passwordRegExp = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
  const initialValues = {
    name: '',
    phoneNumber: '',
    province: '',
    district: '',
    ward: '',
  };
  const validationSchema = Yup.object().shape({
    name: Yup.string().min(3, "It's too short").required("Required"),
    phoneNumber: Yup.string().matches(phoneRegExp, "Enter valid Phone number").required("Required"),
    password: Yup.string().min(8, "Minimum characters should be 8")
      .matches(passwordRegExp, "Password must have one uppercase, lowercase, number, and special symbol")
      .required('Required'),
    confirmPassword: Yup.string().oneOf([Yup.ref('password')], "Password does not match").required('Required')
  });

  const onSubmit = (values, props) => {
    alert(JSON.stringify(values, null, 2));
    props.resetForm();
  };
  // const handleLocationChange = (values, setFieldValue) => {
  //   // Update the state with the selected location values
  //   setFieldValue('province', values.province);
  //   setFieldValue('district', values.district);
  //   setFieldValue('ward', values.ward);
  //   console.log("setFieldValue",setFieldValue);
  // };
  const [locationData, setLocationData] = useState(null);
  const handleLocationChange = (locationData) => {
    const { province, district, ward, wardText } = locationData;
    console.log('Selected Province:', province);
    console.log('Selected District:', district);
    console.log('Selected Ward:', ward);
    console.log('Selected Ward Text:', wardText);
  };
// Thêm vô firebase
const { user } = UserAuth();
    const [idUser, setIdUser] = useState('');
    // console.log("user_id",user&&user.idUser);
    const [email,setEmail]  = useState('');
    const [userinfo,setUser]  = useState();

    // const SetEmails = () => {
    //     setEmail(user&&user.idUser);
    // };
   
    useEffect(() => {
        if (user) {
          setEmail(user.email);
        }
      }, [user]);
    
    const UserQuery = async () => {
      
        const q = query(collection(db, "users"), where("email", "==", email));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
            const doc = querySnapshot.docs[0];
            setUser(doc.data());
            console.log("userinfo: ", userinfo);
        }
    };
    useEffect(() => {
        if (email) {
          UserQuery();
        }
      }, [email]);

      const handleAddAddress = async (props, locationData) => {
        try {
            // UserQuery();
            // if (!userinfo) {
            //     setShowNotiLogin(true);
            //     setTimeout(() => {
            //         setShowNotiLogin(false);
            //     }, 3000);
            //     return;
            //   }

            const { name, phoneNumber } = props.values;
            const { province, district, ward } = locationData;
            const newAddress = {
     
                idAddress: "",
                iduser: userinfo.idUser,
                name:name,
                phoneNumber:phoneNumber,
                province:province,
                district:district,
                ward:ward,
                used:false
            };
                const AddressCol = collection(db, "Address");
                const docRef = await addDoc(AddressCol, newAddress);
                const generatedId = docRef.id;
                await updateDoc(doc(db, "Address", generatedId), {  idAddress: generatedId });

                console.log("cart created successfully!");
        } catch (error) {
            console.error("Error creating order:", error);
        }
        // setShowNoti(true);
        // setTimeout(() => {
        //     setShowNoti(false);
        // }, 3000);
    };

    
  
  return (
    <Grid className='EditAddress'>
      <Paper elevation={0}>
        <Grid >
          <Typography variant='caption'>Điền đầy đủ thông tin bên dưới</Typography>
        </Grid>
          
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
          {(props) => (
            <Form noValidate>
              <div className='general_div'>
                <label className='label_input'>Tên người nhận: </label>
                <Field className='field' as={TextField} name='name' variant='outlined'
                  error={props.errors.name && props.touched.name}
                  helperText={<ErrorMessage name='name' />} required />
              </div>
              
              <div className='general_div'>
                <label className='label_input'>Số điện thoại: </label>
                <Field className='field' id = 'fieldnumber' as={TextField} variant='outlined' name="phoneNumber"
                  error={props.errors.phoneNumber && props.touched.phoneNumber}
                  helperText={<ErrorMessage name='phoneNumber' />} required />
              </div>
               
              {/* <Location {...props} /> */}
              <Location
              values={props.values}
              setFieldValue={props.setFieldValue}
              initialProvinces={[]}
              initialDistricts={[]}
              initialWards={[]}
              // onLocationChange={handleLocationChange}
              onLocationChange={(locationData) => setLocationData(locationData)}
            />


            <Button type='submit' style={btnStyle} variant='contained' color='primary' onClick={() => handleAddAddress(props, locationData)}>Lưu</Button>
            </Form>
          )}
        </Formik>
      </Paper>
    </Grid>
  );
};

export default EditAddressForm;
