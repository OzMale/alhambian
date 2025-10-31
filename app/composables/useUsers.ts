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
  
 // Search function - client-side only
const searchUsers = async (term: string) => {
  if (!term) {
    await fetchUsers() // Show all users when search is cleared
    return
  }

  loading.value = true
  error.value = ''
  
  try {
    // Ensure we have users loaded first
    if (users.value.length === 0) {
      await fetchUsers()
    }
    
    // Filter users client-side
    const searchTerm = term.toLowerCase()
    users.value = users.value.filter(user => 
      user.name.toLowerCase().includes(searchTerm) ||
      user.email.toLowerCase().includes(searchTerm) ||
      user.role.toLowerCase().includes(searchTerm)
    )
    
  } catch (err) {
    error.value = 'Failed to search users'
    console.error('Search error:', err)
  } finally {
    loading.value = false
  }
}

  // Create user
  const createUser = async (userData: Omit<User, 'id' | 'createdAt'>): Promise<User | null> => {
    loading.value = true
    try {
      const response = await post<User>('/users', userData)
      
      // If response is empty but successful, create a mock user
      if (!response || Object.keys(response).length === 0) {
        console.log('Empty response from API create, creating mock user')
        const mockUser: User = {
          id: Date.now(), // Temporary ID
          ...userData,
          createdAt: new Date().toISOString()
        }
        users.value.push(mockUser)
        return mockUser
      }
      
      users.value.push(response)
      return response
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to create user'
      console.error('Create user error:', err)
      return null
    } finally {
      loading.value = false
    }
  }

  // Update user - handle empty responses
  const updateUser = async (id: number, userData: Partial<Omit<User, 'id' | 'createdAt'>>): Promise<User | null> => {
    try {
      // Find the current user to preserve createdAt
      const currentUser = users.value.find(u => u.id === id)
      if (!currentUser) {
        error.value = 'User not found'
        return null
      }
      
      // Create updated user object
      const updatedUser: User = {
        ...currentUser,
        ...userData
      }
      
      console.log('Sending update for user:', id, updatedUser)
      
      // Send the update - handle potential empty response
      const response = await put<User>(`/users/${id}`, updatedUser)
      
      // If response is empty but successful, return the updated user we sent
      if (!response || Object.keys(response).length === 0) {
        console.log('Empty response from API update, using local data')
        // Update local state
        const index = users.value.findIndex(u => u.id === id)
        if (index !== -1) {
          users.value[index] = updatedUser
        }
        return updatedUser
      }
      
      // Update local state with API response
      const index = users.value.findIndex(u => u.id === id)
      if (index !== -1) {
        users.value[index] = response
      }
      
      return response
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to update user'
      console.error('Update user error:', err)
      return null
    }
  }

  // Delete user
const deleteUser = async (id: number): Promise<boolean> => {
  try {
    await del(`/users/${id}`)
    
    // Remove the user from the local state
    const index = users.value.findIndex(u => u.id === id)
    if (index !== -1) {
      users.value.splice(index, 1)
    }
    
    return true
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Failed to delete user'
    return false
  }
}
  
  return {
    users: users,
    loading: loading,
    error: error,
    fetchUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    searchUsers
  }
}