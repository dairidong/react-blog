<?php

namespace App\Http\Controllers;

use App\Models\Article;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index()
    {
        $articles = Article::query()->latest()->take(3)->get();
        return Inertia::render('Home/Index', [
            'articles' => $articles
        ]);
    }
}
