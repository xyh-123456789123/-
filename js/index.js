$(function() {
    //1. tab栏数据
    $.ajax({
        type: 'get',
        url: BigNew.category_list,
        success: function(data) {
            // console.log(data)
            if (data.code === 200) {

                var htmlStr = template('tip',data)
                $('.menu .level_two').html('<li class="up"></li>'+htmlStr)

                $('.menu .left_menu').html(htmlStr)
            }
        }
    })

    // 2.热点图
    $.ajax({
        type: 'get',
        url: BigNew.hotPic_news,
        success: function(data) {
            // console.log(data)
            if (data.code === 200) {
                var htmlStr = template('tip1',data)
                $('.focus_list').html(htmlStr)
                // console.log(htmlStr)
            }
        }
    })

    // 3.热点资讯
     $.ajax({
        type: 'get',
        url: BigNew.latest_news,
        success: function(data) {
            console.log(data)
            if (data.code === 200) {
                var htmlStr = template('tip2',data)
                $('.common_news').html(htmlStr)
                // console.log(htmlStr)
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
                $('.hotrank_list').html(htmlStr)
               
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

    // 文章搜索
    $('.search_btn').on('click',function() {
        
    })
})