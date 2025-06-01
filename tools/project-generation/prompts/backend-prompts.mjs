import { BACKEND_SERVICE_TYPES, PATHS, PROJECT_TYPE } from "../constants.mjs"
import { readFile, readdir } from 'fs/promises';
import path from 'path';
import dotenv from 'dotenv';

/**
 * This acts as a dictionary for all backend services configuration e.g .env
 * used for services such as port validation to ensure that only unused ports are assigned to created project
 */
const backendEnvDictionary = {};

/**
 * Loads all env file for backend service and create a dictionary of it. e.g
 * This service assumes you have a working project (i.e you have created a .env file and changed it from the .env.example)
 * 
 * {
 *   'services/packages/pawpal-service-name': {
        PORT: '3000',
        HOST: '0.0.0.0',
        DB_HOST: 'localhost',
        DB_PORT: '5433',
        DB_USER: 'postgres',
        DB_PASSWORD: 'password',
        DB_NAME: 'pawpal-db-name',
        LOG_LEVEL: 'info'
      },
 * }
 * 
 * @returns void
 */
const preloadBackendEnv = async () => {
  const dirPath = PATHS.BACKEND;
  const entries = await readdir(dirPath, { withFileTypes: true });
  for(const entry of entries) {
    const fullPath = path.join(dirPath, entry.name)
    // consider recursion? hmmm
    const files = await readdir(fullPath, { withFileTypes: true })
    for(const file of files ) {
      const filePath = path.join(fullPath, file.name)
      if(file.isFile() && file.name === '.env') {
        const content = await readFile(filePath, 'utf8')
        const parsedContent = dotenv.parse(content)
        backendEnvDictionary[fullPath] =  parsedContent
      }
    }
  }
}

/**
 * @param {Object} answers 
 * @returns {boolean}
 */
const isBackendProject = (answers) => {
  return answers.project_type === PROJECT_TYPE.BACKEND
}

/**
 * 
 * @param {Object} answers 
 * @returns {boolean}
 */
const needsDatabase = (answers) => {
  return answers.use_database === true
}

/**
 * @param {string} portType PORT | DB_PORT
 * @throws {Error} {please run preloadBackendEnv before invoking this function}
 * @returns {{
 *    '8080': {
 *      DB_PORT | PORT: '8080'.
 *      PROJECT: 'services/packages/pawpal-service-name'
 *    }
 * }}
 */
const getPORTS = (portType) => {
  if(!Object.values(backendEnvDictionary).length) {
    throw Error("Please run preloadBackendEnv before invoking this function.")
  }

  const ports = {}
  Object.keys(backendEnvDictionary).forEach(key => {
    const envContent = backendEnvDictionary[key]
    if(envContent?.[portType]) {
      ports[envContent?.[portType]] = {
        [portType]: envContent?.[portType],
        PROJECT: key
      }
    }
  }) 
  
  return ports
}

/**
 * @param {string} port_number format: 5001, 8080 
 * @returns {string|boolean}
 */
export const validateDBPortNumber = (port_number) => {
  const portDictionary = getPORTS('DB_PORT')
  if(portDictionary[port_number]) {
    const portDetail = portDictionary[port_number]
    return `Invalid: port number already used by ${portDetail?.PROJECT} try another port number not found here [${Object.keys(portDictionary).toString()}]`;
  }
  return true;
}

/**
 * @param {string} port_number format: 5001, 8080 
 * @returns {string|boolean}
 */
export const validateApplicationPortNumber = (port_number) => {
  const portDictionary = getPORTS('PORT')
  if(portDictionary[port_number]) {
    const portDetail = portDictionary[port_number]
    return `Invalid: port number already used by ${portDetail?.PROJECT} try another port number not found here [${Object.keys(portDictionary).toString()}]`;
  }
  return true;
}

export const backendPrompts = [
  {
    type: 'confirm',
    name: 'use_database',
    message: 'Does this project require a database?',
    default: true,
    when: (answers) => {
      preloadBackendEnv()
      return isBackendProject(answers)
    }
  },
  {
    type: 'input',
    name: 'db_name',
    message: 'Enter the database name:',
    when: (answers) => isBackendProject(answers) && needsDatabase(answers)
  },
  {
    type: 'input',
    name: 'db_port_number',
    message: 'Enter Database port number:',
    when: (answers) => isBackendProject(answers) && needsDatabase(answers),
    validate: validateDBPortNumber
  },
  {
    type: 'list',
    name: 'service_type',
    message: 'What type of backend service would you like to create?',
    choices: [BACKEND_SERVICE_TYPES.RESTFUL, BACKEND_SERVICE_TYPES.EVENT_DRIVEN],
  },
  {
    type: 'input',
    name: 'app_port_number',
    message: 'Enter Application port number:',
    when: (answers) => isBackendProject(answers) && needsDatabase(answers),
    validate: validateApplicationPortNumber
  },
].flatMap((_) => _)

export default backendPrompts