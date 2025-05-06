import { createHandlerUtil } from "@pawpal-service/shared";

const PARK_TYPE = 'park';

export const util = async (request) => {
  const { dbClient } = await createHandlerUtil(request); 
  const { body } = request;

  const parkExists = async () => {
    const { latitude, name, longitude } = body;
    const query = {
      text: "Select latitude, longitude, id from public.places where latitude = $1 AND longitude = $2",
      values: [latitude, longitude]
    }
    const resp = await dbClient.query(query);

    console.log('repsonse from park gotten...', { resp: resp?.rows?.length})
    return resp?.rows?.length > 0;
  }

  const storePark = async () => {
    const { latitude, name, longitude, description, userId  } = body;
    const query = {
      text: "INSERT INTO public.places (name, description, longitude, latitude, user_id, type) values($1, $2, $3, $4, $5, $6)",
      values: [name, description, longitude, latitude, userId, PARK_TYPE]
    }

    const resp = await dbClient.query(query);

    console.log('resp resp --->', { resp })

    return resp?.rows;
  }

  return {
    parkExists,
    storePark
  }
}