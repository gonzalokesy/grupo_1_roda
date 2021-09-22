import React from 'react';
import Products from './components/products/products';
import Users from './components/users/users';
import './App.css';



function App() {
  return (
    <React.Fragment>
      <div>
        <Products></Products>
        <Users></Users>
      </div>
    </React.Fragment>
  );
}

export default App;
