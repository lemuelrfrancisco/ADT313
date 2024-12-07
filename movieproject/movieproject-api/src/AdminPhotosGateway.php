<?php

class AdminPhotosGateway
{
    private PDO $conn;
    public function __construct(Database $database)
    {
        $this->conn = $database->getConnection();
    }

    public function getAll($movieId): array
    {
        $sql = "SELECT * FROM photos WHERE movieId = :movieId";
        $res = $this->conn->prepare($sql);
        $res->bindValue(":movieId",$data["movieId"], PDO::PARAM_INT);

        $res->execute();
        $data = $res->fetch(PDO::FETCH_ASSOC);
        return $data;
    }

    public function create(array $data): string
    {
        $sql = "INSERT INTO photos (movieId, userId, url, description) 
                VALUES (:movieId, :userId, :url, :description)";
        $res = $this->conn->prepare($sql);

        $res->bindValue(":userId",$data["userId"], PDO::PARAM_INT);
        $res->bindValue(":movieId",$data["movieId"], PDO::PARAM_INT);
        $res->bindValue(":url",$data["url"], PDO::PARAM_STR);
        $res->bindValue(":description",$data["description"], PDO::PARAM_STR);

        $res->execute();
        return $this->conn->lastInsertId();
    }

    public function get(string $id)
    {
        $sql = "SELECT * FROM photos WHERE id = :id";
        $res = $this->conn->prepare($sql);
        $res->bindValue(":id", $id, PDO::PARAM_INT);
        $res->execute();
        $data = $res->fetch(PDO::FETCH_ASSOC);

        return $data;
    }

    public function update(array $current, array $new): int
    {
        $sql = "UPDATE photos SET movieId=:movieId, userId=:userId, url=:url, description=:description WHERE id =:id AND userId = :userId";
        $res = $this->conn->prepare($sql);
        $dateUpdated = (new DateTime())->getTimeStamp();
        $res->bindValue(":userId",$current["userId"], PDO::PARAM_INT);
        $res->bindValue(":movieId",$new["movieId"] ?? $current["movieId"], PDO::PARAM_INT);
        $res->bindValue(":url",$new["url"] ?? $current["url"], PDO::PARAM_STR);
        $res->bindValue(":description",$new["description"] ?? $current["description"], PDO::PARAM_STR);
        //$res->bindValue(":dateUpdated",$dateUpdated, PDO::PARAM_STR);
        $res->bindValue(":id", $current["id"], PDO::PARAM_INT);

        $res->execute();

        return $res->rowCount();
    }

    public function delete(string $id, string $userId): int
    {
        $sql = "DELETE FROM photos WHERE id = :id AND userId = :userId";
        $res = $this->conn->prepare($sql);
        $res->bindValue(":id", $id, PDO::PARAM_INT);
        $res->bindValue(":userId", $userId, PDO::PARAM_INT);

        $res->execute();

        return $res->rowCount();
    }
}