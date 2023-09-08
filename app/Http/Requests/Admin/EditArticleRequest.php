<?php

namespace App\Http\Requests\Admin;


use Illuminate\Validation\Rule;

class EditArticleRequest extends CreateArticleRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        return array_merge(parent::rules(), [
            'slug' => [Rule::unique('articles')->ignoreModel($this->article)]
        ]);
    }
}
