import React from 'react';
import {useState, useEffect} from 'react';

function Users (){
    //Acordarnos de cambiar productos
    const [users,setUsers] = useState([]);

    
    useEffect(() =>{
        fetch('http://localhost:3030/apis/users/')
        .then(response => response.json())
        .then(data => {
            setUsers(data.users)
          
        })
        .catch(err => console.error(err))
    },[])

    useEffect(()=>{
        console.log('Al cambiar, se ejecuta el siguiente codigo',[users])
    })  
   

    return(
        <React.Fragment>
            <div>
                <p>Lista de usuarios</p>
                
            </div>
        </React.Fragment>
    )

}

export default Users;