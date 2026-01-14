<?php

namespace App\Services;

use App\Models\Agency;
use App\Models\Invoice;
use App\Models\Level;
use App\Models\User;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class RegistrationService
{
    public function index(): array
    {
        $user = Auth::user();

        if (empty($user->invoice)) {
            $user->invoice()->create();
            $user->step()->create();
        }

        /**
         * @var User $user
         */
        $user->load('invoice', 'step');

        $invoice = $user->invoice;
        $step = $user->step->last;

        $viewmodel = [
            'step' => $step,
            'levels' => Level::all(),
            'invoice' => $invoice->load('participants', 'agency'),
            'price' => config('invoice.default_price'),
            'account' => [
                'bank' => config('invoice.default_account_bank'),
                'number' => config('invoice.default_account_number'),
                'name' => config('invoice.default_account_name'),
            ]
        ];

        return $viewmodel;
    }

    public function setUserIdentity(array $data): Invoice
    {
        return DB::transaction(function () use ($data) {

            $user = Auth::user();
            $invoice = $user->invoice;
            $agencyId = $data['agency_id'];

            // Buat agency baru jika agency_id = 0
            if ($agencyId == 0) {
                $agency = Agency::create([
                    'name'     => $data['agency_name'],
                    'level_id' => $data['agency_level'],
                ]);

                // dd($invoice);

                $invoice->agency()->associate($agency);
            } else {
                $invoice->agency_id = $agencyId;
            }

            $user->step()->update(['last' => 1]);

            $invoice->wa =  $data['phone'];
            $invoice->save();
            return $invoice->load('agency');
        });
    }

    public function setParticipantNames(array $names)
    {
        $user = Auth::user();

        $invoice = $user->invoice;

        if (!$invoice) {
            return response()->json([
                'message' => 'Invoice tidak ditemukan',
            ], 404);
        }

        DB::transaction(function () use ($invoice, $names, $user) {

            // Hapus participant lama
            $invoice->participants()->delete();

            // Tambahkan participant baru
            if ($invoice->agency_id === 1) {
                $invoice->participants()->create([
                    'name' => $names[0]
                ]);
                $user->step()->update(['last' => 3]);
            } else {
                $invoice->participants()->createMany(
                    collect($names)->map(fn($name) => [
                        'name' => $name,
                    ])->toArray()
                );
                if ($user->step->last === 1) {
                    $user->step()->update(['last' => 2]);
                }
            }
        });
    }

    public function setPaymentFile(UploadedFile $file)
    {
        /** @var User $user */
        $user = Auth::user();

        DB::transaction(function () use ($user, $file) {

            // Hapus file lama jika ada
            if ($user->invoice->payment_file && Storage::disk('private')->exists($user->invoice->payment_file)) {
                Storage::disk('private')->delete($user->invoice->payment_file);
            }

            // Simpan file baru
            $path = $file->store('payments', 'private');

            // Update user
            $user->invoice()->update([
                'payment_file' => $path,
            ]);
        });
        return $user->load('invoice')->invoice;
    }
}
