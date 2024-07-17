'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SavedResponse extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  SavedResponse.init({
    name: DataTypes.STRING,
    creationDate: DataTypes.DATE,
    userId:DataTypes.INTEGER,
    responseCodes: DataTypes.STRING,
    imageLinks: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'SavedResponse',
  });
  return SavedResponse;
};