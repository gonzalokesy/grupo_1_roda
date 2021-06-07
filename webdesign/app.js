//Requerir express
const express = require("express");
const app = express();

//Requiriendo Path y carpeta estatica
const path = require("path");
const publicPath = path.resolve(__dirname,"./public");
app.use(express.static(publicPath));

//Levantando server
app.set("port", process.env.PORT || 3030);

app.listen(app.get("port"), () => 
console.log("Server corriendo en el http://localhost:3030"));
//Levantando server

//Creando la ruta para mostrar el contenido en el navegador
app.get("/", (req,res) => {
    res.sendFile(path.resolve(__dirname,"./views/home.html"))
});

app.get("/f", (req,res) => {
    res.sendFile(path.resolve(__dirname,"./views/footer.html"))
});

app.get("/h", (req,res) => {
    res.sendFile(path.resolve(__dirname,"./views/header.html"))
});

//Creando ruta al Carrito de Compras
app.get("/cart", (req,res) => {
    res.sendFile(path.resolve(__dirname,"./views/cart.html"))
});

//Creando ruta al Carrito de Compras (Shipping)
app.get("/cartShipping", (req,res) => {
    res.sendFile(path.resolve(__dirname,"./views/cartShipping.html"))
});

//Creando ruta Detalle de Producto
app.get("/product", (req,res) => {
    res.sendFile(path.resolve(__dirname,"./views/product-description.html"))
});

//Creando ruta Formulario de ingreso
app.get("/login", (req,res) => {
    res.sendFile(path.resolve(__dirname,"./views/login.html"))
});

//Creando ruta Formulario de registro
app.get("/register", (req,res) => {
    res.sendFile(path.resolve(__dirname,"./views/register.html"))
});

//Creando ruta Sobre Rodá
app.get("/aboutRoda", (req,res) => {
    res.sendFile(path.resolve(__dirname,"./views/aboutRoda.html"))
});