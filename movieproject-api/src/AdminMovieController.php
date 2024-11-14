<?php
class AdminMovieController
{
    public function __construct(private AdminMovieGateway $gateway, private Auth $auth)
    {

    }
    public function processRequest(string $method, ?string $id): void
    {

        if (isset($id)) {
            $this->processResourceRequest($method, $id);
        } else {
            $this->processCollectionRequest($method);

        }
    }


    private function processResourceRequest(string $method, string $id): void
    {
        $movie = $this->gateway->get($id, $this->auth->getUserID());
        if (!$movie) {
            http_response_code(404);
            echo json_encode(["message" => "Movie not found"]);
            return;
        }

        switch ($method) {
            case "GET":
                echo json_encode($movie);
                break;

            case "PATCH":
                $jsonData = 
                $data = (array) json_decode(file_get_contents("php://input"), true);
                $type = 'json';


                $errors = $this->getValidationErrors($data, false);

                if (!empty($errors)) {
                    http_response_code(422);
                    echo json_encode(["errors" => $errors]);
                    break;
                }

                $rows = $this->gateway->update($movie, $data);

                echo json_encode([
                    "message" => "Movie $id updated.",
                    "rows" => $rows
                ]);
                break;

            case "POST":
              
                $data =  $_POST;
                $type =  'form';


                $errors = $this->getValidationErrors($data, false);

                if (!empty($errors)) {
                    http_response_code(422);
                    echo json_encode(["errors" => $errors]);
                    break;
                }

                //file upload for backdrop
                if (!empty($_FILES['backdropPath']['name']) && $type == 'form') {
                    $backdrop_file = $_FILES['backdropPath']['name'];
                    $temp_path = $_FILES['backdropPath']['tmp_name'];
                    $file_size = $_FILES['backdropPath']['size'];
                    $temp = explode(".", $_FILES["backdropPath"]["name"]);
                    $new_backdrop_file = $temp[0].round(microtime(true)) . '.' . end($temp);

                    $upload_path = "uploads/";
                    $file_ext = strtolower(pathinfo($backdrop_file, PATHINFO_EXTENSION));

                    $valid_extensions = array("jpeg", "jpg", "png", "gif");
                    if (in_array($file_ext, $valid_extensions)) {
                        if (!file_exists($upload_path . $new_backdrop_file)) {
                            if ($file_size < 5000000 && empty($errors)) {
                                $data['backdropPath'] = $upload_path . $new_backdrop_file;
                                move_uploaded_file($temp_path, $upload_path . $new_backdrop_file);
                            } else {
                                $errors[] = "File size is too large, maximum file size is 5Mb";
                            }
                        } else {
                            $errors[] = "file already exists in upload folder";
                        }
                    } else {
                        $errors[] = "Invalid file format";
                    }
                } 
                
                //file upload for poster
                if (!empty($_FILES['posterPath']['name']) && $type == 'form') {
                    $backdrop_file = $_FILES['posterPath']['name'];
                    $temp_path = $_FILES['posterPath']['tmp_name'];
                    $file_size = $_FILES['posterPath']['size'];
                    $temp = explode(".", $_FILES["posterPath"]["name"]);
                    $new_poster_file = $temp[0].round(microtime(true)) . '.' . end($temp);

                    $upload_path = "uploads/";
                    $file_ext = strtolower(pathinfo($backdrop_file, PATHINFO_EXTENSION));

                    $valid_extensions = array("jpeg", "jpg", "png", "gif");
                    if (in_array($file_ext, $valid_extensions)) {
                        if (!file_exists($upload_path . $new_poster_file)) {
                            if ($file_size < 5000000 && empty($errors)) {
                                $data['posterPath'] = $upload_path . $new_poster_file;
                                move_uploaded_file($temp_path, $upload_path . $new_poster_file);
                            } else {
                                $errors[] = "File size is too large, maximum file size is 5Mb";
                            }
                        } else {
                            $errors[] = "file already exists in upload folder";
                        }
                    } else {
                        $errors[] = "Invalid file format";
                    }
                } 

                $rows = $this->gateway->update($movie, $data);

                echo json_encode([
                    "message" => "Movie $id updated.",
                    "rows" => $rows
                ]);
                break;

            case "DELETE":
                $rows = $this->gateway->delete($id, $this->auth->getUserID());
                echo json_encode([
                    "message" => "Movie $id deleted",
                    "rows" => $rows
                ]);
                break;

            default:
                http_response_code(405);
                header("Allow: GET, PATCH, POST, DELETE");

        }
    }

