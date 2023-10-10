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
        $appStats = [
            ['key' => 'phpVersion', 'label' => 'PHP 版本', 'value' => PHP_VERSION],
            ['key' => 'laravelVersion', 'label' => 'Laravel 版本', 'value' => Application::VERSION],
            [
                'key' => 'swooleVersion',
                'label' => 'Swoole 版本',
                'value' => function_exists('swoole_version') ? swoole_version() : '无'
            ],
            [
                'key' => 'octaneRunningTime',
                'label' => 'Octane 已运行',
                'value' => app()->bound(Server::class)
                    ? Carbon::createFromTimestamp(app(Server::class)->stats()['start_time'])
                    : '无'
            ],
            ['key' => 'system', 'label' => '系统', 'value' => php_uname()],
        ];
        return Inertia::render('Dashboard', [
            'appStats' => $appStats
        ]);
    }
}
