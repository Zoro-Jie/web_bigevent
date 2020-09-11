$(function() {
    var layer = layui.layer;
    var form = layui.form;
    var laypage = layui.laypage;
    // 默认值
    var q = {
            pagenum: 1,
            pagesize: 2,
            cate_id: '',
            state: ''
        }
        //获取文章列表数据
    function dataList() {
        $.ajax({
            type: 'GET',
            url: '/my/article/list',
            data: q,
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('获取文章失败')
                }
                console.log(res);
                layer.msg('获取文章成功');
                var htmlstr = template('s1', res);
                $('tbody').html(htmlstr);

                //console.log(res.total);
                renderpage(res.total)
            }
        });

    };
    //调用
    dataList()

    //定义时间过滤器
    template.defaults.imports.timer = function(value) {
        const times = new Date(value);
        var years = times.getFullYear();
        var month = zero(times.getMonth() + 1);
        var day = zero(times.getDate());
        var hours = zero(times.getHours());
        var m = zero(times.getMinutes());
        var s = zero(times.getSeconds());
        return years + '-' + month + '-' + day + ' ' + hours + ':' + m + ':' + s;
    };
    //补零
    function zero(n) {
        return n < 10 ? '0' + n : n
    }
    //定义获取分类函数
    function dataclass() {
        $.ajax({
            url: '/my/article/cates',
            type: 'GET',
            success: function(res) {
                //console.log(res);
                if (res.status !== 0) {
                    return layer.msg('获取分类失败')
                }
                layer.msg('获取分类成功')
                var htmlstr = template('s2', res);
                //console.log(htmlstr);
                $('#art-class').html(htmlstr);
                form.render();
            }
        })
    };
    //调用获取分类函数
    dataclass();
    //点击分类获得相对应的文章
    $('#fm1').on('submit', function(e) {
            e.preventDefault();
            var cate_id = $('[name="cate_id"]').val();
            var state = $('[name="state"]').val();
            q.cate_id = cate_id;
            q.state = state;
            dataList();
        })
        //页码区功能实现
    function renderpage(total) {
        laypage.render({
            elem: 'page-box' //注意，这里的 test1 是 ID，不用加 # 号
                ,
            count: total //数据总数，从服务端得到
                ,
            limit: q.pagesize,
            curr: q.pagenum,
            jump: function(obj, first) {
                //obj包含了当前分页的所有参数，比如：
                //console.log(obj.curr); //得到当前页，以便向服务端请求对应页的数据。 
                q.pagenum = obj.curr;
                q.pagesize = obj.limit;
                if (!first) {
                    dataList();
                }
            },
            layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
            limits: [2, 3, 5, 10],
        });
    }
    //删除功能实现
    $('tbody').on('click', '#rm-data', function() {
        //console.log($('.remove-data').length);
        //console.log((1));
        var len = $('.remove-data').length;
        var id = $(this).attr('data-id');
        layer.confirm('确认删除?', { icon: 3, title: '提示' }, function(index) {

            $.ajax({
                url: '/my/article/delete/' + id,
                type: 'GET',
                success: function(res) {
                    if (res.status !== 0) {
                        return layer.msg('删除失败')
                    }
                    layer.msg('删除成功')
                    if (len === 1) {
                        q.pagenum = q.pagenum === 1 ? 1 : q.pagenum - 1

                    };
                    dataList();
                }
            })

            layer.close(index);
        });
    });
    //实现编辑功能
    $('tbody').on('click', '#edt-data', function() {
        // console.log(11);
        location.href = 'artpub.html?id=' + $(this).attr('data-id')

    });



})