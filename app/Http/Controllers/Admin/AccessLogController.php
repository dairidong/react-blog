<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\AccessLog;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AccessLogController extends Controller
{
    public function index(Request $request)
    {
        $query = AccessLog::query()
            ->latest('requested_at');

        $ip = $request->input('ip');
        if ($ip) {
            $query->where('ip', 'like', "%{$ip}%");
        }

        $userAgent = $request->input('ua');
        if ($userAgent) {
            $query->where('user_agent', 'like', "%{$userAgent}%");
        }

        $logs = $query->paginate($request->input('pageSize', 10));

        return Inertia::render('AccessLogs/Index', [
            'logs' => $logs->appends($request->query()),
            'search' => [
                'ip' => $ip,
                'ua' => $userAgent
            ]
        ]);
    }
}
