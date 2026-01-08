<?php

use App\Http\Controllers\AgencyController;
use App\Http\Controllers\ParticipantController;
use App\Http\Controllers\RegistrationController;
use App\Http\Controllers\ValidatingController;
use App\Http\Middleware\MemberOnly;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::prefix('agencies')->group(function () {
        Route::get('/', [AgencyController::class, 'index'])->name('agencies.index');
    });

    Route::prefix('participants')->group(function () {
        Route::get('/', [ParticipantController::class, 'index'])->name('participants.index');
    });

    Route::prefix('validating')->group(function () {
        Route::get('/', [ValidatingController::class, 'index'])->name('validating.index');
        Route::post('/accept', [ValidatingController::class, 'accept'])->name('validating.accept');
        Route::post('/reject', [ValidatingController::class, 'reject'])->name('validating.reject');
    });
    Route::middleware(MemberOnly::class)->prefix('registration')->group(function () {
        Route::get('/', [RegistrationController::class, 'index'])->name('registration.index');
        Route::post('/user-identity', [RegistrationController::class, 'userIdentity'])->name('registration.user-identity');
        Route::post('/participant-names', [RegistrationController::class, 'participantNames'])->name('registration.participant-names');
        Route::post('/pay', [RegistrationController::class, 'pay'])->name('registration.pay');
        Route::post('/confirm-pay', [RegistrationController::class, 'confirmPay'])->name('registration.confirm-pay');
    });

    Route::get('payment-file', function () {
        $path = request('path');
        if (empty($path)) {
            $user = Auth::user();

            abort_if(
                !$user->invoice || !$user->invoice->payment_file,
                404,
                'Not Found'
            );
            $path = $user->invoice->payment_file;
        }

        return Storage::disk('private')->response($path);
    })->name('payment-file');
});

require __DIR__ . '/settings.php';
