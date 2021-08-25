module.exports = function (sequelize, dataTypes) {
    let alias = "Product";
    let cols = {
      id: {
        type: dataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      name: {
          type: dataTypes.STRING,
          allowNull: false
      },
      description: {
        type: dataTypes.TEXT
      },
      category_id: {
        type: dataTypes.INTEGER.UNSIGNED,
        allowNull: false
      }, 
      quantity: {
        type: dataTypes.INTEGER.UNSIGNED,
        // DEFAULT 1
      },
      price: {
        type: dataTypes.DECIMAL.UNSIGNED,
        allowNull: false
      }
    };

    let config = {
        tableName: "products",
        timestamps: false,
        underscored: true
    };
    

    let Product = sequelize.define(alias, cols, config);

    Product.associate = function (models){
      Product.belongsToMany(models.Color, {
        as: "colors",
        through: "products_colors",
        foreignKey: "product_id",
        otherKey: "color_id",
        timestamps: false
      })
      Product.belongsTo(models.Category, {
        as: "category",
        foreignKey: "category_id"
      })
      Product.hasMany(models.ShoppingCart, {
        as: "carrito",
        foreignKey: "product_id"
      })
    }
    return Product;
}