<?php
/**
 * @Author: Marte
 * @Date:   2017-09-04 17:45:29
 * @Last Modified by:   Marte
 * @Last Modified time: 2017-09-04 21:23:04
 */

    include 'connect.php';
    $id = isset($_POST['id']) ? $_POST['id'] : false;
    $psd = isset($_POST['psd']) ? $_POST['psd'] : false;

    if($id=="false"||$psd=="false") return false;
    $psd = md5($psd);
    $sql_check="SELECT * FROM userbase WHERE id='$id' and psd='$psd'";
    $result = $conn->query($sql_check);
    $count=$result->fetch_row(); 
    if($count[0]){
        echo 1;
    }else echo 0;
    $conn->close();

?>
