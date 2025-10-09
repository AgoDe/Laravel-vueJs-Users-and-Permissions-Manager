<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use app\Http\Middleware\CheckUserRole;
use Illuminate\Support\Facades\Log;

use Illuminate\Validation\ValidationException;
use Illuminate\Http\Request;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        api: __DIR__.'/../routes/api.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware): void {
        $middleware->alias([
            'role' => \App\Http\Middleware\CheckUserRole::class
        ]);

        $middleware->redirectGuestsTo(function (Request $request) {
            return null; // Non fare mai redirect
        });
    })
    ->withExceptions(function (Exceptions $exceptions): void {

        $exceptions->render(function (Throwable $e, Request $request) {

            Log::Error('Exception caught: '.$e->getMessage(), ['exception' => $e]);

            if ($e instanceof \Illuminate\Auth\AuthenticationException) {
                Log::warning('User not authenticated');
                
                return response()->json([
                    'message' => 'Unauthenticated'
                ], 401);
            }

            // ✅ Gestione per AuthorizationException (utente autenticato ma non autorizzato)
            if ($e instanceof \Illuminate\Auth\Access\AuthorizationException) {
                Log::warning('User not authorized');
                
                return response()->json([
                    'message' => 'Access Denied'
                ], 403);
            }

            if ($e instanceof \Illuminate\Validation\ValidationException) {
                Log::warning('ValidationException detected:', [
                    'errors' => $e->errors(),
                    'validator' => $e->validator ? 'present' : 'missing'
                ]);
                
                return response()->json([
                    'message' => 'Validation failed',
                    'errors' => $e->errors()
                ], 422);
            }


            $response = [
                'message' => 'Internal Server Error',                
            ];
            return response()->json($response, 500);
        });
    })->create();
