<?php
if($_POST){
    $request =$_POST['message'];
    switch ($request){
        case 0:
            $file = 'ways.json';
            $json_string = file_get_contents($file);
    
            echo $json_string ;
            break;
    }
}
?>