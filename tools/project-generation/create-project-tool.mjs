#!/usr/bin/env node

import inquirer from 'inquirer';
import { registerProjectHandlers } from './utils/create-project-handlers.mjs';
import { validateProjectPath, validateProjectType } from './utils/util.mjs';
import { getHandler, getHandlers } from './utils/register-project-handlers.mjs';
import { logger } from './lib/logger.mjs';
import { backendPrompts } from './prompts/backend-prompts.mjs'

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
      type: 'list',
      name: 'project_type',
      message: 'What type of project would you like to create?',
      choices,
      validate: validateProjectType
    },
    ...backendPrompts
  ]
}

const initProject = async () => {
  try {
    // Dynamically register handlers and build project type choices
    registerProjectHandlers();
    const prompt = generatePrompt();
    console.log('prompt --->'. prompt);
    logger.info('Welcome to @Pawpal service project');
    return await inquirer.prompt(prompt)
  } catch (e) {
    logger.error(e.message);
  }
}


const createProject = async (project_name, project_type) => {
  logger.info(`Creating project...`)
  logger.info(`Setting up ${project_type} in DIR ./projects/${project_name}  ...`)
  try {
    // Derive project handler based on type - e.g frontedHandler, backendHandler or BothHandler
    const createProjectHandler = getHandler(project_type);
    await createProjectHandler(project_name, project_type);
    logger.info('project created successfully!');
  }
  catch (error) {
    logger.error(error.message)
  }
}

const main = async () => {
  const { project_name, project_type } = await initProject();
  await createProject(project_name, project_type);
}

main();