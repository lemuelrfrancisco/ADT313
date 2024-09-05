<?php
$cars = array("Volvo", "BMW", "Toyota");
$cars = ["Volvo", "BMW", "Toyota"];

echo $cars[0];

$userInformation = array(
    "firstname" => "christine",
    "lastname" => "lazaro",
    "role" => "admin"

);
echo "<br/>";
$userInformation["address"] = 'Bocaue';

echo $userInformation["address"];
echo "<br/>";
print_r($userInformation);

echo "<br/>";

var_dump($userInformation);
?>