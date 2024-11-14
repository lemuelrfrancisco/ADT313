<?php
class AdminCastsController
{
    public function __construct(private AdminCastsGateway $gateway, private Auth $auth)
    {

    }
    public function processRequest(string $method, ?string $id,): void
    {

        if (isset($id)) {
            $this->processResourceRequest($method, $id);
        } else {
            $this->processCollectionRequest($method);

        }
    }


    private function processResourceRequest(string $method, string $id): void
    {
        $cast = $this->gateway->get($id);
        if (!$cast) {
            http_response_code(404);
            echo json_encode(["message" => "Cast not found"]);
            return;
        }

        switch ($method) {
            case "GET":
                echo json_encode($cast);
                break;

            case "PATCH":
                $jsonData =  (array) json_decode(file_get_contents("php://input"), true);
                $data = (array) json_decode(file_get_contents("php://input"), true);
                $type = 'json';


                $errors = $this->getValidationErrors($data, false);

                if (!empty($errors)) {
                    http_response_code(422);
                    echo json_encode(["errors" => $errors]);
                    break;
                }

                $rows = $this->gateway->update($cast, $data);

                echo json_encode([
                    "message" => "Cast $id updated.",
                    "rows" => $rows
                ]);
                break;

            case "POST":
                $jsonData = (array) json_decode(file_get_contents("php://input"), true);
                $data = $jsonData ? $jsonData : $_POST;
                $type = $jsonData ? 'json' : 'form';


                $errors = $this->getValidationErrors($data, false);

                if (!empty($errors)) {
                    http_response_code(422);
                    echo json_encode(["errors" => $errors]);
                    break;
                }

                //file upload for cast image
                if (!empty($_FILES['image']['name']) && $type == 'form') {
                    $profile_path = $_FILES['image']['name'];
                    $temp_path = $_FILES['image']['tmp_name'];
                    $file_size = $_FILES['image']['size'];
                    $temp = explode(".", $_FILES["image"]["name"]);
                    $new_profile_path = $temp[0].round(microtime(true)) . '.' . end($temp);

                    $upload_path = "uploads/casts";
                    $file_ext = strtolower(pathinfo($profile_path, PATHINFO_EXTENSION));

                    $valid_extensions = array("jpeg", "jpg", "png", "gif");
                    if (in_array($file_ext, $valid_extensions)) {
                        if (!file_exists($upload_path . $new_profile_path)) {
                            if ($file_size < 5000000 && empty($errors)) {
                                $data['url'] = $upload_path . $new_profile_path;
                                move_uploaded_file($temp_path, $upload_path . $new_profile_path);
                            } else {
                                $errors[] = "File size is too large, maximum file size is 5Mb";
                            }
                        } else {
                            $errors[] = "File already exists in upload folder";
                        }
                    } else {
                        $errors[] = "Invalid file format";
                    }
                } 
                
                $rows = $this->gateway->update($cast, $data);

                echo json_encode([
                    "message" => "Cast $id updated.",
                    "rows" => $rows
                ]);
                break;

            case "DELETE":
                $rows = $this->gateway->delete($id, $this->auth->getUserID());
                echo json_encode([
                    "message" => "Cast $id deleted",
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
                echo json_encode($this->gateway->getAll());
                break;

            case "POST":
                $jsonData = (array) json_decode(file_get_contents("php://input"), true);
                $data = $jsonData ? $jsonData : $_POST;
                $type = $jsonData ? 'json' : 'form';
                $errors = $this->getValidationErrors($data, true, $type  );

                //file upload for cast image
                if (!empty($_FILES['profilePath']['name']) && $type == 'form') {
                    $profile_path = $_FILES['profilePath']['name'];
                    $temp_path = $_FILES['profilePath']['tmp_name'];
                    $file_size = $_FILES['profilePath']['size'];
                    $temp = explode(".", $_FILES["profilePath"]["name"]);
                    $new_profile_path = $temp[0].round(microtime(true)) . '.' . end($temp);

                    $upload_path = "uploads/casts";
                    $file_ext = strtolower(pathinfo($profile_path, PATHINFO_EXTENSION));

                    $valid_extensions = array("jpeg", "jpg", "png", "gif");
                    if (in_array($file_ext, $valid_extensions)) {
                        if (!file_exists($upload_path . $new_profile_path)) {
                            if ($file_size < 5000000 && empty($errors)) {
                                $data['url'] = $upload_path . $new_profile_path;
                                move_uploaded_file($temp_path, $upload_path . $new_profile_path);
                            } else {
                                $errors[] = "File size is too large, maximum file size is 5Mb";
                            }
                        } else {
                            $errors[] = "File already exists in upload folder";
                        }
                    } else {
                        $errors[] = "Invalid file format";
                    }
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
                    "message" => "Cast created",
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
        if ($is_new && empty($data["movieId"])) {
            $errors[] = "Movie ID is required.";
        }

        if ($is_new && empty($data["name"])) {
            $errors[] = "Name is required.";
        }

        if ($is_new && empty($data["url"])) {
            $errors[] = "Photo URL is required.";
        }

        if ($is_new && empty($data["characterName"]) && $type === 'json') {
            $errors[] = "Character Name image is required.";
        }

        return $errors;
    }
}