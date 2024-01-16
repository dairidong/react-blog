<?php

namespace App\Providers;

use App\Inertia\HttpGateway;
use Illuminate\Support\ServiceProvider;
use Inertia\Ssr\Gateway;

class AppServiceProvider extends ServiceProvider
{
    public array $bindings = [
        Gateway::class => HttpGateway::class,
    ];

    /**
     * Register any application services.
     */
    public function register(): void
    {
        // only register if not in testing environment
        if ($this->app->environment('local')) {
            $this->app->register(\Laravel\Telescope\TelescopeServiceProvider::class);
            $this->app->register(TelescopeServiceProvider::class);
        }
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}
