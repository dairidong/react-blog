<?php

use App\Http\Controllers\Admin\Api\UploadImageController;
use App\Http\Controllers\Admin\ArticleController;
use App\Http\Controllers\Admin\AuthenticationController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\TagController;
use Illuminate\Support\Facades\Route;

Route::middleware('guest:admin')->group(function () {
    Route::get('/login', [AuthenticationController::class, 'create'])->name('login');

    Route::post('/login', [AuthenticationController::class, 'store']);
});

Route::middleware('auth:admin')->group(function () {
    Route::delete('/logout', [AuthenticationController::class, 'destroy'])->name('logout');

    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

    Route::resource('/articles', ArticleController::class);

    Route::resource('/tags', TagController::class)->except(['create', 'edit']);

    Route::post('/images', [UploadImageController::class, 'store'])->name('images.store');
});
