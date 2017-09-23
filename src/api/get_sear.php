<?php
/**
 * @Author: Marte
 * @Date:   2017-09-01 19:53:49
 * @Last Modified by:   Marte
 * @Last Modified time: 2017-09-03 13:29:41
 */
    $txt = isset($_GET['txt'])?$_GET['txt']:"";
    $txt = ' algla<<script src=""></script>';
    $txt=trim($txt);  
    $txt=str_replace(array('<?','?>'),array('&lt;?','?&gt;'),$txt);  
    $pattern=array(  
    "'<script[^>]*?>.*?</script>'si",  
    "'<style[^>]*?>.*?</style>'si",  
    "'<frame[^>]*?>'si",  
    "'<iframe[^>]*?>.*?</iframe>'si",  
    "'<link[^>]*?>'si"  
    );  
    $replace=array("","","","","");  
    preg_replace($pattern,$replace,$txt);
    echo $txt;

   
?>