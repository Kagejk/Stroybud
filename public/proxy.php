<?php
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: https://www.stroybud58.com');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['ok' => false, 'error' => 'Method not allowed']);
    exit;
}

$BOT_TOKEN = '8753558613:AAGOkUWvp6z0Edvp022Qr_cZJ1iyP3Fu7Hk';
$CHAT_ID   = '-1003328780057';

$input = json_decode(file_get_contents('php://input'), true);
if (!is_array($input)) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'error' => 'Invalid JSON']);
    exit;
}

// Honeypot — bots fill hidden fields, humans don't
if (!empty($input['website'])) {
    echo json_encode(['ok' => true]);
    exit;
}

$phone = preg_replace('/\D/', '', $input['phone'] ?? '');
if (!preg_match('/^380\d{9}$/', $phone)) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'error' => 'Invalid phone']);
    exit;
}

$name    = mb_substr(strip_tags($input['name']    ?? ''), 0, 100);
$service = mb_substr(strip_tags($input['service'] ?? ''), 0, 100);
$url     = mb_substr(strip_tags($input['url']     ?? ''), 0, 200);
$date    = (new DateTime('now', new DateTimeZone('Europe/Kiev')))->format('d.m.Y H:i');

$text = "Нова заявка з сайту!\n\nІм'я: $name\nТелефон: $phone\nПослуга: $service\n\n$url\n$date";

$ch = curl_init("https://api.telegram.org/bot{$BOT_TOKEN}/sendMessage");
curl_setopt_array($ch, [
    CURLOPT_POST           => true,
    CURLOPT_POSTFIELDS     => json_encode(['chat_id' => $CHAT_ID, 'text' => $text]),
    CURLOPT_HTTPHEADER     => ['Content-Type: application/json'],
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_TIMEOUT        => 10,
    CURLOPT_SSL_VERIFYPEER => true,
]);
$response = curl_exec($ch);
curl_close($ch);

echo $response ?: json_encode(['ok' => false, 'error' => 'curl_error']);
