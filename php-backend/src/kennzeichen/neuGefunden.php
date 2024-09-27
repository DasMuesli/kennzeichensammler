<?php declare(strict_types=1);
include_once __DIR__."/../db.php";
include_once __DIR__."/../cors.php";

cors();

try {
    $slc = $pdo->prepare("insert into gefundeneKennzeichen (kennzeichen, benutzer, zeitpunktDesFindens) values (:kennz, :user, :date)");
    $slc->bindValue('kennz', $_GET['kennzeichen']);
    $slc->bindValue('user', $_GET['user']);
    $slc->bindValue('date', (new DateTime("now"))->format("Y-m-d H:i:s"));
    $ret = $slc->execute();

    echo json_encode($ret);
}
catch (Exception $e) {
    http_response_code(400);
    echo $e->__tostring();
}