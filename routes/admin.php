<?php


use App\Http\Controllers\Admin\AuthenticationController;
use App\Http\Controllers\Admin\CategoryController;
use App\Http\Controllers\Admin\DashboardController;
use Illuminate\Support\Facades\Route;

Route::middleware('guest:admin')->group(function () {
    Route::get('/login', [AuthenticationController::class, 'create'])->name('login');

    Route::post('/login', [AuthenticationController::class, 'store']);
});

Route::middleware('auth:admin')->group(function () {
    Route::delete('/logout', [AuthenticationController::class, 'destroy'])->name('logout');

    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
});
