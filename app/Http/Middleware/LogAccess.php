<?php

namespace App\Http\Middleware;

use App\Models\AccessLog;
use Closure;
use Illuminate\Contracts\Http\Kernel;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class LogAccess
{
    public function __construct(protected Kernel $kernel)
    {
    }

    public function handle(Request $request,Closure $next)
    {
        return $next($request);
    }

    public function terminate(Request $request, Response $response)
    {
        $log = new AccessLog([
            'path' => $request->getRequestUri(),
            'method' => $request->method(),
            'response_code' => $response->getStatusCode(),
            'input' => $request->post(),
            'user_agent' => $request->userAgent() ?? '',
            'ip' => $request->ip(),
            'requested_at' => method_exists($this->kernel, 'requestStartedAt')
                ? $this->kernel->requestStartedAt()
                : now()
        ]);
        $log->save();
    }
}
