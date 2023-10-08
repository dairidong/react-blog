<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\Password;

class EditUserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            'username' => [
                'required',
                'string',
                'between:5,30',
                Rule::unique('administrators', 'username')->ignore(auth()->user()->id)
            ],
            'name' => [
                'required',
                'string',
                'between:2,30',
                Rule::unique('administrators', 'name')->ignore(auth()->user()->id)
            ],
            'password' => [
                'nullable',
                'between:8,30',
                Password::min(8)->letters()->numbers(),
                'confirmed',
            ],
            'old_password' => [
                Rule::excludeIf($this->isNotFilled('password')),
                'required:password',
                'current_password:admin'
            ]
        ];
    }

    public function attributes()
    {
        return [
            'name' => '名称',
            'old_password' => '旧密码',
        ];
    }
}
