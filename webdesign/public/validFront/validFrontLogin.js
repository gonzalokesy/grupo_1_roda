window.addEventListener('load', function() {

    //Elements
    let buttonSubmit = document.querySelector(".submit");
    let email = document.querySelector(".email");
    
    //ButtonSubmit
    buttonSubmit.addEventListener('click', function(event){
    event.preventDefault();
    let errors = {}

    if(email.value.length < 1){
    errors.name = 'Debes completar con tu email'
    }

    if(Object.keys(errores).length >= 1){

    erName.innerText = (errores.name) ? errores.name : '';
    } else {

    registerForm.submit();
    }
    })
    })