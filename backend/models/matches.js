const mongoose = require('mongoose');
const Schema = mongoose.Schema
const Champion = new Schema({
    matchId: {type:String},
    championName:{type:String},
    item1:{type:Number},
    item2:{type:Number},
    item3:{type:Number},
    item4:{type:Number},
    item5:{type:Number},
    item6:{type:Number},
    kda:{type:Number},
})
module.exports = mongoose.model("matches",Champion);