const router = require('express').Router()
const Admin = require('../models/admin.model')

router.route('/').get((req, res)=>{
    res.status(200).json({"message" : "Welcome to Admin Panel"})
})

router.route('/add').post((req, res)=>{
    if(req.body.auth_id !== process.env.ADMIN_AUTH_ID){
        res.json({"message": "You are not allowed to create new Admin"})
        return
    }

    const admin_phone = req.body.admin_phone
    const admin_whatsapp = req.body.admin_whatsapp
    const admin_email = req.body.admin_email
    const admin_password = req.body.admin_password

    const newAdmin = new Admin({
        admin_phone,
        admin_whatsapp,
        admin_email,
        admin_password
    })

    newAdmin.save()
    .then((admin) =>
      res.json({
        message: "New Admin Added",
        stat: true,
        id: admin._id,
      })
    )
    .catch((err) => {
      res.status(400).json(err);
      console.log(err);
    });



})



router.route('/:email').get((req, res)=>{

  findUser(req.params.email, (err, admin) => {
    if (admin) {
      if(req.query.password !== admin.admin_password){
        return res.json({message: "Invalid Credentials", stat : false})
      }
      const returnAdmin = {
        admin_email : admin.admin_email,
        admin_phone : admin.admin_phone,
        admin_whatsapp : admin.admin_whatsapp,
        stat : true
      }
      return res.json(returnAdmin)
    } else {
      res.json({ message: "Admin not found", stat: false});
    }
  });

})

  
// Function for finding existing user
function findUser(email, callback) {
  Admin.findOne({ admin_email: email }, function (err, userObj) {
    if (err) {
      return callback(err);
    } else if (userObj) {
      return callback(null, userObj);
    } else {
      return callback();
    }
  });
}  
module.exports = router