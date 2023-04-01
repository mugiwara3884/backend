// 


const express = require('express');
const app = express();
const { Sequelize, DataTypes } = require('sequelize');

// Create Sequelize instance
const sequelize = new Sequelize('database', 'username', 'password', {
  host: 'localhost',
  dialect: 'mysql'
});

// Define User and Policy models
const User = sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

const Policy = sequelize.define('Policy', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING
  }
});

// Define junction table for user-policy relationship
const UserPolicy = sequelize.define('UserPolicy', {});

// Define many-to-many relationship between users and policies
User.belongsToMany(Policy, { through: UserPolicy });
Policy.belongsToMany(User, { through: UserPolicy });

// Create tables if they don't exist
sequelize.sync();

// Add policies to the database
app.post('/policies', async (req, res) => {
  const policies = req.body;
  try {
    const createdPolicies = await Policy.bulkCreate(policies);
    res.send(createdPolicies);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error creating policies');
  }
});

// Add users to the database
app.post('/users', async (req, res) => {
  const users = req.body;
  try {
    const createdUsers = await User.bulkCreate(users);
    res.send(createdUsers);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error creating users');
  }
});

// Add policies to a user
app.post('/users/:userId/policies', async (req, res) => {
  const userId = req.params.userId;
  const policyIds = req.body.policyIds;
  try {
    const user = await User.findByPk(userId);
    const policies = await Policy.findAll({
      where: {
        id: policyIds
      }
    });
    await user.setPolicies(policies);
    res.send('Policies added to user successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error adding policies to user');
  }
});

// Get policies of a user
app.get('/users/:userId/policies', async (req, res) => {
  const userId = req.params.userId;
  try {
    const user = await User.findByPk(userId, {
      include: Policy
    });
    res.send(user.Policies);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error getting user policies');
  }
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});
