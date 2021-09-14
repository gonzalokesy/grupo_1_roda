// Creamos un objeto para luego confirmar si hay errores
const expressions = {
    name: null,
    description: null,
    quantity: /^\d+$/, // Números enteros
    price: /^[+]?([1-9][0-9]*(?:[\.][0-9]*)?|0*\.0*[1-9][0-9]*)(?:[eE][+-][0-9]+)?$/ // Números positivos decimales
};

const fields = {
    name: false,
    description: false,
    quantity: false,
    price: false
}

// Capturamos elementos del EJS
const form = document.querySelector(".form");
const inputs = document.querySelectorAll(".form input");
const description = document.getElementById("description");

// Inicio de la carga del sitio
window.addEventListener("load", function () { 

    // Switch donde se valida cada campo
    const validForm = (e) => {
        switch (e.target.name) {
            case "name":
                validField(expressions.name, e.target, "name");
                break;
            case "description":
                validField(expressions.description, e.target, "descrption");
                break;
            case "quantity":
                validField(expressions.quantity, e.target, "quantity");
                break;
            case "price":
                validField(expressions.price, e.target, "price");
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

        // Ejecución en cada input en los eventos keyup y blur
        inputs.forEach((input) => {
            input.addEventListener('keyup', validForm);
            input.addEventListener('blur', validForm);
        });

        // Ejecución en textarea los eventos keyup y blur
        description.forEach((input) => {
            input.addEventListener('keyup', validForm);
            input.addEventListener('blur', validForm);
        });
    
        // Prevenimos que el formulario no se envíe hasta que esté completamente correcto
        form.addEventListener("submit", function (e) {
            if (fields.name && fields.description && fields.quantity && fields.price) {
                form.submit();
            } else {
                e.preventDefault();
                alert('Verifica que todos los campos esten correctos y que hayas cargado una imagen')
            }
        });
    
    });//Cierre de addEventListener de carga de sitio