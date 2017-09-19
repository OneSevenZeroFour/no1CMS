<?php
/**
 * @Author: Marte
 * @Date:   2017-09-06 11:35:05
 * @Last Modified by:   Marte
 * @Last Modified time: 2017-09-06 14:32:22
 */
    // 写入用户信息 - 暂只考虑存入购物车商品信息与购物车商品数量
    include 'connect.php';
    $id = isset($_POST['id']) ? $_POST['id'] : false;
    $car = isset($_POST['car']) ? $_POST['car'] : null;
    $cn = isset($_POST['cn']) ? $_POST['cn'] : 0;

    if($id=="false") return false;

    $sql_search="SELECT COUNT(*) AS count FROM userinfo WHERE id=".$id;
    $result = $conn->query($sql_search)->fetch_all(MYSQLI_ASSOC);
    $count=$result[0]['count']; 
    

    if($count>0){
        $sql_insert="update userinfo set car='".$car."',carnum='".$cn."' where id=".$id;
    }else{
         $sql_insert="insert into userinfo (id,car,carnum) values ('".$id."','".$car."','".$cn."')";
    }
    
    $result = $conn->query($sql_insert);

    if($result) echo '1';
    else echo "写入失败！Error: ".$sql_insert."<br>".$conn->error;
    
    $conn->close();

?>