// Expresiones a validar en los campos
const expressions = {
    email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    password: /^.{6,12}$/, // 6 a 12 digitos.
    passwordConfirm: /^.{6,12}$/, // 6 a 12 digitos.
};

// Creamos un objeto para luego confirmar si hay errores
const fields = {
    email: false,
    password: false,
    passwordConfirm: false,
    avatar:false
}

// Capturamos elementos del EJS
const form = document.querySelector(".form");
const inputs = document.querySelectorAll(".form input");

// Inicio de la carga del sitio
window.addEventListener("load", function () { 

    // Switch donde se valida cada campo
    const validForm = (e) => {
        switch (e.target.name) {
            case "email":
                validField(expressions.email, e.target, "email", email);
                break;
            case "password":
                validField(expressions.password, e.target, "password", password);
                break;
            case "passwordConfirm":
                validFieldPasswordConfirm(expressions.passwordConfirm, e.target, "passwordConfirm", passwordConfirm);
                break;
        }
    }

        // Modificaciones de la vista según sea correcto o incorrecto el valor del campo
        const validField = (expression, input, field) => {
            if (expression.test(input.value)) {
                document.querySelector(`#group__${field} i`).classList.remove("fieldset__validation-status--inactive");
                document.querySelector(`#group__${field} i`).classList.add("fieldset__validation-status--active--correct");
                document.querySelector(`#group__${field} i`).classList.add("fa-check-circle");
                document.querySelector(`#group__${field} i`).classList.remove("fa-times-circle");
                document.querySelector(`#group__${field} p`).classList.add("fieldset__error--inactive");
                document.querySelector(`#group__${field} p`).classList.remove("fieldset__error--active");
                fields[field] = true;
            } else {
                document.querySelector(`#group__${field} i`).classList.remove("fieldset__validation-status--inactive");
                document.querySelector(`#group__${field} i`).classList.remove("fieldset__validation-status--active--correct");
                document.querySelector(`#group__${field} i`).classList.add("fieldset__validation-status--active--wrong");
                document.querySelector(`#group__${field} i`).classList.remove("fa-check-circle");
                document.querySelector(`#group__${field} i`).classList.add("fa-times-circle");
                document.querySelector(`#group__${field} p`).classList.remove("fieldset__error--inactive");
                document.querySelector(`#group__${field} p`).classList.add("fieldset__error--active");
                fields[field] = false;
            }
        }

        const validFieldPasswordConfirm = () => {
            const inputPassword = document.getElementById('password')
            const inputPasswordConfirm = document.getElementById('passwordConfirm')
            if(inputPassword.value !== inputPasswordConfirm.value){
                document.querySelector(`#group__passwordConfirm i`).classList.remove("fieldset__validation-status--inactive");
                document.querySelector(`#group__passwordConfirm i`).classList.remove("fieldset__validation-status--active--correct");
                document.querySelector(`#group__passwordConfirm i`).classList.add("fieldset__validation-status--active--wrong");
                document.querySelector(`#group__passwordConfirm i`).classList.remove("fa-check-circle");
                document.querySelector(`#group__passwordConfirm i`).classList.add("fa-times-circle");
                document.querySelector(`#group__passwordConfirm p`).classList.remove("fieldset__error--inactive");
                document.querySelector(`#group__passwordConfirm p`).classList.add("fieldset__error--active");                
            }
        }
    
        // Ejecución en cada input en los eventos keyup y blur
        inputs.forEach((input) => {
            input.addEventListener('keyup', validForm);
            input.addEventListener('blur', validForm);
        });
    
        // Prevenimos que el formulario no se envíe hasta que esté completamente correcto
        form.addEventListener("submit", function (e) {
            if (fields.email && fields.password) {
                form.submit();
            } else {
                e.preventDefault();
            }
        });
    
    });//Cierre de addEventListener de carga de sitio