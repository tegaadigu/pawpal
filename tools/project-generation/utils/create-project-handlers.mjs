import { PATHS, PROJECT_TYPE } from "../constants.mjs";
import { registerHandler, getHandlers } from "./register-project-handlers.mjs";
import { 
  getTargetDir, 
  getTemplateDir, 
  copyProjectTemplate, 
  addBackendRouteToOpenApi,
  updateOpenApiControllerPath,
  updateFrontendDetails
} from "./util.mjs";
import { logger } from '../lib/logger.mjs';

export const createFrontendProject = async(projectName) => {
  try {
    logger.info(`Creating Frontend Project.. pending implementation ${projectName}`);
    // const targetPath = getTargetDir(projectName, PROJECT_TYPE.FRONTEND)
    // const templatePath = getTemplateDir(PROJECT_TYPE.FRONTEND)
    // await copyProjectTemplate(templatePath, targetPath);
    // await updateFrontendDetails(targetPath, projectName);
    // logger.info(`Successfully created Frontend Project..`);
  }catch(e) {
    logger.error(`Failed to create project! error: ${e.message}, stack: ${e.stack}`)
  }
}

export const createBackendProject = async(projectName) => {
  try {
    logger.info(`Creating Backend Project..`);
    const targetPath = getTargetDir(PATHS.BACKEND, projectName)
    const templatePath = getTemplateDir(PROJECT_TYPE.BACKEND)
    console.log('template path -->', { templatePath })
    // await copyProjectTemplate(templatePath, targetPath);
    // await addBackendRouteToOpenApi(projectName)
    // await updateOpenApiControllerPath(projectName, targetPath);
    logger.info(`Successfully created Backend Project..`);
  } catch(e) {
    logger.error(`Failed to create project! error: ${e.message}, stack: ${e.stack}`)
  }
}

export const createFrontedAndBackendProject = async(projectName) => {
  try {
    await createBackendProject(projectName);
    await createFrontendProject(projectName);
  }catch(e) {
    logger.error(`Failed to create project! error: ${e.message}, stack: ${e.stack}`)
  }
}


export const registerProjectHandlers = () => {
  registerHandler(PROJECT_TYPE.FRONTEND, createFrontendProject);
  registerHandler(PROJECT_TYPE.BACKEND, createBackendProject);
  registerHandler(PROJECT_TYPE.BOTH, createFrontedAndBackendProject);
}