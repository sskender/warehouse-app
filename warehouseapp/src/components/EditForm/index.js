import React, { useState, useEffect, Fragment } from "react";
import { Grid, Paper, Button, Typography } from '@material-ui/core'
import { TextField } from '@material-ui/core'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'

import firebase from "../../services/firebase";

const EditFrom = ({ product, handleClose }) => {

    const ref = firebase.firestore().collection("products");

    const [loading, setLoading] = useState(false);
    const [name, setName] = useState(product.name);
    const [code, setCode] = useState(product.code);
    const [quantity, setQuantity] = useState(product.quantity);
    const [reservation, setReservation] = useState(product.reservation);
    const [sold, setSold] = useState(product.sold);

    const paperStyle = { padding: '0 15px 40px 15px', width: 250, }
    const btnStyle = { marginTop: 10 }

    const initialValues = {
        name: '',
        code: '',
        available: '',
        quantity: '',
        reservation: '',
        sold: '',
    }
    const validationSchema = Yup.object().shape({
        name: Yup.string().min(3, "It's too short").required("Required"),
        code: Yup.number().typeError("Enter valid item code").required("Required"),
        quantity: Yup.number().typeError("Enter valid stock availabilty").required("Required"),
        reservation: Yup.number().typeError("Enter valid reservation number").required("Required"),
        sold: Yup.number().typeError("Enter valid reservation number").required("Required"),
    })


    // EDIT FUNCTION
    function editItem(updatedItem) {
        setLoading();
        ref
            .doc(updatedItem.id)
            .update(updatedItem)
            .catch((err) => {
                console.error(err);
            });
    }


    return (
        <Grid>
            <Paper elevation={0} style={paperStyle}>
                <Grid align='center'>
                    <Typography variant='caption'>Fill the form to edit availability.</Typography>
                </Grid>
                <Formik initialValues={initialValues} validationSchema={validationSchema} >
                    {(props) => (
                        <Form noValidate>
                            <Field as={TextField} name='name' label='Name' fullWidth
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required />

                            <Field as={TextField} name="code" label='Code' fullWidth
                                value={code}
                                onChange={(e) => setCode(e.target.value)}
                                required />

                            <Field as={TextField} name="quantity" label='Available' fullWidth
                                value={quantity}
                                onChange={(e) => setQuantity(e.target.value)}
                                required />


                            <Field as={TextField} name="reservation" label='Reserved' fullWidth
                                value={reservation}
                                onChange={(e) => setReservation(e.target.value)}
                                required />

                            <Field as={TextField} name="sold" label='Sold' fullWidth
                                value={sold}
                                onChange={(e) => setSold(e.target.value)}
                                required />


                            <Button type='submit' style={btnStyle} variant='contained'
                                onClick={() => {
                                    editItem({ name, code, quantity, reservation, sold, id: product.id });
                                    handleClose();
                                }
                                }
                                color='primary'>Save changes</Button>

                        </Form>
                    )}
                </Formik>
            </Paper>
        </Grid >
    )
}

export default EditFrom;