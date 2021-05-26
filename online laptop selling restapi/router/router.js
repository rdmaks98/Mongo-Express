const express = require("express");
const { route } = require("../../3.Mongo restapi/basic/router/router");
const router = express.Router();
const Product = require('../model/product');

router.get("/",(req,res) => {
    res.send(`<h2>Product Page</h2>`);
});

// insert data
router.post("/product",async (req,res) => {
    console.log(req.body);
    try{
        const product = new Product(req.body);
        const insert = await product.save();
        if(insert)
        {
            res.status(200).json({message:product});
        }
        else
        {
            res.status(500).json({message:error});        }
        }
    catch(err)
    {
        console.log(err);
    }
});

router.get("/product", async(req,res) => {
    try
    {
        const product = await Product.find();
        res.status(200).json({message:product});
    }
    catch(err)
    {
        console.log(err);
        res.status(500).json({message:err});
    }
});


router.get("/product/:id",async(req,res) => {
    try
    {
        const _id = req.params.id;
        // console.log(id);
        const Getproduct = await Product.findById({_id});
        if(!Getproduct)
        {
            res.status(404).json({error:"No record"});
        }
        else
        {
            res.status(200).json({message:Getproduct});
        }
    }
    catch(err)
    {
        console.log(err);
        res.status(500).json({message:err});
    }
})


router.patch("/product/:id",async(req,res) => {
    try
    {
        const _id = req.params.id;
        const Update = await Product.findByIdAndUpdate(_id,req.body,{
            new :true,
        }); 
        if(!Update)
        {
            res.status(404).json({error:"Please enter correct id"});
        }
        else
        {
            res.status(200).json({message:Update});
        }
    }
    catch(err)
    {
        console.log(err);
    }
})

router.delete("/product/:id",async(req,res) => {
    try{
    const _id = req.params.id;
    const Delete = await Product.findByIdAndDelete({_id});
        if(!Delete)
        {
            res.status(404).json({error:"No found"});
        }
        else
        {
            res.status(200).json({message:"data delete"});
        }
    }
    catch(err)
    {
        console.log(err);
    }
});

module.exports = router;