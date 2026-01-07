<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class UploadPaymentRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        $user = Auth::user();
        return $user->role_id === 2 && $user->step->last < 3;
    }

    public function rules(): array
    {
        return [
            'file' => [
                'required',
                'file',
                'image',
                'max:2048', // 2 MB (dalam KB)
            ],
        ];
    }
}
