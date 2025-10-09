export interface User {
  id: number;
  name: string;
  email: string;
  email_verified_at: string | null;
  role: 'admin' | 'editor' | 'viewer';
  account_status: 'active' | 'inactive';
  theme: 'light' | 'dark';
  created_at: string;
  updated_at: string;
}

export interface UsersStatistics {
  total_users: number;
  active_users: number;
  inactive_users: number;
  admins: number;
  editors: number;
  viewers: number;
}

export interface UsersRegistrationsTrend {
  month: string; // e.g., '2023-10'
  count: number;
}

export interface UsersFilters {
  search: string | null;
  role: 'admin' | 'editor' | 'viewer' | null;
  status: 'active' | 'inactive' | null;
  sort_by: 'name' | 'email' | 'role' | 'account_status' | 'created_at';
  sort_order: 'asc' | 'desc';

}