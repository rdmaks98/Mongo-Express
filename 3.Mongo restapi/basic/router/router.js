const express = require("express");
const router = express.Router();
const Student = require('../model/mode');

// get data form server
router.get("/",(req,res) => {
    res.send("<h2>calling databse</h2>");
});

// insert data using post method
// app.post("/student", (req, res) => {
//   console.log(req.body);
//   const user = new Student(req.body);
//   user
//     .save()
//     .then(() => {
//       res.status(200).json({ message: user });
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(500).json({ message: err });
//     });
// });

// ASSYNCHRONIZE
router.post("/student",async (req, res) => {
    // console.log(req.body);
    try{
        const user = new Student(req.body);
        const result = await user.save();
        if(result)
        {
            res.status(200).json({messge:user});
        }
        else
        {
            res.status(500).json({message:err});
        }
    }
    catch(err)
    {
        console.log(err);
    }
});

// get method using getting all student data
router.get("/student",async (req,res) => {
    try{
        const User = await Student.find();
        res.status(200).json({message:User});
    }
    catch(err)
    {
        console.log(err);
        res.status(500).json({message:err});
    }
});

// find a specific student using get method

router.get("/student/:id",async(req,res) => {
    try
    {
        // console.log(req.params.id);
        const _id = req.params.id;
        const GetUser = await Student.findById({_id});
        if(!GetUser)
        {
            res.status(404).json({error:'No Record'});
        }
        else{
            res.status(200).json({message:GetUser});
        }
    }
    catch(err)
    {
        console.log(err);
        res.status(500).json({message:err});
    }
})

// update data using express
router.patch("/student/:id",async(req,res) => {
    try
    {
        // console.log(req.params.id);
        const _id = req.params.id;
        const Updateuser = await Student.findByIdAndUpdate( _id,req.body,{
            new:true,
        });
        if(!Updateuser)
        {
            res.status(404).json({ error:'No Record' });
        }
        else{
            res.status(200).json({ message:Updateuser });
        }
    }
    catch(err)
    {
        console.log(err);
        res.status(500).json({message:err});
    }
});

// delete user by id
router.delete("/student/:id",async(req,res) => {
    try
    {
        // console.log(req.params.id);
        const _id = req.params.id;
        const Delete = await Student.findByIdAndDelete(_id);
        if(!Delete)
        {
            res.status(404).json({error:'No Record'});
        }
        else{
            res.status(200).json({message:Delete});
        }
    }
    catch(err)
    {
        console.log(err);
        res.status(500).json({message:err});
    }
});

module.exports = router;