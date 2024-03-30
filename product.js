var express = require('express');
var router = express.Router();
var pool=require('./pool');
var upload=require('./multer')

router.post('/add_new_product',upload.single('image'), function(req,res,next){
console.log(req.body)
console.log(req.file)
pool.query("insert into products ( companyid, categoryid, productname, description, status, trending, deals, pricetype, image, createdat, updatedat, createdby)values(?,?,?,?,?,?,?,?,?,?,?,?)",[req.body.companyid,req.body.categoryid,req.body.productname,req.body.description,req.body.status,req.body.trending,req.body.deals,req.body.pricetype,req.file.originalname,req.body.createdat,req.body.updateat,req.body.createdby],function(error,result){
    if(error)
    {
        console.log("xxxxxx"+error)
    res.status(500).json({status:false,message:'Server Error'})
    }
   else
   {
    res.status(200).json({status:true,message:'Products Registerd Successfully'})
   }
})
});


router.get('/fetch_all_products', function(req, res, next) {
    pool.query("SELECT P.*,(select C.categoryname from category C where C.categoryid = P.categoryid) as categoryname  FROM products P", function(error, result) {
        if (error) {
            console.error("Error fetching Product:", error);
            res.status(500).json({ status: false, message: 'Server Error' });
        } else {
            res.status(200).json({ status: true, data: result });
        }
    });
});


router.post('/edit_product_data',upload.single('image'), function(req,res,next){
    console.log(req.body)
   
    pool.query("update products set companyid=?, categoryid=?, productname=?, description=?, status=?, trending=?, deals=?, pricetype=?,  updatedat=?, createdby=? where productid=?",[req.body.companyid,req.body.categoryid,req.body.productname,req.body.description,req.body.status,req.body.trending,req.body.deals,req.body.pricetype,req.body.updateat,req.body.createdby,req.body.productid],function(error,result){
        if(error)
        {
            console.log("xxxxxx"+error)
        res.status(500).json({status:false,message:'Server Error'})
        }
       else
       {
        res.status(200).json({status:true,message:'Products Update Successfully'})
       }
    })
    });


    router.post('/edit_product_image',upload.single('image') ,function(req, res, next) {
        console.log(req.body)
        console.log(req.file)
        pool.query("update products set  image=? where productid=?" ,[req.file.originalname,req.body.productid],function(error,result){
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


      router.post('/delete_product_data',upload.single('icon') ,function(req, res, next) {
        
        pool.query("delete from products  where productid=?" ,[req.body.productid],function(error,result){
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