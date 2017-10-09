;jQuery(function(){

    $('#header').load('common.html .header',function(){
         var num=0;
            carlist.forEach(function(item){
                console.log(item.qty)
                num=Number(num)+Number(item.qty);
                console.log(num)
            })
       
        $('.car').find('span').html('('+num+')');

         // 登录
            function login(){
                var user = [];
                    var cookies = document.cookie;
                    var has=false;
                    if(cookies.length>0){
                        cookies = cookies.split('; ');
                        cookies.forEach(function(cookie){
                            var temp = cookie.split('=');
                            if(temp[0] === 'user'){
                                has=true;
                                user = JSON.parse(temp[1]);
                            }
                        })
                    }
                    console.log(user)
                    if(has){
                        $('.id_login').html(user);
                        $('.id_exit').html('退出');console.log(55);
                    }else{
                        $('.id_login').html('请登录');console.log(66);
                        $('.id_exit').html('免费注册');
                    }   
        }

        login();
    });
    $('#nav').load('common.html .nav');
    $('#footer').load('common.html .footer');


    //进入页面读取cookie
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


    //获取传递过来的id
    var params = location.search;
        params= decodeURI(params).split('?');
        var res = {};
        params.forEach(function(item){
            // 再以=拆分数组
            var arr = item.split('=');
            console.log(arr)
            // 写入对象
            res[arr[0]] = arr[1];
        });
        var $img;
        var xhr=new XMLHttpRequest();
        xhr.onload=function(){
            if(xhr.status === 200 || xhr.status === 304){
                content=JSON.parse(xhr.responseText);
               html = content.map(item=>{
                $img=item;
                console.log($img);
                    return `
                           <p class="p1">首页>包袋>单肩包>巴黎世家>${item.title}</p> 
                        <div class="picture clearfix">

                            <ul class="tab">
                                <li id="${item.id}">
                                    <img src="${item.url1}">
                                    <img src="${item.url2}">
                                    <img src="${item.url3}">
                                    <img src="${item.url4}">
                                </li>
                                <img src="${item.imgurl}" class="img zoom">
                            </ul>
                            <div class="right">
                                <h4>${item.title}</h4>
                                <div>
                                    <p>一口价￥<span class="price">${item.price}</span></p>
                                    <p><span>发货地</span><span class="city">${item.city}</span>有货&nbsp&nbsp<span>预计下单后2-4天内发货</span></p>
                                    <p>温馨提示：本商品无质量问题不支持退换货</p>
                                </div>
                                
                                <p><span>颜色</span><img src="${item.imgurl}"></p>
                                <p><span>尺寸</span>${item.size}</p>
                                <p class="num"><span>购买数量</span><span class="low">-</span><input type="text" value="1"><span class="tall">+</span></p>
                                <a href="buycar.html" class="buycar">立即抢购</a>
                                <a class="to_car">加入购物车</a>
                                <p><i></i><span>分期支付</span></p>
                            </div>
                            <p><i></i><span>正品保障</span><i></i><span>七天退换</span><i></i><span>权威质检</span><i></i><span>分享</span><i></i><span>收藏商品</span></p>
                        </div>
                    `
                }).join('');
                
                $('.show').html(html);


                //点击增加或减少商品数量
                $('.right .num').on('click','.low',function(){
                    if($(this).next()[0].value==1){
                            return;
                        }
                    $(this).next()[0].value--;console.log($(this)[0])
                });

                $('.right .num').find('.tall').on('click',function(){
                    $(this).prev()[0].value++;
                })  
 
            
               
                    $img1=$('<img/>').appendTo($('.goods_picture'));
                    $img1[0].src=$img.url1;
                    $img2=$('<img/>').appendTo($('.goods_picture'));
                    $img2[0].src=$img.url2;
                    $img3=$('<img/>').appendTo($('.goods_picture'));
                    $img3[0].src=$img.url3;
                    $img4=$('<img/>').appendTo($('.goods_picture'));
                    $img4[0].src=$img.url4;

                    function show(){
                        
                         var has = false;
                        for(var i=0;i<carlist.length;i++){
                            // 已经存在
                            if(carlist[i].id === $img.id){
                                carlist[i].qty++;
                                has=true;
                                break;
                            }
                        }

                // 不存在
                        if(!has){
                            var goods = {
                                qty:$('.low').next()[0].value,
                                imgurl:$img.imgurl,
                                title:$img.title,
                                price:$img.price,
                                color:$img.color,  
                                size:$img.size,
                                city:$img.city,      
                                id:$img.id
                            }

                        carlist.push(goods)
                        console.log(carlist);
                    }
                    document.cookie = 'carlist=' + JSON.stringify(carlist)+';path=/;domain=localhost';
                    }
                    
                    //点击写入cookie
                    $('.to_car').on('click',function(){
                        $('.tocar').css('display','block');
                       show();
                    });

                    $('.buycar').on('click',function(){
                        show();
                    });

                    $('.tab li').find('img').hover(function(){
                        $(this).addClass('active').siblings('img').removeClass('active');
                        $('.img')[0].src=this.src;
                    })

            }
        }
        xhr.open('get','../api/details.php?id='+res.id);
        xhr.send();   
       
        $('.tocar').on('click','.car_del',function(){
            $('.tocar').css('display','none');
        });

        $('.tocar_b').on('click','span',function(){

            $('.tocar').css('display','none');
        })

})