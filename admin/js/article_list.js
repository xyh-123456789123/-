$(function() {
    $.ajax({
    type: 'get',
    url: BigNew.category_list,
    success: function (res) {
      // console.log(res)
      if (res.code == 200) {
        // 这个方法有两个参数 第1个参数是模板的id  第二个参数必须是对象
        var str = template('tip', res)
        $('#selCategory').html(str)
      }
    }
  })

//   第一页数据
  $.ajax({
    type: 'get',
    url: BigNew.article_query,
    success: function (res) {
    
      if (res.code == 200) {
        var str = template('tip1', res.data)
        $('tbody').html(str)

        //2.3 判断是否有数据
        if (res.data.totalCount == 0) {
          // 隐藏分页插件 显示无数据
          $('#pagination-demo').hide().next().show()
        } else {
          $('#pagination-demo').show().next().hide()

          // 调用方法启用分页
         
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
        currentPage = page
        $.ajax({
          type: 'get',
          url: BigNew.article_query,
          data: {
            key: $('#myForm input[name=key]').val(), // 关键词
            type: $('#selCategory').val(), // 文章分类 
            state: $('#selStatus').val(), // 文章状态
            page: page,
            perpage: 6 // 页面中显示的数据条数
          },
          success: function (res) {
            // console.log(res)
            // 2.2 将获取到的第1页文章数据渲染到页面中
            if (res.code == 200) {
              // 3.2 将服务器响应回来的数据渲染到页面上
               var str = template('tip1', res.data)
               $('tbody').html(str)
            }
          }
        })

      }
    })
  }

// 4. 筛选功能
  // 4.1 给form标签按钮注册submit事件
  $('#myForm').on('submit', function (e) {
    // 4.2 阻止默认行为
    e.preventDefault()
    // 4.3 发送ajax请求
    $.ajax({
      type: 'get',
      url: BigNew.article_query,
      data: {
        key: $('#myForm input[name=key]').val(), // 关键词
        type: $('#selCategory').val(), // 文章分类 
        state: $('#selStatus').val(), // 文章状态
        page: 1, // 默认的页面
        perpage: 6 // 页面中显示的数据条数
      },
      success: function (res) {
        console.log(res)
        //// 4.4 将响应回来的数据，渲染到表格当中
        if (res.code == 200) {
             var str = template('tip1', res.data)
              $('tbody').html(str)

          // 4.5 判断是否有数据
          if (res.data.totalCount == 0) {
            $('#pagination-demo').hide().next().show()
          } else {
            $('#pagination-demo').show().next().hide()

            // 因为页面中的数据是根据筛选条件显示的，因此分页的页码需要重新渲染

            // 改变页码显示
            // 第1个参数是当总页码改变的时候
            // 第2个参数是现在的总页码值
            // 第3个参数是默认显示的页码值
            $('#pagination-demo').twbsPagination('changeTotalPages', res.data.totalPage, 1)
          }
        }
      }
    })
  })

  $('#delModal').on('shown.bs.modal', function(e) {
     window.articleId = $(e.relatedTarget).data('id')
  })

//   删除文章功能
$('#delModal .btn-sure').on('click', function() {
    $.ajax({
        type: 'post',
        url: BigNew.article_delete,
        data: {
            id: window.articleId
        },
        success: function(res) {
           
            if (res.code == 204) {
                $('#delModal').modal('hide')

                $.ajax({
                  type: 'get',
                  url: BigNew.article_query,
                  data: {
                     key: $('#form input[name=key]').val(), // 关键词
                     type: $('#selCategory').val(), // 文章分类 
                     state: $('#selStatus').val(), // 文章状态
                     page: currentPage,
                     perpage: 6 // 页面中显示的数据条数  
                  },
                  success: function(res) {

                    if (res.code === 200) {
                         var str = template('tip1', res.data)
                         $('tbody').html(str)

                         if (res.data.data.length == 0 && res.data.totalCount ==0) {
                           $('#pagination-demo').hide().next().show()
                         } else {
                           $('#pagination-demo').show().next().hide()

                           if (res.data.data.length == 0) {
                              currentPage -= 1
                              }

                 
                            $('#pagination-demo').twbsPagination('changeTotalPages', res.data.totalPage, currentPage)
                         }
                    }
                  }
                })
            }
        }
    })
})

 // 6. 给发表文章按钮注册事件  让左侧相应标签高亮
  $('#release_btn').on('click',function(){
    // 让左侧的发表文章按钮高亮显示

    // 不要忘了parent 因为是在当前子页面获取父页面中的相关标签
    parent.$('.menu .level02 li:eq(1)').click()
  })
})