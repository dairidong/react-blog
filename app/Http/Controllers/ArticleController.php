<?php

namespace App\Http\Controllers;

use App\Models\Article;
use Inertia\Inertia;

class ArticleController extends Controller
{
    public function index()
    {
        $articles = Article::query()
            ->select('id', 'title', 'description', 'slug', 'created_at', 'published_at', 'updated_at')
            ->with('tags:id,name')
            ->published()
            ->orderByDesc('published_at')
            ->simplePaginate(5);

        $articles->getCollection()
            ->each(fn(Article $article) => $article->append('visits_count'));

        return Inertia::render('Articles/Index', [
            'articles' => $articles,
        ]);
    }

    public function show(Article $article)
    {
        if (!$article->is_published) {
            abort(404, '文章不存在');
        }

        $article->visits()->increment();

        $article->append('visits_count');
        return Inertia::render('Articles/Show', [
            'article' => $article,
        ]);
    }
}
