import type { ApiError } from "@pawpal-web/utils/lib/api-client.js"
import React from "react"

interface LoginFormResponse {
  onLoginSuccess: (data: unknown) => void,
  onLoginError: (e: ApiError) => void,
  error: string
}
export const useLoginForm = (): LoginFormResponse => {
  const [error, setError] = React.useState<string>("")
   const onLoginSuccess = React.useCallback(() => {
        if(error) {
          setError('')
        }
    }, [error, setError]) 
  
    const onLoginError = React.useCallback((e: ApiError) => {
      if(e.statusCode)
      setError(e.message)
    }, [setError])

  return {
    onLoginSuccess,
    onLoginError, 
    error
  }
}