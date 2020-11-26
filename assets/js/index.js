$(function () {
    getUserInof()

    //2.退出
    var layer = layui.layer
    $('#btnLogout').on('click', function () {
        layer.confirm('是否确认退出?', {icon: 3, title:'提示'}, function(index){
            //清空本地token，页面跳转
            localStorage.removeItem('token')
            location.href='/login.html'
            //关闭询问框
            layer.close(index);
        })
    })
})
// 获取用户的基本信息
function getUserInof() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        
        success: function (res) {
            // console.log(res);
            if (res.status !== 0) return layui.layer.msg(res.message)
            renderAvatar(res.data)
        }
    })
}

function renderAvatar(urse) {
    var name = urse.nickname || urse.username
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
    if (urse.user_pic !== null) {
        $('.layui-nav-img').attr('src',urse.user_pic).show()
        $('.text-avatar').hide()
    } else {
        $('.layui-nav-img').hide()
        var text = name[0].toUpperCase()
        $('.text-avatar').html(text).show()
    }
}