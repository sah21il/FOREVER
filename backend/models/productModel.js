// models/Product.js
import { DataTypes } from 'sequelize';
import { sequelize } from '../config/mysql.js';

const Product = sequelize.define('Product', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  image: {
    type: DataTypes.JSON, // Array of image URLs stored as JSON
    allowNull: false,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  subCategory: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  sizes: {
    type: DataTypes.JSON, // Array of sizes stored as JSON
    allowNull: false,
  },
  bestseller: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  date: {
    type: DataTypes.BIGINT, // Unix timestamp
    allowNull: false,
  },
}, {
  tableName: 'products',
  timestamps: false,
});

export default Product;