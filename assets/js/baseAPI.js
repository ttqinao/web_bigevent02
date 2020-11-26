
var url='http://ajax.frontend.itheima.net'

$.ajaxPrefilter(function (options) {
    options.url = url + options.url
    
    //对需要权限的接口配置头信息
    if (options.url.indexOf('/my/') !== -1) {
        options.headers= {
            Authorization: localStorage.getItem('token') || ''
        }
    }

    //拦截所有响应，判断身份认证信息
    options.complete = function (res) {
        var obj = res.responseJSON;
        if (obj.status == 1 && obj.message === '身份认证失败！') {
            // 清空本地token,页面跳转
            localStorage.removeItem('token')
            location.href='/login.html'
        }
    }
})