<?php declare(strict_types=1);
include_once __DIR__."/../db.php";
include_once __DIR__."/../cors.php";

cors();

try {
    $slc = $pdo->query("select * from kennzeichen");

    if ($slc === false) {
        throw new Exception("SQL-Fehler");
    }

    echo json_encode($slc->fetchAll());
}
catch (Exception $e) {
    http_response_code(400);
    echo $e->__tostring();
}


