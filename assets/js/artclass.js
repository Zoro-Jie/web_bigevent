$(function() {
    var layer = layui.layer;
    var form = layui.form;
    //获取文章列表
    $.ajax({
        url: '/my/article/cates',
        type: 'get',
        success: function(res) {
            //console.log(res);
            var data = template('one', res);
            $('tbody').html(data);
        }
    });
    //添加弹出层
    var index1 = null
    $('#addtype').on('click', function() {
        index1 = layer.open({
            type: 1,
            area: ['500px', '300px'],
            content: $('#two').html(),
            title: '添加文章类别'
        });
    })

    //添加文章功能
    $('body').on('submit', '#fm1', function(e) {
        e.preventDefault();
        $.ajax({
            url: '/my/article/addcates',
            type: 'POST',
            data: $(this).serialize(),
            success: function(res) {
                console.log(res);
                if (res.status !== 0) {
                    return layer.msg('添加文章失败')
                }
                layer.msg('添加文章成功')
                    //重新渲染列表
                $.ajax({
                    url: '/my/article/cates',
                    type: 'get',
                    success: function(res) {
                        console.log(res);
                        var data = template('one', res);
                        $('tbody').html(data);
                    }
                });
                // 关闭弹出层
                layer.close(index1)
            }
        })
    });

    // 修改文章功能
    var index2 = null;
    $('tbody').on('click', '#art-edit', function() {
        //console.log($(this).attr('data-id'));
        index2 = layer.open({
            type: 1,
            area: ['500px', '300px'],
            content: $('#three').html(),
            title: '修改文章类别'
        });
        $.ajax({
            type: 'GET',
            url: '/my/article/cates/' + $(this).attr('data-id'),
            success: function(res) {
                form.val("formTest", res.data);
            }

        })
    });
    //表单提交功能实现
    $('body').on('submit', '#fm2', function(e) {
        e.preventDefault();
        $.ajax({
            url: '/my/article/updatecate',
            type: 'POST',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('更新文章失败')
                }
                layer.msg('更新文章成功');
                //获取文章列表
                $.ajax({
                    url: '/my/article/cates',
                    type: 'get',
                    success: function(res) {
                        //console.log(res);
                        var data = template('one', res);
                        $('tbody').html(data);
                    }
                });
                layer.close(index2)
            }
        })
    });
    //删除文章功能
    $('tbody').on('click', '#art-rm', function() {
        //console.log(11);
        var id = $(this).attr('data-id');
        layer.confirm('确认删除?', { icon: 3, title: '提示' }, function(index) {
            //do something

            $.ajax({
                url: '/my/article/deletecate/' + id,
                type: 'GET',
                success: function(res) {
                    if (res.status !== 0) {
                        return layer.msg('删除失败')
                    }
                    layer.msg('删除成功');
                    layer.close(index);
                    $.ajax({
                        url: '/my/article/cates',
                        type: 'get',
                        success: function(res) {
                            //console.log(res);
                            var data = template('one', res);
                            $('tbody').html(data);
                        }
                    });
                }
            })

        });
    })


})