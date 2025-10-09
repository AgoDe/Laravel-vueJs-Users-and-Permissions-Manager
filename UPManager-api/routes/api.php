<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\UsersController;

Route::group(['namespace' => 'App\Http\Controllers\API'], function () {
    Route::post('/login', [AuthController::class, 'login']);

    Route::middleware('auth:sanctum')->group(function () {
        Route::post('/logout', [AuthController::class, 'logout']);
        Route::get('auth/user', [AuthController::class, 'getUserInfo']);
        Route::put('auth/user/theme', [UsersController::class, 'updateTheme']);

        Route::prefix('users')->group(function () {
            Route::get('/', [UsersController::class, 'index']);
            Route::get('/statistics', [UsersController::class, 'statistics']);
            Route::get('/registrations-trend', [UsersController::class, 'registrationsTrend']);

            Route::middleware('role:admin')->group(function () {
                Route::post('/', [UsersController::class, 'store']);
                Route::put('/{id}', [UsersController::class, 'updateAsAdmin']);
                Route::delete('/{id}', [UsersController::class, 'destroy']);
            });

            Route::middleware('role:admin,editor')->group(function () {
                Route::patch('/{id}', [UsersController::class, 'updateAsEditor']);
                
            });
        });
    });
});

Route::fallback(function(){
    return response()->json([
        'message' => 'API route not found'
    ], 404);
});
