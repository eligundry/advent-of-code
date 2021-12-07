import * as path from 'path'
import { readFileByLine } from 'utils'

type Line = [[number, number], [number, number]]
const lineRe = /^(\d+),(\d+) -> (\d+),(\d+)$/

const parseInput = async (): Promise<Line[]> =>
  (await readFileByLine(path.join(__dirname, './input.txt'))).map((line) => {
    const match = lineRe.exec(line)
    return [
      [parseInt(match[1]), parseInt(match[2])],
      [parseInt(match[3]), parseInt(match[4])],
    ]
  })

const drawMap = (map: number[][]) =>
  map.map((yLine) => yLine.map((v) => (v === 0 ? '.' : v)).join('')).join('\n')

const findSumOfMostDangerousLines = (
  lines: Line[],
  size: number = 10
): number => {
  const map = Array.from({ length: size }, () =>
    Array.from({ length: size }, () => 0)
  )

  lines.forEach(([[x1, y1], [x2, y2]]) => {
    // line is vertical if true, horizontal if false
    if (x1 === x2) {
      // console.debug(
      //   `drawing line from ${x1},${Math.min(y1, y2)} -> ${x1},${Math.max(
      //     y1,
      //     y2
      //   )}`
      // )
      for (let y = Math.min(y1, y2); y <= Math.max(y1, y2); y++) {
        map[y][x1]++
      }
    } else if (y1 === y2) {
      // console.debug(
      //   `drawing line from ${Math.min(x1, x2)},${y1} -> ${Math.max(
      //     x1,
      //     x2
      //   )},${y1}`
      // )
      for (let x = Math.min(x1, x2); x <= Math.max(x1, x2); x++) {
        map[y1][x]++
      }
    }
  })

  // console.debug(drawMap(map))

  return map.reduce((acc, yLine) => {
    yLine.forEach((point) => {
      if (point > 1) {
        acc++
      }
    })

    return acc
  }, 0)
}

describe('Day 5: Hydrothermal Venture', () => {
  it('should handle the test input', async () => {
    const lines: Line[] = [
      [
        [0, 9],
        [5, 9],
      ],
      [
        [8, 0],
        [0, 8],
      ],
      [
        [9, 4],
        [3, 4],
      ],
      [
        [2, 2],
        [2, 1],
      ],
      [
        [7, 0],
        [7, 4],
      ],
      [
        [6, 4],
        [2, 0],
      ],
      [
        [0, 9],
        [2, 9],
      ],
      [
        [3, 4],
        [1, 4],
      ],
      [
        [0, 0],
        [8, 8],
      ],
      [
        [5, 5],
        [8, 2],
      ],
    ]
    expect(findSumOfMostDangerousLines(lines)).toBe(5)
  })

  it('should find the most dangerout points for part 1', async () => {
    const lines = await parseInput()
    const answer = findSumOfMostDangerousLines(lines, 1000)
    console.log(`the answer for part 1 is ${answer}`)
    expect(answer).toBeGreaterThan(7318)
  })
})