    private function processCollectionRequest(string $method): void
    {
        switch ($method) {
            case "GET":
                echo json_encode($this->gateway->getAll($this->auth->getUserID()));
                break;

            case "POST":
                $jsonData = (array) json_decode(file_get_contents("php://input"), true);
                $data = $jsonData ? $jsonData : $_POST;
                $type = $jsonData ? 'json' : 'form';
       
                $errors = $this->getValidationErrors($data, true, $type  );

                //file upload for backdrop
                if (!empty($_FILES['backdropPath']['name']) && $type == 'form') {
                    $backdrop_file = $_FILES['backdropPath']['name'];
                    $temp_path = $_FILES['backdropPath']['tmp_name'];
                    $file_size = $_FILES['backdropPath']['size'];
                    $temp = explode(".", $_FILES["backdropPath"]["name"]);
                    $new_backdrop_file = $temp[0].round(microtime(true)) . '.' . end($temp);

                    $upload_path = "uploads/";
                    $file_ext = strtolower(pathinfo($backdrop_file, PATHINFO_EXTENSION));

                    $valid_extensions = array("jpeg", "jpg", "png", "gif");
                    if (in_array($file_ext, $valid_extensions)) {
                        if (!file_exists($upload_path . $new_backdrop_file)) {
                            if ($file_size < 5000000 && empty($errors)) {
                                $data['backdropPath'] = $upload_path . $new_backdrop_file;
                                move_uploaded_file($temp_path, $upload_path . $new_backdrop_file);
                            } else {
                                $errors[] = "File size is too large, maximum file size is 5Mb";
                            }
                        } else {
                            $errors[] = "file already exists in upload folder";
                        }
                    } else {
                        $errors[] = "Invalid file format";
                    }
                } 
                else if (empty($backdrop_file) && $type == 'form') {
                    $errors[] = "Backdrop image is required";
                }
                
                //file upload for poster
                if (!empty($_FILES['posterPath']['name']) && $type == 'form') {
                    $backdrop_file = $_FILES['posterPath']['name'];
                    $temp_path = $_FILES['posterPath']['tmp_name'];
                    $file_size = $_FILES['posterPath']['size'];
                    $temp = explode(".", $_FILES["posterPath"]["name"]);
                    $new_poster_file = $temp[0].round(microtime(true)) . '.' . end($temp);

                    $upload_path = "uploads/";
                    $file_ext = strtolower(pathinfo($backdrop_file, PATHINFO_EXTENSION));

                    $valid_extensions = array("jpeg", "jpg", "png", "gif");
                    if (in_array($file_ext, $valid_extensions)) {
                        if (!file_exists($upload_path . $new_poster_file)) {
                            if ($file_size < 5000000 && empty($errors)) {
                                $data['posterPath'] = $upload_path . $new_poster_file;
                                move_uploaded_file($temp_path, $upload_path . $new_poster_file);
                            } else {
                                $errors[] = "File size is too large, maximum file size is 5Mb";
                            }
                        } else {
                            $errors[] = "file already exists in upload folder";
                        }
                    } else {
                        $errors[] = "Invalid file format";
                    }
                } 
                else if (empty($backdrop_file) && $type == 'form') {
                    $errors[] = "Poster image is required";
                }
                

                if (!empty($errors)) {
                    http_response_code(422);
                    echo json_encode(["errors" => $errors]);
                    break;
                }
                $data['userId'] = $this->auth->getUserID();
                $id = $this->gateway->create($data);

                http_response_code(201);
                echo json_encode([
                    "message" => "Movie created",
                    "id" => $id
                ]);
                break;

            default:
                http_response_code(405);
                header("Allow: GET, POST");
        }
    }

    private function getValidationErrors(array $data, bool $is_new = true, string $type = 'json'): array
    {
        $errors = [];
        if ($is_new && empty($data["title"])) {
            $errors[] = "Title is required.";
        }

        if ($is_new && empty($data["overview"])) {
            $errors[] = "Overview is required.";
        }

        if ($is_new && empty($data["releaseDate"])) {
            $errors[] = "Release date is required.";
        }

        if ($is_new && empty($data["backdropPath"]) && $type === 'json') {
            $errors[] = "Backdrop image is required.";
        }

        if ($is_new && empty($data["posterPath"]) && $type === 'json') {
            $errors[] = "Poster Image is required.";
        }

        return $errors;
    }
}