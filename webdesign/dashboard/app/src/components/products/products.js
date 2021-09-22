import React from 'react';
import {useState, useEffect} from 'react';
import "./products.css"

function Products (){
    //Acordarnos de cambiar productos
    const [products,setProducts] = useState([]);

    
    useEffect(() =>{
        fetch('http://localhost:3030/apis/products/')
        .then(response => response.json())
        .then(data => {
            setProducts(data.products)
          
        })
        .catch(err => console.error(err))
    },[])

    

    useEffect(()=>{
        console.log('Al cambiar, se ejecuta el siguiente codigo',[products])
    })  
   
   
    return(
        <React.Fragment>
            <div>
                <p>Lista de productos</p>
                <ul>
                    {products.map((product,i) => 
                        <li key={i}>{product.name}</li>)}
                </ul>
                <p>Total producto = {products.length}</p>
                <p>Ultimo producto cargado = {products[(products.length - 1)].name}</p>          
            </div>
        </React.Fragment>
    )

}

export default Products;