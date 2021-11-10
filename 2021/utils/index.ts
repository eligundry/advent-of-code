import * as fs from 'fs'
import * as readline from 'readline'

export const readFileByLine = async (path: string): Promise<string[]> => {
  const lines: string[] = []
  const input = fs.createReadStream(path)
  const rl = readline.createInterface({
    input,
    crlfDelay: Infinity,
  })

  for await (const line of rl) {
    lines.push(line)
  }

  return lines
}
