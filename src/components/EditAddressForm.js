import React from 'react';
import { Grid, Paper, Button, Typography, Input } from '@material-ui/core';
import { TextField} from '@material-ui/core';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Location from "../components/Location";
import { Label } from '@material-ui/icons';
import "../styles/AddressBook.css";

const EditAddressForm = () => {
  // const paperStyle = { padding: '0 15px 40px 15px', width: 200 };
  const btnStyle = { marginTop: 50 };
  const phoneRegExp = /^[0]{1}[0-9]{9}/;
  const passwordRegExp = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
  const initialValues = {
    name: '',
    phoneNumber: '',
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
              <Location {...props} />

              <Button type='submit' style={btnStyle} variant='contained' color='primary'>Lưu</Button>
            </Form>
          )}
        </Formik>
      </Paper>
    </Grid>
  );
};

export default EditAddressForm;
