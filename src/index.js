
const express = require('express');
var bodyParser = require('body-parser');

const route = require('./routes/route.js');
const mongoose=require("mongoose");
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect("mongodb+srv://AnkitJackie:6yLdxnYPG3oatnHe@cluster0.f4mg0.mongodb.net/valuePitch",{
    useNewUrlParser:true
})
.then(()=>{console.log("Mongodb is Connected")})
.catch((err)=>{console.log(err)})

app.use('/', route);

app.listen(process.env.PORT || 3000, function() {
    console.log('Express app running on port ' + (process.env.PORT || 3000))
});