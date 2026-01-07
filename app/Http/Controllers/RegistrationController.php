<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpdateParticipantNamesRequest;
use App\Http\Requests\UpdateUserIdentityRequest;
use App\Http\Requests\UploadPaymentRequest;
use App\Models\Level;
use App\Services\RegistrationService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class RegistrationController extends Controller
{
    public function __construct(
        private RegistrationService $service
    ) {}

    public function index()
    {
        $viewmodel = $this->service->index();
        return Inertia::render('registration', $viewmodel);
    }

    public function userIdentity(UpdateUserIdentityRequest $request)
    {
        return response()->json([
            'message' => 'User identity updated successfully.',
            'data' => [
                'invoice' => $this->service->setUserIdentity($request->validated())
            ]
        ]);
    }

    public function participantNames(UpdateParticipantNamesRequest $request)
    {
        $this->service->setParticipantNames($request->validated()['names']);
        return response()->json([
            'message' => 'Participant berhasil diperbarui',
        ]);
    }

    public function pay(UploadPaymentRequest $request)
    {
        return response()->json([
            'message' => 'Bukti pembayaran berhasil diunggah.',
            'data' => [
                'invoice' => $this->service->setPaymentFile($request->file('file'))
            ]
        ]);
    }

    public function confirmPay()
    {
        $user = Auth::user();
        abort_if(
            !$user->invoice || !$user->invoice->payment_file,
            400,
            'Payment file not uploaded.'
        );

        $user->step()->update(['last' => 3]);
    }
}
