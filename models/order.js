const db = require('../config/db');

const schema = new db.Schema({
    // name:String,
    // address:String,
    // phone:String,
    name:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    isShow:{
        type:Boolean,
        default:false
    }
})
module.exports = db.model('order',schema);
