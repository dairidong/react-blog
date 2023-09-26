<?php

namespace App\Http\Controllers\Admin;

use App\Helpers\Message\Message;
use App\Helpers\Message\MessageType;
use App\Http\Controllers\Controller;
use App\Models\Article;
use Illuminate\Http\Request;

class ArticlePublishController extends Controller
{
    public function store(Article $article)
    {
        $update = $article->publish();

        return redirect()->back()->with([
            'message' => $update
                ? Message::create(MessageType::SUCCESS, '发布成功')
                : Message::create(MessageType::ERROR, '发布失败')
        ]);
    }

    public function destroy(Article $article)
    {
        $update = $article->unPublish();

        return redirect()->back()->with([
            'message' => $update
                ? Message::create(MessageType::SUCCESS, '取消发布成功')
                : Message::create(MessageType::ERROR, '取消发布失败')
        ]);
    }
}
