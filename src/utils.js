// @flow
const BASE = 6

export const convertHeximalToDecimal = (input: string): number => {
  if (input.length === 0) {
    return 0
  }

  const isNegative = input[0] === '-'
  if (isNegative) {
    input = input.substr(1)
  }

  if (input.length === 1) {
    return isNegative ? -(parseInt(input)) : parseInt(input)
  }

  const firstDigit = parseInt(input[0])
  let total = firstDigit * BASE

  if (input.length > 1) {
    for (let index = 1; index < input.length; index++) {
      const nextDigit = parseInt(input[index])
      total += nextDigit
      if (index < input.length - 1) {
        total *= BASE
      }
    }
  }

  return isNegative ? -(total) : total
}

const convertDecimalToHeximalRecursive = (input: number): string => {
  const isNegative = input < 0
  if (isNegative) {
    input = -(input)
  }
  if (input === 0) {
    return '0'
  } else {
    const remainder = input % BASE
    return (
      `${isNegative ? '-' : ''}${convertDecimalToHeximalRecursive(parseInt((input - remainder) / BASE)) +
      remainder.toString()}`
    )
  }
}

export const convertDecimalToHeximal = (input: number): string => {
  // Removes any fractional portion of the input number
  // This is done to simplify the project a little
  const result = convertDecimalToHeximalRecursive(Math.trunc(input))
  if (result.length > 1 && result[0] === '0') {
    return result.substr(1)
  } else if (result.length > 2 && result[0] === '-' && result[1] === '0') {
    return `-${result.substr(2)}`
  } else {
    return result
  }
}