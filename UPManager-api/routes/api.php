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

        Route::prefix('users')->group(function () {
            Route::get('/', [UsersController::class, 'index']);
            Route::get('/statistics', [UsersController::class, 'statistics']);
            Route::get('/registration-trends', [UsersController::class, 'registrationTrends']);
        });
    });
});

Route::fallback(function(){
    return response()->json([
        'message' => 'API route not found'
    ], 404);
});
