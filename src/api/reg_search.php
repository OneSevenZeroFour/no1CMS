<?php
/**
 * @Author: Marte
 * @Date:   2017-09-04 16:34:56
 * @Last Modified by:   Marte
 * @Last Modified time: 2017-09-04 17:31:26
 */

    include 'connect.php';
    $id = isset($_GET['id']) ? $_GET['id'] : false;

    if($id=="false") return false;
    $sql_search="SELECT COUNT(*) AS count FROM userbase WHERE id=".$id;
    $result = $conn->query($sql_search)->fetch_all(MYSQLI_ASSOC);
    $count=$result[0]['count']; 

    echo $count;
    $conn->close();
?>