<?php

namespace App\Helpers\Message;

use Illuminate\Contracts\Support\Arrayable;

class Message implements Arrayable
{
    public function __construct(
        protected MessageType $type,
        protected string      $text = ''
    )
    {

    }

    public static function create(MessageType $type, string $text)
    {
        return new static($type, $text);
    }

    public function toArray()
    {
        return [
            'type' => $this->type->value,
            'text' => $this->text
        ];
    }
}