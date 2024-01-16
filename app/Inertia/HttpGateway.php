<?php

namespace App\Inertia;

use Illuminate\Support\Str;
use Inertia\Ssr\Response;
use Inertia\Ssr\HttpGateway as BaseHttpGateway;

class HttpGateway extends BaseHttpGateway
{
    /**
     * Dispatch the Inertia page to the Server Side Rendering engine.
     *
     * @param array $page
     * @return Response|null
     */
    public function dispatch(array $page): ?Response
    {
        if (isset($page['url']) && Str::is('/admin*', $page['url'])) {
            return null;
        }

        return parent::dispatch($page);
    }
}