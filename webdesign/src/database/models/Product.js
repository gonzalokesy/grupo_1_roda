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
      price: {
        type: dataTypes.DECIMAL.UNSIGNED,
        allowNull: false

      },
      quantity: {
        type: dataTypes.INTEGER.UNSIGNED,
        // DEFAULT 1
      },
      category_id: {
        type: dataTypes.INTEGER.UNSIGNED,
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
        as: "colores",
        through: "products_colors",
        foreignKey: "product_id",
        otherKey: "color_id",
        timestamps: false
      })
      Product.belongsToMany(models.Image, {
        as: "imagenes",
        through: "products_images",
        foreignKey: "product_id",
        otherKey: "image_id",
        timestamps: false
      })
      Product.belongsTo(models.Category, {
        as: "categoria",
        foreignKey: "category_id"
      })
      Product.hasMany(models.ShoppingCart, {
        as: "carrito",
        foreignKey: "product_id"
      })
    }

    return Product;
}