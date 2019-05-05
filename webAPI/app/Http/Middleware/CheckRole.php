<?php

namespace App\Http\Middleware;

use App\User;
use Closure;
use Illuminate\Support\Facades\Auth;

class CheckRole
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {

        if($request->user() == null){
            return response()->json(['error' => 'You must be logged in']);
        }

        $roles = $request->route()->getAction('roles');

        if(!$request->user()->hasAnyRoles($roles)){
            return response()->json(['error' => "You don't have access"]);
        }

        return $next($request);
    }
}
