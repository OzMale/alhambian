<template>
  <div class="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 p-8">
    <div class="max-w-6xl mx-auto">
      <h1 class="text-4xl font-bold text-gray-900 mb-2">Enhanced User Management</h1>
      <p class="text-xl text-gray-600 mb-8">Full CRUD operations with search and real-time updates</p>
      
      <!-- Controls Section -->
      <UiCard title="Controls" class="mb-6">
        <div class="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
          <div class="flex gap-3 flex-wrap">
            <UiButton 
              @click="loadUsers"
              :disabled="loading"
              label="Refresh Users"
            />
            <UiButton 
              variant="outline"
              @click="showAddUser = true"
              label="Add New User"
            />
            <UiButton 
              variant="secondary"
              @click="clearSearch"
              label="Clear Search"
            />
          </div>
          
          <!-- Search Box -->
          <div class="w-full md:w-64">
            <div class="relative">
              <input 
                v-model="searchTerm"
                type="text"
                placeholder="Search users..."
                class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                @input="handleSearch"
              >
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </div>
            </div>
          </div>
        </div>

        <!-- Status Bar -->
        <div class="mt-4 flex flex-wrap gap-4 items-center text-sm">
          <span class="px-3 py-1 bg-blue-100 text-blue-800 rounded-full">
            Total: {{ users.length }} users
          </span>
          <span class="px-3 py-1 bg-green-100 text-green-800 rounded-full" v-if="searchTerm">
            Search active
          </span>
          <span v-if="loading" class="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full animate-pulse">
            Loading...
          </span>
        </div>
      </UiCard>

      <!-- Users Table -->
      <UiCard title="User Management">
        <!-- Loading State -->
        <div v-if="loading && users.length === 0" class="text-center py-12">
          <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p class="text-gray-600 mt-4">Loading users...</p>
        </div>

        <!-- Error State -->
        <div v-else-if="error" class="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <div class="flex items-center">
            <svg class="h-5 w-5 text-red-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <h3 class="text-red-800 font-semibold">Error Loading Users</h3>
          </div>
          <p class="text-red-700 mt-1">{{ error }}</p>
          <UiButton 
            @click="loadUsers"
            variant="outline"
            size="sm"
            label="Retry"
            class="mt-3"
          />
        </div>

        <!-- Users Table -->
        <div v-else-if="users.length > 0" class="overflow-x-auto">
          <table class="min-w-full bg-white rounded-lg overflow-hidden">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200">
              <tr v-for="user in users" :key="user.id" class="hover:bg-gray-50 transition-colors">
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <div class="flex-shrink-0 h-10 w-10 bg-blue-500 rounded-full flex items-center justify-center">
                      <span class="text-white font-semibold text-sm">{{ getUserInitials(user.name) }}</span>
                    </div>
                    <div class="ml-4">
                      <div class="text-sm font-medium text-gray-900">{{ user.name }}</div>
                      <div class="text-sm text-gray-500">{{ user.email }}</div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span :class="getRoleBadgeClass(user.role)" class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full">
                    {{ user.role }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {{ formatDate(user.createdAt) }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                  <UiButton 
                    size="sm" 
                    variant="outline"
                    @click="editUser(user)"
                    label="Edit"
                  />
                  <UiButton 
                    size="sm" 
                    variant="secondary"
                    @click="confirmDeleteUser(user)"
                    label="Delete"
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Empty State -->
        <div v-else class="text-center py-12">
          <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"></path>
          </svg>
          <h3 class="mt-2 text-sm font-medium text-gray-900">No users found</h3>
          <p class="mt-1 text-sm text-gray-500" v-if="searchTerm">
            Try adjusting your search terms
          </p>
          <p class="mt-1 text-sm text-gray-500" v-else>
            Get started by creating a new user
          </p>
          <div class="mt-6">
            <UiButton 
              @click="showAddUser = true"
              label="Add New User"
            />
          </div>
        </div>
      </UiCard>
    </div>

    <!-- Add User Modal -->
    <div 
      v-if="showAddUser"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      @click="showAddUser = false"
    >
      <div 
        class="bg-white rounded-lg max-w-md w-full mx-auto shadow-xl"
        @click.stop
      >
        <div class="p-6 border-b border-gray-200">
          <h3 class="text-lg font-semibold text-gray-900">Add New User</h3>
        </div>
        
        <form @submit.prevent="addUser" class="p-6 space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input 
              v-model="newUser.name"
              type="text"
              required
              class="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter full name"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <input 
              v-model="newUser.email"
              type="email"
              required
              class="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter email address"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Role</label>
            <select 
              v-model="newUser.role"
              class="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="User">User</option>
              <option value="Admin">Admin</option>
              <option value="Editor">Editor</option>
              <option value="Viewer">Viewer</option>
            </select>
          </div>
        </form>

        <div class="flex gap-3 p-6 border-t border-gray-200 bg-gray-50 rounded-b-lg">
          <UiButton 
            @click="addUser"
            :disabled="!newUser.name || !newUser.email"
            label="Create User"
            class="flex-1"
          />
          <UiButton 
            variant="outline"
            @click="showAddUser = false"
            label="Cancel"
            class="flex-1"
          />
        </div>
      </div>
    </div>

    <!-- Edit User Modal -->
    <div 
      v-if="editingUser"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      @click="editingUser = null"
    >
      <div 
        class="bg-white rounded-lg max-w-md w-full mx-auto shadow-xl"
        @click.stop
      >
        <div class="p-6 border-b border-gray-200">
          <h3 class="text-lg font-semibold text-gray-900">Edit User</h3>
        </div>
        
        <form @submit.prevent="saveUserEdit" class="p-6 space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input 
              v-model="editingUser.name"
              type="text"
              required
              class="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <input 
              v-model="editingUser.email"
              type="email"
              required
              class="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Role</label>
            <select 
              v-model="editingUser.role"
              class="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="User">User</option>
              <option value="Admin">Admin</option>
              <option value="Editor">Editor</option>
              <option value="Viewer">Viewer</option>
            </select>
          </div>
        </form>

        <div class="flex gap-3 p-6 border-t border-gray-200 bg-gray-50 rounded-b-lg">
          <UiButton 
            @click="saveUserEdit"
            :disabled="!editingUser.name || !editingUser.email"
            label="Save Changes"
            class="flex-1"
          />
          <UiButton 
            variant="outline"
            @click="editingUser = null"
            label="Cancel"
            class="flex-1"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Import and destructure CORRECTLY - get all the reactive data and functions
const { 
  users, 
  loading, 
  error, 
  fetchUsers, 
  searchUsers, 
  createUser, 
  updateUser, 
  deleteUser 
} = useUsers()

// Reactive state
const showAddUser = ref(false)
const editingUser = ref<User | null>(null)
const searchTerm = ref('')

// New user form
const newUser = ref({
  name: '',
  email: '',
  role: 'User' as const
})

// Methods
const loadUsers = async (): Promise<void> => {
  await fetchUsers()
}

const handleSearch = () => {
  if (searchTerm.value) {
    searchUsers(searchTerm.value)
  } else {
    // If search is cleared, reload all users
    fetchUsers()
  }
}

const addUser = async (): Promise<void> => {
  if (!newUser.value.name || !newUser.value.email) return
  
  const created = await createUser(newUser.value)
  if (created) {
    showAddUser.value = false
    newUser.value = { name: '', email: '', role: 'User' }
    // Refresh the user list
    await fetchUsers()
    // Show success message
    // alert('User created successfully!')
  }
}

const editUser = (user: User): void => {
  editingUser.value = { ...user }
}

const saveUserEdit = async (): Promise<void> => {
  if (!editingUser.value) return
  
  const updated = await updateUser(editingUser.value.id, {
    name: editingUser.value.name,
    email: editingUser.value.email,
    role: editingUser.value.role
  })
  
  if (updated) {
    editingUser.value = null
    // Refresh the user list
    await fetchUsers()
    // alert('User updated successfully!')
  }
}

const confirmDeleteUser = async (user: User): Promise<void> => {
  if (confirm(`Are you sure you want to delete ${user.name}? This action cannot be undone.`)) {
    const success = await deleteUser(user.id)
    if (success) {
      // Optional: Show success message
      console.log('User deleted successfully')
      // The list should automatically update since we modified users.value
    } else {
      alert('Failed to delete user')
    }
  }
}

const clearSearch = (): void => {
  searchTerm.value = ''
  // Reload all users when search is cleared
  fetchUsers()
}

const getUserInitials = (name: string): string => {
  return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
}

const getRoleBadgeClass = (role: string): string => {
  const classes = {
    Admin: 'bg-red-100 text-red-800',
    Editor: 'bg-blue-100 text-blue-800',
    Viewer: 'bg-gray-100 text-gray-800',
    User: 'bg-green-100 text-green-800'
  }
  return classes[role as keyof typeof classes] || classes.User
}

const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

// Lifecycle
onMounted(() => {
  loadUsers()
})
</script>