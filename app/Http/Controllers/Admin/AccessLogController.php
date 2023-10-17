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
        $logs = AccessLog::query()
            ->latest('requested_at')
            ->paginate($request->input('pageSize', 10));

        return Inertia::render('AccessLogs/Index', [
            'logs' => $logs
        ]);
    }
}
