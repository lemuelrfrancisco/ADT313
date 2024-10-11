<?php

$host = 'localhost';
$dbname = 'movieprojectdb';  
$username = 'root';  
$password = '';  

try {
    $conn = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $input = json_decode(file_get_contents('php://input'), true);

    
    $stmt = $conn->prepare("INSERT INTO users (email, firstName, middleName, lastName, contactNo, password) VALUES (:email, :firstName, :middleName, :lastName, :contactNo, :password)");

    
    $stmt->bindParam(':email', $input['email']);
    $stmt->bindParam(':firstName', $input['first_name']);
    $stmt->bindParam(':middleName', $input['middle_name']);
    $stmt->bindParam(':lastName', $input['last_name']);
    $stmt->bindParam(':contactNo', $input['contact_no']);
    $stmt->bindParam(':password', password_hash($input['password'], PASSWORD_BCRYPT)); 

    
    if ($stmt->execute()) {
        echo json_encode(["message" => "User registered successfully!"]);
    } else {
        echo json_encode(["message" => "Error registering user."]);
    }
} catch (PDOException $e) {
    echo json_encode(["message" => "Connection failed: " . $e->getMessage()]);
}
?>
