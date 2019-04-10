const mongoose = require('mongoose');
const url = "mongodb://localhost:27017/happyGoShopping";

mongoose
    .connect(url,{useNewUrlParser:true})
    .then(()=>{
        console.log("连接成功")
    })
    .catch((err)=>{
        console.log('连接失败', err.message)
    })

    module.exports = mongoose;
