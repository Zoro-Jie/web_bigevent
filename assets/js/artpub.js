$(function() {
    var form = layui.form;
    var layer = layui.layer;
    //获取文章分类函数
    function getclass() {
        $.ajax({
            url: '/my/article/cates',
            type: 'GET',
            success: function(res) {
                //console.log(res);
                if (res.status !== 0) {
                    return form.msg('获取分类失败')
                }
                var htmlstr = template('s1', res)
                $('#sel').html(htmlstr);
                form.render()
            }
        })
    }
    getclass();
    //初始化富文本
    initEditor();
    // 1. 初始化图片裁剪器
    var $image = $('#image')

    // 2. 裁剪选项
    var options = {
        aspectRatio: 400 / 280,
        preview: '.img-preview'
    }

    // 3. 初始化裁剪区域
    $image.cropper(options)

    //选择封面功能
    $('#selpic').on('click', function() {
        $('#files').click();


    })
    $('#files').on('change', function(e) {
        if (e.target.files.length == 0) {
            return layer.msg('请选择图片')
        }
        var file = e.target.files[0];
        var newImgURL = URL.createObjectURL(file)
        $image
            .cropper('destroy') // 销毁旧的裁剪区域
            .attr('src', newImgURL) // 重新设置图片路径
            .cropper(options) // 重新初始化裁剪区域
    })

    var art_state = '发布';

    $('#caogao').on('click', function() {
        art_state = '草稿';
    })
    $('#fm1').on('submit', function(e) {
        e.preventDefault();
        var fd = new FormData($(this)[0]);
        fd.append('state', art_state);
        // fd.forEach(function(v, i) {
        //     console.log(v, i);
        // })
        $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 400,
                height: 280
            })
            .toBlob(function(blob) { // 将 Canvas 画布上的内容，转化为文件对象
                // 得到文件对象后，进行后续的操作
                fd.append('cover_img', blob);
                //调用发布请求
                postMes(fd);
            });


    })

    function postMes(fds) {
        $.ajax({
            url: '/my/article/add',
            type: 'POST',
            data: fds,
            processData: false,
            contentType: false,
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('发布失败');
                }
                layer.msg('发布成功');
                location.href = 'artlist.html'
            }
        })
    }



})