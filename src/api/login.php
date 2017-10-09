<?php
    include 'connect.php';
    $type = isset($_GET['type']) ? $_GET['type'] : '';
    if($type=='user'){
        $username = isset($_GET['username']) ? $_GET['username'] : '';
        //查看用户名是否已经存在
        $sql = "select username from user where username='$username'";
        $result = $conn->query($sql);
        if($result->num_rows>0){
            echo "fail";
        }
    }

    if($type=='All'){
        $username = isset($_GET['username']) ? $_GET['username'] : '';
        $password = isset($_GET['password']) ? $_GET['password'] : '123456';
        

    //查看用户名是否已经存在
    $sql = "select username from user where username='$username'";
    $result = $conn->query($sql);
    if($result->num_rows>0){
        echo "fail";
    }else{

        $sql = "insert into user (username,password) values('$username','$password')";


        // 获取查询结果
        $result = $conn->query($sql);

        if ($result) {
            echo "ok";
        } else {
            echo "Error: " . $sql . "<br>" . $conn->error;
        }
    }

    // 释放查询内存(销毁)
    //$result->free();

    //关闭连接
    $conn->close();
    }
    
    if($type=='register'){
        $username = isset($_GET['username']) ? $_GET['username'] : '';
        $password = isset($_GET['password']) ? $_GET['password'] : '';
        $sql = "select username from user where username='$username' && password='$password'";
        $result = $conn->query($sql);
        if($result->num_rows<=0){
            echo "fail";
        }
    }
?>