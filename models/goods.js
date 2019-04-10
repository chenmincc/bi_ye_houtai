const db = require('../config/db');

const schema = new db.Schema({
    category:String,
    title:String,
    name:String,
    shortName:String,
    briefIntroduction:String,
    introduction:String,
    img0:String,
    imgbig:String,
    img1:String,
    img2:String,
    img3:String,
    img4:String,
    klj:String,
    del:String
})
module.exports = db.model('good',schema);
