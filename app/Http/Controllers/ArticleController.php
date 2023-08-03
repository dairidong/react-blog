<?php

namespace App\Http\Controllers;

use App\Models\Article;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ArticleController extends Controller
{
    public function index()
    {
        $articles = Article::query()
            ->select('id', 'category_id', 'title', 'description', 'slug', 'created_at', 'published_at', 'updated_at')
            ->published()
            ->with('category:id,title')
            ->orderByDesc('published_at')
            ->simplePaginate(9);

        return Inertia::render('Articles/index', [
            'articles' => $articles
        ]);
    }

    public function show(Article $article)
    {
        $article->load('category:id,title');
        return Inertia::render('Articles/Show/index', [
            'article' => $article
        ]);
    }
}
