$(function() {
    var str = location.search.slice(1)
   
    var id = utils.convertToObj(str).id
    // console.log(id)

    $.ajax({
        type: 'get',
        url: BigNew.article_detail,
        data: {
            id:id
        },
        success: function(data) {
            // console.log(data)
            if (data.code === 200) {

                var htmlStr = template('articleTmp',data.data)
                $('.setfr .box').html(htmlStr)

                getCommentData(data)

                $('#myForm input[name=articleId]').val(data.data.id)
                // console.log($('#myForm input [name = articleId]').val(data.data.id))
            }
        }
    })

      // 4.一周热门排行
    $.ajax({
        type: 'get',
        url: BigNew.hotrank_list,
        success: function(data) {
            // console.log(data)
            if (data.code === 200) {
                var htmlStr = template('tip3',data)
                $('.content_list').html(htmlStr)
                
                
            }
        }
    })


    // 5.最新评论
    $.ajax({
        type: 'get',
        url: BigNew.latest_comment,
        success: function(data) {
            // console.log(data)
            if (data.code === 200) {
                var htmlStr = template('tip4',data)
                $('.comment_list').html(htmlStr)
            }
        }
    })

    
    // 6.焦点关注
     $.ajax({
        type: 'get',
        url: BigNew.attention_news,
        success: function(data) {
            // console.log(data)
            if (data.code === 200) {
                var htmlStr = template('tip5',data)
                $('.guanzhu_list').html(htmlStr)
            }
        }
    })

    // 发表评论
    $('#myForm').on('submit' , function(e) {
        e.preventDefault()

       
        $.ajax({
            type: 'post',
            url: BigNew.post_comment,
            data: $(this).serialize(),
            success:function(data) {
                console.log(data)
                if (data.code === 201) {
                    alert('发表评论成功。。。')
                    $('#myForm')[0].reset()
                }
            }
        })
    })
    function getCommentData(data) {
        $.ajax({
            type: 'get',
            url: BigNew.comment_list,
            data: {
                articleId: data.data.id
            },
            success: function(data) {
                $('.comment_count').html(data.data.length + '条数据')

                 var htmlStr = template('commentsList', data)
                 $('.comment_list_con').html(htmlStr)
            }
        })
    }
})