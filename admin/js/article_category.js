$(function() {
    render()
    function render() {
        $.ajax({
        type: 'get',
        url: BigNew.category_list,
        success:function(data) {
            info = data
            if (data.code === 200) {
                var str = template('tip',data)
                $('tbody').html(str)
            }
            
        }
    })
    }
    
    

    //新增分类
    $('#dex').on('click',function() {
        $.ajax({
            type: 'post',
            url: BigNew.category_add,
            data: $('#form').serialize(),
            success:function(data) {
                if (data.code === 201) {
                    $('#myModal').modal('hide')

                    render()
                }
            }
        })
    })
    //数据回显
    $('#myModal').on('shown.bs.modal',function(e) {
        console.log(e.relatedTarget)
        if (e.relatedTarget.id === 'xinzengfenlei') {
            $('#myModal h4').text('新增文章分类')

            $('#form')[0].reset()

            $('#form input[name = id]').val('')
        } else {
             $('#myModal h4').text('更新文章分类')

             $.ajax({
                 type: 'get',
                 url: BigNew.category_search,
                 data: {
                     id: $(e.relatedTarget).attr('id')
                 },
                 success:function(data) {
                     console.log(data)
                    $('#form input[name = id]').val(data.data[0].id)
                    $('#form input[name = name]').val(data.data[0].name)
                    $('#form input[name = slug]').val(data.data[0].slug)
                 }
             })
        }
    })

    //删除数据
    $('#modal').on('shown.bs.modal',function(e) {
        window.id = $(e.relatedTarget).attr('id')
    })

    $('#modal #btn-del').on('click',function() {
        
        $.ajax({
            type: 'post',
            url: BigNew.category_delete,
            data: {
                id: window.id
            },
            success: function(data) {
                if (data.code === 204) {
                    $('#modal').modal('hide')

                    render()
                }
            }
        })
    })
})