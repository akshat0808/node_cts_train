const express = require('express');
const router = express.Router();
const Employee = require('../models/employee')


router.get('/',async(req,res)=>{

    let employees=await Employee.find();
    try{
    res.status(200).json({
        error: false,
        data:employees
    })
} catch (err){
    res.status(400).json({
        error : true,
        message : 'error'

    })
}

})

// router.get('/:id',async(req,res)=>{
//     const employee = await Employee.findById(req.params.id)

//     if(!employee)
//     let id = req.params.id;
//     console.log(id);
//     res.status(200).json({
//         error: false,
//         message: 'get employee by id:' + id
//     })

// })

router.post('/',async(req,res)=>{
    let emp = req.body;
    console.log(emp);
    let doc = await Employee.create(emp)

    try{
        res.status(200).json({
            error: false,
            data : doc
        })

    }catch(err){
        res.status(400).json({
            error: false,
            message : err.message
        })

    }
   

})


router.put('/:id',async(req,res)=>{

    const employee = await Employee.findByIdAndUpdate(req.params.id, req.body, {
        new : true,
        runValidators: true
    })
    if(!employee){
    res.status(200).json({
        error: false,
        message: 'employee does not exist'
    })
}

try {
    res.status(200).json({
        error: false,
        data : employee
    })
    
} catch (err) {
    res.status(400).json({
        error: true,
        message: err.message
    })
    
}

})

router.delete('/:id',async(req,res)=>{

    let id =req.params.id;
    console.log(id);

    const dele = await Employee.findByIdAndDelete(id);

    if(!dele){
    res.status(200).json({
        error: false,
        message: 'employee does not exist'
    })
}

try {
    res.status(200).json({
        error: false,
        data : dele
    })
    
} catch (err) {
    res.status(400).json({
        error: true,
        message: err.message
    })
    
}

})


module.exports = router;