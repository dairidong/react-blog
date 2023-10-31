<?php

namespace App\Console\Commands;

use App\Models\Administrator;
use App\Models\User;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Hash;

class AdministratorCreate extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'admin:create-user';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Create an administrator user';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $username = $this->ask('Set up your username, default', 'admin');
        $name = $this->ask('Set up your name, default:', 'admin');
        $password = $this->secret('Set up your password, default password') ?? 'password';

        $this->line('Creating user...');

        $user = new Administrator([
            'username' => $username,
            'name' => $name,
            'password' => Hash::make($password)
        ]);

        $user->save();

        $this->info('User created!');
        $this->table(
            ['Username', 'Name'],
            [$user->only(['username', 'name'])]
        );
    }
}
