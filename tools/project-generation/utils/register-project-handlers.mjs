import { logger } from "../lib/logger.mjs";

const projectHandlerRegistry = new Map();

export const registerHandler = (project_type, handler) => {
  if(projectHandlerRegistry.has(project_type)) {
    logger.error(`handler for ${project_type} is already registered`)
    throw new Error('Handler for ${project_type} is already registered');
  }
  projectHandlerRegistry.set(project_type, handler);
}

export const getHandler = (project_type) => {
  if(!projectHandlerRegistry.has(project_type)) {
    logger.error(`Project handler does not exist for: ${project_type}`)
    throw new Error(`Project Handler does not exist for : ${project_type}`)
  }

  return projectHandlerRegistry.get(project_type);
}

export const getHandlers = () => {
  return projectHandlerRegistry;
}