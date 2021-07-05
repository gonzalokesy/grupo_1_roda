const path = require("path");
const fs = require("fs");

const bikeModel = {
    
    directoryBikes : path.resolve(__dirname, "../data/bikes.json"),

    all: function() {
        const readFile = fs.readFileSync(this.directoryBikes, "utf-8");
        const convertFile = JSON.parse(readFile);
        return convertFile;
    },
    new: function(data, files) {
        let bikes = this.all();
        let newBike = {
            id: bikes.length > 0 ? bikes[bikes.length - 1].id + 1 : 1,
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
    edit: function(data,file,id) {
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