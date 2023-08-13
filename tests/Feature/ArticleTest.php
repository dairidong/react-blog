<?php

namespace Tests\Feature;

use App\Models\Article;
use App\Models\Category;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use Inertia\Testing\AssertableInertia as Assert;

class ArticleTest extends TestCase
{
    use RefreshDatabase;

    /**
     * @test
     */
    public function index(): void
    {
        Category::factory()->count(3)->create();

        Article::factory()->count(10)->create([
            'published_at' => now(),
        ]);

        $response = $this->get('/articles')->assertInertia(function (Assert $page) {
            return $page->component('Articles/index')
                ->has('articles.data', 9)
                ->has('articles.next_page_url');
        });

        $response->assertStatus(200);
    }


    /**
     * @test
     */
    public function show()
    {
        $article = Article::factory()->create(['published_at' => now()]);

        $response = $this->get("/articles/{$article->id}")->assertInertia(function (Assert $page) use ($article) {
            return $page->component('Articles/Show/index')
                ->where('article.id', $article->id);
        });
    }
}
