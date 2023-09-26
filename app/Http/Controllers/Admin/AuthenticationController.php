<?php

namespace App\Http\Controllers\Admin;

use App\Helpers\Message\Message;
use App\Helpers\Message\MessageType;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\LoginRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class AuthenticationController extends Controller
{
    public function create()
    {
        return Inertia::render('Login/Index');
    }

    public function store(LoginRequest $request)
    {
        $request->authenticate();

        $request->session()->regenerate();

        return redirect()->intended(route('admin.dashboard'))->with([
            'message' => Message::create(MessageType::SUCCESS, '登录成功'),
        ]);
    }

    public function destroy(Request $request): RedirectResponse
    {
        Auth::logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return to_route('admin.login');
    }
}
