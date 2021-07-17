const path = require("path");
const fs = require("fs");
const bcrypt = require("bcryptjs");

const userModel = {
    directory: path.resolve(__dirname, "../data/users.json"),
    write: function(data){
        return fs.writeFileSync(this.directory,JSON.stringify(data,null,2))
    },
    all: function() {
        const readFile = fs.readFileSync(this.directory, "utf-8");
        const convertFile = JSON.parse(readFile);
        return convertFile;
    },
    one: function (id) {
        let users = this.all();
        let idUser = users.find(user => user.id == id);
        return idUser;
    },
    findByEmail: function (email){
        return this.all().find(user => user.email == email)
    },
    create: function(data,file){
        let users = this.all();
        let max = Math.max.apply(null,users.map((user) => user.id));
        let newUser = {
            id: (max != 0) ? max + 1 : 1,
            email: data.email,
            avatar: file.filename ,
            password: bcrypt.hashSync(data.password,10)
        };
        users.push(newUser);
        this.write(users);
    }




}

module.exports = userModel