<?php


use App\Http\Controllers\Admin\ArticleController;
use App\Http\Controllers\Admin\AuthenticationController;
use App\Http\Controllers\Admin\DashboardController;
use Illuminate\Support\Facades\Route;

Route::middleware('guest:admin')->group(function () {
    Route::get('/login', [AuthenticationController::class, 'create'])->name('login');

    Route::post('/login', [AuthenticationController::class, 'store']);
});

Route::middleware('auth:admin')->group(function () {
    Route::delete('/logout', [AuthenticationController::class, 'destroy'])->name('logout');

    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

    Route::prefix('/articles')->name('articles.')->group(function () {
        Route::get('/', [ArticleController::class, 'index'])->name('index');
    });
});
