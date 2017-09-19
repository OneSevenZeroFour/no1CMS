<?php
/**
 * @Author: Marte
 * @Date:   2017-09-06 12:06:27
 * @Last Modified by:   Marte
 * @Last Modified time: 2017-09-06 12:11:09
 */

include 'connect.php';

$id = isset($_GET['id'])? $_GET['id'] : 1;
$data = array();

$sql_txt = 'select * from userinfo where id='.$id;
$ress = $conn->query($sql_txt);
if($ress->num_rows>0){//如果有
    while($row = $ress->fetch_assoc()){
        $data['car'] = $row["car"];
        $data['num'] = $row["carnum"];
    }
    echo json_encode($data,JSON_UNESCAPED_UNICODE);
}
else echo null;

$conn->close();

?>