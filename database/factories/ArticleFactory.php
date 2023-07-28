<?php

namespace Database\Factories;

use App\Models\Category;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Arr;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Article>
 */
class ArticleFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $categories = Category::query()->pluck('id');

        return [
            'title' => fake()->sentence(),
            'description' => fake()->paragraph(2),
            'content' => fake()->text(),

            'category_id' => $categories->random() ?: Category::factory(),
            'published_at' => Arr::random(([now(), null]))
        ];
    }
}
