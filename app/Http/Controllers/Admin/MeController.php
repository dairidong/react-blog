<?php

namespace App\Http\Controllers\Admin;

use App\Helpers\Message\Message;
use App\Helpers\Message\MessageType;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\EditUserRequest;
use App\Models\Administrator;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class MeController extends Controller
{
    public function edit()
    {
        $user = auth()->user();
        return Inertia::render('Me/Edit', [
            'user' => $user,
        ]);
    }

    public function update(EditUserRequest $request)
    {
        $updateColumns = $request->collect(['name', 'username']);
        if ($request->filled('password')) {
            $updateColumns->put('password', Hash::make($request->input('password')));
        }

        $user = $request->user();
        $user->update($updateColumns->toArray());

        if ($updateColumns->has('password')) {
            Auth::logout();

            $request->session()->invalidate();
            $request->session()->regenerateToken();

            return to_route('admin.login')->with([
                'message' => Message::create(MessageType::SUCCESS, '更新个人信息成功，需要重新登录'),
            ]);
        }


        return redirect()->back()->with([
            'message' => Message::create(MessageType::SUCCESS, '更新个人信息成功'),
        ]);
    }
}
