const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const path = require('path');

const indexRouter = require('./routes/index');
const CookRouter = require('./routes/cook');
const MakeupRouter = require('./routes/makeup');
const goodsRouter = require('./routes/goods');
const orderRouter = require('./routes/order');
const userRouter = require('./routes/user');



app.use(express.static(path.resolve(__dirname,'./public')));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.set('views','./views');
app.set('view engine','ejs');

app.use(function (req,res,next) {
  res.set('Access-Control-Allow-Origin','*');
  res.set('Access-Control-Allow-Headers','Content-Type')
  next();
})

app.use('/',indexRouter);
app.use('/cook',CookRouter);
app.use('/makeup',MakeupRouter);
app.use('/goods',goodsRouter);
app.use('/order',orderRouter);
app.use('/user',userRouter);





app.listen(3000)
