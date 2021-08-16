module.exports = function (sequelize, dataTypes) {
let alias = "Product_color";

    let cols = {
      id: {
        type: dataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      product_id: {
        type: dataTypes.INTEGER
      },
      color_id: {
        type: dataTypes.INTEGER
      }
    };

    let config = {
        tableName: "products_colors",
        timestamps: false,
        underscored: true
    };

    let Product_color = sequelize.define(alias, cols, config);
    return Product_color;
}