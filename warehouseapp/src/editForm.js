import React, { useState, useEffect, Fragment } from "react";
import { Grid, Paper, Button, Typography } from '@material-ui/core'
import { TextField } from '@material-ui/core'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { storage } from "./firebase";

import firebase from "./firebase";
import { v4 as uuidv4 } from "uuid";

const RegistrationForm = () => {
    const ref = firebase.firestore().collection("products");

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState("");
    const [quantity, setQuantity] = useState("");
    const [reservation, setReservation] = useState("");
    const [sold, setSold] = useState("");
    const [file, setFile] = useState(null);
    const [url, setURL] = useState("");

    const paperStyle = { padding: '0 15px 40px 15px', width: 250, }
    const btnStyle = { marginTop: 10 }
    const phoneRegExp = /^[2-9]{2}[0-9]{8}/
    const passwordRegExp = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
    const initialValues = {
        name: 'Name',
        email: '',
        available: '5',
        reserved: '2',
        password: '',
        confirmPassword: ''
    }
    const validationSchema = Yup.object().shape({
        name: Yup.string().min(3, "It's too short").required("Required"),
        email: Yup.string().email("Enter valid email").required("Required"),
        available: Yup.number().typeError("Enter valid stock availabilty").required("Required"),
        reserved: Yup.number().typeError("Enter valid reservation number").required("Required"),
        //available: Yup.string().matches(phoneRegExp, "Enter valid Phone number").required("Required"),
        password: Yup.string().min(8, "Minimum characters should be 8")
            .matches(passwordRegExp, "Password must have one upper, lower case, number, special symbol").required('Required'),
        confirmPassword: Yup.string().oneOf([Yup.ref('password')], "Password not matches").required('Required')
    })
    const onFileChange = (e) => {
        setFile(e.target.files[0])
    }
    const onSubmit = (values, props) => {

        alert(JSON.stringify(values), null, 2)
        props.resetForm()
    }


    // ADD FUNCTION
    function addSchool(newSchool) {
        ref
            //.doc() use if for some reason you want that firestore generates the id
            .doc(newSchool.id)
            .set(newSchool)
            .catch((err) => {
                console.error(err);
            });
    }



    function handleUpload(e) {
        e.preventDefault();
        const ref = storage.ref(`/images/${file.name}`);
        const uploadTask = ref.put(file);
        uploadTask.on("state_changed", console.log, console.error, () => {
            ref
                .getDownloadURL()
                .then((url) => {
                    setFile(null);
                    setURL(url);
                    addSchool({ name, quantity, reservation, sold, url, id: uuidv4() })
                });
        });
    }

    const handleSubmit = (e) => {
        handleUpload(e)
        // addSchool({ name, quantity, reservation, sold, url, id: uuidv4() })
    }

    return (
        <Grid>
            <Paper elevation={0} style={paperStyle}>
                <Grid align='center'>
                    <Typography variant='caption'>Fill the form to edit availability.</Typography>
                </Grid>
                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                    {(props) => (
                        <Form noValidate>
                            {/* <TextField label='Name' name="name" fullWidth value={props.values.name}
                    onChange={props.handleChange} /> */}
                            <input type="file" onChange={onFileChange} />
                            <Field as={TextField} name='name' label='Name' fullWidth
                                value={name} onChange={(e) => setName(e.target.value)}
                                error={props.errors.name && props.touched.name}
                                helperText={<ErrorMessage name='name' />} required />

                            {/* <TextField label='Email' name='email' type='Email' fullWidth 
                    {...props.getFieldProps('email')}/> */}

                            <Field as={TextField} name="quantity" label='Available' fullWidth
                                value={quantity} onChange={(e) => setQuantity(e.target.value)}
                                error={props.errors.quantity && props.touched.quantity}
                                helperText={<ErrorMessage name='quantity' />} required />

                            <Field as={TextField} name="reservation" label='Reserved' fullWidth
                                value={reservation} onChange={(e) => setReservation(e.target.value)}
                                error={props.errors.reservation && props.touched.reservation}
                                helperText={<ErrorMessage name='reservation' />} required />

                            <Field as={TextField} name="sold" label='Sold' fullWidth
                                value={sold} onChange={(e) => setSold(e.target.value)}
                                error={props.errors.sold && props.touched.sold}
                                helperText={<ErrorMessage name='sold' />} required />

                            <Button type='submit' style={btnStyle} variant='contained'
                                onClick={handleSubmit}
                                color='primary'>Save changes</Button>

                        </Form>
                    )}
                </Formik>
            </Paper>
        </Grid>
    )
}

export default RegistrationForm;