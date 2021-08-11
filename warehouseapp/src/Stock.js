import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import CameraIcon from '@material-ui/icons/PhotoCamera';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';

import { useState, useEffect, Fragment } from "react";
import firebase from "./firebase";

import CustomizedDialogs from './CustomDialog';
import RegistrationForm from './editForm'
import EditItem from './editItem';
import SearchBar from './searchBar';
import Fuse from "fuse.js";


function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    icon: {
        marginRight: theme.spacing(2),
    },
    heroContent: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(8, 0, 6),
    },
    heroButtons: {
        marginTop: theme.spacing(4),
    },
    cardGrid: {
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(8),
    },
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    cardMedia: {
        paddingTop: '56.25%', // 16:9
    },
    cardContent: {
        flexGrow: 1,
    },
    footer: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(6),
    },
    buttonAlignement: {
        paddingTop: '56.25%',
    }
}));


export default function Album(props) {
    const classes = useStyles();


    const [products, setProducts] = useState([]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState("");
    const [quantity, setQuantity] = useState("");
    const [reservation, setReservation] = useState("");
    const [sold, setSold] = useState("");
    const [file, setFile] = useState(null);
    const [url, setURL] = useState("");

    const ref = firebase.firestore().collection("products");

    //REALTIME GET FUNCTION
    function getProducts() {
        setLoading(true);
        ref.onSnapshot((querySnapshot) => {
            const items = [];
            querySnapshot.forEach((doc) => {
                items.push(doc.data());
            });
            setProducts(items);
            setLoading(false);
        });
    }

    useEffect(() => {
        getProducts();
        // eslint-disable-next-line
    }, []);

    const searchData = (pattern) => {
        console.log(pattern)
        if (!pattern) {
            getProducts();
            return;
        }

        const fuse = new Fuse(products, {
            keys: ["name"],
        });

        const result = fuse.search(pattern);
        const matches = [];
        if (!result.length) {
            setProducts([]);
        } else {
            result.forEach(({ item }) => {
                matches.push(item);
            });
            setProducts(matches);
        }
    };


    return (
        <React.Fragment>
            <CssBaseline />
            <main>
                <SearchBar
                    placeholder="Search"
                    onChange={(e) => searchData(e.target.value)}
                />
                <Container className={classes.cardGrid} maxWidth="md">
                    {/* End hero unit */}
                    <Grid container spacing={4}>
                        <Grid item xs={3} sm={6} md={4}>
                            <Card className={classes.card}>
                                <CardContent style={{
                                    paddingTop: '50%',
                                }} className={classes.cardContent}>
                                    <Button
                                        size="small" color="primary">
                                        <CustomizedDialogs title="Add item"/>
                                        
                                    </Button>
                                </CardContent>

                            </Card>
                        </Grid>
                        {products.map((card) => (
                            <Grid item key={card} xs={12} sm={6} md={4}>
                                <Card className={classes.card}>
                                    <CardMedia
                                        className={classes.cardMedia}
                                        image={card.url}
                                        title="Image title"
                                    />
                                    <CardContent className={classes.cardContent}>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            {card.name}
                                        </Typography>
                                        <Typography >
                                            Available: {card.quantity}
                                        </Typography>
                                        <Typography>
                                            Reserved: {card.reservation}
                                        </Typography>
                                        <Typography>
                                            Sold: {card.sold}
                                        </Typography>
                                        <Button size="small" color="primary">
                                            <CustomizedDialogs title="Manage stock" product={card} />
                                                
                                        </Button>
                                    </CardContent>

                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </main>
            {/* Footer */}
            <footer className={classes.footer}>
                <Typography variant="h6" align="center" gutterBottom>
                    Warehouse app
                </Typography>
                <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
                    The best place to track your supplies.
                </Typography>
                <Copyright />
            </footer>
            {/* End footer */}
        </React.Fragment >
    );
}
