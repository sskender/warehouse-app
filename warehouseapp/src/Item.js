import React, { useState, useEffect, Fragment } from "react";
import firebase from "./firebase";
import { v4 as uuidv4 } from "uuid";

function Item() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState("");
    const [quantity, setQuantity] = useState("");

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

    //DELETE FUNCTION
    function deleteSchool(school) {
        ref
            .doc(school.id)
            .delete()
            .catch((err) => {
                console.error(err);
            });
    }

    // EDIT FUNCTION
    function editSchool(updatedSchool) {
        setLoading();
        ref
            .doc(updatedSchool.id)
            .update(updatedSchool)
            .catch((err) => {
                console.error(err);
            });
    }

    return (
        <Fragment>
            <h1>Products (SNAPSHOT)</h1>
            <div className="inputBox">
                <h3>Add New</h3>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <textarea value={quantity} onChange={(e) => setQuantity(e.target.value)} />
                <button onClick={() => addSchool({ name, quantity, id: uuidv4() })}>
                    Submit
                </button>
            </div>
            <hr />
            {loading ? <h1>Loading...</h1> : null}
            {products.map((school) => (
                <div className="school" key={school.id}>
                    <h2>{school.name}</h2>
                    <p>{school.quantity}</p>
                    <div>
                        <button onClick={() => deleteSchool(school)}>X</button>
                        <button
                            onClick={() =>
                                editSchool({ name: school.name, quantity, id: school.id })
                            }
                        >
                            Edit
                        </button>
                    </div>
                </div>
            ))}
        </Fragment>
    );
}

export default Item;