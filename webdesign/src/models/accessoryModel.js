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
    new: function(data, files) {
        let accessories = this.allAccessories();
        let bikes = this.allBikes();
        let totalLength = (bikes.length + accessories.length);
        let newAccessory = {
            id: totalLength > 0 ? accessories.id = totalLength + 1 : 1,
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
        let accessories = this.all();
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
}

module.exports = accessoryModel;