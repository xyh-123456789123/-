$(function() {
    $.ajax({
        type: 'get',
        url:  BigNew.comment_list,
        success: function(res) {
            // console.log(res)
            if (res.code === 200) {
                var str = template('tip',res.data)
                $('tbody').html(str)

           if (res.data.totalCount == 0) {
          // 隐藏分页插件 显示无数据
          $('#pagination-demo').hide().next().show()
        } else {
          $('#pagination-demo').show().next().hide()
          // 调用方法开启分页
          pagination(res)
        }
            }
        }
    })

 // 封装了一个实现分页结构的函数
  var currentPage = 1
  function pagination(res) {
    // 调用方法启用分页
    $('#pagination-demo').twbsPagination({
      // totalPages: 35, // 总页数
      totalPages: res.data.totalPage, // 总页数
      visiblePages: 7, // 当前显示的相关页码 最大显示7个
      first: '第一页',
      last: '最后一页',
      prev: '上一页',
      next: '下一页',
      initiateStartPageClick: false,
      onPageClick: function (event, page) {
        // $('#page-content').text('Page ' + page)
        // page表示当前被单击的页码值
        // console.log(page,event);
        currentPage = page
        // 3. 实现分页功能 
        // 3.1 当单击当前页码的时候，应该将当前页码发送给服务器
        $.ajax({
          type: 'get',
          url: BigNew.comment_list,
          data: {
            page: page,
            perpage: 6 // 页面中显示的数据条数
          },
          success: function (res) {
            console.log(res)
            // 2.2 将获取到的第1页文章数据渲染到页面中
            if (res.code == 200) {
              // 3.2 将服务器响应回来的数据渲染到页面上
              var str = template('tip', res.data)
              $('tbody').html(str)
            }
          }
        })

      }
    })
  }
   

  //通过状态

  $('tbody').on('click','.btn-pass',function() {
      var that = this
      var id = $('.btn-pass').data('id')
      $.ajax({
        type: 'post',
        url: BigNew.comment_pass,
        data: {
          id: id
        },
        success:function(data) {
          //console.log(data)
          if (data.code === 200) {
            $(that).parent().prev().text('已通过')
          }
        }
      })
  })

   //不通过
   $('tbody').on('click','.btn-reject', function() {
     var that = this 
     var id = $('.btn-reject').data('id')
     $.ajax({
       type: 'post',
       url: BigNew.comment_reject,
       data: {
         id:id
       },
       success:function(data) {
        console.log(data)
        if (data.code === 200) {
          $(that).parent().prev().text('已拒绝')
        }
       }
     })
   })

   //删除评论
   $('tbody').on('click', '.btn-delete', function() {
     var that = this
     var id = $('.btn-delete').data('id')
     $.ajax({
       type: 'post',
       url: BigNew.comment_delete,
       data: {
         id:id
       },
       success: function(data) {
        //console.log(data)
        if (data.code === 200) {
          $.ajax({
            type: 'get',
            url: BigNew.comment_list,
            data: {
              page: currentPage
            },
            success: function(data) {
              var str = template('tip', data.data)
              $('tbody').html(str)
                   if (res.data.totalCount == 0) {
              // 隐藏分页插件 显示无数据
                    $('#pagination-demo').hide().next().show()
                  } else {
                    $('#pagination-demo').show().next().hide()

                    if(data.data.data.length == 0 && data.data.totalCount !=0) {
                      currentPage -= 1
                    }
                }
            
          }
          })
         
        }
       }
     })
   })
})