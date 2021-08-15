module.exports = function (sequelize, dataTypes) {
    let alias = "Category";

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
      }
    };

    let config = {
        tableName: "categories",
        timestamps: false,
        underscored: true
    };
    

    let Category = sequelize.define(alias, cols, config);

    Category.associate = function (models){
      Category.hasMany(models.Product, {
        as: "producto",
        foreignKey: "category_id"
      })
    }

    return Category;
}