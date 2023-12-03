import fs from 'node:fs/promises'
import path from 'node:path'

export const readInputIntoLines = async (day: string): Promise<string[]> =>
  fs
    .readFile(path.join('src', 'inputs', `${day}.txt`), 'utf-8')
    .then((s) => s.split('\n'))

