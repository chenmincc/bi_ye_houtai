const db = require('../config/db');

const schema = new db.Schema({
    head:String,
    title:String,
    img0:String,
    klj:String,
    del:String
})
module.exports = db.model('cook',schema);
