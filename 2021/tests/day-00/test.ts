import * as path from 'path'
import { readFileByLine } from '../../utils'

interface Instruction {
  command: 'nop' | 'acc' | 'jmp'
  amount: number
}

const parseInput = async (): Promise<Instruction[]> =>
  (await readFileByLine(path.resolve(__dirname, './input.txt'))).map(
    (line): Instruction => {
      const [command, amount] = line.split(' ')
      return {
        // @ts-ignore
        command,
        amount: parseInt(amount),
      }
    }
  )

interface ProgramOutput {
  acc: number
  linesRun: number[]
}

const runInstructions = (instructions: Instruction[]): ProgramOutput => {
  let currentLine = 0
  const output: ProgramOutput = {
    acc: 0,
    linesRun: [],
  }

  // Exit if we see the same line twice OR we hit the end of the file
  while (
    !output.linesRun.includes(currentLine) ||
    currentLine + 1 === instructions.length
  ) {
    const currentInstruction = instructions[currentLine]
    output.linesRun.push(currentLine)

    switch (currentInstruction.command) {
      case 'nop':
        currentLine += 1
        break
      case 'jmp':
        currentLine += currentInstruction.amount
        break
      case 'acc':
        output.acc += currentInstruction.amount
        currentLine += 1
        break
    }
  }

  return output
}

const fn = async (applyFix: boolean) => {
  const instructions = await parseInput()
  const buggyOutput = runInstructions(instructions)

  if (!applyFix) {
    return buggyOutput.acc
  }

  return buggyOutput.acc
}

describe('Day 0: Handheld Halting', () => {
  it('should pass part 1', async () => {
    expect(await fn(false)).toBe(1586)
  })

  it('should pass part 2', async () => {
    expect(await fn(true)).toBe(1586)
  })
})
