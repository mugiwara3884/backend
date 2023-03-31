const group = require('../models/add_group')


exports.add_workspace = async (req, res) => {
    try {
      const worksapcename = req.body.groupname;
      const existingworskapce = await group.findOne({
        where: { group_name: groupName }
      });
      console.log(existingworskapce,"grtyhb")
      if (existingworskapce) {
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

