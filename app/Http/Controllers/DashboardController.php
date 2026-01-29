<?php

namespace App\Http\Controllers;

// use App\Models\Views\ViewAlumni;
use App\Models\Views\ViewParticipantsPresent;
use App\Models\Views\ViewParticipantsAbsent;
use App\Models\Views\ViewAlumniDelegation;
use App\Models\Views\ViewCollage;
use App\Models\Views\ViewNeedValidation;
use App\Models\Views\ViewOtherAgency;
use App\Models\Views\ViewSma;
use App\Models\Views\ViewSmaDelegation;
use App\Models\Views\ViewSmp;
use App\Models\Views\ViewSmpDelegation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $summary = Auth::user()->role_id === 1 ? [
            // [
            //     'label' => 'Alumni',
            //     'total' => ViewAlumni::count('*'),
            // ],
            [
                'label' => 'Hadir',
                'total' => ViewParticipantsPresent::count('*'),
            ],
            [
                'label' => 'Belum Hadir',
                'total' => ViewParticipantsAbsent::count('*'),
            ],
            [
                'label' => 'Delegasi Alumni',
                'total' => ViewAlumniDelegation::count('*'),
            ],
            [
                'label' => 'Peserta SMP',
                'total' => ViewSmp::count('*'),
            ],
            [
                'label' => 'Delegasi SMP',
                'total' => ViewSmpDelegation::count('*'),
            ],
            [
                'label' => 'Peserta SMA',
                'total' => ViewSma::count('*'),
            ],
            [
                'label' => 'Delegasi SMA',
                'total' => ViewSmaDelegation::count('*'),
            ],
            [
                'label' => 'Perguruan Tinggi',
                'total' => ViewCollage::count('*'),
            ],
            [
                'label' => 'Peserta Luar',
                'total' => ViewOtherAgency::count('*'),
            ],
            [
                'label' => 'Perlu Validasi',
                'total' => ViewNeedValidation::count('*'),
            ],
        ] : [];
        return Inertia::render('dashboard', compact('summary'));
    }
}
