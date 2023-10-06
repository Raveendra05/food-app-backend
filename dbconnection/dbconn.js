const mongoose = require("mongoose");
const { db } = require("../models/User");
const URL = "mongodb://127.0.0.1:27017/gofood";
mongoose.set("strictQuery", true);
const connection = () => {
  mongoose.connect(URL, { useNewUrlParser: true }, (error, result) => {
    if (error) console.log("error", error);
    else console.log("this is connected");
    const fetch_data = mongoose.connection.db.collection("food_items");
    fetch_data.find({}).toArray(function (err, res) {

      const foodCategory = mongoose.connection.db.collection("food_category");
      foodCategory.find({}).toArray(function (error , categoryData){

        if (error) console.log(error);
        else {
          global.food_items=res;
          global.food_category=categoryData;
        }
      })
    });
  });
};
module.exports = connection;
