const Sequelize=require('sequelize')

const sequelize=require('../../util/database')

const workspace=sequelize.define('fencing',{
    id:{
        type: Sequelize.INTEGER,
        allowedNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    policy_name:{
        type:Sequelize.STRING,
        allowedNull:false
    },
    applied_to_group:{
        type:Sequelize.STRING,
        allowedNull:false
    },
    applied_to_user:{
        type:Sequelize.STRING,
        allowedNull:false
    },
    ip_fencing:{
        type:Sequelize.STRING,
        allowedNull:false
    },

})

module.exports=workspace;