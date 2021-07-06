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
        console.log(idBike)
        //return idBike;
    },
    new: function(data, files) {
        let bikes = this.allBikes();
        let accessories = this.allAccessories();
        let totalLength = (bikes.length + accessories.length);
        let newBike = {
            id: totalLength > 0 ? bikes.id = totalLength + 1 : 1,
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
        let bikes = this.all();
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
}

module.exports = bikeModel;