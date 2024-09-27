<?php declare(strict_types=1);

$host = 'db';
$user = 'postgres';
$pass = 'db-passwort1234';
$db = 'example';

$pdo;
try {
    $pdo = new PDO("pgsql:host=$host;dbname=$db", $user, $pass, );
}
catch( PDOException $e ) {
    $pdo = null;
}