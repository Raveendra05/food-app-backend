const express = require("express");
const router =  express.Router();

router.post('/allData' , (req,res)=>{
    try {
        // console.log(global.food_items);
        // console.log(global.food_category);
        
            res.send([global.food_items ,global.food_category ]);
    } catch (error) {
        console.error(error.message);
        res.send("server error");
    }
})
module.exports = router;