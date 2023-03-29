const group = require('../models/add_group')


exports.add_group = async (req, res) => {
    try {
      const groupName = req.body.groupname;
      const existingGroup = await group.findOne({
        where: { group_name: groupName }
      });
      console.log(existingGroup,"grtyhb")
      if (existingGroup) {
        return res.status(409).json({
          message: 'Group name already exists'
        });
      }
      const newGroup = await group.create({
        group_name: groupName
      });
      return res.status(201).json({
        message: 'Group created successfully',
        group: newGroup
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message: 'Error creating group'
      });
    }
  };
//     show user to group 
// find user who is in add_user table and group name  is a

