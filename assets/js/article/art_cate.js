$(function () {
    //渲染页面
    var layer = layui.layer
    var form=layui.form
    initArtCateList()
    function initArtCateList() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function (res) {
                if (res.status !== 0) return layer.msg(res.message)
                // layer.msg(res.message)
                var str = template('tpl-Table', res)
                $('tbody').html(str)
            }
        })
    }

    //2.点击添加事件
    var indexAdd=null
    $('#btnAdd').on('click', function () {
        indexAdd=layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '添加文章分类',
            content: $('#dialog_tpl').html()
          });  
    })

    //3.通过事件委托，给确认添加按钮绑定事件
    $('body').on('submit', '#form_Add', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'post',
            url: '/my/article/addcates',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) return layer.msg(res.message)
                initArtCateList()
                layer.msg(res.message)
                layer.close(indexAdd)
            }
        })
    })

    //4.编辑功能
    var indexEdit=null
    $('tbody').on('click', '#btn_edit', function () {
        indexEdit=layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '修改文章分类',
            content: $('#dialog_edit').html()
        }); 
        
        var id = $(this).attr('data-id')
        console.log(id);
        $.ajax({
            method: 'get',
            url: '/my/article/cates/' + id,
            success: function (res) {
                if (res.status !== 0) return layer.msg(res.message)
                form.val('formTest',res.data)
            }
        })
    })

    //修改,提交数据
    $('body').on('submit', '#form_edit', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'post',
            url: '/my/article/updatecate',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) return layer.msg(res.message)
                initArtCateList()
                layer.msg('修改成功')
                layer.close(indexEdit)
            }
        })
    })

    //删除功能
    $('tbody').on('click','#btn_delete', function () {
        var id = $(this).attr('data-id')
        layer.confirm('确定删除?', {icon: 3, title:'提示'}, function(index){
            $.ajax({
                method: 'get',
                url: '/my/article/deletecate/' + id,
                success: function (res) {
                    if (res.status !== 0) return layer.msg(res.message)
                    layer.msg(res.message)
                    initArtCateList()
                    layer.close(index);
                }
            })
            
            
          });
    })
})