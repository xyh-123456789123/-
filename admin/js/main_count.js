$(function() {
    $.ajax({
        type: 'get',
        url: BigNew.data_info,
        success: function(data) {
            console.log(data)
        }
    })
})