<?php

namespace Tests\Feature;

use App\Models\Article;
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
        Article::factory()->count(10)->create([
            'published_at' => now(),
        ]);

        $response = $this->get('/articles');

        $response->assertStatus(200)
            ->assertInertia(function (Assert $page) {
                return $page->component('Articles/index')
                    ->has('articles.data', 9)
                    ->has('articles.next_page_url');
            });
    }


    /**
     * @test
     */
    public function show()
    {
        $article = Article::factory()->create(['published_at' => now()]);

        $response = $this->get("/articles/{$article->id}");

        $response->assertStatus(200)
            ->assertInertia(function (Assert $page) use ($article) {
                return $page->component('Articles/Show/index')
                    ->where('article.id', $article->id);
            });
    }
}
