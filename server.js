const express = require('express');
const app = express();
const mongoose = require("mongoose");

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

const userAdmin = new newUserModel({
  id: 1,
  username: "Mayur",
  email: "msamrutwar9@gmail.com",
  password: "abcdefg",
  transactionDetails: [
    { transactionID: "NETFLIX123", transactionAmount: 1000 },
    { transactionID: "SPOTIFY123", transactionAmount: 100 },
    { transactionID: "OTHER123", transactionAmount: 500 },
  ],
  bankDetails: [
    {bankName: "",
    accNumber: 0,
  }
  ]
});

userAdmin.save().then(()=>console.log(userAdmin))
    
// GET requests


// get user data

app.get("/user/:userEmail", (req, res)=>{
  
})


app.get("/api/ngo", (req, res) => {})
app.get("/api/ngo/:ngoid", (req, res) => {});


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




app.listen(5000, ()=>{
    console.log("Server listening on PORT 5000");
});