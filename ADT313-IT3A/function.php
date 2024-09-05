<?php
    function generateuser(){
        $user = "User";
        $role = "student";

        echo $user."<br/>";
        echo $role. "<br/>";

    }

    function edituser($value, $age){
        echo "Edit".$value. "<br/>";
        echo "Age" .$age. "<br/>";
    }

    generateuser();
?>