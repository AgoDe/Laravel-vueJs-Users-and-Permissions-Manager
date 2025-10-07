import type { User } from "@/types/User";
import type { PaginatedApiResponse } from "@/types/ApiResponse";
import apiClient from "@/utils/apiClient";

export class UsersService {
    static async fetchUsers(params: any) : Promise<PaginatedApiResponse<User>> {
        const response : PaginatedApiResponse<User> = await apiClient.get('/users', { params });
        return response;
    }
    
}