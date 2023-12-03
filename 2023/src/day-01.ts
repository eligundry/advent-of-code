import { test, expect } from 'vitest'
import { readInputIntoLines } from './utils'

const strToNum = {
  zero: '0',
  one: '1',
  two: '2',
  three: '3',
  four: '4',
  five: '5',
  six: '6',
  seven: '7',
  eight: '8',
  nine: '9',
}

function getCalibratrionValue(
  input: string[],
  convertStrToNumber = false
): number {
  const pattern = convertStrToNumber
    ? /(\d|zero|one|two|three|four|five|six|seven|eight|nine)/gi
    : /(\d)/gi
  let value = 0

  for (const line of input) {
    const matches = line.match(pattern)

    if (!matches) {
      continue
    }

    let first = matches.at(0)

    if (!first) {
      continue
    }

    if (isNaN(+first)) {
      first = strToNum[first]
    }

    let last = matches.at(-1)

    if (!last) {
      continue
    }

    if (isNaN(+last)) {
      last = strToNum[last]
    }

    value += Number(`${first}${last}`)
  }

  return value
}

test('should handle string with a single number', async () => {
  expect(getCalibratrionValue(['1'])).toBe(11)
})

test('should handle string with multiple numbers', async () => {
  expect(getCalibratrionValue(['1r2bbbb'])).toBe(12)
})

test('should handle a string without numbers', async () => {
  expect(getCalibratrionValue(['abc'])).toBe(0)
})

test('should solve the part 1 example', async () => {
  expect(
    getCalibratrionValue(['1abc2', 'pqr3stu8vwx', 'a1b2c3d4e5f', 'treb7uchet'])
  ).toBe(142)
})

test('should solve the part 1 problem', async () => {
  const input = await readInputIntoLines('day-01')
  const answer = getCalibratrionValue(input)
  expect(answer).toBe(54561)
})

test('should handle single word digits', async () => {
  expect(getCalibratrionValue(['one'], true)).toBe(11)
})

test('should handle a mix of words and digits', async () => {
  expect(getCalibratrionValue(['one5two3'], true)).toBe(13)
})

test('should handle the part 2 example', async () => {
  expect(
    getCalibratrionValue(
      [
        'two1nine',
        'eightwothree',
        'abcone2threexyz',
        'xtwone3four',
        '4nineeightseven2',
        'zoneight234',
        '7pqrstsixteen',
      ],
      true
    )
  ).toBe(281)
})

test('should solve the part 2 problem', async () => {
  const input = await readInputIntoLines('day-01')
  const answer = getCalibratrionValue(input, true)
  expect(answer).toBe(54076)
})
