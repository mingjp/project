;jQuery(function($){
    $('#footer').load('common.html .footer');

    var username;
    var password;
    var type;
    var xhr = new XMLHttpRequest();

    $('.register').on('click',function(e){
        e.preventDefault();
        type='register';
        username=$('#username')[0].value;
        password=$('#password')[0].value;
        xhr.onload= function(){
            if(xhr.status === 200 || xhr.status === 304){
                var res=xhr.responseText;
                if(res=='fail'){
                    $('.span1').css('color','red').html('用户名或密码错误');
                }else{
                    $('.span1').html('');
                    document.cookie=
                    location.href="../index.html";
                    document.cookie = 'user=' + username+';path=/;domain=localhost';
                    
                }
                console.log(xhr.responseText);
            }
        }
        xhr.open('get','../api/login.php?type='+type+'&username='+username+'&password='+password);
        xhr.send(); 
    })
    

    // 验证码
    function yanzhengma(num){
    if(num === undefined){
        num = 4;
    }
    var arr = 'abcdefghijklmnopqrstuvwxyz0123456789'.split('');

    // 循环获取验证码
    var res = '';
    for(var i=0;i<num;i++){
        var idx = parseInt(Math.random()*arr.length);
        res += arr[idx];
    }
    return res;
}
    

    $('.icode').html(yanzhengma());

    $('.change').on('click',function(){console.log(4)
        yanzhengma();
        $('.icode').html(yanzhengma());
    })


})