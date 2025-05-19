import React from 'react'

export const useAuth = () => {
  const token = localStorage.getItem('token')

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

  return { isLoggedIn: !!token, logOut, saveUser, getLoggedInUser }
}
