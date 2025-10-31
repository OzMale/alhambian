<template>
    <div class="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 p-8">
        <div class="max-w-6xl mx-auto">
            <h1 class="text-4xl font-bold text-gray-900 mb-2">API Integration Demo</h1>
            <p class="text-xl text-gray-600 mb-8">Learning data fetching and API integration</p>

            <!-- Users Management Section -->
            <UiCard title="User Management" class="mb-8">
                <NuxtLink to="/api-demo"
                    class="text-gray-600 hover:text-blue-500 font-medium transition-colors duration-200"
                    :class="{ 'text-blue-500 border-b-2 border-blue-500': $route.path === '/api-demo' }">
                    API Demo
                </NuxtLink>

                <div class="flex gap-4 mb-6">
                    <!-- <UiButton @click="loadUsers" :disabled="users.loading.value" label="Load Users" /> -->
                    <UiButton @click="loadUsers" :disabled="isLoading" label="Load Users" />
                    <UiButton variant="outline" @click="showAddUser = true" label="Add User" />
                    <!-- <UiButton variant="secondary" @click="users.fetchUsers()" :disabled="users.loading.value"
                        label="Refresh" /> -->
                    <UiButton variant="secondary" @click="users.fetchUsers()" :disabled="isLoading" label="Refresh" />
                </div>

                <!-- Loading State -->
                <div v-if="isLoading" class="text-center py-8">
                    <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
                    <p class="text-gray-600 mt-2">Loading users...</p>
                </div>

                <!-- Error State -->
                <div v-if="hasError" class="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                    <p class="text-red-800 font-semibold">Error:</p>
                    <p class="text-red-700">{{ users.error }}</p>
                </div>

                <!-- Updated users table -->
                <div v-if="userList.length > 0" class="overflow-x-auto">
                    <table class="min-w-full bg-white rounded-lg overflow-hidden">
                        <thead class="bg-gray-50">
                            <tr>
                                <th
                                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    ID</th>
                                <th
                                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Name</th>
                                <th
                                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Email</th>
                                <th
                                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Role</th>
                                <th
                                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Actions</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-gray-200">
                            <tr v-for="user in userList" :key="user.id" class="hover:bg-gray-50">
                                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{ user.id }}
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ user.name }}</td>
                                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{{ user.email }}</td>
                                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{{ user.role }}</td>
                                <td class="px-6 py-4 whitespace-nowrap text-sm">
                                    <UiButton size="sm" variant="outline" @click="viewUser(user.id)" label="View" />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <!-- Empty State -->
                <div v-if="!isLoading && userList.length === 0" class="text-center py-8 text-gray-500">
                    No users loaded. Click "Load Users" to fetch data from the API.
                </div>
            </UiCard>
        </div>

        <!-- API Status Section -->

        <!-- Updated status section -->
        <div class="space-y-2">
            <p class="text-sm">
                <span class="font-medium">Users Loaded:</span>
                <span class="ml-2 px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                    {{ userList.length }}
                </span>
            </p>
            <p class="text-sm">
                <span class="font-medium">Loading:</span>
                <span
                    :class="['ml-2 px-2 py-1 rounded text-xs', isLoading ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800']">
                    {{ isLoading ? 'Yes' : 'No' }}
                </span>
            </p>
        </div>

        <!-- Add User Modal -->
        <div v-if="showAddUser" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            @click="showAddUser = false">
            <div class="bg-white p-6 rounded-lg max-w-md mx-4 shadow-xl" @click.stop>
                <h3 class="text-lg font-semibold mb-4">Add New User</h3>

                <div class="space-y-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Name</label>
                        <input v-model="newUser.name" type="text"
                            class="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Enter user name" />
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input v-model="newUser.email" type="email"
                            class="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Enter user email" />
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Role</label>
                        <select v-model="newUser.role"
                            class="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                            <option value="User">User</option>
                            <option value="Admin">Admin</option>
                            <option value="Editor">Editor</option>
                        </select>
                    </div>
                </div>

                <div class="flex gap-3 mt-6">
                    <UiButton @click="addUser" label="Add User" class="flex-1" />
                    <UiButton variant="outline" @click="showAddUser = false" label="Cancel" class="flex-1" />
                </div>
            </div>
        </div>
        <NuxtLink to="/api-demo" class="text-gray-600 hover:text-blue-500 font-medium transition-colors duration-200"
            :class="{ 'text-blue-500 border-b-2 border-blue-500': $route.path === '/api-demo' }">
            API Demo
        </NuxtLink>
    </div>
</template>

<script setup lang="ts">
// Import our users composable
const users = useUsers()
const showAddUser = ref(false)

// New user form data
const newUser = ref({
    name: '',
    email: '',
    role: 'User'
})

// Computed properties for template use
const isLoading = computed(() => users.loading.value)
const hasError = computed(() => users.error.value)
const userList = computed(() => users.users.value)

// Load users on component mount
const loadUsers = async (): Promise<void> => {
    await users.fetchUsers()
}

// View user details
const viewUser = async (id: number): Promise<void> => {
    const user = await users.getUserById(id)
    if (user) {
        alert(`User Details:\nName: ${user.name}\nEmail: ${user.email}\nRole: ${user.role}`)
    }
}

// Add new user
const addUser = async (): Promise<void> => {
    if (!newUser.value.name || !newUser.value.email) {
        alert('Please fill in all fields')
        return
    }

    const created = await users.createUser(newUser.value)
    if (created) {
        showAddUser.value = false
        newUser.value = { name: '', email: '', role: 'User' }
        // Refresh the user list
        await users.fetchUsers()
    }
}

// Load users when component mounts
onMounted(() => {
    loadUsers()
})
</script>