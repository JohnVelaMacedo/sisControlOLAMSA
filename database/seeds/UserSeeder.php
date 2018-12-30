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
            'idPersona'=>1,
            'user' => 'admin',
            'tipo' => 1,
            'password' => bcrypt('admin'),
            'remember_token' => null
        ]);
        
        DB::table('persona')->insert([
            'nombre'=>'admin',
            'apellidos'=>'admin',
            'dni'=>'00000000',
            'email'=>'tree@gmail.com',
            'direccion'=>'Jr. Rosas',
            'tipo'=>1
        ]);

        // DB::table('user')->insert([
        //     'user' => 'agente',
        //     'tipo' => 3,
        //     'password' => bcrypt('agente'),
        //     'remember_token' => null
        // ]);

        // DB::table('user')->insert([
        //     'user' => 'evaluador',
        //     'tipo' => 4,
        //     'password' => bcrypt('evaluador'),
        //     'remember_token' => null
        // ]);
    }
}
