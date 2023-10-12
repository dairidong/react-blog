<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Carbon\Carbon;
use Illuminate\Foundation\Application;
use Inertia\Inertia;
use Swoole\Http\Server;

class DashboardController extends Controller
{
    public function index()
    {
        $appStats = collect([
            'phpVersion' => ['label' => 'PHP 版本', 'value' => PHP_VERSION],
            'laravelVersion' => ['label' => 'Laravel 版本', 'value' => Application::VERSION],
            'swooleVersion' => [
                'label' => 'Swoole 版本',
                'value' => function_exists('swoole_version') ? swoole_version() : '无'
            ],
            'octaneRunningTime' => app()->bound(Server::class)
                ? [
                    'label' => 'Octane 已运行',
                    'value' => Carbon::createFromTimestamp(app(Server::class)->stats()['start_time'])
                ]
                : null,
            'system' => ['label' => '系统', 'value' => php_uname()],
        ])->filter()
            ->map(fn($stat, $key) => ['key' => $key, ...$stat])
            ->values();

        return Inertia::render('Dashboard', [
            'appStats' => $appStats,
        ]);
    }
}
