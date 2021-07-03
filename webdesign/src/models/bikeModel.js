const path = require("path");
const fs = require("fs");

// Ubicación del archivo bikes.json en /data
const directory = path.resolve(__dirname, "../data/bikes.json");

const bikeModel = {
    directory: path.resolve(__dirname, "../data/bikes.json"),
    all: function() {
        const readFile = fs.readFileSync(directory, "utf-8");
        const convertFile = JSON.parse(readFile);
        return convertFile;
    },
    new: function(data, file) {
        let bikes = this.all();
        let newBike = {
            id: bikes.length > 0 ? bikes[bikes.length - 1].id + 1 : 1,
            name: data.name,
            description: data.description,
            image: file.filename,
            price: data.price,
        }
    }
}

module.exports = bikeModel;