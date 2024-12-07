<?php

class AdminGateway
{
    private PDO $conn;
    public function __construct(Database $database)
    {
        //connect to database
        $this->conn = $database->getConnection();
    }

    public function register(array $data): string
    {
        $sql = "INSERT INTO users (email, password, firstName, middleName, lastName, contactNo, role) 
                VALUES (:email, :password, :firstName, :middleName, :lastName, :contactNo, :role)";
        $res = $this->conn->prepare($sql);

        //encrypt password using md5
        $password = md5($data["password"]);
        //bind value to PDO
        $res->bindValue(":email", $data["email"], PDO::PARAM_STR);
        $res->bindValue(":password", $password, PDO::PARAM_STR);
        $res->bindValue(":firstName", $data["firstName"], PDO::PARAM_STR);
        $res->bindValue(":middleName", $data["middleName"], PDO::PARAM_STR);
        $res->bindValue(":lastName", $data["lastName"], PDO::PARAM_STR);
        $res->bindValue(":contactNo", $data["contactNo"], PDO::PARAM_STR);
        $res->bindValue(":role", 'admin', PDO::PARAM_STR);

        //execute the SQL query
        $res->execute();
        return $this->conn->lastInsertId();
    }

    public function login(string $email, string $password)
    {
        $sql = "SELECT * FROM users WHERE email = :email AND password = :password AND role = :role";
        $res = $this->conn->prepare($sql);
        $res->bindValue(":email", $email, PDO::PARAM_STR);
        $res->bindValue(":password", md5($password), PDO::PARAM_STR);
        $res->bindValue(":role", 'admin', PDO::PARAM_STR);

        $res->execute();
        $data = $res->fetch(PDO::FETCH_ASSOC);


        if ($data !== false) {

            $payload_response = array(
                "userId" => $data["id"],
                "email" => $data["email"],
                "firstName" => $data["firstName"],
                "middleName" => $data["middleName"],
                "lastName" => $data["lastName"],
                "contactNo" => $data["contactNo"],
                "role" => $data["role"]
            );
            $codec = new JWTCodec;
            //encode the data to JWT
            $access_token = $codec->encode($payload_response);

            return ["access_token" => $access_token, "user"=> $payload_response];
        }
    }

    public function changePassword(array $current, array $new, string $email): int
    {
        $sql = "UPDATE users SET password = :password WHERE email = :email";
        $res = $this->conn->prepare($sql);
        $res->bindValue(":email", $email, PDO::PARAM_STR);
        $res->bindValue(":password", md5($new["password"]) ?? md5($current["password"]), PDO::PARAM_STR);

        $res->execute();

        return $res->rowCount();
    }

}