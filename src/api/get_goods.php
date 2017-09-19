<?php
/**
 * @Author: Marte
 * @Date:   2017-09-03 12:58:51
 * @Last Modified by:   Marte
 * @Last Modified time: 2017-09-09 16:08:21
 */

include 'connect.php';

$tag = isset($_GET['t'])? $_GET['t'] : false;
$od = isset($_GET['s'])?$_GET['s']:'id';
$page = isset($_GET['p'])?$_GET['p']:1;
$num = isset($_GET['n'])?$_GET['n']:6;
$sc = isset($_GET['x'])?$_GET['x']:'ASC';
$needSum = isset($_GET['ns'])?$_GET['ns']:false;

/*$pattern=array(  
"'<script[^>]*?>.*?</script>'si",  
"'<style[^>]*?>.*?</style>'si",  
"'<frame[^>]*?>'si",  
"'<iframe[^>]*?>.*?</iframe>'si",  
"'<link[^>]*?>'si"  
);  
$replace=array("","","","","");  
preg_replace($pattern,$replace,$tag);
preg_replace($pattern,$replace,$od);
preg_replace($pattern,$replace,$page);
preg_replace($pattern,$replace,$num);
preg_replace($pattern,$replace,$sc);
*/
if(strtolower($sc)!='asc'&&strtolower($sc)!=='desc')
    $sc = 'ASC';

//查一页
$start = ($page-1)*$num;
if($tag){
    $sql = 'select * from goodbase where '.$tag.' order by '.$od.' '.$sc.' limit '.$start.','.$num;
}else{
    $sql = 'select * from goodbase order by '.$od.' '.$sc.' limit '.$start.','.$num;
}
$res = $conn->query($sql);
$row = $res->fetch_all(MYSQLI_ASSOC);
$res->close();

$data = array('data' => json_encode($row,JSON_UNESCAPED_UNICODE));

// 查所有 得总数 
if($needSum!="false"){
    if($tag) $sql_all="SELECT COUNT(*) AS count FROM goodbase WHERE ".$tag;
    else  $sql_all="SELECT COUNT(*) AS count FROM goodbase";

    $result = $conn->query($sql_all)->fetch_all(MYSQLI_ASSOC);
    $count=$result[0]['count']; 
    $data = array('data' => json_encode($row,JSON_UNESCAPED_UNICODE),'sum'=>$count);
}

echo json_encode($data,JSON_UNESCAPED_UNICODE);

$conn->close();

?>