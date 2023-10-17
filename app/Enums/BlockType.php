<?php

namespace App\Enums;

use App\Enums\Traits\Arrayable;

enum BlockType: int
{
    use Arrayable;

    case UA = 0;
    case IP = 1;
}
