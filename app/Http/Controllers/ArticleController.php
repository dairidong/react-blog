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
            ->with('category:id,title')
            ->orderByDesc('published_at')
            ->simplePaginate(9);

        return Inertia::render('Articles/index', [
            'articles' => $articles
        ]);
    }
}
