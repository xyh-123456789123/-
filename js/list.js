$(function() {
    // 判断是否带有id跳过来

    // 1.获取网址中的id
    var str = location.search

    // console.log(str)
    if (!str) {
       
        window.location.href = '../index.html'
        return
    }
    // 将url中的参数转换成对象
    var obj = utils.convertToObj(str.slice(1))

    // 判断参数是id还是关键词
    var data
    if (obj.id) {
        data = {key: obj.id}
    }else {
        data = {key: decodeURI(obj.search)}
    }

    // 发送ajax请求
    $.ajax({
        type: 'get',
        url: BigNew.artilce_list,
        data: data,
        success:function(data) {
            console.log(data)
            if (data.code === 200) {
                if (data.data.totaCount == 0) {
                    $('.setfr').html(` <div class="list_title">
                <h3>暂时没有数据。。。。</h3>
            </div>`)
                }else {
                    //单击跳转过来
                    var title = ''
                    if (obj.id) {
                        title = ` <div class="list_title">
                <h3>分类:${data.data.data[0].category}</h3>
            </div>`
                    }else{
                        // 说明是关键字跳转
                        title = ` <div class="list_title">
                <h3>关键词:${decodeURI(obj.search)}</h3>
            </div>`
                    }
                    var htmlStr = template('articleList',data.data)
                    $('.setfr').html(title + htmlStr)
                }
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
})