<?php

    const HOST = 'localhost';
    const USER = 'root';
    const PASSWORD = '';
    const SCHEMA = 'papaJohns';

    if ($_SERVER['REQUEST_METHOD'] != 'GET') {
        sendErrorAndDie('Method is invalid');
    };

    $response = [];

    $mysqli = new mysqli(HOST, USER, PASSWORD, SCHEMA);
    if ($mysqli->connect_errno) {
        sendErrorAndDie('Something wrong with DB');
    }

    $result = $mysqli->query('SELECT year, franchises, restaurants FROM restaurants_count');

    $statistic = [];
    while ($row = $result->fetch_assoc()) {
        $statistic[] = $row;
    }

    $response = [
        'successful' => true,
        'body' => $statistic
    ];

    echo json_encode($response);
    die;

    function sendErrorAndDie($string) {
        $response = [
            'successful' => false,
            'message' => $string
        ];

        echo json_encode($response);
        die;
    }