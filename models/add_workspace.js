const Sequelize=require('sequelize')

const sequelize=require('../util/database')

const workspace=sequelize.define('workspace', {
    id:{
        type: Sequelize.INTEGER,
        allowedNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    workspace_name:{
        type:Sequelize.STRING,
        allowedNull:false
    }

})

module.exports=workspace;