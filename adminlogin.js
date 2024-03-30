var express=require('express')
var router = express.Router();
var pool = require("./pool");

var upload = require("./multer");
/*API to Add New User  */
router.post('/add_user_data', function(req, res, next) {
    console.log(req.body)

  pool.query("insert into users (username, mobileno, email, password) values (?,?,?,?)",[req.body.username,req.body.mobileno,req.body.email,req.body.password],function(error,result){
    if(error)
    {
        console.log("xxxxxx"+error)
    res.status(500).json({status:false,message:'Server Error'})
    }
   else
   {    
        console.log("RESULT", result);
    res.status(200).json({status:true,message:'User Registerd Successfully'})
   }
  })
});





// router.post('/checklogin',function(req,res,next){
//   console.log(req.body);
//   pool.query('select * from users where emailid=? and password=?',[req.body.emailid,req.body.password],function(error,result){
//     if(result.error)
//     {
//       res.status(200).json({status:false,data:[],message:'Server Error....'})
//     }
//     else
//     {
//      if(result.length==1)
//      { 
//        res.status(200).json({status:true,data:result[0],message:'Login Successful....'});
//       }
//       else
//       {
//         res.status(200).json({status:false,data:[],message:'Invalid userid/password'});
//       }
//     }
//   })
// });


module.exports = router;