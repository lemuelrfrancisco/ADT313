<?php

class AdminMovieGateway
{
    private PDO $conn;
    public function __construct(Database $database)
    {
        $this->conn = $database->getConnection();
    }

    public function getAll(string $userId): array
    {
        $sql = "SELECT * FROM movies WHERE userId = :userId";
        $res = $this->conn->prepare($sql);
        $res->bindValue(":userId",$userId, PDO::PARAM_INT);

        $data = [];
        $res->execute();

        while ($row = $res->fetch(PDO::FETCH_ASSOC)) {
            $row["isFeatured"] = (bool) $row["isFeatured"];

            $castSql = "SELECT * FROM casts WHERE movieId = :movieId";
            $res = $this->conn->prepare($castSql);
            $res->bindValue(":movieId", $id, PDO::PARAM_INT);
            $res->execute();
            
            $row["casts"] = [];
            while ($castsRow = $res->fetch(PDO::FETCH_ASSOC)) {
                $row["casts"][] = $castsRow;
            }

            $photosSql = "SELECT * FROM photos WHERE movieId = :movieId";
            $res = $this->conn->prepare($photosSql);
            $res->bindValue(":movieId", $id, PDO::PARAM_INT);
            $res->execute();
            
            $row["photos"] = [];
            while ($castsRow = $res->fetch(PDO::FETCH_ASSOC)) {
                $row["photos"][] = $castsRow;
            }

            $videosSql = "SELECT * FROM videos WHERE movieId = :movieId";
            $res = $this->conn->prepare($videosSql);
            $res->bindValue(":movieId", $id, PDO::PARAM_INT);
            $res->execute();
            
            $data["videos"] = [];
            while ($videosRow = $res->fetch(PDO::FETCH_ASSOC)) {
                $data["videos"][] = $videosRow;
            }
            $data[] = $row;
        }

        return $data;
    }

    public function create(array $data): string
    {
        $sql = "INSERT INTO movies (userId, tmdbId, title, overview, popularity, releaseDate, voteAverage, backdropPath, posterPath, isFeatured) 
                VALUES (:userId, :tmdbId, :title, :overview, :popularity, :releaseDate, :voteAverage, :backdropPath, :posterPath, :isFeatured)";
        $res = $this->conn->prepare($sql);

        $res->bindValue(":userId",$data["userId"], PDO::PARAM_INT);
        $res->bindValue(":tmdbId",$data["tmdbId"], PDO::PARAM_INT);
        $res->bindValue(":title",$data["title"], PDO::PARAM_STR);
        $res->bindValue(":overview",$data["overview"], PDO::PARAM_STR);
        $res->bindValue(":popularity",$data["popularity"], PDO::PARAM_STR);
        $res->bindValue(":releaseDate",$data["releaseDate"], PDO::PARAM_STR);
        $res->bindValue(":voteAverage",$data["voteAverage"], PDO::PARAM_STR);
        $res->bindValue(":backdropPath",$data["backdropPath"], PDO::PARAM_STR);
        $res->bindValue(":posterPath",$data["posterPath"], PDO::PARAM_STR);
        $res->bindValue(":isFeatured",(bool) $data["isFeatured"] ?? false, PDO::PARAM_BOOL);

        $res->execute();
        return $this->conn->lastInsertId();
    }

    public function get(string $id, string $userId)
    {
        $sql = "SELECT * FROM movies WHERE id = :id AND userId = :userId";
        $res = $this->conn->prepare($sql);
        $res->bindValue(":id", $id, PDO::PARAM_INT);
        $res->bindValue(":userId", $userId, PDO::PARAM_INT);

        $res->execute();
        $data = $res->fetch(PDO::FETCH_ASSOC);

        if ($data !== false) {
            $data["isFeatured"] = (bool) $data["isFeatured"];
        }

        if($data) {

            $castSql = "SELECT * FROM casts WHERE movieId = :movieId";
            $res = $this->conn->prepare($castSql);
            $res->bindValue(":movieId", $id, PDO::PARAM_INT);
            $res->execute();
            
            $data["casts"] = [];
            while ($castsRow = $res->fetch(PDO::FETCH_ASSOC)) {
                $data["casts"][] = $castsRow;
            }

            $photosSql = "SELECT * FROM photos WHERE movieId = :movieId";
            $res = $this->conn->prepare($photosSql);
            $res->bindValue(":movieId", $id, PDO::PARAM_INT);
            $res->execute();
            
            $data["photos"] = [];
            while ($castsRow = $res->fetch(PDO::FETCH_ASSOC)) {
                $data["photos"][] = $castsRow;
            }

            $videosSql = "SELECT * FROM videos WHERE movieId = :movieId";
            $res = $this->conn->prepare($videosSql);
            $res->bindValue(":movieId", $id, PDO::PARAM_INT);
            $res->execute();
            
            $data["videos"] = [];
            while ($videosRow = $res->fetch(PDO::FETCH_ASSOC)) {
                $data["videos"][] = $videosRow;
            }
        }
        

        return $data;
    }

    public function update(array $current, array $new): int
    {
        $sql = "UPDATE movies SET tmdbId=:tmdbId, title=:title, overview=:overview, popularity=:popularity, releaseDate=:releaseDate, voteAverage=:voteAverage, backdropPath=:backdropPath, posterPath=:posterPath, isFeatured=:isFeatured WHERE id =:id AND userId = :userId";
        $res = $this->conn->prepare($sql);

        $res->bindValue(":userId",$current["userId"], PDO::PARAM_INT);
        $res->bindValue(":tmdbId",$new["tmdbId"] ?? $current["tmdbId"], PDO::PARAM_INT);
        $res->bindValue(":title",$new["title"] ?? $current["title"], PDO::PARAM_STR);
        $res->bindValue(":overview",$new["overview"] ?? $current["overview"], PDO::PARAM_STR);
        $res->bindValue(":popularity",$new["popularity"] ?? $current["popularity"], PDO::PARAM_STR);
        $res->bindValue(":releaseDate",$new["releaseDate"] ?? $current["releaseDate"], PDO::PARAM_STR);
        $res->bindValue(":voteAverage",$new["voteAverage"] ?? $current["voteAverage"], PDO::PARAM_STR);
        $res->bindValue(":backdropPath",$new["backdropPath"] ?? $current["backdropPath"], PDO::PARAM_STR);
        $res->bindValue(":posterPath",$new["posterPath"] ?? $current["posterPath"], PDO::PARAM_STR);
        $res->bindValue(":isFeatured",(bool) $new["isFeatured"] ?? (bool) $current["isFeatured"], PDO::PARAM_BOOL);
        $res->bindValue(":id", $current["id"], PDO::PARAM_INT);

        $res->execute();

        return $res->rowCount();
    }

    public function delete(string $id, string $userId): int
    {
        // $sql = "DELETE FROM movies WHERE id = :id AND userId = :userId";
        $sql = "DELETE FROM movies WHERE id = :id";
        $res = $this->conn->prepare($sql);
        $res->bindValue(":id", $id, PDO::PARAM_INT);
        // $res->bindValue(":userId", $userId, PDO::PARAM_INT);

        $res->execute();

        return $res->rowCount();
    }
}