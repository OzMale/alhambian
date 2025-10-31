export interface User {
  id: number
  name: string
  email: string
  role: string
  createdAt: string
}

export function useUsers() {
  const { get, post, put, delete: del } = useApi()
  const users = ref<User[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)
  
  // Fetch all users from .NET API
  const fetchUsers = async (): Promise<void> => {
    loading.value = true
    error.value = null
    
    try {
      console.log('Fetching users from .NET API')
      // Always use your .NET API now
      users.value = await get<User[]>('/users')
      console.log('Users loaded successfully:', users.value.length)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to fetch users'
      console.error('User fetch error:', err)
    } finally {
      loading.value = false
    }
  }
  
  // Get single user
  const getUserById = async (id: number): Promise<User | null> => {
    try {
      return await get<User>(`/users/${id}`)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to fetch user'
      return null
    }
  }
  
  // Create user
  const createUser = async (userData: Omit<User, 'id' | 'createdAt'>): Promise<User | null> => {
    loading.value = true
    try {
      return await post<User>('/users', userData)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to create user'
      return null
    } finally {
      loading.value = false
    }
  }

  // Update user
  const updateUser = async (id: number, userData: Partial<Omit<User, 'id' | 'createdAt'>>): Promise<User | null> => {
    try {
      const updatedUser: User = {
        ...users.value.find(u => u.id === id)!,
        ...userData
      } as User
      
      await put(`/users/${id}`, updatedUser)
      return updatedUser
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to update user'
      return null
    }
  }

  // Delete user
  const deleteUser = async (id: number): Promise<boolean> => {
    try {
      await del(`/users/${id}`)
      return true
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to delete user'
      return false
    }
  }
  
  return {
    users,
    loading,
    error,
    fetchUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
  }
}