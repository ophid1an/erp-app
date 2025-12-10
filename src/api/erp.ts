const API_BASE = (import.meta.env.VITE_ERP_API_BASE ?? '/api/employee').replace(/\/$/, '')

type ApiResponse<T> = {
  result: boolean
  message?: string
  data?: T
  hash?: string
  expiresAt?: string
}

const parseError = (error: unknown) => (error instanceof Error ? error.message : 'Unable to reach ERP API')

const request = async <T>(path: string, init: RequestInit = {}): Promise<ApiResponse<T>> => {
  const response = await fetch(`${API_BASE}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(init.headers || {}),
    },
    ...init,
  })

  let payload: ApiResponse<T>

  try {
    payload = await response.json()
  } catch (error) {
    throw new Error(parseError(error))
  }

  if (!response.ok || payload?.result === false) {
    throw new Error(payload?.message ?? `ERP API request failed (${response.status})`)
  }

  return payload
}

export const login = (email: string, password: string) =>
  request<{ hash?: string; expiresAt?: string }>('/login', {
    method: 'POST',
    body: JSON.stringify({ username: email, email, password }),
  })

export const requestPasswordReset = (email: string) =>
  request<null>('/reset-password', {
    method: 'POST',
    body: JSON.stringify({ email }),
  })

export const changePassword = (currentPassword: string, newPassword: string) =>
  request<null>('/change-password', {
    method: 'POST',
    body: JSON.stringify({ currentPassword, newPassword }),
  })
