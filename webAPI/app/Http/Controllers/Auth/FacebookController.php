<?php

namespace App\Http\Controllers\Auth;

use App\User;
use http\Env\Response;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Laravel\Socialite\Facades\Socialite;
use Exception;
use Illuminate\Support\Facades\Auth;

class FacebookController extends Controller
{
    public function redirectToFacebook()
    {
        return Socialite::with('facebook')->redirect();
    }

    public function handleFacebookCallback()
    {
        $user = Socialite::with('facebook')->user();
        $create['name'] = $user->getName();
        $create['email'] = $user->getEmail();
        $create['facebook_id'] = $user->getId();
        $create['verified'] = 1;

        $userModel = new User();
        $createdUser = $userModel->addNew($create);
        $createdUser->generateToken();
        Auth::loginUsingId($createdUser->id);
        return \response()->json($createdUser,201);
    }
}
