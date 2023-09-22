<?php

namespace App\Http\Controllers\Admin\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\UploadImageRequest;
use Carbon\Carbon;
use Illuminate\Support\Facades\Storage;

class UploadImageController extends Controller
{
    public function store(UploadImageRequest $request)
    {
        $saveDir = 'images/' . Carbon::now()->format('Y/m/d');
        $disk = 'public';

        $path = $request->file('image')
            ->store($saveDir, $disk);

        return response()->json([
            'url' => Storage::disk($disk)->url($path),
        ]);
    }
}
