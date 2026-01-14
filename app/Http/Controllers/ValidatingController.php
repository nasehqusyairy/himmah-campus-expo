<?php

namespace App\Http\Controllers;

use App\Http\Requests\AcceptInvoiceRequest;
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
        $users = User::query()
            ->leftJoin('invoices', 'invoices.user_id', '=', 'users.id')
            ->leftJoin('steps', 'steps.user_id', '=', 'users.id')
            ->with('invoice.participants', 'step', 'invoice.agency.level')
            ->where('users.name', 'like', "%$search%")
            ->where('users.role_id', 2)
            ->orderByRaw("
                CASE
                    WHEN steps.last = 3 AND invoices.verified_at IS NULL THEN 0
                    WHEN steps.last < 3 AND invoices.verified_at IS NULL THEN 1
                    ELSE 2
                END
            ")
            ->orderBy('steps.last', 'desc')   // opsional: last lebih besar dulu
            ->orderBy('users.id')              // stabil untuk pagination
            ->select('users.*')
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('validating', compact('users'));
    }

    public function accept(AcceptInvoiceRequest $request)
    {
        $invoice = Invoice::findOrFail($request->invoice_id);

        $verified_at = now();

        $invoice->update([
            'verified_at' => $verified_at,
        ]);

        $invoice->participants->each(function ($participant) {
            $participant->update([
                'presence_token' => Str::random(20),
            ]);
        });

        return response()->json([
            'message' => 'Pendaftaran berhasil diterima',
            'data' => [
                'verified_at' => $verified_at
            ]
        ]);
    }

    public function reject(RejectInvoiceRequest $request)
    {
        $invoice = Invoice::findOrFail($request->invoice_id);

        $user = $invoice->user;

        $user->step()->update(['last' => 0]);

        return response()->json([
            'message' => 'Pendaftaran berhasil ditolak'
        ]);
    }

    public function deleteUser(Request $request)
    {
        $user = User::findOrFail($request->user_id);
        $user->delete();

        return response()->json([
            'message' => 'User dan data terkait berhasil dihapus'
        ]);
    }
}
