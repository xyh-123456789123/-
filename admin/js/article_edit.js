$(function() {
    $.ajax({
    type: 'get',
    url: BigNew.category_list,
    success: function (res) {
      // console.log(res)
      if (res.code == 200) {
        // 这个方法有两个参数 第1个参数是模板的id  第二个参数必须是对象
        var str = template('tip', res)
        $('.category').html(str)
      }
    }
  })
 //  2.启用日期插件
  jeDate("#testico", {
    format: "YYYY-MM-DD",
    isTime: false,
    minDate: "2014-09-19 00:00:00",
    onClose: false,
    zIndex: 90999
  })

  // 3. 启用富文本编辑器
  var E = window.wangEditor
  var editor = new E('#editor')
  // 或者 var editor = new E( document.getElementById('editor') )
  editor.create()

  // 4.获取url的id
  var search = location.search.slice(1) // 获取URL地址中的?及后面的数据 '?id=218'
  var articleId = utils.convertToObj(search).id
  console.log(search)

  // console.log(articleId);
  // 5. 发送ajax请求 获取当前id对应的文章数据
  // 5.1 发送ajax请求
  $.ajax({
    type: 'get',
    url: BigNew.article_search,
    data: {
      id: articleId
    },
    success: function (res) {
      // console.log(res);
      if (res.code == 200) {
        // 5.2 将响应回来的数据渲染到页面上
        // 文章id
        $('#form input[name=id]').val(res.data.id)
        // 标题内容
        $('#form input[name=title]').val(res.data.title)
        // 图片内容
        $('#form .article_cover').attr('src', res.data.cover)
        // 文章所属分类 
        $('#form [name=categoryId]').val(res.data.categoryId)
        // $('#myForm select[name="categoryId"]').val(res.data.categoryId)
        // 发布日期
        $('#form input[name=date]').val(res.data.date)
        // 文章内容
        editor.txt.html(res.data.content)

      }
    }
  })


//本地图片预览
   $('#inputCover').on('change', function() {
    var file = this.files[0]

    var src = URL.createObjectURL(file)

    $('this').prev().attr('src', src)
  })
  


   $('#form').on('submit',function(e) {
       e.preventDefault()

       var data = new FormData($('#form')[0])

        data.append('content',editor.txt.html())   
      
      if ($(this).hasClass('btn-release')) {
         data.append('state', '已发布')
      } else {
         data.append('state', '草稿')
      }
      
       $.ajax({
       type: 'post',
       url: BigNew.article_publish,
       data: data,
       processData:false,
       contentType:false,
       success: function(data) {
        
        if (data.code === 200) {
            window.location.href = '../article_list.html'
        }
       }
   })
   })



})