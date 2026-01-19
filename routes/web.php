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
use App\Http\Controllers\Auth\GoogleController;
use App\Http\Middleware\AdminOnly;
use App\Models\Views\ViewAlumniDelegation;
use App\Models\Views\ViewAlumni;
use App\Models\Views\ViewCollage;
use App\Models\Views\ViewNeedValidation;
use App\Models\Views\ViewOtherAgency;
use App\Models\Views\ViewSma;
use App\Models\Views\ViewSmaDelegation;
use App\Models\Views\ViewSmp;
use App\Models\Views\ViewSmpDelegation;

Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

Route::get('/auth/google', [GoogleController::class, 'redirect'])
    ->name('auth.google.redirect');

Route::get('/auth/google/callback', [GoogleController::class, 'callback'])
    ->name('auth.google.callback');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        $summary = Auth::user()->role_id === 1 ? [
            [
                'label' => 'Alumni',
                'total' => ViewAlumni::count(),
            ],
            [
                'label' => 'Delegasi Alumni',
                'total' => ViewAlumniDelegation::count(),
            ],
            [
                'label' => 'Peserta SMP',
                'total' => ViewSmp::count(),
            ],
            [
                'label' => 'Delegasi SMP',
                'total' => ViewSmpDelegation::count(),
            ],
            [
                'label' => 'Peserta SMA',
                'total' => ViewSma::count(),
            ],
            [
                'label' => 'Delegasi SMA',
                'total' => ViewSmaDelegation::count(),
            ],
            [
                'label' => 'Perguruan Tinggi',
                'total' => ViewCollage::count(),
            ],
            [
                'label' => 'Peserta Luar',
                'total' => ViewOtherAgency::count(),
            ],
            [
                'label' => 'Perlu Validasi',
                'total' => ViewNeedValidation::count(),
            ],
        ] : [];
        return Inertia::render('dashboard', compact('summary'));
    })->name('dashboard');

    Route::prefix('agencies')->group(function () {
        Route::get('/', [AgencyController::class, 'index'])->name('agencies.index');
    });

    Route::prefix('participants')->group(function () {
        Route::get('/', [ParticipantController::class, 'index'])->name('participants.index');
    });

    Route::middleware(AdminOnly::class)->prefix('presence')->group(function () {
        Route::get('/', function () {
            return Inertia::render('presence');
        })->name('presence.index');
    });
    Route::middleware(AdminOnly::class)->prefix('validating')->group(function () {
        Route::get('/', [ValidatingController::class, 'index'])->name('validating.index');
        Route::post('/accept', [ValidatingController::class, 'accept'])->name('validating.accept');
        Route::post('/reject', [ValidatingController::class, 'reject'])->name('validating.reject');
        Route::delete('/delete-user', [ValidatingController::class, 'deleteUser'])->name('validating.delete-user');
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
