<?php

namespace App\Http\Controllers;

use App\Models\Level;
use App\Models\Participant;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ParticipantController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $search   = request('search', '');
        $level_id = request('level', '');
        $level_id = $level_id === 'all' ? '' : $level_id;
        $participants = Participant::with('invoice.agency.level', 'certificate')
            ->where('name', 'like', "%$search%")

            // Batasi data jika role = user (misal role_id = 2)
            ->when(Auth::user()->role_id === 2, function ($q) {
                $q->whereHas('invoice', function ($q) {
                    $q->where('user_id', Auth::id());
                });
            })

            // Filter berdasarkan level (jika level dipilih)
            ->when($level_id, function ($q) use ($level_id) {
                $q->whereHas('invoice.agency.level', function ($q) use ($level_id) {
                    $q->where('levels.id', $level_id);
                });
            })

            ->paginate(10)
            ->withQueryString();

        $levels = Level::all();
        $certificateConfig = config('certificate');

        return Inertia::render('participants', compact('participants', 'levels', 'certificateConfig'));
    }


    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Participant $participant)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Participant $participant)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Participant $participant)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Participant $participant)
    {
        //
    }
}
