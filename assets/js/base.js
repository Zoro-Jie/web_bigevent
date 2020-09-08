//每次在调用get\post\ajax时都会先调用ajaxprefilter()函数，并且可以获取他们的参数对象
$.ajaxPrefilter(function(options) {
        //console.log(options.url);
        options.url = 'http://ajax.frontend.itheima.net' + options.url;

        if (options.url.indexOf('/my/') !== -1) {
            options.headers = {
                Authorization: localStorage.getItem('token'),
            }
        }
        options.complete = function(res) {
            console.log(res);
            if (res.responseJSON.message == "身份认证失败！" && res.responseJSON.status == 1) {
                location.href = 'login.html';
                localStorage.removeItem('token');
            }
        }

    })
    //console.log(options.url);
    // $.ajaxPrefilter(function(options) {
    //     // 在发起真正的 Ajax 请求之前，统一拼接请求的根路径
    //     options.url = 'http://ajax.frontend.itheima.net' + options.url
    // })