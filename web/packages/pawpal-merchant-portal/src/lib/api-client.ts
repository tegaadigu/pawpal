import { ApiClient } from '@pawpal-web/utils/lib/api-client.js';

export const getApiClient = () => {
  return new ApiClient()
}

export const apiClient = getApiClient();