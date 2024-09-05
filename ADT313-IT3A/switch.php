<?php
$role = "student";
switch ($role) {
    case 'student':
        echo "You are student, you are not allowed to access ...";
        break;

    case 'instructor':
        echo "Instructor. you have limited access to...";

    case 'admin':
        echo "admin. you have full access to...";
        break;

    default:
        echo "who are you?";
        break;
}

?>