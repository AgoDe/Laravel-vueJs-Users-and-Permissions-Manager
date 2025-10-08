export interface ApiResponse {
    message: string;
}

export interface DataApiResponse<T> {
    data: T;
}
export interface PaginatedApiResponse<T> {
    data: T[];
    current_page: number;
    per_page: number;
    total: number;
    last_page: number;
}

