<?php
/**
 * @Author: Marte
 * @Date:   2017-09-04 17:14:53
 * @Last Modified by:   Marte
 * @Last Modified time: 2017-09-04 17:39:53
 */
    include 'connect.php';
    $id = isset($_POST['id']) ? $_POST['id'] : false;
    $psd = isset($_POST['psd']) ? $_POST['psd'] : false;

    if($id=="false"||$psd=="false") return false;

    $psd = md5($psd);
    $sql_insert="insert into userbase (id,psd) values ('".$id."','".$psd."')";
    $result = $conn->query($sql_insert);

    if($result) echo '注册成功';
    else echo "注册失败！Error: ".$sql_insert."<br>".$conn->error;
    
    $conn->close();

?>