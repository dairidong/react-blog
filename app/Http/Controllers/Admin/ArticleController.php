<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\CreateArticleRequest;
use App\Http\Requests\Admin\EditArticleRequest;
use App\Models\Article;
use App\Models\Tag;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ArticleController extends Controller
{
    public function index(Request $request): Response
    {
        $articles = Article::query()
            ->select('id', 'title', 'description', 'published_at', 'created_at', 'updated_at')
            ->orderByDesc('id')
            ->paginate($request->input('pageSize', 10));

        return Inertia::render('Articles/Index', [
            'articles' => $articles,
        ]);
    }

    public function create()
    {
        $tags = Tag::query()->select("id", "name")->get();
        return Inertia::render('Articles/Create', [
            "tags" => $tags
        ]);
    }

    public function store(CreateArticleRequest $request): RedirectResponse
    {
        $article = new Article($request->validated());

        $article->save();

        return to_route('admin.articles.index');
    }

    public function edit(Article $article): Response
    {
        $tags = Tag::query()->select("id", "name")->get();
        $article->load("tags");
        return Inertia::render('Articles/Edit', [
            'article' => $article,
            'tags' => $tags,
        ]);
    }

    public function update(EditArticleRequest $request, Article $article): RedirectResponse
    {
        $article->update($request->validated());

        return to_route('admin.articles.index');
    }

    public function destroy(Article $article): RedirectResponse
    {
        $article->delete();

        return back();
    }
}
