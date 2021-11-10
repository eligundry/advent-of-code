import * as path from 'path'
import * as fs from 'fs'
import * as readline from 'readline'

interface Instruction {
  command: 'nop' | 'acc' | 'jmp'
  amount: number
}

const parseInput = async (): Promise<Instruction[]> => {
  const instructions: Instruction[] = []
  const input = fs.createReadStream(path.resolve(__dirname, './input.txt'))
  const rl = readline.createInterface({
    input,
    crlfDelay: Infinity,
  })

  for await (const line of rl) {
    const [command, amount] = line.split(' ')
    instructions.push({
      // @ts-ignore
      command,
      amount: parseInt(amount),
    })
  }

  return instructions
}

const fn = async () => {
  let acc = 0
  let currentLine = 0
  const linesRun: number[] = []
  const instructions = await parseInput()

  while (!linesRun.includes(currentLine)) {
    const currentInstruction = instructions[currentLine]
    linesRun.push(currentLine)

    switch (currentInstruction.command) {
      case 'nop':
        currentLine += 1
        break
      case 'jmp':
        currentLine += currentInstruction.amount
        break
      case 'acc':
        acc += currentInstruction.amount
        currentLine += 1
        break
    }
  }

  return acc
}

describe('Day 0: Handheld Halting', () => {
  it('should pass part 1', async () => {
    expect(await fn()).toBe(1586)
  })
})
