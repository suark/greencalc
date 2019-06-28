// @flow
const BASE = 6

export const convertHeximalToDecimal = (input: string): number => {
  const isNegative = input[0] === '-'
  if (isNegative) {
    input = input.substr(1)
  }
  const splitArray = input.split('.')
  const left = parseInt(splitArray[0], BASE)

  if (splitArray.length > 1) {
    return parseFloat(`${isNegative ? '-' : ''}${left}.${parseInt(splitArray[1], BASE)}`)
  }
  return isNegative ? -(left) : left
}

export const convertDecimalToHeximal = (input: number): string => {
  const isNegative = input < 0
  if (isNegative) {
    input = -(input)
  }
  const splitArray = String(input).split('.')
  const left = parseInt(splitArray[0]).toString(BASE)

  if (splitArray.length > 1) {
    return `${isNegative ? '-' : ''}${left}.${parseInt(splitArray[1]).toString(BASE)}`
  }
  return `${isNegative ? '-' : ''}${left}`
}