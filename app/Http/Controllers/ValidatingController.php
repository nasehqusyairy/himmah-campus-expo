<?php

namespace App\Http\Controllers;

use App\Http\Requests\RejectInvoiceRequest;
use App\Models\Invoice;
use App\Models\Participant;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Inertia\Inertia;

class ValidatingController extends Controller
{
    public function index()
    {
        $search = request('search', '');
        $users = User::with('invoice.participants', 'step', 'invoice.agency.level')
            ->where('name', 'like', "%$search%")->where('role_id', '=', 2)
            ->paginate(10)
            ->withQueryString();

        // dd($users);

        return Inertia::render('validating', compact('users'));
    }

    public function accept(Invoice $invoice)
    {
        sleep(2);
        // authorize
        $user = Auth::user();
        abort_if($user->role_id !== 1, 403, 'Akses ditolak.');

        $invoice->update([
            'verified_at' => now(),
        ]);

        $invoice->participants->each(function ($participant) {
            $participant->update([
                'presence_token' => Str::random(20),
            ]);
        });

        return response()->json([
            'message' => 'Pendaftaran diterima!'
        ]);
    }

    public function reject(RejectInvoiceRequest $request)
    {
        $invoice = Invoice::findOrFail($request->invoice_id);

        $user = $invoice->user;

        $user->step()->update(['last' => 0]);

        $user->notifs()->create([
            'title' => 'Pendaftaran ditolak!',
            'message' => $request->message,
            'action' => route('registration.index')
        ]);

        return response()->json([
            'message' => 'Pendaftaran ditolak!'
        ]);
    }
}
