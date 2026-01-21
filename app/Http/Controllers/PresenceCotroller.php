<?php

namespace App\Http\Controllers;

use App\Models\Participant;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PresenceCotroller extends Controller
{
    public function index()
    {
        return Inertia::render('presence');
    }

    public function confirm(string $token)
    {
        $participant = Participant::where('presence_token', $token)->firstOrFail();
        $participant->update(['present_at' => now()]);
        $participant = $participant->load('invoice.agency.level');

        if (request()->expectsJson()) {
            return response()->json([
                'data' => compact('participant')
            ]);
        } else {
            return Inertia::render('confirmating-presence', compact('participant'));
        }
    }

    public function undo(Participant $participant)
    {
        $participant->update(['present_at' => null]);
        return response()->json([
            'message' => 'Kehadiran dibatalkan'
        ]);
    }
}
