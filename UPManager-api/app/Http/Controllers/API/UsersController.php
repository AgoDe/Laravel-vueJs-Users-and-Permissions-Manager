<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;

class UsersController extends Controller
{
    /**
     * Display a listing of the users with filters and pagination.
     */
    public function index(Request $request)
    {

        try {
            $request->validate([
                'search' => 'sometimes|string|max:255',
                'role' => 'sometimes|in:admin,editor,viewer',
                'status' => 'sometimes|in:active,inactive',
                'page' => 'sometimes|integer|min:1',
                'per_page' => 'sometimes|integer|min:1|max:100',
            ]);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'message' => 'Failed to validate request',
                'errors' => $e->errors()
            ], 422);
        }

        try {
            $query = User::query();
    
            // Apply filters
            if ($request->filled('search')) {
                $query->where('name', 'like', '%' . $request->search . '%')
                      ->orWhere('email', 'like', '%' . $request->search . '%');
            }
    
            if ($request->filled('role')) {
                $query->where('role', $request->role);
            }
            
            if ($request->filled('status')) {
                $query->where('account_status', $request->status);
            }
            
            if( $request->filled('per_page') ) {
                $perPage = (int) $request->per_page;
            } else {
                $perPage = 10; // Default items per page
            }
            // Pagination
            $users = $query->paginate($perPage);
    
            return response()->json($users);

        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'message' => 'Request failed',
                'errors' => $e->errors()
            ], 422);
        }
    }

    public function statistics()
    {
        try {
            $totalUsers = User::count();
            $activeUsers = User::where('account_status', 'active')->count();
            $inactiveUsers = User::where('account_status', 'inactive')->count();
            $admins = User::where('role', 'admin')->count();
            $editors = User::where('role', 'editor')->count();
            $viewers = User::where('role', 'viewer')->count();

            return response()->json([
                'total_users' => $totalUsers,
                'active_users' => $activeUsers,
                'inactive_users' => $inactiveUsers,
                'admins' => $admins,
                'editors' => $editors,
                'viewers' => $viewers,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to retrieve statistics',
                'error' => $e->getMessage()
            ], 422);
        }
    }

    public function registrationTrends()
    {
        try {
            $trends = User::selectRaw("TO_CHAR(created_at, 'YYYY-MM') as month, COUNT(*) as count")
                          ->where('created_at', '>=', now()->subMonths(3)->startOfMonth())
                          ->groupBy('month')
                          ->orderBy('month', 'desc')
                          ->get();

            return response()->json($trends);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to retrieve registration trends',
                'error' => $e->getMessage()
            ], 422);
        }
    }

    public function updateTheme(Request $request)
    {

        try {
            $request->validate([
                'theme' => 'required|in:light,dark'
            ]);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'message' => 'Failed to validate request',
                'errors' => $e->errors()
            ], 422);
        }

        try {
            $user = $request->user();
            $user->theme = $request->theme;
            $user->save();

            return response()->json([
                'message' => 'Theme updated successfully',
                'theme' => $user->theme
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to update theme',
                'error' => $e->getMessage()
            ], 422);
        }
    }
}
