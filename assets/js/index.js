$(function() {
        //alert(11)
        getMymessage()
    })
    // 定义获取基本信息函数
function getMymessage() {
    $.ajax({
        url: '/my/userinfo',
        method: 'GET',
        // headers: {
        //     Authorization: localStorage.getItem('token'),
        // },
        success: function(res) {
            //console.log(res);
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败');
            }
            renderAvatar(res.data);
        },
        // complete: function(res) {
        //     console.log(res);
        //     if (res.responseJSON.message == "身份认证失败！" && res.responseJSON.status == 1) {
        //         location.href = 'login.html';
        //         localStorage.removeItem('token');
        //     }
        // }
    })
};
// 定义获取用户基本信息函数
function renderAvatar(user) {
    // 渲染用户昵称
    var myname = user.nickname || user.username;
    //console.log(myname);
    $('.wec').html('欢迎&nbsp&nbsp' + myname);
    // 渲染用户头像
    if (user.user_pic !== null) {
        $('.layui-nav-img').attr('src', user.user_pic).show();
        $('.text-avatar').hide();
    } else {
        var img = myname[0].toUpperCase();
        $('.layui-nav-img').hide();
        $('.text-avatar').html(img).show();
    }
}

//退出功能实现
$('#outlog').on('click', function() {
    layui.layer.confirm('是否确认退出?', { icon: 3, title: '提示' }, function(index) {
        //do something
        localStorage.removeItem('token');
        location.href = 'login.html';
        layui.layer.close(index);
    });
})