<?php

class Server{

    public function Listener($request){
        if( $request == $_POST){
            $data =$request['message'];

            //сравнение номера телефона с регуляркой
            if(1 == 1){
                $this->userFinder($data);
            }

            switch ($data){

                case 0:
                    $this-> waysJSON();
                    break;
            }
        } 
    }

    public function CreateJSON($arr)
    {
        
    }

    public function Update($newUser)
    {

    }

    function Registration()
    {
        

    }

    function userFinder($number){
        $mysql = mysqli_connect('localhost','root','5240102H000PB5','User');
        if(mysqli_query($mysql,'SELECT `id`,`phone_number`,`password`,`name`,`routes`,`status`  FROM `User` WHERE `phone_number` = "'.$number.'"')){
            mysqli_close($mysql);
            
        }else{
            mysqli_close($mysql);
        }
    }

    function Autorization($number){
        $mysql = mysqli_connect('localhost','root','5240102H000PB5','User');
        $req = mysqli_query($mysql,'SELECT `id`,`phone_number`,`password`,`name`,`routes`,`status`  FROM `User` WHERE `phone_number` = "'.$number.'"');
        $data = mysqli_fetch_all($req, MYSQLI_ASSOC);

        $user = new User($data["id"],$data["phone_number"],$data["name"],$data["routes"],$data["status"]);
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