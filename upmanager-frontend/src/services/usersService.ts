import type { User, UsersRegistrationsTrend, UsersStatistics } from "@/types/User";
import type { ApiResponse, DataApiResponse, PaginatedApiResponse } from "@/types/ApiResponse";
import apiClient from "@/utils/apiClient";

export class UsersService {
    static async getUsers(params: any) : Promise<PaginatedApiResponse<User>> {
        const response : PaginatedApiResponse<User> = await apiClient.get('/users', { params });
        return response;
    }

    static async getUsersStatistics() : Promise<UsersStatistics> {
        const response : UsersStatistics =  await apiClient.get('/users/statistics');
        return response;
    }

    static async getUsersRegistrationsTrend() : Promise<UsersRegistrationsTrend[]> {
        const response : UsersRegistrationsTrend[] = await apiClient.get('/users/registrations-trend');
        return response;
    }

    static async CreateUser(data: any) : Promise<DataApiResponse<User>> {
        
        const response : DataApiResponse<User> = await apiClient.post('/users', data);
        return response;
    }

    static async UpdateUserAsAdmin(userId: number, data: any) : Promise<DataApiResponse<User>> {
        const response : DataApiResponse<User> = await apiClient.put(`/users/${userId}`, data);
        return response;
    }

    static async UpdateUserAsEditor(userId: number, data: any) : Promise<DataApiResponse<User>> {
        const response : DataApiResponse<User> = await apiClient.patch(`/users/${userId}`, data);
        return response;
    }

    static async DeleteUser(userId: number) : Promise<ApiResponse> {
        const response : ApiResponse = await apiClient.delete(`/users/${userId}`);
        return response;
    }
}