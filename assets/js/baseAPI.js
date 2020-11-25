
var url='http://ajax.frontend.itheima.net'

$.ajaxPrefilter(function (options) {
    options.url=url+options.url
})