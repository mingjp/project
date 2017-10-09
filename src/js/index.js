;jQuery(function($){

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
                    console.log(typeof user)
                    if(has){
                        $('.id_login').html(user);
                        $('.id_exit').html('退出');console.log(55);
                    }else{
                        $('.id_login').html('请登录');console.log(66);
                        $('.id_exit').html('免费注册');
                    }   
        }

        login();

            $('.box').mCarousel({
                width:1200,
                height:525,
                imgs:['img/b1.jpg','img/b2.jpg','img/b3.jpg','img/b4.jpg','img/b5.jpg'],
                type:'fade'

            });


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
            var num=0;
            carlist.forEach(function(item){
                console.log(item.qty)
                num=Number(num)+Number(item.qty);
            })
       
        $('.car').find('span').html('('+num+')');
       
        
            //商品展示
            var $topic=$('.topic');
            var xhr=new XMLHttpRequest();
            xhr.onload=function(){
                if(xhr.status === 200 || xhr.status === 304){
                var res = JSON.parse(xhr.responseText);
                var ul = document.createElement('ul');
                ul.innerHTML = res.map(item=>{
                    return `
                            <li data-id="${item.id}">
                            <a href=""><img src="${item.imgurl}"></a>
                                
                                <h2>${item.title}</h2>
                                <p>${item.name}</p>
                            </li>
                    `
                }).join('');
                $topic.append(ul);

                }
            }
            xhr.open('get','api/data/index.json',true);
            xhr.send();


            //点击按钮商品滑动
            var obj={
                img:['img/l1.jpg','img/l2.jpg','img/l3.jpg','img/l4.jpg','img/l5.jpg','img/l6.jpg','img/l7.jpg','img/l8.jpg','img/l9.jpg'],

                init:function(){
                    $('.list').append($('<span>&lt</span>').addClass('prev btn')).append($('<span>&gt</span>').addClass('next btn'));
                    $ul=$('<ul/>').appendTo($('.list'));
                    var html=this.img.map(function(item){
                        return `<li><a href=""><img src="${item}"></a></li>`
                    }).join('');
                    $ul.html(html);
                    this.ele=$ul;
                    console.log(this.ele);
                    return this;
                },
                move:function(){
                    $ul=this.ele;
                    var idx=0;
                    $('.list .btn').each(function(){
                        $(this).on('click',function(){
                        idx++;
                        if($ul[0].offsetLeft<=-1200){
                            idx=0;
                        }
                        $('.list ul').animate({left:-idx*600})
                       
                        })
                    })
                }
            }
            obj.init().move();

})
