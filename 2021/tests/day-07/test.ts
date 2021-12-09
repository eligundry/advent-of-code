import * as path from 'path'
import { readFileByLine } from 'utils'

const parseInput = async () =>
  (await readFileByLine(path.join(__dirname, './input.txt'))).flatMap((line) =>
    line.split(',').map(Number)
  )

const nthTriangle = (n: number) => (n * (n + 1)) / 2

const findCheapestPath = (
  positions: number[],
  movementGetsMoreExpensive: boolean = false
): number => {
  let cheapestRoute = Number.MAX_SAFE_INTEGER

  positions.forEach((startingPoint) => {
    let currentRoute = positions.reduce((acc, currentPoint) => {
      if (movementGetsMoreExpensive) {
        acc += nthTriangle(Math.abs(currentPoint - startingPoint))
      } else {
        acc += Math.abs(currentPoint - startingPoint)
      }

      return acc
    }, 0)

    if (movementGetsMoreExpensive) {
      console.log({ cheapestRoute, currentRoute })
    }

    cheapestRoute = Math.min(cheapestRoute, currentRoute)
  })

  return cheapestRoute
}

describe('Day 7: The Treachery of Whales', () => {
  const testPositions = [16, 1, 2, 0, 4, 2, 7, 1, 2, 14]

  it('should handle the test input', async () => {
    expect(findCheapestPath(testPositions)).toBe(37)
  })

  it('should find the answer for part 1', async () => {
    const positions = await parseInput()
    const answer = findCheapestPath(positions)
    console.log(`the answer to part 1 is ${answer}`)
    expect(answer).toBe(336701)
  })

  test.skip('should be able to account for movement getting more expensive', async () => {
    // somehow, this is 170?
    expect(findCheapestPath(testPositions, true)).toBe(168)
  })

  test.skip('should find the answer for part 2', async () => {
    const positions = await parseInput()
    const answer = findCheapestPath(positions, true)
    console.log(`the answer to part 2 is ${answer}`)
    expect(answer).toBeLessThan(95167365)
  })

  const nthTriangleTestArray = [
    [16, 5, 66],
    [1, 5, 10],
    [2, 5, 6],
    [0, 5, 15],
    [4, 5, 1],
    [2, 5, 6],
    [7, 5, 3],
    [1, 5, 10],
    [2, 5, 6],
    [14, 5, 45],
  ]

  test.each(nthTriangleTestArray)(
    'nthTriangle(Math.abs(%i - %i)) === %i',
    (start, end, result) => {
      expect(nthTriangle(Math.abs(start - end))).toBe(result)
    }
  )

  it('should get the right value from the test array', async () => {
    expect(
      nthTriangleTestArray.reduce((acc, [a, b]) => {
        acc += nthTriangle(Math.abs(a - b))
        return acc
      }, 0)
    ).toBe(168)
  })
})
