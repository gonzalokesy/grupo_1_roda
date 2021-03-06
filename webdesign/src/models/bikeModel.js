const path = require("path");
const fs = require("fs");

const bikeModel = {
    
    directoryBikes : path.resolve(__dirname, "../data/bikes.json"),
    directoryAccessories : path.resolve(__dirname, "../data/accessories.json"),
    allBikes: function() {
        const readFile = fs.readFileSync(this.directoryBikes, "utf-8");
        const convertFile = JSON.parse(readFile);
        return convertFile;
    },
    allAccessories: function() {
        const readFile = fs.readFileSync(this.directoryAccessories, "utf-8");
        const convertFile = JSON.parse(readFile);
        return convertFile;
    },
    one: function (id) {
        let bikes = this.allBikes();
        let idBike = bikes.find(bike => bike.id == id);
        return idBike;
    },
    new: function(data, files) {
        let bikes = this.allBikes();
        let accessories = this.allAccessories();
        let arrayProduct = bikes.concat(accessories); //concateno los array para luego buscar el maximo
        let max = Math.max.apply(null,arrayProduct.map((bike) => bike.id))//utilizo Math.max.apply para encontrar el maximo del array de "id" que generamos con el map().
        let newBike = {
            id: (max != 0) ? max + 1 : 1, //aca usamos mismo razonamiento como veniamos trabajando
            name: data.name,
            description: data.description,
            gallery: files.map(file => file.filename),
            category: data.category,
            price: data.price,
        };
        bikes.push(newBike)
        fs.writeFileSync(this.directoryBikes, JSON.stringify(bikes, null, 2));
        return true
    },
    edit: function(data, files, id) {
        let bikes = this.allBikes();
        bikes.map (bikeModify => {
            if (bikeModify.id == id){
            bikeModify.name = data.name,
            bikeModify.description = data.description,
            bikeModify.gallery = files.map(file => file.filename),
            bikeModify.category = data.category,
            bikeModify.price = data.price
            }
        return bikeModify
        })
        fs.writeFileSync(this.directoryBikes, JSON.stringify (bikes, null, 2));
        return true;
    },
    delete: function (id) {
        const directoryBikes = this.directoryBikes;
        let bikes = this.allBikes();
        let eliminatedBike = this.one(id);
        eliminatedBike.gallery.forEach(image => fs.unlinkSync(path.resolve(__dirname,"../../public/uploads/products", image)));
        bikes = bikes.filter(bike => bike.id != eliminatedBike.id);
        fs.writeFileSync(directoryBikes, JSON.stringify(bikes,null,2));
        return true; 
    }
};

module.exports = bikeModel;