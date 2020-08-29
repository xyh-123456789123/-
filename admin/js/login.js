$(function() {
    $('.input_sub').on('click', function(e) {
        // 阻止按钮默认行为
        e.preventDefault()
        var username = $('.input_txt').val().trim()
        var password = $('.input_pass').val().trim()
        if (username == '' || password == '') {
           alert('账号或密码不能为空')
           return
        }
        $.ajax({
            type: 'post',
            url: 'http://localhost:8080/api/v1/admin/user/login',
            data: $('#form').serialize(),
            success: function(data) {
               $('#myModal').modal('show')
               $('.modal-body p').text(data.msg)
               
               if (data.code === 200) {
                   $('#myModal').on('hidden.bs.modal', function (e) {
                     location.href = '../admin/index.html'
                     localStorage.setItem('token',data.token)
                     console.log('token',data.token)
                   })
                   
               }
            }
        })        
    })
})