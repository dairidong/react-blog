<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="description" content="">
        <meta name="baidu-site-verification" content="{{ config('seo.spiders.baidu') }}" />
        <meta name="google-site-verification" content="{{ config('seo.spiders.google') }}" />
        <link rel="stylesheet" href="https://fonts.font.im/css?family=Press+Start+2P">
        <link rel="stylesheet" href="https://static.zeoseven.com/cn/297/main/result.css" />
        <link rel="stylesheet" href="https://static.zeoseven.com/cn/69/main/result.css">

        {{--        <title inertia>{{ config('app.name', 'Laravel') }}</title>--}}

        <!-- Scripts -->
        @routes('frontend')
        @viteReactRefresh
        @vite(['resources/js/frontend/app.tsx', "resources/js/frontend/pages/{$page['component']}.tsx"])
        @inertiaHead
    </head>
    <body>
        @inertia
    </body>
</html>
