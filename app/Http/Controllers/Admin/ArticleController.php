<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\CreateArticleRequest;
use App\Models\Article;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ArticleController extends Controller
{
    public function index(Request $request)
    {
        $articles = Article::query()
            ->select('id', 'title', 'description', 'published_at', 'created_at', 'updated_at')
            ->orderByDesc('id')
            ->paginate($request->input('pageSize', 10));

        return Inertia::render("Articles/Index/index", [
            "articles" => $articles,
        ]);
    }

    public function store(CreateArticleRequest $request)
    {
        $article = new Article($request->validated());

        $article->save();

        return to_route('admin.articles.index');
    }
}
