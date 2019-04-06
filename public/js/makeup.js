(function () {

  //定义这个文件操作的构造函数
  var Makeup = function () {
      //  定义这个页面需要的一些数据
      this.pageNum = 1;
      this.pageSize = 2;
      this.totalPage = 0;
      this.bannerList = [];//数据

      // 需要用到的 dom 对象  性能优化 -dom缓存
      this.dom = {
          table: $('.banner-table tbody'),
          nameInput: $('#input1'),
          nameInput1: $('#input2'),
          nameInput2: $('#input3'),
          nameInput3: $('#input4'),
          nameInput4: $('#input5'),
          pagination: $('.pagination'),    // 分页的ul
          addModal: $('#addModal'),//新增模态框
          submitAdd: $('#bannerAdd'),//确认添加按钮
          updateName: $('#update1'),
          updateName1: $('#update2'),
          updateName2: $('#update3'),
          updateName3: $('#update4'),
          updateName4: $('#update5'),
          updateModal: $('#updateModal'),
          submitUpdate: $('#bannerUpdate'),

      }
  }

  // 新增的方法add
  Makeup.prototype.add = function () {
      var _this = this;
      $.post('/makeup/add', {
          head: this.dom.nameInput.val(),
          title: this.dom.nameInput1.val(),
          klj:this.dom.nameInput3.val(),
          del:this.dom.nameInput4.val(),
          img0: this.dom.nameInput2.val(),


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
      });
  }

  // 查询的方法search
  Makeup.prototype.search = function () {
      var _this = this;
      $.get('/makeup/search', {
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
  Makeup.prototype.delete = function (id) {
      var id = id;
      $.post('/makeup/delete', {
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
    Makeup.prototype.getData = function (id) {
      var _this = this;
      var id = id;
      console.log(id)
      $.post('/makeup/update1',{
          id:id
      },function(res){
          _this.dom.updateName.val(res.head)
          _this.dom.updateName1.val(res.title)
          _this.dom.updateName2.val(res.img0)
          _this.dom.updateName3.val(res.klj)
          _this.dom.updateName4.val(res.del)

      })
  }


  //修改的方法
  Makeup.prototype.update = function (id) {
      var _this = this;
      var id = id;
      console.log(id)
      $.post('/makeup/update', {
          id: id,
          head: this.dom.updateName.val(),
          title: this.dom.updateName1.val(),
          img0:this.dom.updateName2.val(),
          klj:this.dom.updateName3.val(),
          del:this.dom.updateName4.val(),
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
      })
  }

  // 渲染table
  Makeup.prototype.renderTable = function () {
      //清空
      this.dom.table.html('');
      for (var i = 0; i < this.bannerList.length; i++) {
          this.dom.table.append(
              `
              <tr>
                  <td>${this.bannerList[i]._id}</td>
                  <td>${this.bannerList[i].head}</td>
                  <td>${this.bannerList[i].title}</td>
                  <td>${this.bannerList[i].img0}</td>
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
  Makeup.prototype.renderPage = function () {
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
  Makeup.prototype.bindDOM = function () {
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
      var makeup = new Makeup();
      makeup.bindDOM();
      makeup.search();//默认渲染第一页
  })

})()


