<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\TagRequest;
use App\Models\Tag;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TagController extends Controller
{
    public function index(Request $request)
    {
        $order = $request->input('order') ?: 'id';
        $orderDirection = $request->input('dir') ?: 'desc';

        $tags = Tag::query()->orderBy($order, $orderDirection)->get();

        return Inertia::render('Tags/Index', [
            'tags' => $tags,
        ]);
    }

    public function store(TagRequest $request)
    {
        $tag = new Tag($request->validated());

        $tag->save();

        return to_route('admin.tags.index');
    }

    public function update(Tag $tag, TagRequest $request)
    {
        $tag->update($request->validated());

        return redirect()->back();
    }

    public function destroy(Tag $tag)
    {
        $tag->delete();

        return redirect()->back();
    }
}
