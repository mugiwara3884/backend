const Cabinet = require('../models/add_cabinet')


exports.add_cabinet = async (req, res) => {
  try {
    const { cabinet_name, rootDirectory, id } = req.body;

    let cabinet;

    if (id) {
      // Update the details of an existing cabinet
      cabinet = await Cabinet.findOne({ where: { id: id } });
      if (!cabinet) {
        return res.status(404).json({
          message: 'Cabinet not found'
        });
      }
      await Cabinet.update(
        { cabinet_name: cabinet_name, path: rootDirectory },
        { where: { id: id } }
      );
    } else {
      // Create a new cabinet
      const existingCabinet = await Cabinet.findOne({
        where: { cabinet_name: cabinet_name }
      });
      if (existingCabinet) {
        return res.status(409).json({
          message: 'Cabinet name already exists'
        });
      }
      cabinet = await Cabinet.create({
        cabinet_name: cabinet_name,
        path: rootDirectory
      });
    }

    return res.status(200).json({
      message: 'Cabinet updated/created successfully',
      cabinet: cabinet
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: 'Error updating/creating cabinet'
    });
  }
};

// 
exports.deletecabinet=async(req,res)=>{
    try {
      const { id } = req.body;
  
      const cabinet = await Cabinet.findOne({ where: { id: id } });
      if (!cabinet) {
        return res.status(404).json({
          message: 'Cabinet not found'
        });
      }
  
      await Cabinet.destroy({ where: { id: id } });
  
      return res.status(200).json({
        message: 'Cabinet deleted successfully'
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message: 'Error deleting cabinet'
      });
    }
  };
  
  exports.cabinet_dropdown = (req,res)=>{

    Cabinet.findAll().then(data=>{
      return res.status(200).json({message:"success",data})
    }).catch(()=>{
      res.status(500).json({success:false,message:"user not found"})
     })
  }
  

  // pagination 
  exports.get_cabinet = (req, res) => {
    const page = parseInt(req.body.pageNumber) || 1; // set default page to 1
    const limit =  parseInt(req.body.pageSize) || 5 
    const offset = (page - 1) * limit;
  
    Cabinet.findAndCountAll({
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