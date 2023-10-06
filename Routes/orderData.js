const express = require("express");
const router = express.Router();
const Order = require('../models/order');
router.post('/orderdata',async(req,res)=>{
    // console.log(req.body.email);
    let data = req.body.order_data;
    await data.splice(0,0,{ Order_date:req.body.order_date })
    let emailId = await Order.findOne({
        "email":req.body.email
    })
    // console.log(emailId);
    if(emailId===null){
        try {
            await Order.create({
                email:req.body.email,
                OrderData:[data],
            }).then(()=>{
                res.json({
                    success:true
                })
            })
        } catch (error) {
            console.log(error);
            res.send("there could be an error");
        }
    }
    else{
        try {
            await Order.findOneAndUpdate({
                email:req.body.email
            },
                {
                    $push:{
                        OrderData:data
                    }
                }            
            ).then(()=>{
                res.send({
                    success:true
                })
            })
        } catch (error) {
            console.log(error);
            res.send("server error")
        }
    }
})

router.post('/myOrderData' , async(req,res)=>{
    try {
        let myData = await Order.findOne({
            "email":req.body.email
        })
        res.send({
            OrderData:myData
        })
    } catch (error) {
        res.send("server error")
    }
})

module.exports= router;