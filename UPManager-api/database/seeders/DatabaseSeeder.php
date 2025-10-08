<?php

namespace Database\Seeders;

use App\Models\User;
use DateTime;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        
        User::factory()->create([
            'name' => 'Agostino De Felice',
            'role' => 'admin',
            'account_status' => 'active',
            'email' => 'admin@example.com',
            'password' => Hash::make('password'),
            'created_at' => now()->setDate(
                now()->year,
                random_int(1, now()->month),
                rand(1, now()->day)
            )->toDateTimeString(),
        ]);
        User::factory()->create([
            'name' => 'Ezio Editore',
            'role' => 'editor',
            'account_status' => 'active',
            'email' => 'editor@example.com',
            'password' => Hash::make('password'),
            'created_at' => now()->setDate(
                now()->year,
                random_int(1, now()->month),
                rand(1, now()->day)
            )->toDateTimeString(),
        ]);
        User::factory()->create([
            'name' => 'Vittorio Viewer',
            'role' => 'viewer',
            'account_status' => 'active',
            'email' => 'viewer@example.com',
            'password' => Hash::make('password'),
            'created_at' => now()->setDate(
                now()->year,
                random_int(1, now()->month),
                rand(1, now()->day)
            )->toDateTimeString(),
        ]);
        User::factory(100)->create();
    }
}
