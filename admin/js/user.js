$(function() {
  $.ajax({
    type: 'get',
    url: BigNew.user_detail,
    success: function(data) {
      
      if (data.code === 200) {
        $('#form .username').val(data.data.username)
        $('#form .nickname').val(data.data.nickname)
        $('#form .email').val(data.data.email)
        $('#form .password').val(data.data.password)
        $('#form .user_pic').attr('src', data.data.userPic)
      }
    }
  })

  //图片本地预览
  $('#exampleInputFile').on('change', function() {
    var file = this.files[0]

    var url = URL.createObjectURL(file)

    $('.user_pic').attr('src', url)
  })

  //个人中心数据更新
  $('#form').on('submit' , function(e) {
    e.preventDefault()

    var data = new FormData($('#form')[0])
    
    $.ajax({
      type: 'post',
      url: BigNew.user_edit,
      data: data,
      processData:false,
      contentType:false,
      success:function(data) {

        if (data.code === 200) {
            parent.$('.user_info span').text(data.data.nickname)
            parent.$('.user_info img').attr('src',data.data.userPic)
            parent.$('.user_center_link img').attr('src',data.data.userPic)
        }
      }
    })
  })
})