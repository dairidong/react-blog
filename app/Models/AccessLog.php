<?php

namespace App\Models;

use App\Enums\RequestMethod;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AccessLog extends Model
{
    use HasFactory;

    protected $guarded = [];

    public $timestamps = false;

    protected $casts = [
        'input' => 'json',
        'method' => RequestMethod::class,
        'requested_at' => 'datetime',
    ];
}
