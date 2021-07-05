const path = require("path");
const fs = require("fs");

const accessoryModel = {

    directoryAccessories : path.resolve(__dirname, "../data/accessories.json"),

    all: function() {
        const readFile = fs.readFileSync(this.directoryAccessories, "utf-8");
        const convertFile = JSON.parse(readFile);
        return convertFile;
    },
    new: function(data, files) {
        let accessories = this.all();
        let newAccessory = {
            id: accessories.length > 0 ? accessories[accessories.length - 1].id + 1 : 1,
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
}

module.exports = accessoryModel;