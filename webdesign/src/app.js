//Requerir express
const express = require("express");
const app = express();

//Requiriendo Path, ejs y carpeta estatica
const path = require("path");
const publicPath = path.resolve(__dirname,"../public");
app.use(express.static(publicPath));
app.set("view engine", "ejs");
app.set("views", path.resolve(__dirname, "./views"));

//Levantando server
app.set("port", process.env.PORT || 3030);

app.listen(app.get("port"), () => 
console.log("Server corriendo en el http://localhost:3030"));
//Levantando server

//Creando la ruta para mostrar el contenido en el navegador 
const mainRoutes = require("./routes/mainRoutes");
app.use(mainRoutes);

const checkOutRoutes = require("./routes/checkOutRoutes");
app.use("/checkOut", checkOutRoutes);

const productsRoutes = require("./routes/productsRoutes");
app.use("/products", productsRoutes);

const usersRoutes = require("./routes/usersRoutes");
app.use("/users", usersRoutes);