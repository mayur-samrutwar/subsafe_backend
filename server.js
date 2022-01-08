const express = require('express');
const app = express();
const mongoose = require("mongoose");
const axios = require("axios");
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose.connect(
  "mongodb+srv://subsafe:subsafe@cluster0.2awjl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true }
);


// array of transactions
const transactionSchema = new mongoose.Schema({transactionID: String, transactionAmount: Number});
// Bank acc details schema
const bankDetailsSchema = new mongoose.Schema({
  bankName: String,
  accNumber: Number,
});

// user schema
const userSchema = new mongoose.Schema({
    email: String,
    username: String,
    password: String,
    bankName: String,
    transactionDetails: [transactionSchema],
    bankDetails: [bankDetailsSchema]
  })

 
// org Schema
const orgSchema = new mongoose.Schema({
    orgName: String,
    orgType: String,
    orgAbout: String,
    ougURL: String
})



// Create a model for users
const newUserModel = new mongoose.model("user", userSchema)
// model for orgs
const newOrgModel = new mongoose.model("org", orgSchema)

// const userAdmin = new newUserModel({
//   id: 1,
//   username: "Mayur",
//   email: "msamrutwar9@gmail.com",
//   password: "abcdefg",
//   transactionDetails: [
//     { transactionID: "NETFLIX123", transactionAmount: 1000 },
//     { transactionID: "SPOTIFY123", transactionAmount: 100 },
//     { transactionID: "OTHER123", transactionAmount: 500 },
//   ],
//   bankDetails: [
//     {bankName: "",
//     accNumber: 0,
//   }
//   ]
// });

// userAdmin.save().then(()=>console.log(userAdmin))
    
// GET requests


// get user data

app.get("/api", (req, res)=>{
  res.json({msg: "success"});
})

app.get("/user/:a", (req, res)=>{
  // const email = req.params.useremail;
  // res.json({msg: req.params.a});
  newUserModel.find({email: req.params.a}, (err, user)=>{
    res.json({msg: user});
  })
})


app.get("/api/ngo", (req, res) => {})


// POST requests
// 1. save org data

app.post("/api/neworg", (req, res) =>{
  const newOrg = new newOrgModel({
    orgName: req.body.OrgName,
    orgType: req.body.OrgType,
    orgAbout: req.body.OrgAbout,
    orgURL: req.body.OrgURL,

  });
  newOrg.save(function (err) {
    if (err) {
      console.log(err);
    } else {
        console.log(newOrg);
      res.redirect("/donate");
    }
  });
})



// 2. save new user

app.post("/api/register", (req, res) => {

  console.log(JSON.parse(req.body));
  const userData = JSON.parse(req.body)
console.log(JSON.parse(req.body).data);
  const newUser = new newUserModel({
    username: userData.data.userName,
    email: userData.data.userEmail,
    password: userData.data.userPassword,
    transactionDetails: [
      { transactionID: "NETFLIX123", transactionAmount: 1000 },
      { transactionID: "SPOTIFY123", transactionAmount: 100 },
      { transactionID: "OTHER123", transactionAmount: 500 },
    ],
    bankDetails: [{ bankName: "", accNumber: 0 }],
  });

  newUser.save(function (err) {
    if (err) {
      console.log(err);
    } else {
      console.log(newUser);
    }
  });
});




app.listen(5000, ()=>{
    console.log("Server listening on PORT 5000");
});