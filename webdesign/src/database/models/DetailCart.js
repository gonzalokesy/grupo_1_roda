module.exports = function (sequelize, dataTypes) {
    let alias = "DetailCart";
    let cols = {
      id: {
        type: dataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      shoppingCart_id: {
          type: dataTypes.INTEGER.UNSIGNED,
          allowNull: false
      },
      quantity: {
        type: dataTypes.DECIMAL.UNSIGNED,
        allowNull: false
      },
      actualPrice: {
        type: dataTypes.DECIMAL.UNSIGNED,
        allowNull: false
      }
    };

    let config = {
        tableName: "detailcart",
        timestamps: false
    };
    

    let DetailCart = sequelize.define(alias, cols, config);

    DetailCart.associate = function (models){
      DetailCart.hasMany(models.ShoppingCart, {
        as: "carrito",
        foreignKey: "shoppingCart_id"
      })
    }

    return DetailCart
};