import logo from './logo.svg';
import React, { useState, useEffect } from 'react';
import './App.css';
import firebase from './firebase';
import NavBar from './NavBar'
import SnapshotFirebase from './Product';

function App() {
  /*
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const ref = firebase.firestore().collection('products');

  function getProducts() {
    setLoading(true);
    ref.onSnapshot((querySnapshot) => {
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push(doc.data());
      });
      setProducts(items);
      setLoading(false);
    })
  }

  useEffect(() => {
    getProducts();
  }, [])

  if (loading) {
    return <h1>Loading...</h1>
  }

  return (
    <div className="App">
      <NavBar />
      <h1>Products</h1>
      {products.map((product) => (
        <div className="school" key={product.id}>
          <h2>
            {product.name}
          </h2>
          <h2>
            {product.quantity}
          </h2>
        </div>
      ))}

    </div>
  );
*/



  return (
    <div className="App">
      <NavBar />
    </div>
  );


}

export default App;
