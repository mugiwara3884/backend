
const User = require('../models/add_user')

exports.register_new  = ( async (req, res) => {
    console.log("api hit")
    const { user_type, display_name, emp_code, email, max_quota, add_group,validity_date,user_role } = req.body;
    User.findAll({where:{email:email}})
       .then(users=>{
           const user=users[0]
           if(user)
           res.json({success:false,message:'User Already exist. Please Login'})
           else
           {   
               User.create({
                   user_type:user_type,
                   display_name:display_name,
                   emp_code:emp_code,
                   email:email,
                   max_quota:max_quota,
                   add_group:add_group,
                   user_status:"active",
                   user_role:user_role,
                   validity_date:validity_date,
               })
               .then(()=>{
                   res.status(200).json({success:true,message:'Successfully user added,Login now'})
               })
               .catch(err=>{
                   console.log(err)
                   res.json({success:false,message:'error while registering'})
               })

           }
       })
    //     res.status(201).send(`User with emp_code ${emp_code} has been added to the database!`);
    // } catch (err) {
    //     console.error(err);
    //     res.status(500).send('An error occurred while trying to add the user to the database.');
    // }
});
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

exports.blockeduser= async(req,res)=>{
   const id = req.params.userId;
   const user = await User.findByPk(id);
   try{
   if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  user.user_status = 'inactive';
  await user.save();

  return res.status(204).send();
} catch (err) {
  console.error(err);
  return res.status(500).json({ error: 'Failed to block user' });

}
}