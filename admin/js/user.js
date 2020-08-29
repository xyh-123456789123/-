$(function() {

    $.ajax({
       type: 'get',
       url: 'http://localhost:8080//admin/user/detail',
        headers:{
         Authorization:window.localStorage.getItem('token')
       },
       success:function(data) {
        console.log(data)
        $('.col-sm-10 .user_pic').attr('src',data.data.userPic)
        
       }
    })
})