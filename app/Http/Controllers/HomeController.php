<?php

namespace App\Http\Controllers;

use App\Models\Article;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index()
    {
        $latestArticles = Article::query()->latest()->take(3)->get();
        $hottestArticles = visits(Article::class)->top(3);
        return Inertia::render('Home/Index', [
            'latestArticles' => $latestArticles,
            'hottestArticles' => $hottestArticles,
        ]);
    }
}
