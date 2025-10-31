interface ApiConfig {
  baseURL: string
  timeout: number
}

export function useApi() {
  const config = useRuntimeConfig()

  // Debug: log the runtime config
  console.log('Runtime Config:', {
    apiBaseUrl: config.public.apiBaseUrl,
    nodeEnv: config.public.nodeEnv
  })
  
  const apiConfig: ApiConfig = {
    baseURL: config.public.apiBaseUrl || 'http://localhost:5092/api',
    timeout: 10000
  }

  const fetchData = async <T>(
    endpoint: string, 
    options: RequestInit = {}
  ): Promise<T> => {
    // Handle both full URLs and relative endpoints
    let url: string
    
    if (endpoint.startsWith('http')) {
      // It's a full URL (like JSONPlaceholder), use as-is
      url = endpoint
    } else {
      // It's a relative endpoint, prepend baseURL
      // Ensure baseURL doesn't have trailing slash and endpoint doesn't have leading slash
      const cleanBase = apiConfig.baseURL.replace(/\/$/, '')
      const cleanEndpoint = endpoint.replace(/^\//, '')
      url = `${cleanBase}/${cleanEndpoint}`
    }
    
    console.log('API Call URL:', url) // Debug log
    
    const defaults: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      }
    }

    try {
      const response = await fetch(url, { ...defaults, ...options })
      
      console.log('Response status:', response.status)
      console.log('Response OK:', response.ok)
      
      if (!response.ok) {
        const errorText = await response.text().catch(() => 'No error details')
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`)
      }
      
      // Handle empty responses (204 No Content, etc.)
      const contentLength = response.headers.get('content-length')
      const contentType = response.headers.get('content-type')
      
      console.log('Content-Length:', contentLength)
      console.log('Content-Type:', contentType)
      
      // If response is empty or 204 No Content, return empty object
      if (response.status === 204 || contentLength === '0' || !contentType?.includes('application/json')) {
        console.log('Empty or non-JSON response detected, returning empty object')
        return {} as T
      }
      
      const responseData = await response.json() as T
      console.log('Response data:', responseData)
      return responseData
      
    } catch (error) {
      console.error('API fetch error:', error)
      throw error
    }
  }

  // Specific HTTP methods
  const get = <T>(endpoint: string): Promise<T> => 
    fetchData<T>(endpoint, { method: 'GET' })

  const post = <T>(endpoint: string, data: any): Promise<T> => 
    fetchData<T>(endpoint, { 
      method: 'POST', 
      body: JSON.stringify(data) 
    })

  const put = <T>(endpoint: string, data: any): Promise<T> => 
    fetchData<T>(endpoint, { 
      method: 'PUT', 
      body: JSON.stringify(data) 
    })

  const del = <T>(endpoint: string): Promise<T> => 
    fetchData<T>(endpoint, { method: 'DELETE' })

  return {
    fetchData,
    get,
    post,
    put,
    delete: del
  }
}