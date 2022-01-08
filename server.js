const express = require('express');
const app = express();





// GET requests
app.get("/api/ngo", (req, res) => {})
app.get("/api/ngo/:ngoid", (req, res) => {});




app.listen(5000, ()=>{
    console.log("Server listening on PORT 5000");
});