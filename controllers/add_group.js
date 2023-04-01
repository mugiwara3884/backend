const Group = require('../models/add_group')


exports.add_group = async (req, res) => {
    try {
      const groupName = req.body.group_name;
      const group_description = req.body.group_description
      const existingGroup = await Group.findOne({
        where: { group_name: groupName }
      });
      console.log(existingGroup,"grtyhb")
      if (existingGroup) {
        return res.status(409).json({
          message: 'Group name already exists'
        });
      }
      const newGroup = await group.create({
        group_name: groupName,
        group_description:group_description
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

// routes/group.js



exports.get_groups = async(req,res)=>{
  try {
    const groups = await Group.findAll();
    res.json({ success: true, message: 'Groups retrieved successfully', groups });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Error while getting groups' });
  }
}


