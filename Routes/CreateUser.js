const express = require("express");
const router = express.Router();
const User = require("../models/User");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secret = "thisisalearningshouldbedoneontotheonlineplatform";
const { body, validationResult } = require("express-validator");
router.post(
  "/createUser",
  [
    body("email", "not a valid email").trim().isEmail(),
    body("name").trim().isLength({ min: 3 }),
    body("password", "not a valid password").isLength({ min: 5 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }
    // let email = req.body.email;
    // try {
    //   let data = await User.findOne({email})
    //   if(!data){
    //     return res.status(400).json({
    //       sucess:false
    //     })
    //   }
    // } catch (error) {
    //   console.log(error);
    //   return res.status(400).json({
    //     sucess:true
    //   })
    //     }
    const salt = await bcrypt.genSalt(20);
    let secPassword = await bcrypt.hash(req.body.password, salt);
    try {
      await User.create({
        name: req.body.name,
        password: secPassword,
        location: req.body.location,
        email: req.body.email,
      });
      res.json({
        sucess: true,
      });
    } catch (error) {
      console.log(error);
      res.json({
        sucess: false,
      });
    }
  }
);
router.post("/login", [
  body("email").isEmail(),
  body("password", "incorrect-password").isLength({
    min: 5,
  }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }
    let email = req.body.email;
    try {
      let userData = await User.findOne({ email });

      if (!userData) {
        return res.status(400).json({
          errors: "wrong e-mail",
        });
      }
      const passCompare = await bcrypt.compare(
        req.body.password,
        userData.password
      );
      if (!passCompare) {
        return res.status(400).json({
          errors: "wrong-password",
        });
      }
      const data = {
        user: {
          id: userData.id,
        },
      };

      const authToken = jwt.sign(data, secret);
      return res.json({
        sucess: true,
        authToken: authToken,
      });
    } catch (error) {
      console.log(error);
      res.json({
        sucess: false,
      });
    }
  },
]);
module.exports = router;
