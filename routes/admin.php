<?php

use App\Http\Controllers\Admin\Api\UploadImageController;
use App\Http\Controllers\Admin\ArticleController;
use App\Http\Controllers\Admin\ArticlePublishController;
use App\Http\Controllers\Admin\AuthenticationController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\MeController;
use App\Http\Controllers\Admin\TagController;
use Illuminate\Support\Facades\Route;

Route::middleware('guest:admin')->group(function () {
    Route::get('/login', [AuthenticationController::class, 'create'])->name('login');

    Route::post('/login', [AuthenticationController::class, 'store']);
});

Route::middleware('auth:admin')->group(function () {
    Route::get('/', [DashboardController::class, 'index'])->name('dashboard');

    Route::get('/me/edit', [MeController::class, 'edit'])->name('me.edit');
    Route::put('/me', [MeController::class, 'update'])->name('me.update');
    Route::delete('/logout', [AuthenticationController::class, 'destroy'])->name('logout');

    Route::resource('/articles', ArticleController::class);
    Route::post('/articles/{article}/publish', [ArticlePublishController::class, 'store'])
        ->name('articles.publish');
    Route::delete('/articles/{article}/publish', [ArticlePublishController::class, 'destroy'])
        ->name('articles.unpublish');

    Route::resource('/tags', TagController::class)->except(['create', 'edit']);

    Route::post('/images', [UploadImageController::class, 'store'])->name('images.store');
});
