const worksapce = require('../models/add_workspace')


exports.add_cabinet = async (req, res) => {
    try {
      const cabinetname = req.body.cabinetname;
      const existingcabinet = await worksapce.findOne({
        where: { cabinet_name: cabinetname }
      });
      console.log(existingworskapce,"grtyhb")
      if ( existingcabinet) {
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


