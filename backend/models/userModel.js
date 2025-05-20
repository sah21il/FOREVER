// models/User.js
import { DataTypes } from 'sequelize';
import { sequelize } from '../config/mysql.js';

const User = sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true, // Enforces unique constraint
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  cartData: {
    type: DataTypes.JSON, // Object stored as JSON
    defaultValue: {},
  },
}, {
  tableName: 'users',
  timestamps: false,
});

export default User;