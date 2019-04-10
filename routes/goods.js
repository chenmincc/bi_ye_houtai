const express = require('express');
const router = express.Router();
const GoodsModel = require('../models/goods');
const async = require('async');


// 添加goods  - http://localhost:3000/goods/add
router.post('/add',(req,res)=>{
    var goods = new GoodsModel({
        category: req.body.category,
        title: req.body.title,
        name: req.body.name,
        shortName: req.body.shortName,
        briefIntroduction: req.body.briefIntroduction,
        introduction: req.body.introduction,
        img0: req.body.img0,
        imgbig: req.body.imgbig,
        img1: req.body.img1,
        img2: req.body.img2,
        img3: req.body.img3,
        img4: req.body.img4,
        klj: req.body.klj,
        del: req.body.del
    });

    goods
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


// 搜索or查询goods - http://localhost:3000/goods/search
router.get('/search', (req, res) => {
    // 分页
    // 1. 得到前端传递过来的参数
    let pageNum = Number(req.query.pageNum) || 1;//当前的页数
    let pageSize = Number(req.query.pageSize) || 2;//每页显示的条数

    // 采用并行无关联
    async.parallel([
        function (cb) {
          GoodsModel.find().count().then(num => {
                cb(null, num);
            }).catch(err => {
                cb(err)
            })
        },
        function (cb) {
          GoodsModel.find().skip((pageNum - 1) * pageSize).limit(pageSize)
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

// 删除goods http://localhost:3000/goods/delete
router.post('/delete', (req, res) => {
    let id = req.body.id;

    GoodsModel.findOneAndDelete({
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


// 修改goods http://localhost:3000/goods/update
router.post('/update',(req,res)=>{
    let id = req.body.id;

    GoodsModel.update({
        _id:id
    },{
        $set:{
            category: req.body.category,
            title: req.body.title,
            name: req.body.name,
            shortName: req.body.shortName,
            briefIntroduction: req.body.briefIntroduction,
            introduction: req.body.introduction,
            img0: req.body.img0,
            imgbig: req.body.imgbig,
            img1: req.body.img1,
            img2: req.body.img2,
            img3: req.body.img3,
            img4: req.body.img4,
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



// 修改goods 点击修改时携带数据（查询对应的id） http://localhost:3000/goods/update1
router.post('/update1',(req,res)=>{
    let id = req.body.id;

    GoodsModel.findOne({
        _id:id
    }).then(data=>{
        console.log(data)
        res.json({
            code: 0,
            msg: 'ok',
            category: data.category,
            title: data.title,
            name: data.name,
            shortName: data.shortName,
            briefIntroduction: data.briefIntroduction,
            introduction: data.introduction,
            img0: data.img0,
            imgbig: data.imgbig,
            img1: data.img1,
            img2: data.img2,
            img3: data.img3,
            img4: data.img4,
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

// 分类查询
// http://localhost:3000/goods/searchCategory
router.post('/searchCategory',(req,res)=>{
    let category = req.body.category;

    GoodsModel.find({
        category:category
    }).then(data=>{
        console.log(data)
        res.json({
            code: 0,
            msg: 'ok',
            data:data
        })
    }).catch(err=>{
        res.json({
            code: -1,
            msg: err.message
        })
    })
})
// 简称查询 http://localhost:3000/goods/searchShortName
router.post('/searchShortName',(req,res)=>{
    let shortName = req.body.shortName;

    GoodsModel.find({
        shortName:shortName
    }).then(data=>{
        console.log(data)
        res.json({
            code: 0,
            msg: 'ok',
            data: data
        })
    }).catch(err=>{
        res.json({
            code: -1,
            msg: err.message
        })
    })
})

// 模糊查询 http://localhost:3000/goods/searchName
router.post('/searchName',(req,res)=>{
    let name = req.body.name;

    GoodsModel.find({
        name:{$regex:name}
    }).then(data=>{
        console.log(data)
        res.json({
            code: 0,
            msg: 'ok',
            data: data
        })
    }).catch(err=>{
        res.json({
            code: -1,
            msg: err.message
        })
    })
})
module.exports = router;







