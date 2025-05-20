import { Sequelize } from 'sequelize';

// Create a Sequelize instance with environment variables
const sequelize = new Sequelize(
  process.env.MYSQL_DB || 'ecommerce',
  process.env.MYSQL_USER || 'root',
  process.env.MYSQL_PASS || '',
  {
    host: process.env.MYSQL_HOST || 'localhost',
    dialect: 'mysql',
    logging: false, // Optional: Disable SQL logging
  }
);

// Connect function
const connectMySQL = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ MySQL connected successfully');
  } catch (error) {
    console.error('❌ MySQL connection error:', error.message);
    process.exit(1);
  }
};

export { sequelize };
export default connectMySQL;