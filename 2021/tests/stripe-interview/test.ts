const computePenalty = (log: string, closingTime: number): number => {
  let penalty = 0
  const cleanedLog = log.replace(/\s/g, '')

  for (let i = 0; i < cleanedLog.length; i++) {
    if (cleanedLog[i] === 'Y' && i >= closingTime) {
      penalty++
    } else if (cleanedLog[i] === 'N' && i < closingTime) {
      penalty++
    }
  }

  return penalty
}

const find_best_closing_time = (log: string): number => {
  let bestClosingTime = 0
  let lowestPenalty = Number.MAX_SAFE_INTEGER
  const cleanedLog = log.replace(/\s/g, '')

  for (
    let currentClosingTime = 0;
    currentClosingTime <= cleanedLog.length;
    currentClosingTime++
  ) {
    const penalty = computePenalty(log, currentClosingTime)

    if (penalty < lowestPenalty) {
      bestClosingTime = currentClosingTime
      lowestPenalty = penalty
    }
  }

  return bestClosingTime
}

const get_best_closing_times = (logs: string): number[] => {
  const bestClosingTimes: number[] = []
  const tokens = logs.replace(/(\r\n|\n|\r)/gm, '').split(' ')

  tokens.forEach((outerToken, i) => {
    if (outerToken !== 'BEGIN') {
      return
    }

    let logAcc = ''

    for (let j = i + 1; j < tokens.length; j++) {
      switch (tokens[j]) {
        case 'BEGIN':
          return
        case 'Y':
        case 'N':
          logAcc += tokens[j]
          break
        case 'END':
          bestClosingTimes.push(find_best_closing_time(logAcc))
          return
      }
    }
  })

  return bestClosingTimes
}

describe('Stripe Zoom Interview', () => {
  it('should handle ex 1', async () => {
    expect(computePenalty('Y Y N Y', 0)).toBe(3)
  })

  it('should handle ex 2', async () => {
    expect(computePenalty('N Y N Y', 2)).toBe(2)
  })

  it('should handle ex 3', async () => {
    expect(computePenalty('Y Y N Y', 4)).toBe(1)
  })

  it('should find the best closing time', async () => {
    expect(find_best_closing_time('Y Y N N')).toBe(2)
  })

  it('should find the best closing time pt. 2', async () => {
    expect(find_best_closing_time('Y Y Y Y')).toBe(4)
  })

  it('should find the best closing time pt. 3', async () => {
    expect(find_best_closing_time('N N N N')).toBe(0)
  })

  it('should find valid and best closing times, pt. 1', async () => {
    expect(get_best_closing_times('BEGIN Y Y END \nBEGIN N N END')).toEqual([
      2, 0,
    ])
  })

  it('should find valid and best closing times, pt. 2', async () => {
    expect(
      get_best_closing_times('BEGIN BEGIN \nBEGIN N N BEGIN Y Y\n END N N END')
    ).toEqual([2])
  })
})
