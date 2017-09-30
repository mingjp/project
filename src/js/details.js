;jQuery(function(){
    $('#header').load('common.html .header');
    $('#nav').load('common.html .nav');
    $('#footer').load('common.html .footer');

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
        var xhr=new XMLHttpRequest();
        xhr.onload=function(){
            if(xhr.status === 200 || xhr.status === 304){
                var content=JSON.parse(xhr.responseText);
               html = content.map(item=>{
                    return `
                            <li id="${item.id}">
                                <img src="${item.imgurl}">
                                <img src="${item.url1}">
                                <img src="${item.url2}">
                                <img src="${item.url3}">
                                <img src="${item.url4}">
                            </li>
                    `
                }).join('');
                $ul=$('<ul/>').html(html);
                $('.show').html($ul);


            }
        }
        xhr.open('get','../api/details.php?id='+res.id);
        xhr.send();        

})