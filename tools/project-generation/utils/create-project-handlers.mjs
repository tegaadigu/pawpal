import { DEFAULT_PREFIX, PATHS, PROJECT_TYPE } from "../constants.mjs";
import { registerHandler } from "./register-project-handlers.mjs";
import { 
  getTargetDir, 
  getTemplateDir, 
  copyProjectTemplate,
  updatePackageJson, 
  updateRush,
  readJsonConfigFIleContent
} from "./util.mjs";
import { logger } from '../lib/logger.mjs';
import path from 'path';

/**
 * @param {import("../create-project-tool.mjs").ProjectOptions} project_options 
 */
export const createFrontendProject = async(projectName) => {
  try {
    logger.info(`Creating Frontend Project.. pending implementation ${projectName}`);

  }catch(e) {
    logger.error(`Failed to create project! error: ${e.message}, stack: ${e.stack}`)
  }
}

/**
 * @param {import("../create-project-tool.mjs").ProjectOptions} project_options 
 */
export const createBackendProject = async(project_options) => {
 const { project_name, project_description } = project_options
  try {
    logger.info(`Creating Backend Project..`);
    const packageName = `@pawpal-service/${project_name}`
    const targetPath = getTargetDir(PATHS.BACKEND, project_name)
    const templatePath = getTemplateDir(PROJECT_TYPE.BACKEND)
    await copyProjectTemplate(templatePath, targetPath);
    const packageJSONUpdate = {
      name: packageName,
      description: project_description
    }
    await updatePackageJson(targetPath, packageJSONUpdate)
    const rushPath = path.resolve(process.cwd(), `services/`)
    const rushContent = await readJsonConfigFIleContent(path.resolve(rushPath, 'rush.json'))
    await updateRush(rushPath, {
      ...rushContent,
      projects: [
        ...rushContent.projects,
        {
          "packageName": packageName,
          "projectFolder": `packages/${DEFAULT_PREFIX}${project_name}`,
          "versionPolicyName": "PublishPackage",
          "shouldPublish": true
        }
      ]
    })
    // Configure Project docker file. docker-compose - and .env based on project options.
    // await configureProject(project_options)
    logger.info(`Successfully created Backend Project..`);
  } catch(e) {
    logger.error(`Failed to create project! error: ${e.message}, stack: ${e.stack}`)
  }
}

/**
 * @param {import("../create-project-tool.mjs").ProjectOptions} project_options 
 */
export const createFrontedAndBackendProject = async(project_options) => {
  try {
    await createBackendProject(project_options);
    await createFrontendProject(project_options);
  }catch(e) {
    logger.error(`Failed to create project! error: ${e.message}, stack: ${e.stack}`)
  }
}


export const registerProjectHandlers = () => {
  // registerHandler(PROJECT_TYPE.FRONTEND, createFrontendProject);
  registerHandler(PROJECT_TYPE.BACKEND, createBackendProject);
  // registerHandler(PROJECT_TYPE.BOTH, createFrontedAndBackendProject);
}