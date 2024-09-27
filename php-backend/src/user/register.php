<?php declare(strict_types=1);
include_once __DIR__."/../db.php";
include_once __DIR__."/../cors.php";

cors();

try {
    $body = json_decode(file_get_contents("php://input"), true);

    $slc = $pdo->prepare("insert into benutzer (benutzername, passwort) values (:user, :passw)");
    $slc->bindValue('user', $body['benutzername']);
    $slc->bindValue('passw', $body['passwort']);
    $ret = $slc->execute();

    echo json_encode($ret);
}
catch (Exception $e) {
    http_response_code(400);
    echo $e->__tostring();
}