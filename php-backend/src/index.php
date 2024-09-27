<?php declare(strict_types=1);
include_once __DIR__."/db.php";

if (isset($_GET['mode'])) {
    switch ($_GET['mode']) {
        case 'db': echo isset($pdo) ? "DB verbunden" : "DB nicht verbunden"; break;
        default: echo "Hallo";
    }
}
else {
    echo "Hallo";
}