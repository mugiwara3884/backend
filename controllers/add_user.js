
const User = require('../models/add_user')

// exports.register_new  = ( async (req, res) => {
//     console.log("api hit")
//     const { user_type, display_name, emp_code, email, max_quota, add_group,validity_date,user_role } = req.body;
//     User.findAll({where:{email:email}})
//        .then(users=>{
//            const user=users[0]
//            if(user)
//            res.json({success:false,message:'this email already exist'})
//            else
//            {   
//                User.create({
//                    user_type:user_type,
//                    display_name:display_name,
//                    emp_code:emp_code,
//                    email:email,
//                    max_quota:max_quota,
//                    add_group:add_group,
//                    user_status:"active",
//                    user_role:user_role,
//                    validity_date:validity_date,
//                })
//                .then(()=>{
//                    res.status(200).json({success:true,message:'Successfully user added,Login now'})
//                })
//                .catch(err=>{
//                    console.log(err)
//                    res.json({success:false,message:'error while registering'})
//                })

//            }
//        })
//     //     res.status(201).send(`User with emp_code ${emp_code} has been added to the database!`);
//     // } catch (err) {
//     //     console.error(err);
//     //     res.status(500).send('An error occurred while trying to add the user to the database.');
//     // }
// });

// getuser


//  get all user with pagination


exports.register_new = async (req, res) => {
  console.log("api hit")
  const { user_type, display_name, emp_code, email, max_quota, add_group, validity_date, user_role } = req.body;
  const { id } = req.params;
  if (id) {
      // Update existing user
      try {
          const user = await User.findByPk(id);
          if (!user) {
              return res.status(404).json({ success: false, message: 'User not found' });
          }
          await user.update({
              user_type: user_type,
              display_name: display_name,
              emp_code: emp_code,
              email: email,
              max_quota: max_quota,
              add_group: add_group,
              user_status: "active",
              user_role: user_role,
              validity_date: validity_date,
          });
          res.status(200).json({ success: true, message: 'User details updated successfully' });
      } catch (err) {
          console.log(err)
          res.status(500).json({ success: false, message: 'Error while updating user details' });
      }
  } else {
      // Create new user
      try {
          const existingUser = await User.findOne({ where: { email: email } });
          if (existingUser) {
              return res.status(409).json({ success: false, message: 'This email already exists' });
          }
          await User.create({
              user_type: user_type,
              display_name: display_name,
              emp_code: emp_code,
              email: email,
              max_quota: max_quota,
              add_group: add_group,
              user_status: "active",
              user_role: user_role,
              validity_date: validity_date,
          });
          res.status(200).json({ success: true, message: 'Successfully created new user, login now' });
      } catch (err) {
          console.log(err)
          res.status(500).json({ success: false, message: 'Error while registering new user' });
      }
  }
};

// get all _user with pagination 

exports.getalluser = (req, res) => {
  const page = parseInt(req.query.page) || 1; // set default page to 1
  const limit = parseInt(req.query.limit) || 10; // set default limit to 10
  const offset = (page - 1) * limit;

  User.findAndCountAll({
    offset,
    limit
  })
    .then((result) => {
      const totalPages = Math.ceil(result.count / limit);
      const response = {
        message: "success",
        data: result.rows,
        currentPage: page,
        totalPages
      };
      res.status(200).json(response);
    })
    .catch(() => {
      res
        .status(500)
        .send(
          "An error occurred while trying to fetch users from the database."
        );
    });
};





//  edit user_details

exports.edituser=(req,res)=>{
   const id = req.params.userId
   console.log(id,"_____<")
   User.findOne({
    where:{
       id:id,
    }
 }).then(res=>{
  res.status(200).json({success:true,message:res.dataValues})
  console.log(res,"edituser_")
 }).catch(()=>{
  res.status(500).json({success:false,message:"user not found"})
 })
}
//  delete user 
exports.deleteuser=(req,res)=>{
  const id = req.params.userId
  console.log(id,"_____<")
  User.destroy({
   where:{
      id:id,
   }
}).then(res=>{
 res.status(200).json({success:true,message:"detele succesfully"})
//  console.log(res,"edituser_")
}).catch(()=>{
 res.status(500).json({success:false,message:"user not found"})
})
}

//  blocked user api

exports.blockeduser = async (req, res) => {
  try {
    const id = req.params.userId;
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.user_status = req.body.user_status;
    await user.save();
    return res.status(200).json({ message: `User has been ${user.user_status === 'active' ? 'enabled' : 'disabled'}` });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};



// 

exports.user_list = (req,res)=>{
  const user_grp = req.body.group_name;
  User.findAll({

    where:{
      add_group:user_grp,
      user_status : "active"
    }
  }).then(data=>{
    return res.status(200).json({message:"success",data})
  }).catch(()=>{
    res.status(500).json({success:false,message:"user not found"})
   })
}

// user_roles dropdown
// routes/user.js
exports.get_roles=async(req,res)=>{
  console.log("api hit")
  try {
    const userRoles = ['admin', 'moderator', 'contributor', 'viewer'];
    res.json({ success: true, message: 'User roles retrieved successfully', userRoles });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Error while getting user roles' });
  }
}



