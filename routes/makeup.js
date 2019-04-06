const express = require('express');
const router = express.Router();
const MakeupModel = require('../models/makeup');
const async = require('async');


// 添加makeup  - http://localhost:3000/makeup/add
router.post('/add',(req,res)=>{
    var makeup = new MakeupModel({
        head: req.body.head,
        title: req.body.title,
        img0: req.body.img0,
        klj: req.body.klj,
        del: req.body.del
    });

    makeup
        .save()
        .then(()=>{
            res.json({
                code:0,
                msg:"ok"
            })
        })
        .catch((err)=>{
            res.json({
                code:-1,
                msg:err.message
            })
        })

})


// 搜索or查询makeup - http://localhost:3000/makeup/search
router.get('/search', (req, res) => {
    // 分页
    // 1. 得到前端传递过来的参数
    let pageNum = Number(req.query.pageNum) || 1;//当前的页数
    let pageSize = Number(req.query.pageSize) || 2;//每页显示的条数

    // 采用并行无关联
    async.parallel([
        function (cb) {
          MakeupModel.find().count().then(num => {
                cb(null, num);
            }).catch(err => {
                cb(err)
            })
        },
        function (cb) {
          MakeupModel.find().skip((pageNum - 1) * pageSize).limit(pageSize)
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

// 删除makeup http://localhost:3000/makeup/delete
router.post('/delete', (req, res) => {
    let id = req.body.id;

    MakeupModel.findOneAndDelete({
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


// 修改makeup http://localhost:3000/makeup/update
router.post('/update',(req,res)=>{
    let id = req.body.id;
    MakeupModel.update({
        _id:id
    },{
        $set:{
            head: req.body.head,
            title: req.body.title,
            img0: req.body.img0,
            klj: req.body.klj,
            del: req.body.del
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



// 修改makeup 点击修改时携带数据（查询对应的id） http://localhost:3000/makeup/update1
router.post('/update1',(req,res)=>{
    let id = req.body.id;

    MakeupModel.findOne({
        _id:id
    }).then(data=>{
        console.log(data)
        res.json({
            code: 0,
            msg: 'ok',
            head: data.head,
            title: data.title,
            img0: data.img0,
            klj: data.klj,
            del: data.del
        })
    }).catch(err=>{
        res.json({
            code: -1,
            msg: err.message
        })
    })
})

module.exports = router;







