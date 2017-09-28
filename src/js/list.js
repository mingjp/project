;jQuery(function($){
    
    $('#header').load('common.html .header');
    $('#nav').load('common.html .nav');
    $('#footer').load('common.html .footer');

    //吸顶部分
    window.onscroll=function(){
        if(window.scrollY>710){
            $('.select').addClass('fixed');
        }else{
            $('.select').removeClass('fixed')
        }
    }
    

    //商品列表部分
    
        // ajax获取商品信息
 
        var pageNo = 1;
        var qty =12;
        var xhr = new XMLHttpRequest();

        xhr.onload= function(){
            if(xhr.status === 200 || xhr.status === 304){

                var res = JSON.parse(xhr.responseText);
                var $ul =$('<ul/>');
                html = res.data.map(item=>{
                    return `
                            <li data-id="${item.id}">
                                <img src="${item.imgurl}">
                                <h4>${item.title}</h4>
                                <p class="price">￥<span>${item.price}</span></p>
                                <a class="addcar">加入购物车</a>
                                <span><i></i>收藏</span>
                            </li>
                    `
                }).join('');

                $ul.html(html);
                $('.goods').html('');
               
                $('.goods').append($ul);

                // 生成分页
                $('.page').html('');
                $('.page').prepend($('<span>上一页</span>'));

                var pageLen = Math.ceil(res.total/res.qty);

                for(var i=0;i<pageLen;i++){
                    $span=$('<span/>');
                    $span.html(i+1);
                    if(i==res.pageNo-1){
                        $span.addClass('active');
                    }
                    $('.page').append($span);
                }
                $('.page').append($('<span>下一页</span>'));
                $('<span/>').addClass('span').html('共计<b>'+pageLen+'</b>&nbsp页').appendTo($('.page'));
            }
        }

        xhr.open('post','../api/list.php',true);

        xhr.setRequestHeader('content-type','application/x-www-form-urlencoded');

        xhr.send('pageNo='+pageNo + '&qty='+qty);

        //ajax分页跳转显示
        // 点击分页获取相应信息
        $('.page').on('click','span',function(){
            pageNo = this.innerText;
                xhr.open('post','../api/list.php',true);
                xhr.setRequestHeader('content-type','application/x-www-form-urlencoded');
                xhr.send('pageNo='+pageNo + '&qty='+qty);
        });
        
        // 加入购物车
        $('.goods').on('click','.addcar',function(){

            $('.tocar').css('display','block');
        })


        $('.tocar').on('click','.car_del',function(){
            $('.tocar').css('display','none');
        });

        $('.tocar_b').on('click','span',function(){

            $('.tocar').css('display','none');
        })
        // 价格排序
    

        
        // 评价部分
        $('.assess').on('click','.del',function(){
            $('.box').remove();
        });
        $('.assess').find('span').on('click',function(){
            $(this).addClass('active').siblings('span').removeClass('active');
        })
        
})