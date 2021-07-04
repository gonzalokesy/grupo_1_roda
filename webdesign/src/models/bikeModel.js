const path = require("path");
const fs = require("fs");

const bikeModel = {
    all: function() {
        const directoryBikes = path.resolve(__dirname, "../data/bikes.json");
        const readFile = fs.readFileSync(directoryBikes, "utf-8");
        const convertFile = JSON.parse(readFile);
        return convertFile;
    },
    new: function(data, files) {
        const directoryBikes = path.resolve(__dirname, "../data/bikes.json");
        let bikes = this.all();
        let newBike = {
            id: bikes.length > 0 ? bikes[bikes.length - 1].id + 1 : 1,
            name: data.name,
            description: data.description,
            gallery: files.map(file => file.filename),
            price: data.price,
        };
        bikes.push(newBike)
        fs.writeFileSync(directoryBikes, JSON.stringify(bikes, null, 2));
        return true
    },
}

module.exports = bikeModel;