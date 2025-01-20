export const createHandlerUtil = async(request) => {
  const { db } = request;
  const dbClient = await db.connect();

  const commonUtil = {
    dbClient
  }

  return commonUtil;
}