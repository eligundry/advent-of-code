// copied and pasted from https://leetcode.com/problems/combinations/discuss/738165/JavaScript
function findCombination(
  n: number,
  k: number,
  position: number,
  seq: number[],
  mutRes: number[][]
) {
  // it's helpful to see how this changes
  console.log({ n, k, position, seq, mutRes })

  if (k === 0) {
    mutRes.push([...seq])
    return
  }

  if (position > n) {
    return
  }

  seq.push(position)
  findCombination(n, k - 1, position + 1, seq, mutRes)
  seq.pop()
  findCombination(n, k, position + 1, seq, mutRes)
}

function combine(n: number, k: number): number[][] {
  const mutRes = []
  findCombination(n, k, 1, [], mutRes)
  return mutRes
}

describe('77. Combinations', () => {
  test.concurrent.each([
    [
      4,
      2,
      [
        [2, 4],
        [3, 4],
        [2, 3],
        [1, 2],
        [1, 3],
        [1, 4],
      ],
    ],
    // [1, 1, [[1]]],
  ])('combine(%d, %d) === %j', (n, k, result) =>
    expect(combine(n, k)).toEqual(expect.arrayContaining(result))
  )
})
