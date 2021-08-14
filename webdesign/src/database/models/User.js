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
        timestamps: false
    };
    

    let User = sequelize.define(alias, cols, config);

    User.associate = function (models){
      User.belongsTo(models.ShoppingCart, {
        as: "elecciones",
        foreignKey: "user_id"
      })
    }
    return User;
}