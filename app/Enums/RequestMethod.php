<?php

namespace App\Enums;

use App\Enums\Traits\Arrayable;

enum RequestMethod: string
{
    use Arrayable;

    case GET = 'GET';
    case POST = 'POST';
    case PUT = 'PUT';
    case DELETE = 'DELETE';
    case OPTIONS = 'OPTIONS';
    case PATCH = 'PATCH';
    case LINK = 'LINK';
    case UNLINK = 'UNLINK';
    case COPY = 'COPY';
    case HEAD = 'HEAD';
    case PURGE = 'PURGE';
}
