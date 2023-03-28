const Sequelize=require('sequelize')

const sequelize = new Sequelize('dms', 'acmeace', 'Cms@351', {
    host: '10.10.0.38',
    port: '5432',
    dialect: 'postgres',
  });
  
module.exports=sequelize;
