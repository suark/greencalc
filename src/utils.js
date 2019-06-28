// @flow
const BASE = 6

export const convertHeximalToDecimal = (input: string): number => {
  return parseInt(input, BASE)
}

export const convertDecimalToHeximal = (input: number): string => {
  return input.toString(BASE)
}