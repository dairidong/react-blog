<?php

namespace Tests\Feature;

use App\Models\Category;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class CategoryTest extends TestCase
{
    use RefreshDatabase;

    /**
     * @test
     */
    public function categories_menu(): void
    {
        $categories = Category::factory()->count(2)->create();

        $response = $this->getJson(route('categories.index'));

        $response->assertStatus(200);

        $json = $response->json();

        $this->assertArrayHasKey('data', $json);
        $this->assertCount(2, $json['data']);

        foreach ($json['data'] as $key => $item) {
            $this->assertSame($categories[$key]['id'], $item['id']);
            $this->assertSame($categories[$key]['title'], $item['title']);
        }
    }
}
