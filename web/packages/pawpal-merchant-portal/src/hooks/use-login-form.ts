import React from "react"

interface LoginFormResponse {
  onLoginSuccess: (data: unknown) => void,
  onLoginError: (e: Error) => void,
  error: string
}
export const useLoginForm = (): LoginFormResponse => {
  const [error, setError] = React.useState<string>("")
   const onLoginSuccess = React.useCallback(() => {
        if(error) {
          setError('')
        }
    }, [error, setError]) 
  
    const onLoginError = React.useCallback((e: Error) => {
      console.log('e -->', e)
      setError(e.message)
    }, [setError])

  return {
    onLoginSuccess,
    onLoginError, 
    error
  }
}