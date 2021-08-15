import * as Yup from 'yup'

import React, { useState } from "react";
import { Grid, Paper, Button, Typography } from '@material-ui/core'
import { TextField } from '@material-ui/core'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { storage } from "../../services/firebase";
import { v4 as uuidv4 } from "uuid";

import firebase from "../../services/firebase";

const AddForm = ({ handleClose }) => {
    const ref = firebase.firestore().collection("products");

    const [name, setName] = useState("");
    const [code, setCode] = useState("");
    const [quantity, setQuantity] = useState("");
    const [reservation, setReservation] = useState("");
    const [sold, setSold] = useState("");
    const [file, setFile] = useState(null);
    const [url, setURL] = useState("");

    const paperStyle = { padding: '0 15px 40px 15px', width: 250, }
    const btnStyle = { marginTop: 10 }

    const validationSchema = Yup.object().shape({
        name: Yup.string().min(3, "It's too short").required("Required"),
        code: Yup.number().typeError("Enter valid stock availabilty").required("Required"),
        quantity: Yup.number().typeError("Enter valid stock availabilty").required("Required"),
        reservation: Yup.number().typeError("Enter valid reservation number").required("Required"),
        sold: Yup.number().typeError("Enter valid reservation number").required("Required"),
    })
    const onFileChange = (e) => {
        setFile(e.target.files[0])
    }

    // ADD FUNCTION
    function addItem(newItem) {
        ref
            .doc(newItem.id)
            .set(newItem)
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
                    addItem({ name, code, quantity, reservation, sold, url, id: uuidv4() })
                    handleClose()
                });
        });
    }

    const handleSubmit = (e) => {
        handleUpload(e)
    }


    return (
        <Grid>
            <Paper elevation={0} style={paperStyle}>
                <Grid align='center'>
                    <Typography variant='caption'>Fill the form to add item.</Typography>
                </Grid>
                <Formik validationSchema={validationSchema}>
                    {(props) => (
                        <Form noValidate>
                            <input type="file" onChange={onFileChange} />
                            <Field as={TextField} name='name' label='Name' fullWidth
                                value={name} onChange={(e) => setName(e.target.value)}
                                error={props.errors.name && props.touched.name}
                                helperText={<ErrorMessage name='name' />} required />

                            <Field as={TextField} name='code' label='Code' fullWidth
                                value={code} onChange={(e) => setCode(e.target.value)}
                                error={props.errors.code && props.touched.code}
                                helperText={<ErrorMessage name='code' />} required />

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

                            <Button type='submit' style={btnStyle} variant='contained' color='primary'
                                onClick={handleSubmit}>Save changes</Button>
                        </Form>
                    )}
                </Formik>
            </Paper>
        </Grid>
    )
}

export default AddForm;