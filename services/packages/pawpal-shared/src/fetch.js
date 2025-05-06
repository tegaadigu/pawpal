import nodeFetch from 'node-fetch';

/**
 * @param {string} url 
 * @param {Object} options 
 * @params {}
 */
const fetch = async (url, options = {}) => {
  // @todo configure headers for server to server fetch. 
  // @todo hook this to an external logger for capturing http error logs. 
  return await nodeFetch(url, options);
}

const fetchJSON = async (url, options = {}) => {
  const defaultHeaders = {
    'Content-Type': 'application/json',
    ...(options?.headers || {})
  }

  // Ensure body is stringified if it's an object
  if (options.body && typeof options.body === 'object') {
    options.body = JSON.stringify(options.body);
  }

  const response = await fetch(url, { ...options, headers: defaultHeaders })

  if(!response.ok) {
    console.log('response and eevrything --->', response);
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  return response.json();
}

export { fetch, fetchJSON };

export default fetch;