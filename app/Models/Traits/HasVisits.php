<?php

namespace App\Models\Traits;

trait HasVisits
{
    public function visits()
    {
        return visits($this);
    }
}