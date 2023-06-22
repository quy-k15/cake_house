import React from 'react';
import { Grid, Paper, Button, Typography } from '@material-ui/core';
import { TextField } from '@material-ui/core';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Location from "../components/Location";

const EditAddressForm = () => {
  const paperStyle = { padding: '0 15px 40px 15px', width: 250 };
  const btnStyle = { marginTop: 50 };
  const phoneRegExp = /^[0]{1}[0-9]{9}/;
  const passwordRegExp = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
  const initialValues = {
    name: '',
    phoneNumber: '',
    password: '',
    confirmPassword: ''
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
    <Grid>
      <Paper elevation={0} style={paperStyle}>
        <Grid align='center'>
          <Typography variant='caption'>Fill the form to create an account</Typography>
        </Grid>
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
          {(props) => (
            <Form noValidate>
              <Field as={TextField} name='name' variant='outlined' label='Name' fullWidth
                error={props.errors.name && props.touched.name}
                helperText={<ErrorMessage name='name' />} required />

              <Field as={TextField} variant='outlined' name="phoneNumber" label='Phone Number' fullWidth
                error={props.errors.phoneNumber && props.touched.phoneNumber}
                helperText={<ErrorMessage name='phoneNumber' />} required />

              <Location {...props} />

              <Button type='submit' style={btnStyle} variant='contained' color='primary'>Hoàn thành</Button>
            </Form>
          )}
        </Formik>
      </Paper>
    </Grid>
  );
};

export default EditAddressForm;
