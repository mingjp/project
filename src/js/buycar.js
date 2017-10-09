;jQuery(function($){
    var cookies = document.cookie;

        var carlist = [];
        if(cookies.length>0){
            cookies = cookies.split('; ');
            cookies.forEach(function(cookie){
                var temp = cookie.split('=');

                if(temp[0] === 'carlist'){
                    // 把json字符串转成数组
                    carlist = JSON.parse(temp[1]);
                }
            });
        }
        console.log(carlist);

        function render(){
            // 计算总价
            var totalPrice = 0;
            var num=0;
            if(carlist.length>0){
                var res=`<thead>
                    <th width="75"><input type="checkbox" id="all">全选</th>
                    <th  width="365"colspan="2">商品名称</th>
                    <th width="96">发货站</th>
                    <th width="96">价格</th>
                    <th width="140">数量</th>
                    <th width="110">金额小计</th>
                    <th width="110">操作</th>
                </thead>`;
                $table=$('<table/>').append(res);
                $tbody=$('<tbody/>');
            
            
            html = carlist.map(function(item){

                totalPrice += item.price * item.qty;
                num+=item.qty;
                return `<tr id="${item.id}">
                <td><input type="checkbox" ></td>
                <td><img src="${item.imgurl}"></td>
                <td><p>${item.title}</p>
                    <span>颜色:${item.color}</span>
                    <span>尺寸:${item.size}</span>
                    </td>
                    <td><span>${item.city}</span></td>
                    <td>￥<span>${item.price}</span></td>
                <td><span class="low">-</span><input type="text" value="${item.qty}"><span class="tall">+</span></td>
                <td>￥<span class="total">${item.price * item.qty}</span></td>
                <td><span class="del">删除</span></td>
                </tr>`
            }).join('');

            $('.goodslist').html('');
            $tbody.html(html);
            $table.append($tbody);
            $('.goodslist').append($table);
            $('.totalPrice').html((totalPrice).toFixed(2));
            $('.num').html(num);
            }
        }

        render();

        //全选按钮
        var $checkbox = $('.goodslist tbody :checkbox');
        var $trs = $('.goodslist tbody tr');

        $('#all').on('click',function(){

                $checkbox.prop('checked',this.checked);
                
                $trs[this.checked ? 'addClass' : 'removeClass']('selected');
                

            });

        //单选按钮
        $('.goodslist tbody').on('click',':checkbox',function(e){
        
                $(this).parent().parent().toggleClass('selected');

                $(this).prop('checked',$(this).parent().parent().hasClass('selected'));

               checkAllStatus()
            });

            //判断是否全选
            function checkAllStatus(){
               
                // 在所有复选框中筛选出选中的
                $checkedbox = $checkbox.filter(':checked');

                $('#all').prop('checked',$checkbox.length === $checkedbox.length);
            }

            //点击增加或减少商品数量

            $('.goodslist tbody').on('click','.low',function(){
               
                if($(this).next()[0].value==1){
                    return;
                }
                $(this).next()[0].value--;
                $price=$(this).parent().prev().find('span')[0].innerText;
              
                $qty=$(this).next()[0].value;
        
                $(this).parent().next().find('span').html($qty*$price);
            });

            $('.goodslist tbody').on('click','.tall',function(){

                $(this).prev()[0].value++;

                $price=$(this).parent().prev().find('span')[0].innerText;
            
                $qty=$(this).prev()[0].value;
     
                $(this).parent().next().find('span').html($qty*$price);
            });


        // 删除单个商品
        $('.goodslist').on('click','.del',function(){
           
                var $tr = $(this).parent().parent();
                var $id = $tr[0].id;
 
                for(var i=0;i<carlist.length;i++){
                    if(carlist[i].id == $id){
                        carlist.splice(i,1);
                        break;
                    }
                }

                var date = new Date();
                date.setDate(date.getDate()+15);
                document.cookie = 'carlist=' + JSON.stringify(carlist) + ';path=/;domain=localhost;expires=' + date.toUTCString();

                render();
                console.log(carlist.length)
                if(carlist.length==0){
                    $('.goodslist').html('');
                }
        });


        //清空购物车
        $('.del_All').on('click',function(){
            var date = new Date();
            date.setDate(date.getDate()-10);
            document.cookie = 'carlist=x;path=/;domain=localhost;expires=' + date.toUTCString();

            // 清空DOM节点
            $('.goodslist').html('');

            // 清空价格
            $('.totalPrice').html('0.00');
            $('.num').html('0');
        })

        
})