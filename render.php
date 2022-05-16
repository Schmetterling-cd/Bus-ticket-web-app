<?php
    $q = $_POST['message'];
    $file = 'ways.json';
    $json_string = file_get_contents($file);
    
    echo $json_string ;
?>