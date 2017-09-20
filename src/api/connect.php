<?php
/**
 * @Author: Marte
 * @Date:   2017-09-03 12:54:52
 * @Last Modified by:   Marte
 * @Last Modified time: 2017-09-03 12:58:21
 */

    $sn = 'localhost';
    $user = 'root';
    $psd = '';
    $dbs = 'pingdb';

    // 连接
    $conn = new mysqli($sn,$user,$psd,$dbs);

    // 检测连接
    if($conn->connect_errno){
        die('连接失败'.$conn->connect_error);
    }
    $conn->set_charset('utf8');

?>