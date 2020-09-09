$(function() {
    var form = layui.form;
    form.verify({
        //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
        psd: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        newpsd: function(value, item) { //value：表单的值、item：表单的DOM对象
            if (value == $('[name = oldPwd]').val()) {
                return '新密码与旧密码不能相同';
            }
        },
        repsd: function(value, item) { //value：表单的值、item：表单的DOM对象
            if (value == $('[name = newPwd]').val()) {
                return '两次输入密码不一致';
            }
        },
    });
    // 实现修改密码功能
    $('#fm1').on('submit', function(e) {
        console.log($(this).serialize());
        e.preventDefault();
        $.ajax({
            url: '/my/updatepwd',
            type: 'post',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layui.layer.msg('修改密码失败')
                }
                layui.layer.msg('修改密码成功')
                    // console.log();
                $('#fm1')[0].reset();
            }
        })
    })

})