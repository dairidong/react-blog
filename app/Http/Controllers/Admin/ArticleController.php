<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
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

        return Inertia::render("Articles/index", [
            "articles" => $articles,
        ]);
    }
}
