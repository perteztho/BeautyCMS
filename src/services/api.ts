const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

interface ApiResponse<T = any> {
  data?: T;
  message?: string;
  error?: string;
}

class ApiService {
  private token: string | null = null;

  constructor() {
    this.token = localStorage.getItem('auth_token');
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${API_BASE_URL}${endpoint}`;
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...(this.token && { Authorization: `Bearer ${this.token}` }),
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || `HTTP error! status: ${response.status}`);
      }

      return { data };
    } catch (error) {
      console.error('API request failed:', error);
      return { error: error instanceof Error ? error.message : 'Unknown error' };
    }
  }

  // Auth methods
  async login(email: string, password: string) {
    const response = await this.request<{ token: string; user: any }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });

    if (response.data?.token) {
      this.token = response.data.token;
      localStorage.setItem('auth_token', this.token);
    }

    return response;
  }

  async register(name: string, email: string, password: string) {
    const response = await this.request<{ token: string; user: any }>('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
    });

    if (response.data?.token) {
      this.token = response.data.token;
      localStorage.setItem('auth_token', this.token);
    }

    return response;
  }

  async getCurrentUser() {
    return this.request<{ user: any }>('/auth/me');
  }

  logout() {
    this.token = null;
    localStorage.removeItem('auth_token');
  }

  // Users methods
  async getUsers(params: {
    page?: number;
    limit?: number;
    search?: string;
    role?: string;
    status?: string;
  } = {}) {
    const queryParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== '') {
        queryParams.append(key, value.toString());
      }
    });

    return this.request<{ users: any[]; pagination: any }>(`/users?${queryParams}`);
  }

  async createUser(userData: {
    name: string;
    email: string;
    password: string;
    role?: string;
    status?: string;
  }) {
    return this.request<{ user: any }>('/users', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  async updateUser(id: string, userData: {
    name?: string;
    email?: string;
    role?: string;
    status?: string;
  }) {
    return this.request<{ user: any }>(`/users/${id}`, {
      method: 'PUT',
      body: JSON.stringify(userData),
    });
  }

  async deleteUser(id: string) {
    return this.request(`/users/${id}`, {
      method: 'DELETE',
    });
  }

  // Pages methods
  async getPages(params: {
    page?: number;
    limit?: number;
    search?: string;
    status?: string;
  } = {}) {
    const queryParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== '') {
        queryParams.append(key, value.toString());
      }
    });

    return this.request<{ pages: any[]; pagination: any }>(`/pages?${queryParams}`);
  }

  async createPage(pageData: {
    title: string;
    slug: string;
    content?: string;
    meta_description?: string;
    meta_keywords?: string;
    status?: string;
    featured_image?: string;
  }) {
    return this.request<{ page: any }>('/pages', {
      method: 'POST',
      body: JSON.stringify(pageData),
    });
  }

  async updatePage(id: string, pageData: {
    title?: string;
    slug?: string;
    content?: string;
    meta_description?: string;
    meta_keywords?: string;
    status?: string;
    featured_image?: string;
  }) {
    return this.request<{ page: any }>(`/pages/${id}`, {
      method: 'PUT',
      body: JSON.stringify(pageData),
    });
  }

  async deletePage(id: string) {
    return this.request(`/pages/${id}`, {
      method: 'DELETE',
    });
  }

  // Health check
  async healthCheck() {
    return this.request('/health');
  }
}

export const apiService = new ApiService();
export default apiService;