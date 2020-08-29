$(function() {
    $.ajax({
        type: 'get',
        url: BigNew.user_info,
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
        location.href = './login.html'
    })

    //高亮效果
    $('.menu .level01').on('click',function() {
        $(this).addClass('active').siblings('div').removeClass('active')

        if($(this).index() == 1) {
            $('.menu .level02').slideToggle()

            $(this).find('b').toggleClass('rotate0')

            $('.menu .level02 li:eq(0)').click()
        }
    })
    //li的高亮效果
    $('.menu .level02 li').on('click',function(){
         $(this).addClass('active').siblings().removeClass('active')
    })
})