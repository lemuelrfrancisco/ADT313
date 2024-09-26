<?php

class CastsGateway
{
    private PDO $conn;
    public function __construct(Database $database)
    {
        $this->conn = $database->getConnection();
    }

    public function getAll($movieId): array
    {
        $sql = "SELECT * FROM casts WHERE movieId = :movieId";
        $res = $this->conn->prepare($sql);
        $res->bindValue(":movieId",$data["movieId"], PDO::PARAM_INT);

        $res->execute();
        $data = $res->fetch(PDO::FETCH_ASSOC);
        return $data;
    }

    public function create(array $data): string
    {
        $sql = "INSERT INTO casts (movieId, userId, name, url, characterName) 
                VALUES (:movieId, :userId, :name, :url, :characterName)";
        $res = $this->conn->prepare($sql);

        $res->bindValue(":userId",$data["userId"], PDO::PARAM_INT);
        $res->bindValue(":movieId",$data["movieId"], PDO::PARAM_INT);
        $res->bindValue(":name",$data["name"], PDO::PARAM_STR);
        $res->bindValue(":url",$data["url"], PDO::PARAM_STR);
        $res->bindValue(":characterName",$data["characterName"], PDO::PARAM_STR);

        $res->execute();
        return $this->conn->lastInsertId();
    }

    public function get(string $id)
    {
        $sql = "SELECT * FROM casts WHERE id = :id";
        $res = $this->conn->prepare($sql);
        $res->bindValue(":id", $id, PDO::PARAM_INT);
        $res->execute();
        $data = $res->fetch(PDO::FETCH_ASSOC);

        return $data;
    }

    public function update(array $current, array $new): int
    {
        $sql = "UPDATE casts SET name=:name,url=:url,characterName=:characterName, dateUpdate=:dateUpdated WHERE id =:id AND userId = :userId";
        $res = $this->conn->prepare($sql);
        $dateUpdated = (new DateTime())->getTimeStamp();
        $res->bindValue(":userId",$current["userId"], PDO::PARAM_INT);
        $res->bindValue(":movieId",$new["movieId"] ?? $current["movieId"], PDO::PARAM_INT);
        $res->bindValue(":name",$new["name"] ?? $current["name"], PDO::PARAM_STR);
        $res->bindValue(":url",$new["url"] ?? $current["url"], PDO::PARAM_STR);
        $res->bindValue(":characterName",$new["characterName"] ?? $current["characterName"], PDO::PARAM_STR);
        $res->bindValue(":dateUpdated",$dateUpdated, PDO::PARAM_STR);
        $res->bindValue(":id", $current["id"], PDO::PARAM_INT);

        $res->execute();

        return $res->rowCount();
    }

    public function delete(string $id, string $userId): int
    {
        $sql = "DELETE FROM casts WHERE id = :id AND userId = :userId";
        $res = $this->conn->prepare($sql);
        $res->bindValue(":id", $id, PDO::PARAM_INT);
        $res->bindValue(":userId", $userId, PDO::PARAM_INT);

        $res->execute();

        return $res->rowCount();
    }
}