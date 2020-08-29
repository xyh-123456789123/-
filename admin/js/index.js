$(function() {
    $.ajax({
        type: 'get',
        url: 'http://localhost:8080/api/v1/admin/user/info',
        dataType: 'json',
        headers:{
         Authorization:window.localStorage.getItem('token')
       },
        success: function(info) {
            console.log(info)
            $('.user_info span').text(info.data.nickname)
            $('.user_info img').attr('src',info.data.userPic)
            $('.user_center_link img').attr('src',info.data.userPic)
        }
    })

    //退出
    $('.user_center_link .logout').on('click',function() {
        //删除token
        localStorage.removeItem('token')
        location.href = '../admin/login.html'
    })
})