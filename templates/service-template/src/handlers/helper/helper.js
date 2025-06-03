export const sayHello = async (request) => {
  // get database client from request.
  // const { pgClient } = request;
  return { message: 'Hello world!'}
}