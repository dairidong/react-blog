<?php

namespace App\Helpers\Message;

enum MessageType: string
{
    case SUCCESS = 'success';
    case INFO = 'info';
    case  WARNING = 'warning';
    case ERROR = 'error';
    case LOADING = 'loading';
}
