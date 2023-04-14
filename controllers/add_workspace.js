const Worksapce = require('../models/add_workspace')


exports.add_workspace = async (req, res) => {
  try {
    const { workspace_name, select_user, select_group, select_cabinet, id } = req.body;
    console.log(req.body,"____bodyvsv")
    let workspace;

    if (id) {
      // Update the details of an existing workspace
      workspace = await Worksapce.findOne({ where: { id: id } });
      if (!workspace) {
        return res.status(404).json({
          message: 'Workspace not found'
        });
      }
      await Worksapce.update(
        { workspace_name: workspace_name, select_user: select_user, select_group: select_group, select_cabinet: select_cabinet },
        { where: { id: id } }
      );
    } else {
      // Create a new workspace
      const existingWorkspace = await Worksapce.findOne({
        where: { workspace_name: workspace_name }
      });
      if (existingWorkspace) {
        return res.status(409).json({
          message: 'Workspace name already exists'
        });
      }
      workspace = await Worksapce.create({
        workspace_name: workspace_name,
        selected_user: select_user,
        selected_group: select_group,
        selected_cabinet: select_cabinet
      });
    }

    return res.status(200).json({
      message: 'Workspace updated/created successfully',
      workspace: workspace
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: 'Error updating/creating workspace'
    });
  }
};


// 
exports.deleteworksapce=async(req,res)=>{
  try {
    const { id } = req.body;

    const cabinet = await Worksapce.findOne({ where: { id: id } });
    if (!cabinet) {
      return res.status(404).json({
        message: 'workspace not found'
      });
    }

    await Worksapce.destroy({ where: { id: id } });

    return res.status(200).json({
      message: 'workspace deleted successfully'
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: 'Error deleting workspace'
    });
  }
};

// get workspace with pagi....
exports.get_workspace = (req, res) => {
  const page = parseInt(req.body.pageNumber) || 1; // set default page to 1
  const limit =  parseInt(req.body.pageSize) || 5 
  const offset = (page - 1) * limit;

  Worksapce.findAndCountAll({
    offset,
    limit,
    order: [['createdAt', 'DESC']] 
  })
    .then((result) => {
      const totalPages = Math.ceil(result.count / limit);
      const response = {
        message: "success",
        data: result.rows,
        currentPage: page,
        count:result.count,
        totalPages
      };

      res.status(200).json(response);
    })
    .catch(() => {
      res.status(500).send("An error occurred while trying to fetch WORKSPACE from the database.");
    });
};