
<?php

include 'phpQuery/phpQuery/phpQuery.php';

$url = "http://tk-konstruktor.ru/articles/dizayn-vannoy-komnaty/";
$page = sendRequest($url);

$phpQ = phpQuery::newDocument($page);
$article = $phpQ->find('.article');

echo $article;

function sendRequest($url) {

    $config = [
        CURLOPT_URL => $url,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_FOLLOWLOCATION => true,
        CURLOPT_HEADER => false,
        CURLOPT_AUTOREFERER => true,
    ];

    $curl = curl_init();
    curl_setopt_array($curl, $config);

    $response = curl_exec($curl);
    curl_close($curl);

    return $response;
}

?>

</body>