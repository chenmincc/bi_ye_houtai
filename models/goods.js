const db = require('../config/db');

const schema = new db.Schema({
    location1:String,
    location2:String,
    location3:String,
    img0:String,
    imgbig:String,
    img1:String,
    img2:String,
    img3:String,
    img4:String,
    em:String,
    h2:String,
    klj:String,
    del:String
})
module.exports = db.model('banner',schema);
