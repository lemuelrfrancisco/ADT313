<?php

class AdminVideosGateway
{
    private PDO $conn;
    public function __construct(Database $database)
    {
        $this->conn = $database->getConnection();
    }

    public function getAll($movieId, $userId): array
    {
        $sql = "SELECT * FROM videos WHERE movieId = :movieId AND userId = :userId";
        $res = $this->conn->prepare($sql);
        $res->bindValue(":movieId",$data["movieId"], PDO::PARAM_INT);
        $res->bindValue(":userId",$userId, PDO::PARAM_INT);

        $res->execute();
        $data = [];

        while ($row = $res->fetch(PDO::FETCH_ASSOC)) {
            $row["official"] = (bool) $row["official"];
            $data[] = $row;
        }

        return $data;
    }

    public function create(array $data): string
    {
        $sql = "INSERT INTO videos (movieId, userId, url, name, site, videoKey, videoType, official) 
                VALUES (:movieId, :userId, :url, :name, :site, :videoKey, :videoType, :official)";
        $res = $this->conn->prepare($sql);

        $res->bindValue(":userId",$data["userId"], PDO::PARAM_INT);
        $res->bindValue(":movieId",$data["movieId"], PDO::PARAM_INT);
        $res->bindValue(":url",$data["url"], PDO::PARAM_STR);
        $res->bindValue(":name",$data["name"], PDO::PARAM_STR);
        $res->bindValue(":site",$data["site"], PDO::PARAM_STR);
        $res->bindValue(":videoKey",$data["videoKey"], PDO::PARAM_STR);
        $res->bindValue(":videoType",$data["videoType"], PDO::PARAM_STR);
        $res->bindValue(":official",$data["official"], PDO::PARAM_INT);


        $res->execute();
        return $this->conn->lastInsertId();
    }

    public function get(string $id)
    {
        $sql = "SELECT * FROM videos WHERE id = :id AND userId = :userId";
        $res = $this->conn->prepare($sql);
        $res->bindValue(":id", $id, PDO::PARAM_INT);
        $res->bindValue(":userId",$userId, PDO::PARAM_INT);

        $res->execute();
        $data = $res->fetch(PDO::FETCH_ASSOC);

        return $data;
    }

    public function update(array $current, array $new): int
    {
        $sql = "UPDATE videos SET movieId=:movieId, userId=:userId, url=:url, name=:name, site=:site, videoKey=:videoKey, type=:type, official=:official WHERE id =:id AND userId = :userId";
        $res = $this->conn->prepare($sql);
        $dateUpdated = (new DateTime())->getTimeStamp();
        $res->bindValue(":userId",$current["userId"], PDO::PARAM_INT);
        $res->bindValue(":movieId",$new["movieId"] ?? $current["movieId"], PDO::PARAM_INT);
        $res->bindValue(":url",$new["url"] ?? $current["url"], PDO::PARAM_STR);
        $res->bindValue(":name",$new["name"] ?? $current["name"], PDO::PARAM_STR);
        $res->bindValue(":site",$new["site"] ?? $current["site"], PDO::PARAM_STR);
        $res->bindValue(":videoKey",$new["key"] ?? $current["videoKey"], PDO::PARAM_STR);
        $res->bindValue(":videoType",$new["videoType"] ?? $current["videoType"], PDO::PARAM_STR);
        $res->bindValue(":official",$new["official"] ?? $current["official"], PDO::PARAM_INT);

        $res->bindValue(":dateUpdated",$dateUpdated, PDO::PARAM_STR);
        $res->bindValue(":id", $current["id"], PDO::PARAM_INT);

        $res->execute();

        return $res->rowCount();
    }

    public function delete(string $id, string $userId): int
    {
        $sql = "DELETE FROM videos WHERE id = :id AND userId = :userId";
        $res = $this->conn->prepare($sql);
        $res->bindValue(":id", $id, PDO::PARAM_INT);
        $res->bindValue(":userId", $userId, PDO::PARAM_INT);

        $res->execute();

        return $res->rowCount();
    }
}