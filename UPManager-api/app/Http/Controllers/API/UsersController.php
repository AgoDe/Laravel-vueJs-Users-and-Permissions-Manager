<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\CreateUserRequest;
use App\Http\Requests\UpdateUserAsAdminRequest;
use App\Http\Requests\UpdateUserAsEditorRequest;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Log;

class UsersController extends Controller
{
    /**
     * return a listing of the users with filters and pagination.
     */
    public function index(Request $request)
    {

        $request->validate([
            'search' => 'sometimes|string|max:255',
            'role' => 'sometimes|in:admin,editor,viewer',
            'status' => 'sometimes|in:active,inactive',
            'page' => 'sometimes|integer|min:1',
            'per_page' => 'sometimes|integer|min:1|max:100',
        ]);

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

    public function store(CreateUserRequest $request)
    {
        $validatedData = $request->validated();

        try {
            $user = User::create($validatedData);

            return response()->json([
                'message' => 'User created successfully',
                'user' => $user
            ], 201);
            
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to create user',
                'error' => $e->getMessage()
            ], 422);
        }
    }

    /*
    * update user as admin (can update all fields ). 
     */
    public function updateAsAdmin($id, UpdateUserAsAdminRequest $request)
    {

        $validateData = $request->validated();
        
        try {    
            $user = User::findOrFail($id);

            $user->name = $validateData['name'];
            $user->email = $validateData['email'];
            $user->role = $validateData['role'];
            $user->account_status = $validateData['account_status'];

            $user->save();

            return response()->json([
                'message' => 'User updated successfully',
                'user' => $user
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to update user',
                'error' => $e->getMessage()
            ], 422);
        }
    }

    /*
    * update user as editor (can update only name and email). 
     */
    public function updateAsEditor($id, UpdateUserAsEditorRequest $request)
    {
        $validateData = $request->validated();

        try {
            $user = User::findOrFail($id);

            $user->name = $validateData['name'];
            $user->email = $validateData['email'];

            $user->save();

            return response()->json([
                'message' => 'User updated successfully',
                'user' => $user
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to update user',
                'error' => $e->getMessage()
            ], 422);
        }
    }

    public function destroy($id)
    {
        try {
            $user = User::findOrFail($id);
            $user->delete();

            return response()->json([
                'message' => 'User deleted successfully'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to delete user',
                'error' => $e->getMessage()
            ], 422);
        }
    }



    /*
    * return user statistics, number of active/inactive users, roles distribution and users total count. 
     */
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

    /* 
    * return the number of user registrations per month for the last 3 months.   
    */
    public function registrationsTrend()
    {
        try {
            $trends = User::selectRaw("TO_CHAR(created_at, 'YYYY-MM') as month, COUNT(*) as count")
                          ->where('created_at', '>=', now()->subMonths(3)->startOfMonth())
                          ->groupBy('month')
                          ->orderBy('month', 'asc')
                          ->get();

            return response()->json($trends);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to retrieve registration trends',
                'error' => $e->getMessage()
            ], 422);
        }
    }

    /* 
    * update the theme preference of the authenticated user.   
    */
    public function updateTheme(Request $request)
    {
        $request->validate([
            'theme' => 'required|in:light,dark'
        ]);

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
