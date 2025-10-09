<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckUserRole
{
    /**
     * Handle an incoming request and check user role.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next, ...$roles): Response
    {
        if(!auth()->guard("api")->check()) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        $user = auth()->guard("api")->user();
        
        if($user->role == "admin" || in_array($user->role, $roles)) {
            return $next($request);
        }
        else {
            return response()->json(['message' => 'Access denied'], 403);
        }
    
    }
}
