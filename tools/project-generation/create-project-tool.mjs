#!/usr/bin/env node
import inquirer from 'inquirer';
import { registerProjectHandlers } from './utils/create-project-handlers.mjs';
import { getTargetDir, validateProjectPath, validateProjectType } from './utils/util.mjs';
import { getHandler, getHandlers } from './utils/register-project-handlers.mjs';
import { logger } from './lib/logger.mjs';
import { backendPrompts } from './prompts/backend-prompts.mjs'
import { PATHS, PROJECT_TYPE } from './constants.mjs';


/**
 * @typedef {Object} ProjectOptions
 * @property {string} project_name
 * @property {string} project_type
 * @property {boolean} use_database
 * @property {string} db_name
 * @property {string} dp_port_number
 * @property {string} service_type
 * @property {string} app_port_number
 */


/**
 * 
 * @returns {import('inquirer').QuestionCollection<ProjectOptions>}
 */
const generatePrompt = () => {
  const handlers = getHandlers()
  const choices = Array.from(handlers.keys()).map((key) => key);
  return [
    {
      type: 'input',
      name: 'project_name',
      message: 'What is the name of the project you would like to create?',
      validate: validateProjectPath
    },
    {
      type: 'input',
      name: 'project_description',
      message: 'In few words, please describe your project',
    },
    {
      type: 'list',
      name: 'project_type',
      message: 'What type of project would you like to create?',
      choices,
      validate: validateProjectType
    },
    ...backendPrompts
  ]
}

/**
 * @returns {ProjectOptions}
 */
const initProject = async () => {
  try {
    // Dynamically register handlers and build project type choices
    registerProjectHandlers();
    const prompt = generatePrompt();
    logger.info('Welcome to @Pawpal service project');
    return await inquirer.prompt(prompt)
  } catch (e) {
    logger.error(e.message);
  }
}


/**
 * @param {ProjectOptions} project_options 
 */
const createProject = async (project_options) => {
  const { project_name, project_type } = project_options
  const projectPath = getTargetDir(project_type === PROJECT_TYPE.BACKEND ? PATHS.BACKEND: PATHS.FRONTEND, project_name)
  logger.info(`Creating project...`)
  logger.info(`Setting up ${project_type} service in DIR .${projectPath}  ...`)
  try {
    // Derive project handler based on type - e.g frontedHandler, backendHandler or BothHandler
    const createProjectHandler = getHandler(project_type);
    await createProjectHandler(project_options);
    logger.info('project created successfully!');
  }
  catch (error) {
    logger.error(error.message)
  }
}

const main = async () => {
  const projectOptions = await initProject();
  await createProject(projectOptions);
}

main();