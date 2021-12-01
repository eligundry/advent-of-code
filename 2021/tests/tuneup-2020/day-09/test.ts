import * as path from 'path'
import { readFileByLine } from 'utils'

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
  linesRun: Set<number>
  exitCode: 0 | 1
}

const runInstructions = (instructions: Instruction[]): ProgramOutput => {
  let currentLine = 0
  const output: ProgramOutput = {
    acc: 0,
    linesRun: new Set<number>(),
    exitCode: 1,
  }

  // Exit if we see the same line twice
  while (!output.linesRun.has(currentLine)) {
    const currentInstruction = instructions[currentLine]
    output.linesRun.add(currentLine)

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

    if (currentLine === instructions.length) {
      output.exitCode = 0
      return output
    }
  }

  return output
}

const fn = async (applyFix: boolean) => {
  const instructions = await parseInput()
  const buggyOutput = runInstructions(instructions)

  if (!applyFix) {
    return buggyOutput
  }

  for (let i = 0; i < instructions.length; i++) {
    if (instructions[i].command === 'acc') {
      continue
    }

    const updatedInstructions = [...instructions]
    updatedInstructions[i].command =
      updatedInstructions[i].command === 'nop' ? 'jmp' : 'nop'
    const updatedOutput = runInstructions(updatedInstructions)

    if (updatedOutput.exitCode === 0) {
      return updatedOutput
    }
  }

  return buggyOutput
}

describe('Day 0: Handheld Halting', () => {
  it('should pass part 1', async () => {
    const output = await fn(false)
    expect(output.acc).toBe(1586)
    expect(output.exitCode).toBe(1)
  })

  it('should pass part 2', async () => {
    const output = await fn(true)
    // console.log({ output })
    expect(output.exitCode).toBe(0)
  })
})
