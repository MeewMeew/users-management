import { readFileSync } from 'fs'
export function toString(theme: 'dark' | 'outline') {
  return readFileSync(`./src/swagger/theme/${theme}.css`, 'utf8')
}