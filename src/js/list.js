;jQuery(function($){
    
    $('#header').load('common.html .header');
    $('#nav').load('common.html .nav');
    $('#footer').load('common.html .footer');

    var carlist = [];
        var cookies = document.cookie;
        if(cookies.length>0){
            cookies = cookies.split('; ');
            cookies.forEach(function(cookie){
                var temp = cookie.split('=');
                if(temp[0] === 'carlist'){
                    carlist = JSON.parse(temp[1]);
                }
            })
        }

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
        var res;
        var order=true;
        function createList($ul){
                    html = res.data.map(item=>{
                    return `
                            <li id="${item.id}">
                                <img src="${item.imgurl}">
                                <h4>${item.title}</h4>
                                <p>颜色:<span class="color">${item.color}</span>尺寸:<span class="size">${item.size}</span></p>
                                <p>￥<span class="price">${item.price}</span></p>
                                <a class="addcar">加入购物车</a>

                                <span><i class="iconfont icon-aixin"></i>收藏</span>
                            </li>
                    `
                }).join('');
                $ul.html(html);
                $('.goods').html('');

                }

        var xhr = new XMLHttpRequest();
        xhr.onload= function(){
            if(xhr.status === 200 || xhr.status === 304){

                res = JSON.parse(xhr.responseText);
            

                // 生成结构
                var $ul =$('<ul/>');
                createList($ul); 

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

        // 价格排序
        // 获取价格排序按钮
        
            $('.sortPirce').on('click',function(){
             
                if(order){
                    for(var i=0;i<(res.data).length;i++){
                        // 注意变量初始化的值
                        for(var j=i+1;j<(res.data).length;j++){
                            if(res.data[i].price<res.data[j].price){
                                var temp = res.data[i];
                              res.data[i] =  res.data[j];
                                 res.data[j] = temp;
                            }
                        }
                    }

                    $('.goods').html('');
                    var $ul =$('<ul/>');
                    
                    // $ul=$('.goods ul');
                    console.log($ul[0])
                    createList($ul);
                    $('.goods').append($ul);
                    order=false;
                }
                else{
                   for(var i=0;i<(res.data).length;i++){
                        // 注意变量初始化的值
                        for(var j=i+1;j<(res.data).length;j++){
                            if(res.data[i].price>res.data[j].price){
                                var temp = res.data[i];
                               res.data[i] = res.data[j];
                               res.data[j] = temp;
                            }
                        }
                    }

                    $('.goods').html('');
                    var $ul =$('<ul/>');
                    
                    createList($ul);
                    $('.goods').append($ul);
                    order=true; 
                }
        })

        
        // 加入购物车
        $('.goods').on('click','.addcar',function(){

            $('.tocar').css('display','block');
            // var $imgurl=$(this).parent().find('img')[0].src;
            // var $price=$('.price')[0].innerText;
            // var $color=$('.color')[0].innerText;
            // var $size=$('.size')[0].innerText;
            console.log($(this).parent()[0].id);

            var has = false;
                for(var i=0;i<carlist.length;i++){
                    // 已经存在
                    if(carlist[i].id === guid){
                        carlist[i].qty++;
                        has=true;
                        break;
                    }
                }

                // 不存在
                if(!has){
                    var goods = {
                        imgurl:$(this).parent().find('img')[0].src,
                        title:$(this).parent().find('h4')[0].innerText,
                        price:$('.price')[0].innerText,
                        color:$('.color')[0].innerText,  
                        size:$('.size')[0].innerText,       
                        qty:1,
                        id:$(this).parent()[0].id
                    }

                    carlist.push(goods)
                    console.log(carlist);
                }
                document.cookie = 'carlist=' + JSON.stringify(carlist);
        })


        $('.tocar').on('click','.car_del',function(){
            $('.tocar').css('display','none');
        });

        $('.tocar_b').on('click','span',function(){

            $('.tocar').css('display','none');
        })
        
        $('.select li').eq(0).addClass('active');
        console.log($('.select li').eq(0)[0])
        $('.select').on('click','li',function(){
            $(this).addClass('active').siblings('li').removeClass();
        })
        
        // 评价部分
        $('.assess').on('click','.del',function(){
            $('.box').remove();
        });
        $('.assess').find('span').on('click',function(){
            $(this).addClass('active').siblings('span').removeClass('active');
        })
        
})