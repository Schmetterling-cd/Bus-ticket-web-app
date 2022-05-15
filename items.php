<?php

class Item
{
    public $from;
    public $to;
    public $coast;

    public function __construct($from, $to, $coast)
    {
        $this->from = $from;
        $this->to = $to;
        $this->coast = $coast;
    }
}
?>