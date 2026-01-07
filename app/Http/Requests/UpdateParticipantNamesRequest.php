<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class UpdateParticipantNamesRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        $user = Auth::user();
        return $user->role_id === 2 && $user->step->last < 3;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'names' => ['required', 'array', 'min:1'],
            'names.*' => [
                'required',
                'string',
                'max:255',
                'distinct',
                'regex:/^[a-zA-Z\s\.\'\-]+$/u',
            ],
        ];
    }
}
