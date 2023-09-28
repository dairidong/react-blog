<?php

namespace App\Http\Controllers;

use App\Models\Article;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index()
    {
        $columns = ['id', 'slug', 'title', 'description', 'created_at', 'published_at', 'updated_at'];

        // 最新文章
        $latestArticles = Article::query()
            ->select(...$columns)
            ->latest()
            ->take(3)
            ->get();

        /**
         * 热门文章
         * 此处不直接使用 visits(Article::class)->top(3)
         * 原因：
         * 1.top 只取缓存数，使用 visits(Article::class)->topIds(3) 配合 orderByRaw 实现指定字段查询
         * 2.top 方法返回的 Collection 对象在传递到前端时，类型可能会错误地序列化为对象而非数组
         */
        $hottestArticleIds = visits(Article::class)->topIds(3);
        $hottestArticles = Article::query()
            ->select(...$columns)
            ->whereIn('id', $hottestArticleIds)
            ->orderByRaw("FIND_IN_SET(id, ?)", [implode(',', $hottestArticleIds)])
            ->get();

        return Inertia::render('Home/Index', [
            'latestArticles' => $latestArticles,
            'hottestArticles' => $hottestArticles,
        ]);
    }
}
