const express = require("express");
const connection = require("./dbconnection/dbconn");
const cors =require("cors");
const app = express();
const port =5000;
app.use(express.json());
app.use(cors({origin:"*"}));
connection();
app.get('/' , (req,res)=>{
    res.send("this is a response of our data");
})
app.use('/api' , require("./Routes/CreateUser"));
app.use('/api' , require("./Routes/cardData"));
app.use('/api' , require("./Routes/orderData"));
app.listen(port , ()=>{
    console.log(`this is a example of port ${port}`);
});