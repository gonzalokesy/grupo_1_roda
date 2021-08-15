module.exports = function (sequelize, dataTypes) {
    let alias = "Color";

    let cols = {
      id: {
        type: dataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },

      name: {
          type: dataTypes.STRING,
          allowNull: false,
          unique: true
      },

      valueColor: {
        type: dataTypes.STRING,
        allowNull: false,
        unique: true
      }
    };

    let config = {
        tableName: "colors",
        timestamps: false,
    };
    

    let Color = sequelize.define(alias, cols, config);

    Color.associate = function (models){
      Color.belongsToMany(models.Product, {
        as: "productos",
        through: "products_colors",
        foreignKey: "color_id",
        otherKey: "product_id",
        timestamps: false
      })
    }

    return Color;
}