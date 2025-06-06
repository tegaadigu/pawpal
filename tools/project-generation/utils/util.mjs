
import fs, { read } from 'fs';
import path from 'path';
import { BACKEND_SERVICE_TYPES, DEFAULT_PREFIX, PATHS, PROJECT_TYPE } from '../constants.mjs';
import { parse } from 'yaml';
import { logger } from '../lib/logger.mjs';
import { cp, writeFile, readFile } from 'fs/promises';
import stripJsonComments from 'strip-json-comments';
import dotenv from "dotenv"

/**
 * 
 * @param {string} project_path 
 * @param {string} project_name 
 * @param {string} prefix 
 * @returns {string}
 */
export const getTargetDir = (project_path, project_name, prefix = DEFAULT_PREFIX) => {
  return path.resolve(process.cwd(), `${project_path}/${prefix}${project_name}`)
}

/**
 * @param {*} project_type 
 * @returns 
 */
export const getTemplateDir = (project_type) => {
  try {
    // @todo - make this a config of some sorts or passed as a parameter.
    const templatePath = project_type === PROJECT_TYPE.FRONTEND ? 'frontend-template' : 'service-template';
    return path.resolve(process.cwd(), `templates/${templatePath}`)
  } catch (e) {
    throw e;
  }
}

/**
 * @param {string} project_name 
 * @returns {boolean}
 */
export const validateProjectPath = (project_name) => {
  if (!project_name) {
    return 'project name cannot be empty'
  }
  const serviceDir = getTargetDir(PATHS.BACKEND, project_name);
  const frontendDir = getTargetDir(PATHS.FRONTEND, project_name)
  if (fs.existsSync(serviceDir)) {
    return `Invalid: project already exists in ${serviceDir}`;
  }

  if (fs.existsSync(frontendDir)) {
    return `Invalid: project already exists in ${frontendDir}`;
  }

  return true;
}

/**
 * @param {string} project_type 
 * @returns {string|boolean}
 */
export const validateProjectType = (project_type) => {
  if (!Object.values[PROJECT_TYPE].includes(project_type)) {
    return 'Invalid Project type';
  }
  return true;
}

/**
 * @param {string} filePath 
 * @returns {Object}
 */
export const readYamlFile = async (filePath) => {
  // const rootpOpenApiPath = path.resolve(filePath);
  const file = await readFile(filePath, 'utf8');
  return parse(file);
}

/**
 * @param {string} templatePath 
 * @param {string} targetPath 
 * @return {Promise<boolean>}
 */
export const copyProjectTemplate = async (templatePath, targetPath) => {
  try {
    logger.info(`Copying template to project..`)
    await cp(templatePath, targetPath, {
      recursive: true, filter: (src) => {
        const relativePath = path.relative(templatePath, src);
        const isMatch = /^(node_modules|\.git)(\/.*)?$/.test(relativePath);
        return !isMatch
      }
    })
  } catch (e) {
    logger.error(`message: ${e.message}  stack: ${e.stack}`)
    throw e;
  }
}

/**
 * @param {string} jsonPath 
 * @returns {Object} 
 */
export const readJsonConfigFIleContent = async (jsonPath) => {
  logger.info(`reading json file from: ${jsonPath}`)
  const packageJsonData = await readFile(jsonPath, 'utf-8');
  const packageJson = JSON.parse(stripJsonComments(packageJsonData));
  return packageJson
}

/**
 * @param {string} projectPath 
 * @param {{
 *    name: string,
 *    description: string,
 *    version: string
 * }} params 
 */
export const updatePackageJson = async (projectPath, params) => {
  try {
    logger.info(`updating package.json with project info..`)
    const packageJsonPath = path.join(projectPath, 'package.json')
    const packageJson = await readJsonConfigFIleContent(packageJsonPath)

    // Update package json params. e.g name, version e.t.c.
    Object.keys(params).forEach((key) => {
      const value = params[key]
      packageJson[key] = value;
    })

    await writeFile(packageJsonPath, JSON.stringify(packageJson, null, 2));
    logger.info(`Updated package.json`)
  } catch (error) {
    console.log('error ->', error);
    logger.error(`message: ${error.message}  stack: ${error.stack}`)
  }
};

/**
 * @param {string} servicePath
 * @param {Object} params 
 */
export const updateRush = async (servicePath, params) => {
  try {
    logger.info(`Adding project configuration to rush config`)
    const rushConfigPath = path.join(servicePath, 'rush.json')
    const jsonContent = await readJsonConfigFIleContent(rushConfigPath)
    Object.keys(params).forEach((key) => {
      const value = params[key]
      jsonContent[key] = value;
    })

    await writeFile(rushConfigPath, JSON.stringify(jsonContent, null, 2));
    logger.info(`Updated rush.json`)
  } catch (error) {
    console.log('error ->', error);
    logger.error(`message: ${error.message}  stack: ${error.stack}`)
  }
}

export const updateFrontendDetails = async (projectPath, projectName) => {
  await updatePackageJson(projectPath, {
    name: `${projectName}-${PROJECT_TYPE.FRONTEND}`,
    version: '1.0.0'
  })
}


/**
 * 
 * @param {string} projectPath 
 * @param {string} fileName
 * @param {import('../create-project-tool.mjs').ProjectOptions} projectOptions 
 */
const configureDocker = async (projectPath, fileName = 'Dockerfile', projectOptions) => {
  const dockerFilePath = path.resolve(projectPath, fileName)
  logger.info(`Updating docker configuration for file ${dockerFilePath}`)

  let content = await readFile(dockerFilePath, 'utf-8')

  const updatedContent = content.replace(/\btemplate\b/g, projectOptions?.project_name);

  await writeFile(dockerFilePath, updatedContent, 'utf-8')

  logger.info(`Successfully updated docker config for ${dockerFilePath}`)
}

/**
 * 
 * @param {string} projectPath 
 * @param {import('../create-project-tool.mjs').ProjectOptions} projectOptions 
 * @returns null
 */
const updateEnvironmentVariable = async (projectPath, projectOptions) => {
  const filePath = path.resolve(projectPath, '.env.example')
  logger.info(`updating environment configuration for file ${filePath}`)
  const content = await readFile(filePath, 'utf8')
  const parsedContent = dotenv.parse(content)

  parsedContent['PORT'] = projectOptions?.app_port_number
  parsedContent['SERVICE_PORT'] = projectOptions?.app_port_number
  parsedContent['DB_PORT'] = projectOptions?.db_port_number
  parsedContent['DB_NAME'] = projectOptions?.db_name

  const newEnvContent = Object.entries(parsedContent)
    .map(([key, value]) => `${key}=${value}`)
    .join('\n');

  await writeFile(filePath, newEnvContent, 'utf-8')

  logger.info(`successfully updated environment variable`)
}

/**
 * @param {string} projectPath
 * @param {import('../create-project-tool.mjs').ProjectOptions} projectOptions 
 */
export const configureBackendProject = async (projectPath, projectOptions) => {
  await configureDocker(projectPath, 'DockerFile', projectOptions)
  await configureDocker(projectPath, 'docker-compose.yml', projectOptions)
  await updateEnvironmentVariable(projectPath, projectOptions)
}