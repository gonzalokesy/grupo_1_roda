const expresiones = {
	usuario: /^[a-zA-Z0-9\_\-]{4,16}$/, // Letras, numeros, guion y guion_bajo
	nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
	password: /^.{4,12}$/, // 4 a 12 digitos.
	correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
	telefono: /^\d{7,14}$/ // 7 a 14 numeros.
};


window.addEventListener("load", function(){ //Inicio de la carga del sitio
    const form = document.querySelector("form.form")
    const inputs = document.querySelectorAll(".form input")

        form.addEventListener ("submit", function(e){
        e.preventDefault();
    });

    const validarFormulario = () => {
        console.log('ejecutado');
    }

    inputs.forEach((input) => {
        input.addEventListener('keyup', validarFormulario); 
        input.addEventListener('blur', validarFormulario); 
    });



});//Cierre de addEventListener de carga de sitio