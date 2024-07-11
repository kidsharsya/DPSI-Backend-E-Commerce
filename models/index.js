// Import dotenv to load environment variables from .env file
require('dotenv').config();

const { Sequelize } = require('sequelize');

// Initialize Sequelize instance with database credentials from environment variables
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: process.env.DB_DIALECT,
});

const Customer = require('./customer')(sequelize, Sequelize.DataTypes);
const Employee = require('./employee')(sequelize, Sequelize.DataTypes);
const Product = require('./product')(sequelize, Sequelize.DataTypes);
const Supplier = require('./supplier')(sequelize, Sequelize.DataTypes);
const Order = require('./order')(sequelize, Sequelize.DataTypes);
const Shipper = require('./shipper')(sequelize, Sequelize.DataTypes);
const OrderDetail = require('./orderDetail')(sequelize, Sequelize.DataTypes);
const Category = require('./category')(sequelize, Sequelize.DataTypes);

// Relasi antara model
Customer.hasMany(Order, { foreignKey: 'customerID' });
Order.belongsTo(Customer, { foreignKey: 'customerID' });
Employee.hasMany(Order, { foreignKey: 'employeeID' });
Order.belongsTo(Employee, { foreignKey: 'employeeID' });
Shipper.hasMany(Order, { foreignKey: 'shipperID' });
Order.belongsTo(Shipper, { foreignKey: 'shipperID' });
Supplier.hasMany(Product, { foreignKey: 'supplierID' });
Product.belongsTo(Supplier, { foreignKey: 'supplierID' });
Category.hasMany(Product, { foreignKey: 'categoryID' });
Product.belongsTo(Category, { foreignKey: 'categoryID' });
Order.hasMany(OrderDetail, { foreignKey: 'orderID' });
OrderDetail.belongsTo(Order, { foreignKey: 'orderID' });
Product.hasMany(OrderDetail, { foreignKey: 'productID' });
OrderDetail.belongsTo(Product, { foreignKey: 'productID' });

// Test the database connection
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = { sequelize, Customer, Employee, Product, Supplier, Order, Shipper, OrderDetail, Category };
