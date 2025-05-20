import { DataTypes } from 'sequelize';
import { sequelize } from '../config/mysql.js';

const Order = sequelize.define('Order', {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  items: {
    type: DataTypes.JSON, // Array of items stored as JSON
    allowNull: false,
  },
  amount: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  address: {
    type: DataTypes.JSON, // Object stored as JSON
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'Order Placed',
  },
  paymentMethod: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  payment: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  date: {
    type: DataTypes.BIGINT, // Unix timestamp
    allowNull: false,
  },
}, {
  tableName: 'orders', // Optional: define custom table name
  timestamps: false,    // Disable Sequelize's createdAt/updatedAt
});

export default Order;