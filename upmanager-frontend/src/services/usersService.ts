import type { User, UsersRegistrationsTrend, UsersStatistics } from "@/types/User";
import type { DataApiResponse, PaginatedApiResponse } from "@/types/ApiResponse";
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
}