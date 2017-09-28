<?php
        // 分页获取数据

    $pageNo = isset($_POST['pageNo']) ? $_POST['pageNo'] : 1;
    $qty = isset($_POST['qty']) ? $_POST['qty'] : 10;   

    $file_path = 'data/goodslist.json';

    $file = fopen($file_path, 'r');

    $content = fread($file, filesize($file_path));

 
    $arr = json_decode($content);


    $res = array(
        'data' => array_slice($arr, ($pageNo-1)*$qty,$qty), 
        'total' => count($arr),
        'pageNo' => $pageNo,
        'qty' => $qty
    );


    // 把相应的数据传给前端
    echo json_encode($res,JSON_UNESCAPED_UNICODE);

?>