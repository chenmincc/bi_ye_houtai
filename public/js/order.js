(function () {

  //定义这个文件操作的构造函数
  var Order = function () {
      //  定义这个页面需要的一些数据
      this.pageNum = 1;
      this.pageSize = 2;
      this.totalPage = 0;
      this.orderList = [];//数据

      // 需要用到的 dom 对象  性能优化 -dom缓存
      this.dom = {
          table: $('.order-table tbody'),
          nameInput: $('#addName'),
          nameInput1: $('#addName1'),
          nameInput2: $('#addName2'),
          pagination: $('.pagination'),    // 分页的ul
          addModal: $('#addModal'),//新增模态框
          submitAdd: $('#orderAdd'),//确认添加按钮
          updateName: $('#upName'),
          updateName1: $('#upName1'),
          updateName2: $('#upName2'),
          updateModal: $('#updateModal'),
          submitUpdate: $('#orderUpdate'),

      }
  }

  // 新增的方法add
  Order.prototype.add = function () {
      var _this = this;
      $.post('/order/add', {
          name: this.dom.nameInput.val(),
          address: this.dom.nameInput1.val(),
          phone:this.dom.nameInput2.val()
      }, function (res) {
          if (res.code == 0) {
              layer.msg('添加成功');
              // 请求一下数据
              _this.search()
          } else {
              // console.log(res.msg);
              layer.msg('网络异常，请稍后重试');
          }
          // 手动调用关闭的方法
          _this.dom.addModal.modal('hide')
          // 手动清空输入框的内容
          _this.dom.nameInput.val('');
          _this.dom.nameInput1.val('');
          _this.dom.nameInput2.val('');
      });
  }

  // 查询的方法search
  Order.prototype.search = function () {
      var _this = this;
      $.get('/order/search', {
          pageNum: this.pageNum,
          pageSize: this.pageSize
      }, function (res) {
          if (res.code == 0) {
              layer.msg('查询成功');

              // 将res.data写入到实例的orderList
              _this.orderList = res.data;
              // 将res.totalPage写入到实例的totalPage
              _this.totalPage = res.totalPage;

              // 调用渲染table
              _this.renderTable();

              // 调用渲染分页
              _this.renderPage();

          } else {
              console.log(res.msg);
              layer.msg('网络异常，请稍后重试');
          }
      })

  }

  //删除的方法
  Order.prototype.delete = function (id) {
      var id = id;
      $.post('/order/delete', {
          id: id
      }, function (res) {
          if (res.code === 0) {
              layer.msg('删除成功');

          } else {
              layer.msg('网络异常，请稍后重试');
          }
      })
  }

    //修改时携带原有数据
    Order.prototype.getData = function (id) {
      var _this = this;
      var id = id;
    //   console.log(id)
      $.post('/order/update1',{
          id:id
      },function(res){
          // console.log( res.dataName)
        //   console.log( res)
        _this.dom.updateName.val(res.name)
        _this.dom.updateName1.val(res.address)
        _this.dom.updateName2.val(res.phone)
      })
  }


  //修改的方法
  Order.prototype.update = function (id) {
      var _this = this;
      var id = id;
      console.log(id)
      $.post('/order/update', {
          id: id,
          name: this.dom.updateName.val(),
          address: this.dom.updateName1.val(),
          phone:this.dom.updateName2.val(),
      }, function (res) {
          if (res.code === 0) {
              layer.msg('修改成功');
              // 请求一下数据
              setTimeout(function () {
                  _this.search()
              },1000)
          } else {
              layer.msg('网络异常，请稍后重试');
          }
          //   手动调用关闭的方法
          _this.dom.updateModal.modal('hide')
          // 手动清空输入框的内容
          _this.dom.updateName.val('');
          _this.dom.updateName1.val('');
          _this.dom.updateName2.val('');
      })
  }

//   发送的方法
  Order.prototype.sending = function (id) {
    var _this = this;
    var id = id;
    var isShow = true;
    // alert('序号为  ' + id + '  的订单已发货');
    $.post('/order/update1',{
        id:id
    },function(res){
      $.post('/order/update', {
        id,
        name:res.name,
        address:res.address,
        phone:res.phone,
        isShow: isShow
        }, function (res) {
            if (res.code === 0) {
                layer.msg('序号为  ' + id + '  的订单已发货');
                // 请求一下数据
                setTimeout(function () {
                    _this.search()
                },1000)
            } else {
                layer.msg('网络异常，请稍后重试');
            }
        })
    })

  }

  // 渲染table
  Order.prototype.renderTable = function () {
      //清空
      this.dom.table.html('');
      for (var i = 0; i < this.orderList.length; i++) {
          this.dom.table.append(
              `
              <tr>
                  <td>${this.orderList[i]._id}</td>
                  <td>${this.orderList[i].name}</td>
                  <td>${this.orderList[i].address}</td>
                  <td>${this.orderList[i].phone}</td>
                  <td>
                  <a href="javascript:;" class="delete" data-id="${this.orderList[i]._id}">删除</a>&nbsp;&nbsp;&nbsp;
                  <button type="button" class="btn btn-primary btn-lg update" data-toggle="modal" data-target="#updateModal" data-id="${this.orderList[i]._id}" >修改</button>&nbsp;&nbsp;&nbsp;<button data-id="${this.orderList[i]._id}" class="send">发货</button>
                  </td>
              </tr>
              `
          )
      }

  }

  //渲染分页
  Order.prototype.renderPage = function () {
      var prevClassName = this.pageNum === 1 ? 'disabled' : '';
      var nextClassName = this.pageNum === this.totalPage ? 'disabled' : '';
      // 0 清空
      this.dom.pagination.html('');
      // 添加上一页
      this.dom.pagination.append(
          `
          <li class="${prevClassName}" data-num="${this.pageNum - 1}">
              <a href="#" aria-label="Previous">
              <span aria-hidden="true">&laquo;</span>
              </a>
          </li>
          `
      )

      // 根据this.totalPage循环多少个li
      for (var i = 0; i < this.totalPage; i++) {
          var className = this.pageNum === i + 1 ? 'active' : '';
          this.dom.pagination.append(
              `
          <li class="${className}" data-num=${i + 1}>
          <a href="#">${i + 1}</a></li>
          `
          )

      }

      // 添加下一页
      this.dom.pagination.append(
          `
      <li class="${nextClassName}" data-num="${this.pageNum + 1}">
      <a href="#" aria-label="Next">
        <span aria-hidden="true">&raquo;</span>
      </a>
    </li>
      `
      )

  }


  //将所有的dom事件的操作放在这里
  Order.prototype.bindDOM = function () {
      var _this = this;
      //点击新增按钮需要调用add
      this.dom.submitAdd.click(function () {
          _this.add();

      })

      // 分页按钮点击事件
      this.dom.pagination.on('click', 'li', function () {
          // 1、得到页码
          // attr获取属性，如果是自定义属性并且用data- 开头，我们可以更简单的使用data
          var num = Number($(this).data('num'));

          // 1.1 判断是否点击的是相同页，或者<1，或者>总页数
          if (_this.pageNum === num || num < 1 || num > _this.totalPage) {
              return;
          }
          // 2、设置给this.pageNum
          _this.pageNum = num;
          // 3、再次调用一下this.search
          _this.search();
      })

     // 删除按钮
     this.dom.table.on('click','.delete',function () {
      // 1.得到id
      var id = $(this).data('id');

      layer.confirm("确认删除吗？",function () {
           console.log('确认');
           _this.delete(id);
           setTimeout(function(){
               _this.search();
           },1000)

      },function () {
       console.log('取消');
      })
    })

     // 发送按钮
     this.dom.table.on('click','.send',function () {
        // 1.得到id
        var id = $(this).data('id');
        _this.sending(id);
      })


      //修改按钮
      this.dom.table.on('click', '.update', function () {
          // 1.得到id
          var id = $(this).data('id');

          _this.getData(id);
          // _this.dom.updateName.val() =  _this.dom.nameInput.val();
          // _this.dom.updateImg.val() =  _this.dom.urlInput.val();

          _this.dom.submitUpdate.click(function () {
              _this.update(id);

              // $.post('/banner/update', {
              //     id: id,
              //     bannerName: _this.dom.updateName.val(),
              //     bannerImg: _this.dom.updateImg.val()
              //     // bannerName:
              // }, function (res) {
              //     if (res.code === 0) {
              //         layer.msg('修改成功');
              //         // _this.search();
              //     } else {
              //         layer.msg('网络异常，请稍后重试');
              //     }
              //     //   手动调用关闭的方法
              //     _this.dom.updateModal.modal('hide')
              //     // 手动清空输入框的内容
              //     _this.dom.updateName.val('');
              //     _this.dom.updateImg.val('');
              // })

          })

      })

  }


  // 最后
  $(function () {
      var order = new Order();
      order.bindDOM();
      order.search();//默认渲染第一页
  })

})()


