import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { constants } from 'node:fs'
import { readFile, writeFile, readdir, access } from 'node:fs/promises'
import { copyFileSync } from 'node:fs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

/**
 * @param {string} filePath 
 */
const pathExists = async (filePath) => {
  try {
    await access(filePath, constants.F_OK);
    return true;
  } catch (e) {
    return false
  }
}

const start = async () => {
    const backendServicesPath = path.join(__dirname, '../../../packages')
    const entries = await readdir(backendServicesPath, { withFileTypes: true })
    for(const entry of entries) {
      const envExamplePath = path.resolve(entry.path, `${entry.name}/.env.example`)
      const envPath = path.resolve(entry.path, `${entry.name}/.env`)
      const hasEnvExample = await pathExists(envExamplePath)
      const hasExistingEnv = await pathExists(envPath)
      
      if(!hasEnvExample) { //Skip if already has a .env creatd.
        console.log(`skipping - ${entry.path}/${entry.name}:${!hasEnvExample ? 'No .env.example file detected': '.env has already been created'}\n`)
        continue
      }
      if(hasExistingEnv) {
        console.log(`overwriting - ${entry.path}/${entry.name}\n`)
      }
      copyFileSync(envExamplePath, path.resolve(entry.path, `${entry.name}/.env`))
      console.log(`successfully created .env for ${entry.name} \n\n`)
    }
}

start();