<?php

namespace App\Http\Middleware\Admin;

use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'admin';

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return array_merge(parent::share($request), [
            'auth' => [
                'user' => $request->routeIs('admin.login') ? null : $request->user(),
            ],
            'flash' => [
                'message' => fn() => $request->session()->get('message')
            ]
            // 'ziggy' => function () use ($request) {
            //
            //     return array_merge((new Ziggy($group))->toArray(), [
            //         'location' => $request->url(),
            //     ]);
            // },
        ]);
    }
}
