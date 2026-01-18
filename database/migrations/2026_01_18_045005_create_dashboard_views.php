<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        // 1. Jumlah peserta alumni
        DB::statement("
             CREATE VIEW view_alumni AS
            SELECT users.id AS user_id, users.name AS user_name, participants.name AS participant_name
            FROM participants
            LEFT JOIN invoices ON participants.invoice_id = invoices.id
            LEFT JOIN agencies ON invoices.agency_id = agencies.id
            LEFT JOIN users ON invoices.user_id = users.id
            WHERE agencies.id=1
              AND users.deleted_at IS NULL
        ");

        // 2. Delegasi Alumni
        DB::statement("
            CREATE VIEW view_alumni_delegation AS
            SELECT users.id AS user_id, users.name AS user_name, participants.name AS participant_name
            FROM participants
            LEFT JOIN invoices ON participants.invoice_id = invoices.id
            LEFT JOIN agencies ON invoices.agency_id = agencies.id
            LEFT JOIN users ON invoices.user_id = users.id
            LEFT JOIN levels ON agencies.level_id = levels.id
            WHERE levels.name = 'Delegasi Alumni'
              AND users.deleted_at IS NULL
        ");

        // 3. Delegasi SMP
        DB::statement("
            CREATE VIEW view_smp_delegation AS
            SELECT users.id AS user_id, users.name AS user_name, participants.name AS participant_name
            FROM participants
            LEFT JOIN invoices ON participants.invoice_id = invoices.id
            LEFT JOIN agencies ON invoices.agency_id = agencies.id
            LEFT JOIN users ON invoices.user_id = users.id
            LEFT JOIN levels ON agencies.level_id = levels.id
            WHERE levels.name = 'Delegasi SMP/Sederajat'
              AND users.deleted_at IS NULL
        ");

        // 4. Delegasi SMA
        DB::statement("
            CREATE VIEW view_sma_delegation AS
            SELECT users.id AS user_id, users.name AS user_name, participants.name AS participant_name
            FROM participants
            LEFT JOIN invoices ON participants.invoice_id = invoices.id
            LEFT JOIN agencies ON invoices.agency_id = agencies.id
            LEFT JOIN users ON invoices.user_id = users.id
            LEFT JOIN levels ON agencies.level_id = levels.id
            WHERE levels.name = 'Delegasi SMA/Sederajat'
              AND users.deleted_at IS NULL
        ");

        // 5. Peserta SMP
        DB::statement("
            CREATE VIEW view_smp AS
            SELECT users.id AS user_id, users.name AS user_name, participants.name AS participant_name
            FROM participants
            LEFT JOIN invoices ON participants.invoice_id = invoices.id
            LEFT JOIN agencies ON invoices.agency_id = agencies.id
            LEFT JOIN users ON invoices.user_id = users.id
            WHERE agencies.level_id = 1
              AND users.deleted_at IS NULL
        ");

        // 6. Peserta SMA
        DB::statement("
            CREATE VIEW view_sma AS
            SELECT users.id AS user_id, users.name AS user_name, participants.name AS participant_name
            FROM participants
            LEFT JOIN invoices ON participants.invoice_id = invoices.id
            LEFT JOIN agencies ON invoices.agency_id = agencies.id
            LEFT JOIN users ON invoices.user_id = users.id
            WHERE agencies.level_id = 2
              AND users.deleted_at IS NULL
        ");

        // 7. Perguruan Tinggi
        DB::statement("
            CREATE VIEW view_collage AS
            SELECT users.id AS user_id, users.name AS user_name, participants.name AS participant_name
            FROM participants
            LEFT JOIN invoices ON participants.invoice_id = invoices.id
            LEFT JOIN agencies ON invoices.agency_id = agencies.id
            LEFT JOIN users ON invoices.user_id = users.id
            WHERE agencies.level_id = 3
              AND users.deleted_at IS NULL
        ");

        // 8. Peserta luar
        DB::statement("
            CREATE VIEW view_other_agency AS
            SELECT users.id AS user_id, users.name AS user_name, participants.name AS participant_name
            FROM participants
            LEFT JOIN invoices ON participants.invoice_id = invoices.id
            LEFT JOIN users ON invoices.user_id = users.id
            WHERE invoices.agency_id NOT IN (1, 37, 38)
              AND users.deleted_at IS NULL
        ");

        // 9. Pendaftaran perlu validasi
        DB::statement("
            CREATE VIEW view_need_validation AS
            SELECT users.id AS user_id, users.name AS user_name, participants.name AS participant_name
            FROM participants
            LEFT JOIN invoices ON participants.invoice_id = invoices.id
            LEFT JOIN users ON invoices.user_id = users.id
            LEFT JOIN steps ON steps.user_id = users.id
            WHERE steps.last = 3
              AND invoices.verified_at IS NULL
        ");
    }

    public function down(): void
    {
        DB::statement("DROP VIEW IF EXISTS view_alumni");
        DB::statement("DROP VIEW IF EXISTS view_alumni_delegation");
        DB::statement("DROP VIEW IF EXISTS view_smp_delegation");
        DB::statement("DROP VIEW IF EXISTS view_sma_delegation");
        DB::statement("DROP VIEW IF EXISTS view_smp");
        DB::statement("DROP VIEW IF EXISTS view_sma");
        DB::statement("DROP VIEW IF EXISTS view_collage");
        DB::statement("DROP VIEW IF EXISTS view_other_agency");
        DB::statement("DROP VIEW IF EXISTS view_need_validation");
    }
};
