$(function() {
    var form = layui.form;
    var layer = layui.layer;
    form.verify({
        username: function(value) { //value：表单的值、item：表单的DOM对象
            if (value.length >= 6) {
                return '昵称必须在1～6位之间';
            }
            // if (/(^\_)|(\__)|(\_+$)/.test(value)) {
            //     return '用户名首尾不能出现下划线\'_\'';
            // }
            // if (/^\d+\d+\d$/.test(value)) {
            //     return '用户名不能全为数字';
            // }
        }

        //我们既支持上述函数式的方式，也支持下述数组的形式
        //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
        ,
        // pass: [
        //     /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        // ]
    });
});
var form = layui.form;
var layer = layui.layer;
//调用初始化函数
getinitinfor();

// 定义初始化函数
function getinitinfor() {
    $.ajax({
        url: '/my/userinfo',
        type: 'GET',
        success: function(res) {
            console.log(res);
            if (res.status !== 0) {
                return layer.msg('用户获取信息失败')
            }
            //layer.msg('用户获取信息成功')
            form.val('formTest', res.data);
        }
    })
};
//重置按钮功能
$('#reset').on('click', function(e) {
    e.preventDefault();
    // 初始化用户信息
    getinitinfor()
});

//表单提交功能实现
$('#fm1').on('submit', function(e) {
    e.preventDefault();
    $.ajax({
        type: 'post',
        url: '/my/userinfo',
        data: $(this).serialize(),
        success: function(res) {
            if (res.status !== 0) {
                return layer.msg('修改用户信息失败！')
            }
            layer.msg('修改用户信息成功！')
                //更新用户头像基本信息 调用父框架的方法
            window.parent.getMymessage();
        }
    })
})