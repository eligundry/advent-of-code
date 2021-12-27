type Coordinate = [number, number]

const isValidCell = ([x, y]: Coordinate, invalidCells: Coordinate[]): boolean =>
  !invalidCells.find(([ix, iy]) => ix === x && iy === y)

function findNeighbors(
  board: string[][],
  startingCoordinates: Coordinate,
  letter: string,
  invalidCells: Coordinate[]
): Coordinate[] | false {
  let [x, y] = startingCoordinates
  const neighbors: Coordinate[] = []

  // Check above
  if (
    y > 0 &&
    board[y - 1][x] === letter &&
    isValidCell([x, y - 1], invalidCells)
  ) {
    neighbors.push([x, y - 1])
  }

  // Check below
  if (
    y < board.length - 1 &&
    board[y + 1][x] === letter &&
    isValidCell([x, y + 1], invalidCells)
  ) {
    neighbors.push([x, y + 1])
  }

  // Check left
  if (
    x > 0 &&
    board[y][x - 1] === letter &&
    isValidCell([x - 1, y], invalidCells)
  ) {
    neighbors.push([x - 1, y])
  }

  // console.log([
  //   board,
  //   y,
  //   board[y].length,
  //   x < board[y].length - 1,
  //   board[y][x + 1] === letter,
  //   isValidCell([x + 1, y], invalidCells),
  // ])

  // Check right
  if (
    x < board[y].length - 1 &&
    board[y][x + 1] === letter &&
    isValidCell([x + 1, y], invalidCells)
  ) {
    neighbors.push([x + 1, y])
  }

  return neighbors.length > 0 ? neighbors : false
}

const findPath = (
  board: string[][],
  word: string,
  [x, y]: Coordinate,
  path: Coordinate[]
): Coordinate[] | false => {
  if (!word[1]) {
    return path
  }

  // iterate through the letters in the word
  const neighbors = findNeighbors(board, [x, y], word[1], path)
  // console.log({ path, word, neighbors, letter: word[1] })

  if (!neighbors) {
    return false
  }

  for (let n = 0; n < neighbors.length; n++) {
    const possiblePath = findPath(board, word.substring(1), neighbors[n], [
      ...path,
      neighbors[n],
    ])

    if (possiblePath) {
      return possiblePath
    }
  }

  return false
}

function exist(board: string[][], word: string): boolean {
  for (let y = 0; y < board.length; y++) {
    for (let x = 0; x < board[y].length; x++) {
      if (board[y][x] === word[0]) {
        const path = findPath(board, word, [x, y], [[x, y]])

        if (path) {
          console.log({ path })
          return true
        }
      }
    }
  }

  return false
}

describe('79. Word Search', () => {
  test.concurrent.each([
    [
      [
        ['A', 'B', 'C', 'E'],
        ['S', 'F', 'C', 'S'],
        ['A', 'D', 'E', 'E'],
      ],
      'ABCCED',
      true,
    ],
    [
      [
        ['A', 'B', 'C', 'E'],
        ['S', 'F', 'C', 'S'],
        ['A', 'D', 'E', 'E'],
      ],
      'SEE',
      true,
    ],
  ])('exist(board = %j, word = %s) === %s', (board, word, result) =>
    expect(exist(board, word)).toBe(result)
  )

  it('should make sure that findNeighbors works right', async () => {
    expect(
      findNeighbors([['A', 'B', 'C', 'D']], [1, 0], 'C', [
        [0, 0],
        [1, 0],
      ])
    ).toEqual([[2, 0]])
  })
})
