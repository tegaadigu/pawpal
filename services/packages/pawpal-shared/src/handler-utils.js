export const createHandlerUtil = async(request) => {
  const { pgClient } = request;

  const commonUtil = {
    dbClient: pgClient
  }

  return commonUtil;
}