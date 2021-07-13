const path = require("path");
const fs = require("fs");

const accessoryModel = {

    directoryAccessories : path.resolve(__dirname, "../data/accessories.json"),
    directoryBikes : path.resolve(__dirname, "../data/bikes.json"),
    allAccessories: function() {
        const readFile = fs.readFileSync(this.directoryAccessories, "utf-8");
        const convertFile = JSON.parse(readFile);
        return convertFile;
    },
    allBikes: function() {
        const readFile = fs.readFileSync(this.directoryBikes, "utf-8");
        const convertFile = JSON.parse(readFile);
        return convertFile;
    },
    one: function (id) {
        let accessories = this.allAccessories();
        let idAccessory = accessories.find(accessory => accessory.id == id);
        return idAccessory;
    },
    new: function(data, files) {
        let accessories = this.allAccessories();
        let bikes = this.allBikes();
        let arrayProduct = accessories.concat(bikes); //concateno los array para luego buscar el maximo
        let max = Math.max.apply(null,arrayProduct.map((accessory) => accessory.id))//utilizo Math.max.apply para encontrar el maximo.
        let newAccessory = {
            id: (max != 0) ? max + 1 : 1, //aca usamos mismo razonamiento como veniamos trabajando,
            name: data.name,
            description: data.description,
            gallery: files.map(file => file.filename),
            category: data.category,
            price: data.price,
        };
        accessories.push(newAccessory)
        fs.writeFileSync(this.directoryAccessories, JSON.stringify(accessories, null, 2));
        return true
    },
    edit: function(data, files, id) {
        let accessories = this.allAccessories();
        accessories.map (accessoryModify => {
            if (accessoryModify.id == id){
            accessoryModify.name = data.name,
            accessoryModify.description = data.description,
            accessoryModify.gallery = files.map(file => file.filename),
            accessoryModify.category = data.category,
            accessoryModify.price = data.price
            }
        return accessoryModify
        })
        fs.writeFileSync(this.directoryAccessories, JSON.stringify (accessories, null, 2));
        return true;
    },
    delete: function (id) {
        const directoryAccessories = this.directoryAccessories;
        let accessories = this.allAccessories();
        let eliminatedAccessory = this.one(id);
        eliminatedAccessory.gallery.forEach(image => fs.unlinkSync(path.resolve(__dirname,"../../public/uploads/products", image)));
        accessories = accessories.filter(accessory => accessory.id != eliminatedAccessory.id);
        fs.writeFileSync(directoryAccessories, JSON.stringify(accessories,null,2));
        return true; 
    }
}

module.exports = accessoryModel;