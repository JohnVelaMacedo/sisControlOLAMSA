<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('user')->insert([
            'user' => 'admin',
            'tipo' => 1,
            'password' => bcrypt('admin'),
            'remember_token' => null
        ]);
        
        DB::table('user')->insert([
            'user' => 'supervisor',
            'tipo' => 2,
            'password' => bcrypt('supervisor'),
            'remember_token' => null
        ]);

        DB::table('user')->insert([
            'user' => 'agente',
            'tipo' => 3,
            'password' => bcrypt('agente'),
            'remember_token' => null
        ]);

        DB::table('user')->insert([
            'user' => 'evaluador',
            'tipo' => 4,
            'password' => bcrypt('evaluador'),
            'remember_token' => null
        ]);
    }
}
