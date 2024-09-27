<?php declare(strict_types=1);
use PHPUnit\Framework\TestCase;

final class IndexTest extends TestCase {
    public function testStandardAntwort(): void {
        $this->expectOutputString("Hallo");
        include __DIR__."/../src/index.php";
    }

    public function testDbNotReady(): void {
        $this->expectOutputString("DB nicht verbunden");
        $_GET['mode']='db';
        include __DIR__."/../src/index.php";
    }
}