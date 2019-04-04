const express = require('express');
const router = express.Router();
const OrderModel = require('../models/order');
const async = require('async');


// 添加order  - http://localhost:3000/order/add
router.post('/add',(req,res)=>{
    var order = new OrderModel({
        name: req.body.name,
        address: req.body.address,
        phone: req.body.phone,
        isShow: req.body.isShow
    });

    order
        .save()
        .then((data)=>{
            res.json({
                code:0,
                msg:"ok",
                id:data._id
            })
        })
        .catch((err)=>{
            res.json({
                code:-1,
                msg:err.message
            })
        })

})


// 搜索or查询order - http://localhost:3000/order/search
router.get('/search', (req, res) => {
    // 分页
    // 1. 得到前端传递过来的参数
    let pageNum = Number(req.query.pageNum) || 1;//当前的页数
    let pageSize = Number(req.query.pageSize) || 2;//每页显示的条数

    // 采用并行无关联
    async.parallel([
        function (cb) {
          OrderModel.find().count().then(num => {
                cb(null, num);
            }).catch(err => {
                cb(err)
            })
        },
        function (cb) {
          OrderModel.find().skip((pageNum - 1) * pageSize).limit(pageSize)
                .then(data => {
                    cb(null, data);
                }).catch(err => {
                    cb(err)
                })
        }
    ], function (err, result) {
        console.log(result);
        if (err) {
            res.json({
                code: -1,
                msg: err.message
            })
        } else {
            res.json({
                code: 0,
                msg: 'ok',
                data: result[1],
                totalPage: Math.ceil(result[0] / pageSize)
            })
        }
    })
})

// 删除order http://localhost:3000/order/delete
router.post('/delete', (req, res) => {
    let id = req.body.id;

    OrderModel.findOneAndDelete({
        _id: id
    }).then(data => {
        if (data) {
            res.json({
                code: 0,
                msg: 'ok'
            })
        } else {
            res.json({
                code: -1,
                msg: '未找到相关记录'
            })
        }
    }).catch(err => {
        res.json({
            code: -1,
            msg: err.message
        })
    })
})


// 修改order http://localhost:3000/order/update
router.post('/update',(req,res)=>{
    let id = req.body.id;

    OrderModel.update({
        _id:id
    },{
        $set:{
            name: req.body.name,
            address: req.body.address,
            phone: req.body.phone,
            isShow: req.body.isShow
        }
    }).then(()=>{
        res.json({
            code: 0,
            msg: 'ok'
        })
    }).catch(err=>{
        res.json({
            code: -1,
            msg: err.message
        })
    })
})



// 修改order 点击修改时携带数据（查询对应的id） http://localhost:3000/order/update1
router.post('/update1',(req,res)=>{
    let id = req.body.id;

    OrderModel.findOne({
        _id:id
    }).then(data=>{
        console.log(data)
        res.json({
            code: 0,
            msg: 'ok',
            name: data.name,
            address: data.address,
            phone: data.phone,
            isShow: data.isShow
        })
    }).catch(err=>{
        res.json({
            code: -1,
            msg: err.message
        })
    })
})

/// 修改order中的isShow http://localhost:3000/order/update2
router.post('/update2',(req,res)=>{
    let id = req.body.id;

    OrderModel.update({
        _id:id
    },{
        $set:{
            isShow: req.body.isShow
        }
    }).then(()=>{
        res.json({
            code: 0,
            msg: 'ok'
        })
    }).catch(err=>{
        res.json({
            code: -1,
            msg: err.message
        })
    })
})

module.exports = router;







