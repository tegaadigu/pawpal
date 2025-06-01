
import fs from 'fs';
import path from 'path';
import { PATHS, PROJECT_TYPE } from '../constants.mjs';
import { parse, stringify } from 'yaml';
import { logger } from '../lib/logger.mjs';
import { cp, writeFile, readFile } from 'fs/promises';

/**
 * 
 * @param {string} project_path 
 * @param {string} project_name 
 * @param {string} prefix 
 * @returns {string}
 */
export const getTargetDir = (project_path, project_name, prefix = 'pawpal-') => {
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
  }catch(e) {
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

  if(fs.existsSync(frontendDir)) {
    return `Invalid: project already exists in ${frontendDir}`;
  }

  return true;
}

/**
 * @param {string} project_type 
 * @returns {string|boolean}
 */
export const validateProjectType = (project_type) => {
  if(!Object.values[PROJECT_TYPE].includes(project_type)) {
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
    await cp(templatePath, targetPath, { recursive: true, filter: (src) => {
      const relativePath = path.relative(templatePath, src);
      const isMatch = /^(node_modules|\.git)(\/.*)?$/.test(relativePath);
      return !isMatch
    } })  
  }catch(e) {
    logger.error(`message: ${e.message}  stack: ${e.stack}`)
    throw e;
  }
}

// ------------ Backend Proejct Handler Utils ----------------

export const addBackendRouteToOpenApi = async (projectName) => {
  try {
    const rootpOpenApiPath = path.resolve(process.cwd(), `openapi/openapi.yml`);
    logger.info(`Updating openapi.yml file with backend route`)
    const content = await readYamlFile(rootpOpenApiPath)
    content.paths = { ...content.paths, ...{[`/${projectName}/`]: {'$ref': `../projects/${projectName}/openapi/index.yml`}}}
    const updatedOpenApi = stringify(content);
    await writeFile(rootpOpenApiPath, updatedOpenApi, 'utf8');
  }catch(e) {
    logger.error(`message: ${e.message}  stack: ${e.stack}`)
    throw e;
  }
}

export const updateOpenApiControllerPath = async (projectName, projectPath) => {
  try {
    const rootpOpenApiPath = path.resolve(projectPath, `openapi/index.yml`);
    logger.info(`updating path to controller`)
    let content = await readYamlFile(rootpOpenApiPath)
    content = { ...content, 'x-swagger-router-controller-folder': `projects/${projectName}/controllers`}
    const updatedOpenApi = stringify(content);
    await writeFile(rootpOpenApiPath, updatedOpenApi, 'utf8');
  }catch(e) {
    console.log('error has happened --->', e);
    logger.error(`message: ${e.message}  stack: ${e.stack}`)
    throw e;
  }
}

// ---- Frontend Project Handler Utils ---------

export const updatePackageJson = async (projectPath, params) => {
  try {
    logger.info(`updating package.json with project info..`)
    const packageJsonPath = path.join(projectPath, 'package.json');
    const packageJsonData = await readFile(packageJsonPath, 'utf-8');
    const packageJson = JSON.parse(packageJsonData);


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

export const updateFrontendDetails = async (projectPath, projectName) => {
  await updatePackageJson(projectPath, {
    name: `${projectName}-${PROJECT_TYPE.FRONTEND}`,
    version: '1.0.0'
  })
}