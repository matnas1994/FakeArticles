<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Http\Request;
use Laravel\Socialite;
use App\User;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;
use function MongoDB\BSON\toJSON;

class LoginController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Login Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles authenticating users for the application and
    | redirecting them to your home screen. The controller uses a trait
    | to conveniently provide its functionality to your applications.
    |
    */

    use AuthenticatesUsers;

    /**
     * Where to redirect users after login.
     *
     * @var string
     */
    protected $redirectTo = '/home';

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest')->except('logout');
    }

    public function login(Request $request)
    {
        $this->validateLogin($request);

        if ($this->attemptLogin($request)) {
            $user = $this->guard()->user();
            $user->generateToken();


            return response()->json(
                ['user' => $user, 'role' => $user->role()->get()]
            );
        }

        return response()->json( ['error'=>"Login Failed username or password doesn't match"] , 401);
    }


    public function fbLogin(Request $request)
    {

        $create['name'] = $request->name;
        $create['email'] = $request->email;
        $create['facebook_id'] = $request->id;
        $create['verified'] = 1;
        $create['email_verified_at'] = Carbon::now()->toDate();
        $userModel = new User();
        $createdUser = $userModel->addNew($create);
        $createdUser->generateToken();
        Auth::loginUsingId($createdUser->id);

        return response()->json(['user' => $createdUser, 'role' => $createdUser->role()->get()],201);
    }

    public function logout(Request $request)
    {
        $user = Auth::guard('api')->user();
        if($user){
            $user->api_token = null;
            $user->save();
        }
        return response()->json(['data'=>'User logged out.'], 200);
    }
}
