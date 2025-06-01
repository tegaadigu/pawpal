import { PROJECT_TYPE } from "../constants.mjs"

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

export const backendPrompts = [
  {
    type: 'confirm',
    name: 'use_database',
    message: 'Does this project require a database?',
    default: true,
    when: (answers) => isBackendProject(answers)
  },
  {
    type: 'input',
    name: 'db_name',
    message: 'Enter the database name:',
    when: (answers) => isBackendProject(answers) && needsDatabase(answers)
  }
].flatMap((_) => _)

export default backendPrompts