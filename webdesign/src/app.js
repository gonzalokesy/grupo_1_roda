//Requerir express
const express = require("express");
const app = express();

//Requiriendo módulos para data
app.use(express.urlencoded({extended:false}))
app.use (express.json())
const methodOverride = require('method-override');
app.use(methodOverride('_method'));

//Requiriendo Path y estableciendo carpeta estática
const path = require("path");
const publicPath = path.resolve(__dirname,"../public");
app.use(express.static(publicPath));

//Configurando View Engine
app.set("view engine", "ejs");
app.set("views", path.resolve(__dirname, "./views"));

//Levantando server
app.set("port", process.env.PORT || 3030);

app.listen(app.get("port"), () => 
console.log("Server corriendo en el http://localhost:3030"));

//Creando la ruta para mostrar el contenido en el navegador 
const mainRoutes = require("./routes/mainRoutes");
app.use(mainRoutes);

const checkOutRoutes = require("./routes/checkOutRoutes");
app.use("/checkOut", checkOutRoutes);

const productsRoutes = require("./routes/productsRoutes");
app.use("/products", productsRoutes);

const usersRoutes = require("./routes/usersRoutes");
app.use("/users", usersRoutes);

