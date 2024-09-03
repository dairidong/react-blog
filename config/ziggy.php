<?php

return [
    'groups' => [
        'frontend' => [
            'articles.*',
            'home',
        ],
        'admin' => ['admin.*'],
    ],
    'skip-route-function' => true
];
