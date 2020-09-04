$(function() {
    var $fluid = $('.container-fluid')
    var $spannel = $fluid.find('spannel')
    console.log($spannel)
    $.ajax({
        type: 'get',
        url: BigNew.data_info,
        success: function(data) {
            
            var str = template('tip',data)
            
            $('.spannel_list').html(str)
        }
    })
})