module.exports = function (sequelize, dataTypes) {
    let alias = "Image";

    let cols = {
      id: {
        type: dataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      filename: {
          type: dataTypes.STRING,
          allowNull: false,
      }
    };

    let config = {
        tableName: "images",
        timestamps: false
    };
    

    let Image = sequelize.define(alias, cols, config);

    Image.associate = function (models){
      Image.belongsToMany(models.Product, {
        as: "galeria",
        through: "products_images",
        foreignKey: "image_id",
        otherKey: "product_id",
        timestamps: false
      })
    }

    return Image;
}