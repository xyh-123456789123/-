$(function() {
    $.ajax({
        type: 'get',
        url: BigNew.category_list,
        success:function(data) {
            if (data.code === 200) {
                var str = template('tip',data)
                $('tbody').html(str)
                console.log(str)
            }
        }
    })
})