import { parse } from 'yaml'
import path from 'node:path'
import { readFile, writeFile, readdir, access } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import * as prettier from 'prettier'
import { constants } from 'node:fs'
import { loadEnvFile, toCamelCaseAfterPrefix } from '../utils/util.js'
import { getApiClientJSContent } from './api-client-js-content.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

/**
 * @typedef OpenApiPaths
 * @type {object}
 * @property {string} baseUrl
 * @property {Array<string>} paths
 */

/**
 * @param {string} dir 
 * @param {fileFormat} format
 * @returns 
 */
const loadFiles = async (dir, format = '') => {
  const files = await readdir(dir)
  if (format) {
    return files.filter(file => file.endsWith(format)).map(file => path.join(dir, file))
  }
  return files.map((file) => path.join(dir, file));
}

/**
 * @param {string} filePath 
 */
const pathExists = async (filePath) => {
  try {
    await access(filePath, constants.F_OK);
    return true;
  } catch (e) {
    console.log('path does not exist: ', e.message)
    return false
  }
}

/**
 * @param {*} entries 
 * @returns 
 */
const getOpenApiPaths = async (entries) => {
  const openApiPaths = {};
  for (const entry of entries) {
    const openApiPath = path.resolve(entry.path, `${entry.name}/src/openapi`)
    const envPath = path.resolve(entry.path, `${entry.name}/.env`)
    const hasOpenApiPath = await pathExists(openApiPath)
    const hasEnvPath = await pathExists(envPath)

    if (hasOpenApiPath && hasEnvPath) {
      const appName = toCamelCaseAfterPrefix(entry.name)
      const config = await loadEnvFile(envPath)
      openApiPaths[appName] = {
        baseUrl: `http://${config.HOST}:${config.PORT}`,
        paths: await loadFiles(openApiPath, ".yml")
      }
    }
  }

  console.log('openApiPaths ---->', openApiPaths)
  return openApiPaths
}

const updateApiClientDefinition = async (apiClientDef, document) => {
  for (const [key, def] of Object.entries(document.paths)) {
    let _def = structuredClone(def)
    if (def.$ref) {
      const refDoc = await readFile(path.join(openApiPath, def.$ref), {
        encoding: 'utf-8',
      })
      const refValue = parse(refDoc)
      _def = refValue
    }
    apiClientDef.push({ path: key, def: _def })
  }
}

const buildApiClientFromDefinition = async (appName, baseUrl, client, apiClientDef) => {
  for (const { path, def } of apiClientDef) {
    const functions = {}
    for (const [method, value] of Object.entries(def)) {
      if (['get', 'post', 'put', 'delete'].includes(method)) {
        const params = path.match(/{(.*?)}/g)?.map((param) => param.slice(1, -1)) ?? []
        functions[value.operationId] = {
          method,
          path,
          responses: value.responses,
          params,
        }
      }
    }
    client[appName] = {
      baseUrl,
      ...client[appName],
      ...functions
    }
  }
}

/**
 * @param {Object<string, OpenApiPaths>} openApiPaths
 * @returns 
 */
const createApiClient = async (openApiPaths) => {
  const client = {}
  for (const key in openApiPaths) {
    const openAPiPath = openApiPaths[key];
    for (const apiPath of openAPiPath.paths) {
      const doc = await readFile(path.resolve(apiPath), {
        encoding: 'utf-8',
      })
      const document = parse(doc)
      const apiClientDef = []
      // Skip schema files..
      if (!document?.paths) {
        continue;
      }
      await updateApiClientDefinition(apiClientDef, document)
      await buildApiClientFromDefinition(key, openAPiPath.baseUrl, client, apiClientDef)
    }
  }
  return client;
}

const populateApiClientJSContent = (apiClient) => {
  let apiClientJsContent = getApiClientJSContent(apiClient);
  for (const [namespace, functions] of Object.entries(apiClient)) {
    delete functions.baseUrl
    apiClientJsContent += `
  
  ${namespace} = {
    ${Object.entries(functions).map(
      ([name, { method, path, params }]) => `
    /**
     * ${name}
     ${params.length > 0 ? params.map((param) => `* @param {string} ${param}`) : ''}
     * @param {RequestInit} args
    */
    ${name}: (${params.length > 0 ? params.join(', ') + ',' : ''}args) => {
      let url = \`\${this._getUrl('${namespace}')}${path}\`
      ${params.map((param) => `url = url.replace('{${param}}', ${param})`).join('\n')}
      return this._fetch(url, {
        method: '${method.toUpperCase()}',
        ...args,
        headers: {
          ...this.headers,
          ...args?.headers,
        },
        credentials: 'include',
      })
    }`,
    )}
  }
`
  }
  apiClientJsContent += `}`

  return apiClientJsContent;
}

const writeApiClientToJsFile = async (apiClientJsContent) => {
  const formattedFileContent = await prettier.format(apiClientJsContent, {
    parser: 'babel',
    useTabs: false,
    tabWidth: 2,
    semi: false,
    printWidth: 120,
    singleQuote: true,
    trailingComma: 'all',
  })
  const jsFilePath = path.join(__dirname, '../src/lib/api-client.js')
  console.log('\n\njsFilePath ->', jsFilePath);
  await writeFile(jsFilePath, formattedFileContent, {
    encoding: 'utf-8',
  })
  console.log(`Generated ${jsFilePath}`)
}

async function main() {
  const backendServicesPath = path.join(__dirname, '../../../../services/packages')
  const entries = await readdir(backendServicesPath, { withFileTypes: true })
  const openApiPaths = await getOpenApiPaths(entries)
  const client = await createApiClient(openApiPaths)
  const apiClientJsContent = await populateApiClientJSContent(client)
  await writeApiClientToJsFile(apiClientJsContent)
  return
}

main()
