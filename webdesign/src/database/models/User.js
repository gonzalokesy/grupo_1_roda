module.exports = function (sequelize, dataTypes) {
    let alias = "User";
    let cols = {
      id: {
        type: dataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      email: {
          type: dataTypes.STRING,
          unique: true,
          allowNull: false
      },
      password: {
        type: dataTypes.STRING,
        unique: true,
        allowNull: false
      },
      image: {
        type: dataTypes.STRING,
        unique: true,
        allowNull: false
      }
    };

    let config = {
        tableName: "users",
        timestamps: false,
        underscored: true
    };
    

    let User = sequelize.define(alias, cols, config);

  
    return User;
}