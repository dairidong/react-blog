<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title inertia>{{ config('app.name', 'Laravel') }}</title>

    <!-- Scripts -->
    @routes('admin')
    @viteReactRefresh
    @vite(['resources/js/admin/app.tsx', "resources/js/admin/pages/{$page['component']}.tsx"])
    @inertiaHead
</head>
<body>
@inertia
</body>
</html>
