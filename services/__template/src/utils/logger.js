export const logError = (request, error) => {
  request.log.error({message: error.message, stack: error.stack}, "Eror happend!")
}