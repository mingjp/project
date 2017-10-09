;jQuery(function($){
    $('#footer').load('common.html .footer');
    //注册
    
    $('#username')[0].focus();

    var username;
    var password;
    var type;
    var xhr = new XMLHttpRequest();

$('#username')[0].onblur=function(){
        $('#password')[0].focus();
        username=$('#username')[0].value;
        if(!/^1[34578]\d{9}$/.test(username)){
            $('.span1').css('color','red').html('手机号码不合法');
            return false;
        }
        type='user';
        console.log(username);
        
        xhr.onload= function(){
            if(xhr.status === 200 || xhr.status === 304){
                var res=xhr.responseText;
                if(res=='fail'){
                    $('.span1').css('color','red').html('该手机号已被注册');
                }else{$('.span1').html('')}
                console.log(xhr.responseText);
            }
        }
        xhr.open('get','../api/login.php?type='+type+'&username='+username);
        xhr.send();   
    }


    $('#password')[0].onblur=function(){
        $('#affirm')[0].focus();
        password=$('#password')[0].value;
        console.log(password);
        if(!/^\S{6,25}/.test(password)){
            $('.span2').css('color','red').html('密码长度只能在6-25位之间');
            return false;
        }else{$('.span2').html('')}
        
    }

    $('#affirm')[0].onblur=function(){
        if(password!=this.value){
            $('.span3').css('color','red').html('密码不一致');
        }else{$('.span3').html('')}
    }
    $('.login_a').on('click',function(e){
        
        type='All';console.log(password,username);
        password=$('#password')[0].value;
        xhr.open('get','../api/login.php?type='+type+'&username='+username+'&password='+password);
        xhr.send();
        e.preventDefault();
    })
    
    // var password=$('#password')[0].value;
    
})