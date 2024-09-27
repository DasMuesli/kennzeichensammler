<?php declare(strict_types=1);
include_once __DIR__."/../db.php";
include_once __DIR__."/../cors.php";

cors();

try {
    $slc = $pdo->prepare("select * from gefundeneKennzeichen where benutzer = :user");
    $slc->bindValue("user", $_GET['user']);
    if (! $slc->execute()) {
        throw new Exception("SQL-Fehler");
    }

    $result = array_map(fn($row) => array(
        'kuerzel' => $row['kennzeichen'],
        'zeitpunktDesFindens' => $row['zeitpunktdesfindens']
    ), $slc->fetchAll());

    echo json_encode($result);
}
catch (Exception $e) {
    http_response_code(400);
    echo $e->__tostring();
}


