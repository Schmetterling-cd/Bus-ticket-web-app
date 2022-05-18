<?php

class Server{

    public function Listener($request){
        if( $request == $_POST){
            $data =$request['message'];
            switch ($data){
                case 0:
                    $this-> waysJSON();
                    break;
            }
        } 
    }

    private function waysJSON(){
        $file = 'ways.json';
        $json_string = file_get_contents($file);
            
        echo $json_string ;
    }

}

$listener = new Server();
$listener->Listener($_REQUEST);

?>