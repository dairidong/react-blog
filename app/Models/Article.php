<?php

namespace App\Models;

use App\Models\Traits\HasTags;
use App\Models\Traits\HasVisits;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Article extends Model
{
    use HasFactory, HasTags, HasVisits;

    protected $casts = [
        'published_at' => 'date',
    ];

    protected $hidden = [
        'deleted_at'
    ];

    protected $fillable = [
        'title',
        'slug',
        'description',
        'content',
        'tags',
        'published_at'
    ];

    protected static function booted()
    {
        static::saving(function (Article $article) {
            if (is_null($article->slug) || $article->isDirty('title')) {
                $slug = $slugBody = Str::slug($article->title, '-', 'zh');
                while (Article::query()->where('slug', $slug)->exists()) {
                    $slug = $slugBody . '-' . Str::random(6);
                }
                $article->slug = $slug;
            }
        });
    }

    protected function isPublished(): Attribute
    {
        return Attribute::make(
            get: fn($value, array $attributes): bool => !is_null($attributes['published_at'])
        );
    }

    protected function visitsCount(): Attribute
    {
        return Attribute::make(
            get: fn() => $this->visits()->count()
        );
    }

    public function scopePublished(Builder $query)
    {
        $query->whereNotNull('published_at');
    }

    public function publish(): bool
    {
        return $this->update(['published_at' => now()]);
    }

    public function unPublish(): bool
    {
        return $this->update(['published_at' => null]);
    }

    public function resolveRouteBinding($value, $field = null)
    {
        return preg_match('/^\d+$/', $value)
            ? self::query()->where('id', $value)
                ->first()
            : self::query()->where('slug', $value)
                ->first();
    }
}
