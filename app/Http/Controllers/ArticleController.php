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
            ->select('id', 'title', 'description', 'slug', 'created_at', 'published_at', 'updated_at')
            ->published()
            ->orderByDesc('published_at')
            ->simplePaginate(9);

        return Inertia::render('Articles/index', [
            'articles' => $articles
        ]);
    }

    public function show(Article $article)
    {
        return Inertia::render('Articles/Show/index', [
            'article' => $article
        ]);
    }
}
