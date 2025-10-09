<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Symfony\Component\HttpFoundation\Response;

class DebugAuth
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        Log::emergency('DebugAuth middleware called', [
            'url' => $request->url(),
            'method' => $request->method(),
            'headers' => $request->headers->all(),
            'has_bearer' => $request->bearerToken() ? 'yes' : 'no',
            'bearer_token' => $request->bearerToken() ? 'present' : 'missing',
        ]);

        try {
            $response = $next($request);
            Log::emergency('DebugAuth - Request successful');
            return $response;
        } catch (\Exception $e) {
            Log::emergency('DebugAuth - Exception caught', [
                'exception' => get_class($e),
                'message' => $e->getMessage()
            ]);
            throw $e;
        }
    }
}
