$(function() {
    // 点击注册按钮去注册页面
    $('#rigister_box').on('click', function() {
        $('.login-box').hide();
        $('.rigister-box').show();
    });
    //点击登陆按钮去往登陆页面
    $('#login_box').on('click', function() {
        $('.rigister-box').hide();
        $('.login-box').show();
    });

    //获取表单对象
    var form = layui.form;
    //定义layer
    var layer = layui.layer;
    //自定义 表单验证
    form.verify({
        //我们既支持上述函数式的方式，也支持下述数组的形式
        //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
        pass: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        reg: function(value) {
            var kws = $('#reg').val();
            if (kws !== value) {
                return '两次密码输入不一致'
            }
        }
    });

    //注册请求
    $('#fm2').on('submit', function(e) {
        // 阻止表单默认行为
        e.preventDefault();
        // var data = $(this).serialize();
        // console.log(data);
        // 发起post请求
        var data = {
            username: $('#myname').val(),
            password: $('#reg').val()
        };
        $.post(
            '/api/reguser', data,
            function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message);
                };
                layer.msg('注册成功,请登陆');
                setTimeout(function() {
                    $('#login_box').click();
                }, 3000)
            });
    });
    //登陆功能编写
    $('#fm1').on('submit', function(e) {
        //阻止默认行为
        //alert(11)
        e.preventDefault();
        var data = $(this).serialize();
        // 发起ajax请求
        $.post('/api/login', data, function(res) {
            if (res.status !== 0) {
                return layer.msg('登陆失败');
            };
            layer.msg('登陆成功，正在跳转到首页');
            //console.log(res);
            localStorage.setItem('token', res.token)
            setTimeout(function() {
                //console.log(location.href);
                location.href = 'index.html'

            }, 3000)
        })
    })
    console.log(localStorage.getItem('token'));
})