<?php

class User
{
    public $id;
    public $phone_number;
    public $name;
    public $routes;
    public $status;

    public function __construct($id, $phone_number, $name, $routes,$status)
    {
        $this->id = $id;
        $this->phone_number = $phone_number;
        $this->routes = $routes;
        $this->name = $name;
        $this->status = $status;
    }
}


?>