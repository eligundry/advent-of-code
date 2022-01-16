type IDefaultJSON =
  | Record<string, unknown>
  | unknown[]
  | string
  | boolean
  | number

type JSONLexTokens =
  | '['
  | ']'
  | '{'
  | '}'
  | ':'
  | string
  | number
  | null
  | boolean

const lexJSON = (rawJSON: string): JSONLexTokens[] => {
  const tokens: JSONLexTokens[] = []

  return tokens
}

const parseJSON = (rawJSON: string): IDefaultJSON => {
  // First, we must lex the JSON
  const tokens = lexJSON(rawJSON)

  // Next, we need to inspect the tokens for anything that we can early return
  // on.
  if (tokens.length === 0) {
    return tokens[0]
  }

  return null
}

describe('Amplitude: JSON Parsing', () => {
  test.concurrent.each([
    ['{"a": 1, "b": "two"}'],
    ['true'],
    ['false'],
    ['null'],
    ['"blah"'],
  ])('parseJSON(%s)', (rawJSON) =>
    expect(parseJSON(rawJSON)).toEqual(JSON.parse(rawJSON))
  )
})
