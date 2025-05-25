import { apiClient } from '@/lib/api-client'
import { ApiError } from '@pawpal-web/utils/lib/api-client.js'
import { useMutation } from '@tanstack/react-query'
import React from 'react'

interface LoginData {
  email?: string
  password?: string
  phoneNumber?: string
}

interface Auth {
  onLoginError?: (e: ApiError) => void,
  onLoginSuccess?: (data: unknown) => void,
}

const useHandleLogin = ({ onLoginError, onLoginSuccess }: Auth) => {
  return useMutation({
    mutationFn: async (data: LoginData) => {
      const response = await apiClient.auth.login({
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(data)
      })

      console.log('response -->', response)
      return response;
    },
    onSuccess: (responseData: unknown) => {
      if(onLoginSuccess) {
        onLoginSuccess(responseData)
      }
    },
    onError: (e) => {
      if(onLoginError && e instanceof ApiError) {
        onLoginError(e)
      }
    }
  })
}

export const useAuth = ({ onLoginError, onLoginSuccess }: Auth = {}) => {
  const token = localStorage.getItem('token')
  const { mutate } = useHandleLogin({ onLoginSuccess, onLoginError})

  const logOut = React.useCallback(() => {
    localStorage.removeItem('token')
  }, [])

  const saveUser = React.useCallback((user: unknown) => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user))
    }
  }, [])

  const getLoggedInUser = React.useCallback(() => {
    const user = localStorage.getItem('user')

    return JSON.parse(user || '{}')
  }, [])


  return { isLoggedIn: !!token, logOut, saveUser, getLoggedInUser, handleLogin: mutate }
}
