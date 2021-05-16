//Requerir express
const express = require("express");
const app = express();

//Requiriendo Path y carpeta estatica
const path = require("path");
const publicPath = path.resolve(__dirname,"./public");
app.use(express.static(publicPath));

//Levantando server
app.listen(3030,() => {
    console.log("Server corriendo en el local host 3030")
});

//Creando la ruta para mostrar el contenido en el navegador
app.get("/", (req,res) => {
    res.sendFile(path.resolve(__dirname,"./views/home.html"))
});








