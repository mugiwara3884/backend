const Sequelize=require('sequelize')

const sequelize=require('../util/database')

const group=sequelize.define('add_group', {
    id:{
        type: Sequelize.INTEGER,
        allowedNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    group_name:{
        type:Sequelize.STRING,
        allowedNull:false
    }

})

module.exports=group;