<?php
class UserController
{
    public function __construct(private UserGateway $gateway) {}

    public function processRequest(string $method, string $action): void
    {
        if ($method === 'POST') {
            switch ($action) {
                case "login":
                    $this->processLoginRequest();
                    break;

                case "register":
                    $this->processRegistrationRequest();
                    break;
            }
        } elseif ($method === 'PATCH') {
            switch ($action) {
                case "resetpass":
                    $this->processResetPasswordRequest();
                    break;
            }
        } else {
            http_response_code(405);
            header("Allow: POST, PATCH");
        }
    }

    private function processLoginRequest(): void
    {

        $data = (array) json_decode(file_get_contents("php://input"), true);
        $errors = $this->getLogInValidationErrors(($data));

        if (!empty($errors)) {
            http_response_code(422);
            echo json_encode(["errors" => $errors]);
        }

        $user = $this->gateway->login($data['email'], $data['password']);

        if (!$user) {
            http_response_code(401);
            echo json_encode(["message" => "Incorrect email/password"]);
            return;
        }

        echo json_encode($user);
    }

    private function processRegistrationRequest(): void
    {

        $data = (array) json_decode(file_get_contents("php://input"), true);
        $errors = $this->getRegistrationValidationErrors(($data));

        if (!empty($errors)) {
            http_response_code(422);
            echo json_encode(["errors" => $errors]);
        } else {
            $id = $this->gateway->register($data);
            http_response_code(201);
            echo json_encode([
                "message" => "Account Created Successful",
                "id" => $id
            ]);
        }
    }

    private function processResetPasswordRequest(): void
    {
        $data = (array) json_decode(file_get_contents("php://input"), true);
        $errors = $this->getResetPassValidationErrors(($data));

        if (!empty($errors)) {
            http_response_code(422);
            echo json_encode(["errors" => $errors]);
        }

        $affectedRows = $this->gateway->changePassword(
            [],
            ["password" => $data["password"]],
            $data["email"]
        );

        if ($affectedRows > 0) {
            http_response_code(200);
            echo json_encode(["message" => "Password updated successfully"]);
        } else {
            http_response_code(404);
            echo json_encode(["message" => "Email not found or password update failed"]);
        }
    }

    private function getLogInValidationErrors(array $data): array
    {
        $errors = [];
        if (empty($data["email"])) {
            $errors[] = "Email is required";
        }

        if (empty($data["password"])) {
            $errors[] = "Password is required";
        }

        return $errors;
    }

    private function getRegistrationValidationErrors(array $data): array
    {
        $errors = [];
        if (empty($data["email"])) {
            $errors[] = "Email is required";
        }

        if (!filter_var($data["email"], FILTER_VALIDATE_EMAIL)) {
            $errors[] = "Invalid email format";
        }

        if (empty($data["password"])) {
            $errors[] = "Password is required";
        }

        if (empty($data["firstName"])) {
            $errors[] = "First name is required";
        }

        if (empty($data["lastName"])) {
            $errors[] = "Last name is required";
        }

        return $errors;
    }

    private function getResetPassValidationErrors(array $data): array
    {
        $errors = [];
        if (empty($data["email"])) {
            $errors[] = "Email is required";
        }

        if (empty($data["password"])) {
            $errors[] = "New Password is required";
        }

        return $errors;
    }
}
