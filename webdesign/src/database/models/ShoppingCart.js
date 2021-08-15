module.exports = function (sequelize, dataTypes) {
    let alias = "ShoppingCart";
    let cols = {
      id: {
        type: dataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      user_id: {
          type: dataTypes.INTEGER.UNSIGNED,
          allowNull: false
      },
      product_id: {
        type: dataTypes.INTEGER.UNSIGNED,
        allowNull: false
      },
      quantity: {
        type: dataTypes.DECIMAL.UNSIGNED,
        allowNull: false
      },
      totalPrice: {
        type: dataTypes.DECIMAL.UNSIGNED,
        allowNull: false
      },
      active: {
        type: dataTypes.INTEGER,
        allowNull: false
        //DEFAULT 1
      },
      date: {
        type: dataTypes.DATE,
        allowNull: false
      } 
    };

    let config = {
        tableName: "shoppingcart",
        timestamps: false,
        underscored: true
    };
    

    let ShoppingCart = sequelize.define(alias, cols, config);

    ShoppingCart.associate = function (models){
        ShoppingCart.belongsTo(models.Product, {
          as: "compra",
          foreignKey: "product_id"
        })
        ShoppingCart.belongsTo(models.DetailCart, {
            as: "detalle",
            foreignKey: "shoppingCart_id"
          })
          ShoppingCart.hasMany(models.User, {
            as: "usuario",
            foreignKey: "user_id"
          })
      }

    return ShoppingCart
};