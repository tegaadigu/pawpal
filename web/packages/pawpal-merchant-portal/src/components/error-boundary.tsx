import { useNavigate , useRouteError, isRouteErrorResponse } from 'react-router'

/**
 * @param error 
 * @returns {string}
 */
const getErrorMessage = (error: unknown) => {
  if(isRouteErrorResponse(error)) 
    return error.statusText
  if (error instanceof Error)
    return error.message

  return `We're sorry, but an unexpected error has occurred. Please try again later or contact support if the issue persists.`
}

export const ErrorBoundary = () => {
  const navigate = useNavigate()
  const error = useRouteError()
  const errorMsg = getErrorMessage(error)
  return (
    <div className="w-full h-full flex flex-col items-center justify-center space-y-5">
      <h1 className="text-xl poppins-medium">Oops, something went wrong!</h1>
      <p>{errorMsg}</p>
      <button
        onClick={() => {
          navigate(0)
        }}
      >
        Try again
      </button>
    </div>
  )
}
