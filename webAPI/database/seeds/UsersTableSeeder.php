<?php

use Illuminate\Database\Seeder;
use App\User;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        $faker = \Faker\Factory::create();

        $password = Hash::make('123qwe');

        User::create([
            'name' => 'Admin',
            'email' => 'admin@admin.com',
            'password' => $password
        ]);
    }
}
