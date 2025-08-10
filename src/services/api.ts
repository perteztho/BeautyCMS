import { supabase } from '../lib/supabase';

interface ApiResponse<T = any> {
  data?: T;
  message?: string;
  error?: string;
}

class ApiService {
  // Auth methods
  async login(email: string, password: string): Promise<ApiResponse<{ token: string; user: any }>> {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) {
        return { error: error.message };
      }

      if (data.user && data.session) {
        // Get user profile
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', data.user.id)
          .single();

        if (profileError && profileError.code !== 'PGRST116') {
          console.error('Profile fetch error:', profileError);
        }

        return {
          data: {
            token: data.session.access_token,
            user: {
              id: data.user.id,
              email: data.user.email,
              name: profile?.name || data.user.user_metadata?.name || 'User',
              role: profile?.role || 'user'
            }
          }
        };
      }

      return { error: 'Login failed' };
    } catch (error) {
      console.error('Login error:', error);
      return { error: error instanceof Error ? error.message : 'Login failed' };
    }
  }

  async register(name: string, email: string, password: string): Promise<ApiResponse<{ token: string; user: any }>> {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name
          }
        }
      });

      if (error) {
        return { error: error.message };
      }

      if (data.user && data.session) {
        // Create user profile
        const { error: profileError } = await supabase
          .from('profiles')
          .insert({
            id: data.user.id,
            name,
            email,
            role: 'user'
          });

        if (profileError) {
          console.error('Profile creation error:', profileError);
        }

        return {
          data: {
            token: data.session.access_token,
            user: {
              id: data.user.id,
              email: data.user.email,
              name,
              role: 'user'
            }
          }
        };
      }

      return { error: 'Registration failed' };
    } catch (error) {
      console.error('Registration error:', error);
      return { error: error instanceof Error ? error.message : 'Registration failed' };
    }
  }

  async getCurrentUser(): Promise<ApiResponse<{ user: any }>> {
    try {
      const { data: { user }, error } = await supabase.auth.getUser();

      if (error) {
        return { error: error.message };
      }

      if (user) {
        // Get user profile
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();

        if (profileError && profileError.code !== 'PGRST116') {
          console.error('Profile fetch error:', profileError);
        }

        return {
          data: {
            user: {
              id: user.id,
              email: user.email,
              name: profile?.name || user.user_metadata?.name || 'User',
              role: profile?.role || 'user'
            }
          }
        };
      }

      return { error: 'No user found' };
    } catch (error) {
      console.error('Get user error:', error);
      return { error: error instanceof Error ? error.message : 'Failed to get user' };
    }
  }

  async logout(): Promise<void> {
    try {
      await supabase.auth.signOut();
    } catch (error) {
      console.error('Logout error:', error);
    }
  }

  // Users methods
  async getUsers(params: {
    page?: number;
    limit?: number;
    search?: string;
    role?: string;
    status?: string;
  } = {}): Promise<ApiResponse<{ users: any[]; pagination: any }>> {
    try {
      let query = supabase
        .from('profiles')
        .select('*', { count: 'exact' });

      // Add filters
      if (params.search) {
        query = query.or(`name.ilike.%${params.search}%,email.ilike.%${params.search}%`);
      }

      if (params.role) {
        query = query.eq('role', params.role);
      }

      if (params.status) {
        query = query.eq('status', params.status);
      }

      // Add pagination
      const page = params.page || 1;
      const limit = params.limit || 10;
      const offset = (page - 1) * limit;

      query = query.range(offset, offset + limit - 1);

      const { data, error, count } = await query;

      if (error) {
        return { error: error.message };
      }

      return {
        data: {
          users: data || [],
          pagination: {
            page,
            limit,
            total: count || 0,
            pages: Math.ceil((count || 0) / limit)
          }
        }
      };
    } catch (error) {
      console.error('Get users error:', error);
      return { error: error instanceof Error ? error.message : 'Failed to get users' };
    }
  }

  async createUser(userData: {
    name: string;
    email: string;
    password: string;
    role?: string;
    status?: string;
  }): Promise<ApiResponse<{ user: any }>> {
    try {
      // Create auth user
      const { data: authData, error: authError } = await supabase.auth.admin.createUser({
        email: userData.email,
        password: userData.password,
        user_metadata: {
          name: userData.name
        }
      });

      if (authError) {
        return { error: authError.message };
      }

      if (authData.user) {
        // Create profile
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .insert({
            id: authData.user.id,
            name: userData.name,
            email: userData.email,
            role: userData.role || 'user',
            status: userData.status || 'active'
          })
          .select()
          .single();

        if (profileError) {
          return { error: profileError.message };
        }

        return { data: { user: profile } };
      }

      return { error: 'Failed to create user' };
    } catch (error) {
      console.error('Create user error:', error);
      return { error: error instanceof Error ? error.message : 'Failed to create user' };
    }
  }

  async updateUser(id: string, userData: {
    name?: string;
    email?: string;
    role?: string;
    status?: string;
  }): Promise<ApiResponse<{ user: any }>> {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .update(userData)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        return { error: error.message };
      }

      return { data: { user: data } };
    } catch (error) {
      console.error('Update user error:', error);
      return { error: error instanceof Error ? error.message : 'Failed to update user' };
    }
  }

  async deleteUser(id: string): Promise<ApiResponse> {
    try {
      const { error } = await supabase
        .from('profiles')
        .delete()
        .eq('id', id);

      if (error) {
        return { error: error.message };
      }

      return { data: { message: 'User deleted successfully' } };
    } catch (error) {
      console.error('Delete user error:', error);
      return { error: error instanceof Error ? error.message : 'Failed to delete user' };
    }
  }

  // Pages methods
  async getPages(params: {
    page?: number;
    limit?: number;
    search?: string;
    status?: string;
  } = {}): Promise<ApiResponse<{ pages: any[]; pagination: any }>> {
    try {
      let query = supabase
        .from('pages')
        .select(`
          *,
          profiles!pages_author_id_fkey(name)
        `, { count: 'exact' });

      // Add filters
      if (params.search) {
        query = query.or(`title.ilike.%${params.search}%,content.ilike.%${params.search}%`);
      }

      if (params.status) {
        query = query.eq('status', params.status);
      }

      // Add pagination
      const page = params.page || 1;
      const limit = params.limit || 10;
      const offset = (page - 1) * limit;

      query = query.range(offset, offset + limit - 1).order('created_at', { ascending: false });

      const { data, error, count } = await query;

      if (error) {
        return { error: error.message };
      }

      return {
        data: {
          pages: data || [],
          pagination: {
            page,
            limit,
            total: count || 0,
            pages: Math.ceil((count || 0) / limit)
          }
        }
      };
    } catch (error) {
      console.error('Get pages error:', error);
      return { error: error instanceof Error ? error.message : 'Failed to get pages' };
    }
  }

  async createPage(pageData: {
    title: string;
    slug: string;
    content?: string;
    meta_description?: string;
    meta_keywords?: string;
    status?: string;
    featured_image?: string;
  }): Promise<ApiResponse<{ page: any }>> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        return { error: 'Authentication required' };
      }

      const { data, error } = await supabase
        .from('pages')
        .insert({
          ...pageData,
          author_id: user.id,
          status: pageData.status || 'draft'
        })
        .select(`
          *,
          profiles!pages_author_id_fkey(name)
        `)
        .single();

      if (error) {
        return { error: error.message };
      }

      return { data: { page: data } };
    } catch (error) {
      console.error('Create page error:', error);
      return { error: error instanceof Error ? error.message : 'Failed to create page' };
    }
  }

  async updatePage(id: string, pageData: {
    title?: string;
    slug?: string;
    content?: string;
    meta_description?: string;
    meta_keywords?: string;
    status?: string;
    featured_image?: string;
  }): Promise<ApiResponse<{ page: any }>> {
    try {
      const { data, error } = await supabase
        .from('pages')
        .update(pageData)
        .eq('id', id)
        .select(`
          *,
          profiles!pages_author_id_fkey(name)
        `)
        .single();

      if (error) {
        return { error: error.message };
      }

      return { data: { page: data } };
    } catch (error) {
      console.error('Update page error:', error);
      return { error: error instanceof Error ? error.message : 'Failed to update page' };
    }
  }

  async deletePage(id: string): Promise<ApiResponse> {
    try {
      const { error } = await supabase
        .from('pages')
        .delete()
        .eq('id', id);

      if (error) {
        return { error: error.message };
      }

      return { data: { message: 'Page deleted successfully' } };
    } catch (error) {
      console.error('Delete page error:', error);
      return { error: error instanceof Error ? error.message : 'Failed to delete page' };
    }
  }

  // Health check
  async healthCheck(): Promise<ApiResponse> {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('count')
        .limit(1);

      if (error) {
        return { error: error.message };
      }

      return {
        data: {
          status: 'OK',
          timestamp: new Date().toISOString(),
          environment: import.meta.env.MODE || 'development'
        }
      };
    } catch (error) {
      console.error('Health check error:', error);
      return { error: error instanceof Error ? error.message : 'Health check failed' };
    }
  }
}

export const apiService = new ApiService();
export default apiService;