$(function () {
    $('#link_reg').on('click', function () {
        $('.loginBox').hide()
        $('.regBox').show()
    })
    $('#link_login').on('click', function () {
        $('.loginBox').show()
        $('.regBox').hide()
    })

    // 1.自定义验证规则
    var form = layui.form;
    form.verify({
        pwd: [
            /^[\S]{6,12}$/
            ,'密码必须6到12位，且不能出现空格'
        ],
        repwd: function (value) {
            var pwd = $('.regBox [name=password]').val()
            if(pwd!==value) return '俩次输入的密码不一致'
        }
    })

    //2.注册功能
    var layer=layui.layer
    $('#form_reg').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'post',
            url: '/api/reguser',
            data: {
                username: $('#form_reg [name=username]').val(),
                password:$('#form_reg [name=password]').val()
            },
            success: function (res) {
                if (res.status !== 0) return layer.msg(res.message)
                layer.msg('恭喜您，注册成功！')
                $('#form_reg')[0].reset()
                $('#link_login').click()
            }
        })
    })

    //3.登录功能
    $('#form_login').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'post',
            url: '/api/login',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) return layer.msg(res.message)
                //提示信息，保存token，跳转页面
                layer.msg('恭喜您，登录成功！')
                localStorage.setItem('token', res.token)
                location.href='/index.html'
            }
        })
    })
})