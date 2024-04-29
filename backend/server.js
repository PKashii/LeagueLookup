const express=require("express");

const dotenv=require('dotenv');
const mongoose=require("mongoose");
const matches = require("./models/matches")


const app=express();
dotenv.config();




app.use(express.json())


mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('DBCONN'))
.catch(err=>console.log(err))


app.get('/Champ/get',(res,req)=>{
    matches.find()
    .then(champ=>res.json(champ))
    .catch(err => res.json(err))
})

const port=process.env.PORT;
app.listen(port,console.log(`on ${port}`));
