var express = require('express');
var router = express.Router();
var pool=require('./pool');
var upload=require('./multer')




router.post('/add_new_productlist',upload.any(), function(req, res, next) {
    console.log(req.body)
    console.log(req.files)
    var file_str=""
  req.files.map((item)=>{
   file_str+=item.filename+","

  })

  pool.query("insert into listproduct (companyid, categoryid, productid, weight, price, offerprice, description, image, createdat, updatedat, createdby)values(?,?,?,?,?,?,?,?,?,?,?)",[req.body.companyid,req.body.categoryid,req.body.productid,req.body.weight,req.body.price,req.body.offerprice,req.body.description,file_str,req.body.createdat,req.body.updatedat,req.body.createdby],function(error,result){
   if(error)
   { console.log("xxxxx"+error)
    res.status(200).json({status:false,message:'Server error....'})
   }
   else
   {
    res.status(200).json({status:true,message:'Data Added Successfully'})
   }

  })
  
});

router.get('/fetch_all_listproduct', function(req, res, next) {
    pool.query("SELECT * FROM listproduct", function(error, result) {
        if (error) {
            console.error("Error fetching categories:", error);
            res.status(500).json({ status: false, message: 'Server Error' });
        } else {
            res.status(200).json({ status: true, data: result });
        }
    });
});

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


router.post('/fetch_all_product',function(req,res,next){
    pool.query("SELECT * FROM products where categoryid=? ",[req.body.categoryid],function(error,result){
        if (error) {
            console.error("Error fetching Product:", error);
            res.status(500).json({ status: false, message: 'Server Error' });
        } else {
            res.status(200).json({ status: true, data: result });
        }
    })
})


router.post('/add_new_productlist',upload.any(), function(req, res, next) {
    console.log(req.body)
    console.log(req.files)
    var file_str=""
  req.files.map((item)=>{
   file_str+=item.filename+","

  })

  pool.query("update  listproduct set companyid=?, categoryid=?, productid=?, weight=?, price=?, offerprice=?, description=?, createdat, updatedat, createdby where productlistid=?",[req.body.companyid,req.body.categoryid,req.body.productid,req.body.weight,req.body.price,req.body.offerprice,req.body.description,req.body.createdat,req.body.updatedat,req.body.createdby,req.body.productlistid],function(error,result){
   if(error)
   { console.log("xxxxx"+error)
    res.status(200).json({status:false,message:'Server error....'})
   }
   else
   {
    res.status(200).json({status:true,message:'Data Edit Successfully'})
   }

  })
  
});


module.exports = router;