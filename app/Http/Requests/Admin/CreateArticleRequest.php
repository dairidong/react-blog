<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class CreateArticleRequest extends FormRequest
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
            'title' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string', 'max:300'],
            'content' => ['nullable', 'string'],
            'tags' => ['array'],
            'tags.*' => ['string', 'min:2', 'max:20']
        ];
    }

    public function attributes()
    {
        return [
            'title' => '文章标题',
            'description' => '文章描述',
            'content' => '文章内容',
            'tags' => '标签',
            'tags.*' => '标签名'
        ];
    }
}
