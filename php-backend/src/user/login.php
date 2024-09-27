<?php declare(strict_types=1);
include_once __DIR__."/../db.php";
include_once __DIR__."/../cors.php";

cors();

try {
    $body = json_decode(file_get_contents("php://input"), true);

    $slc = $pdo->prepare("select count(*) as anzahl from benutzer where benutzername = :user and passwort = :passw");
    $slc->bindValue('user', $body['benutzername']);
    $slc->bindValue('passw', $body['passwort']);
    $slc->execute();

    $res = $slc->fetch();

    if ($res['anzahl'] > 0) {
        echo json_encode(true);
    }
    else {
        echo json_encode(false);
    }
}
catch (Exception $e) {
    http_response_code(400);
    echo $e;
}


