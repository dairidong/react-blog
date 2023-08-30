<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Article extends Model
{
    use HasFactory;

    protected $casts = [
        'published_at' => 'date'
    ];

    protected $hidden = [

    ];

    protected static function booted()
    {
        static::saving(function (Article $article) {
            if (is_null($article->slug) || $article->isDirty('title')) {
                $article->slug = Str::slug($article->title, '-', 'zh');
            }
        });
    }

    protected function isPublished(): Attribute
    {
        return Attribute::make(
            get: fn($value, array $attributes): bool => !is_null($attributes['published_at'])
        );
    }

    public function scopePublished(Builder $query)
    {
        $query->whereNotNull('published_at');
    }

    public function resolveRouteBinding($value, $field = null)
    {
        return preg_match('/^\d+$/', $value)
            ? self::query()->where('id', $value)
                ->whereNotNull('published_at')
                ->first()
            : self::query()->where('slug', $value)
                ->whereNotNull('published_at')
                ->first();
    }
}
