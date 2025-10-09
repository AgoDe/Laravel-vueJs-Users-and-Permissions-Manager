<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    /**
     * Login user and create auth token
     */
    public function login(Request $request)
    {

        $credentials = $request->validate([
            'email' => 'required|email', 
            'password' => 'required|string'
        ]);
       
        try {
            
            if (!Auth::guard('web')->attempt($credentials)) {
               return response()->json(
                    [
                        'message' => 'Login Failed',
                        'error' => 'Invalid credentials. Please try again.'
                    ], 
                    401
                );
            }

            $user = Auth::guard('web')->user();

            if( $user->account_status !== 'active') {
                return response()->json([
                    'message' => 'Login Failed',
                    'error' => 'Your account is ' . $user->account_status . '. Please contact the administrator.'
                ], 403);
            }
            $token = $user->createToken('auth_token')->plainTextToken;

            return response()->json([
                'access_token' => $token,
                'token_type' => 'Bearer',
                'user' => $user,
                'message' => 'Login successful'
            ]);
        }
        catch (\Exception $e) {
            return response()->json([
                'message' => 'Login failed',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Logout user (Revoke the token)
     */

    public function logout(Request $request)
    {
        try {
            $request->user()->tokens()->delete();

            return response()->json([
                'message' => 'Logout successful'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Logout failed',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get authenticated user info
     */
    public function getUserInfo(Request $request)
    {
        try {
            return response()->json($request->user());
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to retrieve user info',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
