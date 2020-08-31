$(function() {
    $.ajax({
        type: 'get',
        url: BigNew.category_list,
        success: function(data) {
            console.log(data)

            var str = template('tip',data)
            $('#selCategory').html(str)
        }
    })

    //查询文章分类
    $('#btnSearch').on('click', function(e) {
         e.preventDefault()

         $.ajax({
             type: 'get',
             url: BigNew.article_query,
             data: {
                page: 1,
                perpage: 10,//每页返回10条数据
                type: $('#selCategory').val(),
                state: $('#selStatus').val(),
             },
             success: function(data) {
                console.log(data)

                var str = template('tip1',data)
                $('.table tbody').html(str)

                //先销毁旧插件
                $('#pagination').twbsPagination('destroy');

                $('#pagination').twbsPagination({
                    totalPages: data.data.totalPage,
                     visiblePages: 6,
                     startPage: 1,
                     first: '首页',
                     prev: '上一页',
                     next: '下一页',
                     last: '尾页',
                     onPageClick: function(event, page) {
                          console.log('点击页' + page);
                          //页码处理函数
                          getArticleList(page);
                     }
                })
             }
         })
    })

    //页面一加载请求数据
    $('#btnSearch').trigger('click')

    function getArticleList(currentPage) {
        $.ajax({
            type: 'get',
            url: BigNew.article_query,
            dataType: 'json',
            data: {
                type: $('#selCategory').val(),
                state: $('#selStatus').val(),
                page: currentPage,
                perpage: 10
            },
            success: function (data) {
                console.log(data)
                $('.table tbody').html(template('tip1',data))
            }
        })}

    //删除功能
    $('.table tbody').on('click','.delete', function() {

        $.ajax({
            type: 'post',
            url: BigNew.article_delete,
            data: {
                id: $(this).attr('data-id')
            },
            success: function(data) {
                if (data.code === 204) {
                    alert('删除成功')
                    window.location.reload()
                }else {
                    alert(data.msg)
                }
            }
        })
    })

    //文章编辑功能
    
})