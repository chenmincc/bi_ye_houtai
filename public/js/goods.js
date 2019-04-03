(function () {

  //定义这个文件操作的构造函数
  var Goods = function () {
      //  定义这个页面需要的一些数据
      this.pageNum = 1;
      this.pageSize = 2;
      this.totalPage = 0;
      this.bannerList = [];//数据

      // 需要用到的 dom 对象  性能优化 -dom缓存
      this.dom = {
          table: $('.banner-table tbody'),
          nameInput: $('#inputEmail3'),
          nameInput1: $('#inputEmail4'),
          nameInput2: $('#inputEmail5'),
          nameInput3: $('#inputEmail6'),
          nameInput4: $('#inputEmail7'),
          nameInput5: $('#inputEmail8'),
          nameInput6: $('#inputEmail9'),
          urlInput: $('#inputPassword3'),
          urlInput1: $('#inputPassword4'),
          urlInput2: $('#inputPassword5'),
          urlInput3: $('#inputPassword6'),
          urlInput4: $('#inputPassword7'),
          urlInput5: $('#inputPassword8'),
          pagination: $('.pagination'),    // 分页的ul
          addModal: $('#addModal'),//新增模态框
          submitAdd: $('#bannerAdd'),//确认添加按钮
          updateName: $('#updateName'),
          updateName1: $('#updateName1'),
          updateName2: $('#updateName2'),
          updateName3: $('#updateName3'),
          updateName4: $('#updateName4'),
          updateName5: $('#updateName5'),
          updateName6: $('#updateName6'),
          updateImg: $('#updateImg'),
          updateImg1: $('#updateImg1'),
          updateImg2: $('#updateImg2'),
          updateImg3: $('#updateImg3'),
          updateImg4: $('#updateImg4'),
          updateImg5: $('#updateImg5'),
          updateModal: $('#updateModal'),
          submitUpdate: $('#bannerUpdate'),

      }
  }

  // 新增的方法add
  Goods.prototype.add = function () {
      var _this = this;
      $.post('/goods/add', {
          location1: this.dom.nameInput.val(),
          location2: this.dom.nameInput1.val(),
          location3:this.dom.nameInput2.val(),
          em:this.dom.nameInput3.val(),
          h2:this.dom.nameInput4.val(),
          klj:this.dom.nameInput5.val(),
          del:this.dom.nameInput6.val(),
          img0: this.dom.urlInput.val(),
          imgbig: this.dom.urlInput1.val(),
          img1: this.dom.urlInput2.val(),
          img2: this.dom.urlInput3.val(),
          img3: this.dom.urlInput4.val(),
          img4: this.dom.urlInput5.val(),

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
          _this.dom.nameInput3.val('');
          _this.dom.nameInput4.val('');
          _this.dom.nameInput5.val('');
          _this.dom.nameInput6.val('');
          _this.dom.urlInput.val('');
          _this.dom.urlInput1.val('');
          _this.dom.urlInput2.val('');
          _this.dom.urlInput3.val('');
          _this.dom.urlInput4.val('');
          _this.dom.urlInput5.val('');
      });
  }

  // 查询的方法search
  Goods.prototype.search = function () {
      var _this = this;
      $.get('/goods/search', {
          pageNum: this.pageNum,
          pageSize: this.pageSize
      }, function (res) {
          if (res.code == 0) {
              layer.msg('查询成功');

              // 将res.data写入到实例的bannerList
              _this.bannerList = res.data;
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
  Goods.prototype.delete = function (id) {
      var id = id;
      $.post('/goods/delete', {
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
    Goods.prototype.getData = function (id) {
      var _this = this;
      var id = id;
      console.log(id)
      $.post('/goods/update1',{
          id:id
      },function(res){
          // console.log( res.dataName)
          // console.log( res.dataImg)
          _this.dom.updateName.val(res.location1)
          _this.dom.updateName1.val(res.location2)
          _this.dom.updateName2.val(res.location3)
          _this.dom.updateName3.val(res.em)
          _this.dom.updateName4.val(res.h2)
          _this.dom.updateName5.val(res.klj)
          _this.dom.updateName6.val(res.del)
          _this.dom.updateImg.val(res.img0);
          _this.dom.updateImg1.val(res.imgbig);
          _this.dom.updateImg2.val(res.img1);
          _this.dom.updateImg3.val(res.img2);
          _this.dom.updateImg4.val(res.img3);
          _this.dom.updateImg5.val(res.img4);
          // _this.dom.updateImg.val(res.dataImg)

      })
  }


  //修改的方法
  Goods.prototype.update = function (id) {
      var _this = this;
      var id = id;
      console.log(id)
      $.post('/goods/update', {
          id: id,
          location1: this.dom.updateName.val(),
          location2: this.dom.updateName1.val(),
          location3:this.dom.updateName2.val(),
          em:this.dom.updateName3.val(),
          h2:this.dom.updateName4.val(),
          klj:this.dom.updateName5.val(),
          del:this.dom.nameInput6.val(),
          img0: this.dom.updateImg.val(),
          imgbig: this.dom.updateImg1.val(),
          img1: this.dom.updateImg2.val(),
          img2: this.dom.updateImg3.val(),
          img3: this.dom.updateImg4.val(),
          img4: this.dom.updateImg5.val(),
          // bannerName:
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
          _this.dom.updateName3.val('');
          _this.dom.updateName4.val('');
          _this.dom.updateName5.val('');
          _this.dom.updateName6.val('');
          _this.dom.updateImg.val('');
          _this.dom.updateImg1.val('');
          _this.dom.updateImg2.val('');
          _this.dom.updateImg3.val('');
          _this.dom.updateImg4.val('');
          _this.dom.updateImg5.val('');
      })
  }

  // 渲染table
  Goods.prototype.renderTable = function () {
      //清空
      this.dom.table.html('');
      for (var i = 0; i < this.bannerList.length; i++) {
          this.dom.table.append(
              `
              <tr>
                  <td>${this.bannerList[i]._id}</td>
                  <td>${this.bannerList[i].location1}</td>
                  <td>${this.bannerList[i].location2}</td>
                  <td>${this.bannerList[i].location3}</td>
                  <td>${this.bannerList[i].em}</td>
                  <td>${this.bannerList[i].h2}</td>
                  <td>${this.bannerList[i].img0}</td>
                  <td>${this.bannerList[i].imgbig}</td>
                  <td>${this.bannerList[i].img1}</td>
                  <td>${this.bannerList[i].img2}</td>
                  <td>${this.bannerList[i].img3}</td>
                  <td>${this.bannerList[i].img4}</td>
                  <td>${this.bannerList[i].klj}</td>
                  <td>${this.bannerList[i].del}</td>
                  <td>
                  <a href="javascript:;" class="delete" data-id="${this.bannerList[i]._id}">删除</a>
                  <button type="button" class="btn btn-primary btn-lg update" data-toggle="modal" data-target="#updateModal" data-id="${this.bannerList[i]._id}" >修改</button>
                  </td>
              </tr>
              `
          )
      }

  }

  //渲染分页
  Goods.prototype.renderPage = function () {
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
  Goods.prototype.bindDOM = function () {
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
      var goods = new Goods();
      goods.bindDOM();
      goods.search();//默认渲染第一页
  })

})()


