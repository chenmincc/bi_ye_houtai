const express = require('express');
const router = express.Router();
const userCheck = require('../middlewares/userCheck');

// 首页 - http://localhost:3000/
router.get('/',userCheck,(req,res)=>{
    // 要获取用户登录的用户名
    res.render('index',{
        nickName:req.cookies.nickName,
        isAdmin:Number(req.cookies.isAdmin)
    });
})


// goods 页面
router.get('/goods.html',userCheck,(req,res)=>{
    res.render('goods',{
        nickName:req.cookies.nickName,
        isAdmin:Number(req.cookies.isAdmin)
    });
})


//cook 页面
// router.get('/cook.html',userCheck,(req,res)=>{
//     res.render('cook',{
//         nickName:req.cookies.nickName,
//         isAdmin:Number(req.cookies.isAdmin)
//     });
// })

// makeup 页面
// router.get('/makeup.html',userCheck,(req,res)=>{
//     res.render('makeup',{
//         nickName:req.cookies.nickName,
//         isAdmin:Number(req.cookies.isAdmin)
//     });
// })

//food 页面
// router.get('/food.html',userCheck,(req,res)=>{
//     res.render('food',{
//         nickName:req.cookies.nickName,
//         isAdmin:Number(req.cookies.isAdmin)
//     });
// })

//cloth 页面
// router.get('/cloth.html',userCheck,(req,res)=>{
//     res.render('cloth',{
//         nickName:req.cookies.nickName,
//         isAdmin:Number(req.cookies.isAdmin)
//     });
// })

//life 页面
// router.get('/life.html',userCheck,(req,res)=>{
//     res.render('life',{
//         nickName:req.cookies.nickName,
//         isAdmin:Number(req.cookies.isAdmin)
//     });
// })

//order 页面
router.get('/order.html',userCheck,(req,res)=>{
    res.render('order',{
        nickName:req.cookies.nickName,
        isAdmin:Number(req.cookies.isAdmin)
    });
})


// users 页面
router.get('/users.html',userCheck,(req,res)=>{
    res.render('users',{
        nickName:req.cookies.nickName,
        isAdmin:Number(req.cookies.isAdmin)
    });
})

// 注册 页面
router.get('/register.html', (req, res) => {
    res.render('register');
})
// 登录 页面
router.get('/login.html', (req, res) => {
    res.render('login');
})

module.exports = router;
