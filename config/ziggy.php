<?php

return [
    'groups' => [
        'frontend' => [
            'articles.*',
            'home',
            'about',
        ],
        'admin' => ['admin.*'],
    ],
    'skip-route-function' => true
];
