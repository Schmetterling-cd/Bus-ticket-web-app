<?php

include 'User.php';

class Server{

    public function Listener($request){
        if( $request == $_POST){
            $patternPN = '/(\+)375(\d+){9}/';
            switch ($request['request']){

                case '0':
                    $this-> waysJSON();
                    break;
                    
                case '1':
                    if( preg_match($patternPN,$request['number'])){
                        $this->userFinder($request['number']);
                    } else{
                        echo '2';
                    }
                    break;
                case '2':
                    $password = $request['password'];
                    $phone = $request['number'];
                    $this->Autorization($phone, $password);
                    break;
                case '3':
                    $this->Registration($request);
                    break;
                case '4':
                    break;
                    
            }  
        } 
    }

    function userFinder($number){
        $mysql = mysqli_connect('localhost','root','5240102H000PB5','Bus_ticket');
        if (mysqli_connect_errno()){
            echo "DB conection error";
        }
        $req = mysqli_query($mysql,"SELECT * FROM `User` WHERE phone_number =".$number);
        $table = mysqli_fetch_all($req, MYSQLI_ASSOC);
        $data = $table[0];
        if($data){
            mysqli_close($mysql);
            $this->phnumber = $number;
            echo 0;
            
        }else{
            mysqli_close($mysql);
            echo 1;
        }
    }

    function Registration($request){
        $mysqli = mysqli_connect('localhost','root','5240102H000PB5','Bus_ticket');
        if (mysqli_connect_errno()){
            echo "DB conection error";
        }
        //print_r("INSERT INTO `User`(`id`, `phone_number`, `password`, `name`, `routes`, `status`) VALUES (".(string)$maxid.",".$request["phone_number"].",".$request["password"].",".$request["name"].",".$request["routes"].",".$request["status"].")");
        $req = mysqli_query($mysqli,"INSERT INTO `Bus_ticket`.`User` (`phone_number`,`password`,`name`,`status`) VALUES ('".$request["phone_number"]."','".$request["password"]."','".$request["name"]."','".$request["status"]."')");
        if ($req){
            $this->Autorization($request["phone_number"], $request["password"]);
        }else{
            echo($mysqli->error);
        }
        mysqli_close($mysqli); 
        
    }

    function Autorization($number,$password){
        $mysqli = mysqli_connect('localhost','root','5240102H000PB5','Bus_ticket');
        if (mysqli_connect_errno()){
            echo "DB conection error";
        }
        $req = mysqli_query($mysqli,"SELECT * FROM `User` WHERE phone_number =".$number);
        $table = mysqli_fetch_all($req, MYSQLI_ASSOC);
        $data = $table[0];
        
        $user = new User($data["id"],$data["phone_number"],$data["name"],$data["routes"],$data["status"], $data['password']);      
        
        if($user->password == $password){
            $object = new stdClass();
            $object-> phone_number = $data["phone_number"];
            $object-> name = $data["name"];
            $object-> routs = $data["routes"];
            $object-> status = $data["status"];
            mysqli_close($mysqli); 
            $json_string = json_encode($object);
            echo $json_string;
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