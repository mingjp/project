;jQuery(function($){

            $('.box').mCarousel({
                width:1200,
                height:525,
                imgs:['img/b1.jpg','img/b2.jpg','img/b3.jpg','img/b4.jpg','img/b5.jpg'],
                type:'fade'

            });


            //商品展示
            var $goods=$('.goods');
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
                $goods.append(ul);

                }
            }
            xhr.open('get','api/data/goods.json',true);
            xhr.send();

            //动态效果
            $goods.on('mouseenter.drag','li',function(){

                $(this).find('img').animate({width:675,height:378})
                $(this).addClass('active');
                
            }).on('mouseleave.drag','li',function(){
               
                $(this).find('img').animate({width:590,height:330});
                $(this).removeClass();
            });


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
