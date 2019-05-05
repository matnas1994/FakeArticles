<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    public function logged()
    {
        $user = Auth::user();

        return response()->json(
            ['user' => $user, 'role' => $user->role()->get()]
        );

    }

}
