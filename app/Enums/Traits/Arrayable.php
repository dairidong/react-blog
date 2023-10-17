<?php

namespace App\Enums\Traits;

trait Arrayable
{
    public static function toArray($reverse = false)
    {
        return $reverse
            ? array_column(static::cases(), 'name', 'value')
            : array_column(static::cases(), 'value', 'name');
    }
}
