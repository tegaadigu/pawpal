import { readFile } from 'node:fs/promises'

/**
 * @param {string} str 
 * @param {string} prefix 
 * @returns {string}
 */
export const toCamelCaseAfterPrefix = (str, prefix = 'pawpal-') => {
  if (!str.startsWith(prefix)) return str;

  const parts = str.slice(prefix.length).split('-');

  return parts
    .map((word, index) =>
      index === 0 ? word : word[0].toUpperCase() + word.slice(1)
    )
    .join('');
}

/**
 * @param {string} path 
 * @returns {object}
 */
export const  loadEnvFile = async (path = '.env') => {
  const content = await readFile(path, 'utf-8');

  const env = {};
  for (const line of content.split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;

    const [key, ...rest] = trimmed.split('=');
    env[key] = rest.join('=').trim();
  }

  return env;
}