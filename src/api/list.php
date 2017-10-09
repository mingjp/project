<?php
   include 'connect.php';

    $pageNo = isset($_POST['pageNo']) ? $_POST['pageNo'] : 1;
    $qty = isset($_POST['qty']) ? $_POST['qty'] : 10; 
   
    // 编写查询sql语句
    $sql = 'select * from goods';

    // 利用sql语句查询数据库
    // 查询结果集
    $result = $conn->query($sql);


    // 使用查询结果集
    $row = $result->fetch_all(MYSQLI_ASSOC);

    $res = array(
        'data' => array_slice($row, ($pageNo-1)*$qty,$qty), 
        'total' => count($row),
        'pageNo' => $pageNo,
        'qty' => $qty
    );


    // 把相应的数据传给前端
    // echo json_encode($res,JSON_UNESCAPED_UNICODE);
    echo json_encode($res,JSON_UNESCAPED_UNICODE);

?>