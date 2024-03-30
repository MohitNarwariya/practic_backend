var express = require('express');
var router = express.Router();
var pool=require('./pool');
var upload=require('./multer')

router.post('/add_new_category',upload.single('icon'), function(req,res,next){
console.log(req.body)
console.log(req.file)
pool.query("insert into category (companyid, categoryname, description, icon, createdat, updateat, createdby)values(?,?,?,?,?,?,?)",[req.body.companyid,req.body.categoryname,req.body.description,req.file.originalname,req.body.createdat,req.body.updateat,req.body.createdby],function(error,result){
    if(error)
    {
        console.log("xxxxxx"+error)
    res.status(500).json({status:false,message:'Server Error'})
    }
   else
   {
    res.status(200).json({status:true,message:'Category Registerd Successfully'})
   }



})
});

// router.get('/fetch_all_category',upload.single('icon'), function(req,res,next){
//     console.log(req.body)
//     console.log(req.file)
//     pool.query("select * from category",function(error,result){
//         if(error)
//         {
//             console.log("xxxxxx"+error)
//         res.status(500).json({status:false,message:'Server Error'})
//         }
//        else
//        {
//         res.status(200).json({status:true,data:result})
//        }
    
    
    
//     })
//     });
    

router.get('/fetch_all_category', function(req, res, next) {
    pool.query("SELECT * FROM category", function(error, result) {
        if (error) {
            console.error("Error fetching categories:", error);
            res.status(500).json({ status: false, message: 'Server Error' });
        } else {
            res.status(200).json({ status: true, data: result });
        }
    });
});

    router.post('/edit_category_data', function(req, res, next) {
   
        pool.query("update category set companyid=?, categoryname=?, description=?, updateat=?, createdby=?  where categoryid=?" ,[req.body.companyid,req.body.categoryname,req.body.description,req.body.updateat,req.body.createdby,req.body.categoryid],function(error,result){
          if(error)
          {
              console.log(error)
          res.status(500).json({status:false,message:'Server Error'})
          }
         else
         {
          res.status(200).json({status:true,message:'Company Updated Successfully'})
         }
        })
      });



      router.post('/edit_category_icon',upload.single('icon') ,function(req, res, next) {
        console.log(req.body)
        console.log(req.file)
        pool.query("update category set  icon=? where categoryid=?" ,[req.file.originalname,req.body.categoryid],function(error,result){
          if(error)
          {
            console.log("xxxxxx"+error)
          res.status(500).json({status:false,message:'Server Error'})
          }
         else
         {
          res.status(200).json({status:true,message:'Icon Updated '})
         }
        })
      });


      router.post('/delete_category_data',upload.single('icon') ,function(req, res, next) {
        
        pool.query("delete from category  where categoryid=?" ,[req.body.categoryid],function(error,result){
          if(error)
          {
            console.log("xxxxxx"+error)
          res.status(500).json({status:false,message:'Server Error'})
          }
         else
         {
          res.status(200).json({status:true,message:'Delete Category Succesfully'})
         }
        })
      });


module.exports = router;