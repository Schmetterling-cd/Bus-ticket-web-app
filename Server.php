<?php

class Server{

    public $phnumber;
    public $flag = false;

    public function Listener($request){
        if( $request == $_POST){
            $data = $request;
            $patternPN = '/375(\d+){9}/';

            //сравнение номера телефона с регуляркой
            if( preg_match($patternPN,$data['message'])){
                $this->userFinder($data['message']);
            }

            if($request['message']=='bykobyko'){
                echo("great");
                $this->Autorization($this->phnumber, $data['password']);
            }
                
           
            switch ($data['message']){

                case '0':
                    $this-> waysJSON();
                    break;
            }  
        } 
            // $data = $request['message'];
            // echo("great");
            // $this->Autorization($this->phnumber, $data['password']);
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
        $mysql = mysqli_connect('localhost','root','5240102H000PB5','Bus_ticket');
        if (mysqli_connect_errno()){
            echo "DB conection error";
        }
        $req = mysqli_query($mysql,"SELECT * FROM `User` WHERE phone_number =".$number);
        $data = mysqli_fetch_all($req, MYSQLI_ASSOC);
        if($data){
            mysqli_close($mysql);
            $this->phnumber = $number;
            $this->flag = true;
            echo 0;
            
        }else{
            mysqli_close($mysql);
        }
    }

    function Autorization($number,$password){
        $mysql = mysqli_connect('localhost','root','5240102H000PB5','Bus_ticket');
        $req = mysqli_query($mysql,"SELECT * FROM `User` WHERE phone_number =".$number);
        $data = mysqli_fetch_all($req, MYSQLI_ASSOC);
        echo ("ther good");  
        $user = new User($data["id"],$data["phone_number"],$data["name"],$data["routes"],$data["status"], $data['password']);
        if($user->password == $password){
            $json_string=`{ "name": "`.$data["name"].`", "status" : "`.$data["status"].`", "routes": "`.$data["routes"].`"}`;
            echo ("ther good");  
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
$_REQUEST = NULL;
unset($listener);

?>