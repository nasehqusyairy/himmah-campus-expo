<?php

namespace Database\Seeders;

use App\Models\Agency;
use App\Models\Level;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::firstOrCreate(
            ['email' => 'admin@example.com'],
            [
                'name' => 'Admin',
                'password' => 'password',
                'email_verified_at' => now(),
                'role_id' => 1
            ]
        );

        User::firstOrCreate(
            ['email' => 'test@example.com'],
            [
                'name' => 'Test User',
                'password' => 'password',
                'email_verified_at' => now(),
            ]
        );

        $levels = [
            [
                'name' => 'SMP/Sederajat'
            ],
            [
                'name' => 'SMA/Sederajat'
            ],
            [
                'name' => 'Perguruan Tinggi'
            ],
            [
                'name' => 'Alumni'
            ],
            [
                'name' => 'Lainnya'
            ]
        ];

        foreach ($levels as $level) {
            Level::firstOrCreate($level);
        }

        $sma  = [
            ['name' => 'PP. Bayt Al-Hikmah Pasuruan', 'level_id' => 4],
            ['name' => 'SMAN 1 PASURUAN', 'level_id' => 2],
            ['name' => 'SMAN 2 PASURUAN', 'level_id' => 2],
            ['name' => 'SMAN 3 PASURUAN', 'level_id' => 2],
            ['name' => 'SMAN 4 PASURUAN', 'level_id' => 2],
            ['name' => 'SMA DARUL KAROMAH', 'level_id' => 2],
            ['name' => 'SMA SABILUTH THOYYIB', 'level_id' => 2],
            ['name' => 'SMA MUHAMMADIYAH 1', 'level_id' => 2],
            ['name' => 'SMA SHALAHUDDIN', 'level_id' => 2],
            ['name' => 'SMKN 1 PASURUAN', 'level_id' => 2],
            ['name' => 'SMKN 2 PASURUAN', 'level_id' => 2],
            ['name' => 'SMK SHALAHUDDIN', 'level_id' => 2],
            ['name' => 'SMK DARUL ULUM', 'level_id' => 2],
            ['name' => 'SMK PGRI 1', 'level_id' => 2],
            ['name' => 'SMK PGRI 2', 'level_id' => 2],
            ['name' => 'SMK PGRI 3', 'level_id' => 2],
            ['name' => 'SMK PGRI 4', 'level_id' => 2],
            ['name' => 'SMK MUHAMMADIYAH 1', 'level_id' => 2],
            ['name' => 'SMK KESEHATAN SAKINAH', 'level_id' => 2],
            ['name' => 'SMK DHARMA WIRAWAN', 'level_id' => 2],
            ['name' => 'SMK PUTRI AL-AZHAR', 'level_id' => 2],
            ['name' => 'SMK UNTUNG SUROPATI', 'level_id' => 2],
            ['name' => 'MA AL MASYHUR', 'level_id' => 2],
            ['name' => 'MA AL FURQON', 'level_id' => 2],
            ['name' => 'MA TARBIYATUS SALAFIYAH', 'level_id' => 2],
        ];

        foreach ($sma as $s) {
            Agency::firstOrCreate($s);
        }

        // smp
        for ($i = 1; $i <= 11; $i++) {
            Agency::firstOrCreate([
                'name' => "SMPN $i Kota Pasuruan",
                'level_id' => 1
            ]);
        }
    }
}
