<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;

class UpdateUserIdentityRequest extends FormRequest
{
    public function authorize(): bool
    {
        $user = Auth::user();
        return $user->role_id === 2 && $user->step->last < 3;
    }

    public function rules(): array
    {
        $userId = Auth::user()->id;

        return [
            'agency_id'    => 'required|integer',
            'agency_name'  => 'required_if:agency_id,0|string|max:255',
            'agency_level' => 'required_if:agency_id,0|integer',
            'phone' => [
                'required',
                'string',
                'min:10',
                'max:20',
                Rule::unique('invoices', 'wa')
                    ->where(fn($query) => $query->where('user_id', '!=', $userId)),
            ],
        ];
    }
}
