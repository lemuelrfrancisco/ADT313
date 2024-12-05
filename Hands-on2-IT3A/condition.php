<h1> Condition </h1>

<?php
    $age = 50;

    if($age >= 18){
        echo "Legal Age";
    } else if ($age >= 0 && $age <= 10){
        echo "Something";
    } else {
        echo "minor";
    }

    // short-hand if condition
    //(condition) ? true condtiom : else condition

    $agelabel = ($age >=18) ? '18+' : '17-';
    echo $agelabel


    switch ($role){
        case 'admin':
            #code...
            echo 'you have full access'
            break;
        
        case 'student':
            #code
            echo 'you can only access'
            break;

        case 'instructor':
            #code
            echo 'you can only access'
            break;
    }


?>