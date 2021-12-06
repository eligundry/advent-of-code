import * as path from 'path'
import cloneDeep from 'lodash/cloneDeep'
import { readFileByLine } from 'utils'

type Board = Array<Map<number, boolean>>

const parseInput = async (): Promise<[number[], Board[]]> => {
  const lines = await readFileByLine(path.join(__dirname, './input.txt'))
  let drawnNumbers: number[] = []
  let boards: Board[] = []
  let currentBoard: Board = []

  for (let i = 0; i < lines.length; i++) {
    if (i === 0) {
      drawnNumbers = lines[i].split(',').map((num) => parseInt(num))
      continue
    }

    if (!lines[i].trim()) {
      if (currentBoard.length) {
        boards.push(currentBoard)
        currentBoard = []
      }

      continue
    }

    currentBoard.push(
      new Map(
        // @ts-ignore
        lines[i]
          .split(' ')
          .map((num) => [parseInt(num), false])
          .filter(([num]) => !Number.isNaN(num))
      )
    )
  }

  return [drawnNumbers, boards]
}

const isBoardWinner = (board: Board): boolean => {
  let vertical = [true, true, true, true, true]

  for (let rowIndex = 0; rowIndex < board.length; rowIndex++) {
    const horizontal = [...board[rowIndex]]
      .map(([, marked], colIndex) => {
        vertical[colIndex] = vertical[colIndex] && marked
        return marked
      })
      .every((marked) => marked)

    if (horizontal) {
      return true
    }
  }

  return vertical.some((winner) => winner)
}

const calculateWinningNumber = (board: Board, numberPulled: number): number => {
  let unmarkedSum = 0

  board.forEach((row) => {
    row.forEach((marked, num) => {
      if (!marked) {
        unmarkedSum += num
      }
    })
  })

  return unmarkedSum * numberPulled
}

const bingo = (
  drawnNumbers: number[],
  boards: Board[],
  findLastWinner: boolean = false
): number => {
  let winningBoards = boards.map(() => false)

  for (let i = 0; i < drawnNumbers.length; i++) {
    const numberPulled = drawnNumbers[i]

    for (let boardIndex = 0; boardIndex < boards.length; boardIndex++) {
      for (let rowIndex = 0; rowIndex < boards[boardIndex].length; rowIndex++) {
        if (boards[boardIndex][rowIndex].has(numberPulled)) {
          boards[boardIndex][rowIndex].set(numberPulled, true)
        }
      }

      if (isBoardWinner(boards[boardIndex])) {
        winningBoards[boardIndex] = true

        if (!findLastWinner || winningBoards.every((win) => win)) {
          return calculateWinningNumber(boards[boardIndex], numberPulled)
        }
      }
    }
  }

  return 0
}

describe('Day 4: Giant Squid', () => {
  const testDrawnNumbers = [
    7, 4, 9, 5, 11, 17, 23, 2, 0, 14, 21, 24, 10, 16, 13, 6, 15, 25, 12, 22, 18,
    20, 8, 19, 3, 26, 1,
  ]
  const testBoards: Board[] = [
    [
      new Map([
        [22, false],
        [13, false],
        [17, false],
        [11, false],
        [0, false],
      ]),
      new Map([
        [8, false],
        [2, false],
        [23, false],
        [4, false],
        [24, false],
      ]),
      new Map([
        [21, false],
        [9, false],
        [14, false],
        [16, false],
        [7, false],
      ]),
      new Map([
        [6, false],
        [10, false],
        [3, false],
        [18, false],
        [5, false],
      ]),
      new Map([
        [1, false],
        [12, false],
        [20, false],
        [15, false],
        [19, false],
      ]),
    ],
    [
      new Map([
        [3, false],
        [15, false],
        [0, false],
        [2, false],
        [22, false],
      ]),
      new Map([
        [9, false],
        [18, false],
        [13, false],
        [17, false],
        [5, false],
      ]),
      new Map([
        [19, false],
        [8, false],
        [7, false],
        [25, false],
        [23, false],
      ]),
      new Map([
        [20, false],
        [11, false],
        [10, false],
        [24, false],
        [4, false],
      ]),
      new Map([
        [14, false],
        [21, false],
        [16, false],
        [12, false],
        [6, false],
      ]),
    ],
    [
      new Map([
        [14, false],
        [21, false],
        [17, false],
        [24, false],
        [4, false],
      ]),
      new Map([
        [10, false],
        [16, false],
        [15, false],
        [9, false],
        [19, false],
      ]),
      new Map([
        [18, false],
        [8, false],
        [23, false],
        [26, false],
        [20, false],
      ]),
      new Map([
        [22, false],
        [11, false],
        [13, false],
        [6, false],
        [5, false],
      ]),
      new Map([
        [2, false],
        [0, false],
        [12, false],
        [3, false],
        [7, false],
      ]),
    ],
  ]

  it('should handle the test input', async () => {
    expect(bingo(testDrawnNumbers, cloneDeep(testBoards))).toBe(4512)
  })

  it('should find the answer for part 1', async () => {
    const [numbersDrawn, boards] = await parseInput()
    const answer = bingo(numbersDrawn, boards)
    console.log(`the answer for part 1 is ${answer}`)
    expect(answer).toBe(10374)
  })

  it('should find the board that wins last from the example', async () => {
    expect(bingo(testDrawnNumbers, cloneDeep(testBoards), true)).toBe(1924)
  })

  it('should find the answer for part 2', async () => {
    const [numbersDrawn, boards] = await parseInput()
    const answer = bingo(numbersDrawn, boards, true)
    console.log(`the answer for part 2 is ${answer}`)
    expect(answer).toBe(24742)
  })
})
