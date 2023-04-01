const worksapce = require('../models/add_workspace')


exports.add_workspace = async (req, res) => {
    try {
      const worksapcename = req.body.groupname;
      const existingworskapce = await worksapce.findOne({
        where: {  workspace_name: worksapcename }
      });
      console.log(existingworskapce,"grtyhb")
      if (existingworskapce) {
        return res.status(409).json({
          message: 'workspace  name already exists'
        });
      }
      const newworkspace = await worksapce.create({
        workspace_name: worksapcename 
      });
      return res.status(201).json({
        message: 'worksapce created successfully',
        worksapce_: newworkspace
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message: 'Error creating group'
      });
    }
  };


