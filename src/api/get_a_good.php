<?php
/**
 * @Author: Marte
 * @Date:   2017-09-05 17:18:23
 * @Last Modified by:   Marte
 * @Last Modified time: 2017-09-06 16:34:27
 */
    include 'connect.php';

    $id = isset($_GET['idx'])? $_GET['idx'] : 1;

    $sql = 'select * from gooddetails where id='.$id;
   
    $res = $conn->query($sql);
    if ($res->num_rows > 0) {//如果有
        $row = $res->fetch_all(MYSQLI_ASSOC);
        $data = $row[0];
    }else $data = array();
    $res->close();

    $sql_txt = 'select * from goodbase where id='.$id;
    $ress = $conn->query($sql_txt);
    if($ress->num_rows>0){
        while($row = $ress->fetch_assoc()){
            $data['name'] = $row["name"];
            $data['det'] = $row["det"];
            $data['price'] = $row["price"];
            $data['sale'] = $row["sale"];
            $data['tag'] = $row["tag"];
            $data['stock'] = $row["stock"];
            $data['img'] = $row["img"];
        }
    }
    else $data['name'] = null;
        
    echo json_encode($data,JSON_UNESCAPED_UNICODE);

    $conn->close();
?>