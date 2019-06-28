// @flow
import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import { CalcScreen } from './CalcScreen'
import { CalcButton } from './CalcButton'
import { convertDecimalToHeximal, convertHeximalToDecimal } from '../utils'
import { COLORS, SIZES } from '../styles'

const NUMBERS = {
  zero: '0',
  one: '1',
  two: '2',
  three: '3',
  four: '4',
  five: '5',
  infinity: 'Infinity',
}

const OPERATORS = {
  add: '+',
  subtract: '-',
  multiply: '*',
  divide: '/',
  evaluate: '=',
  clear: 'C',
}

const OPERATOR_PRECEDENCE = [
  OPERATORS.divide,
  OPERATORS.multiply,
  OPERATORS.add,
  OPERATORS.subtract,
]

type Props = {
  isPortrait: boolean,
}
type State = {
  currentHeximal: string, // Used to represent the number the user is currently typing in
  valueToDisplay: string, // Used to represent anything we might want to display on the screen
  operationArray: Array<string>, // An array of numbers and operators that represents the equation
  justEvaluated: boolean, // Signals that our last equation was calculated so we can start a new one
}

const initialState = {
  currentHeximal: '',
  valueToDisplay: '0',
  operationArray: [],
  justEvaluated: false,
}
export class Calculator extends Component<Props, State> {
  state = initialState

  /**
   * Receives the number that was pressed and adds it to our current heximal value.
   */
  numberPressed = (input: string) => {
    this.setState((state) => {
      const { currentHeximal, operationArray, justEvaluated } = state
      let newHeximal
      // If we had just evaluated the equation then the next number typed should start everything over
      if (justEvaluated) {
        newHeximal = input
      } else {
        // The check for a '0' makes sure you can't type things like '04'
        newHeximal = currentHeximal === '0' ? `${input}` : `${currentHeximal}${input}`
      }
      const operationString = operationArray.join(' ')
      return {
        currentHeximal: newHeximal,
        valueToDisplay: `${operationString} ${newHeximal}`,
        justEvaluated: false,
      }
    })
  }

  /**
   * Receives the operator pressed and adds it, and the current heximal value, to the equation
   */
  operatorPressed = (symbol: string) => {
    if (this.state.currentHeximal !== '') {
      this.setState((state) => {
        const { currentHeximal, operationArray } = state
        operationArray.push(currentHeximal)
        operationArray.push(symbol)
        return {
          ...initialState,
          operationArray,
          valueToDisplay: operationArray.join(' '),
        }
      })
    }
  }

  /**
   * Sets the calculator back to a blank initial state
   */
  clear = () => {
    this.setState(() => ({
      ...initialState,
      operationArray: [],
    }))
  }

  /**
   * If the user tried to divide by zero, we reset everything and show the result as infinity
   */
  handleDivideByZero = () => {
    this.setState(() => ({
      currentHeximal: '',
      valueToDisplay: NUMBERS.infinity,
      operationArray: [],
      justEvaluated: true,
    }))
  }

  /**
   * Recursive function: Reduces an array of numbers and operations into a single number
   */
  BEDMAS = (operationArray: Array<string>): Array<string> => {
    if (operationArray.length <= 1) {
      // Base case
      return operationArray
    } else {
      let newValue = 0
      const nextOperation = {}
      // Search left to right for the first operator
      // Prioritize operators based on BEDMAS rules
      for (let i = 0; i < OPERATOR_PRECEDENCE.length; i++) {
        const currentOperator = OPERATOR_PRECEDENCE[i]
        for (let j = 0; j < operationArray.length; j++) {
          const symbol = operationArray[j]
          // If we find an operator, we'll mark where we found it, so we can use that information for our calculations
          if (symbol === currentOperator) {
            nextOperation.index = j
            nextOperation.symbol = symbol
            // Once we found the next operator we want to compute, we break early from the looping
            break
          }
        }
        if (nextOperation.index) {
          // Once we found the next operator we want to compute, we break early from the looping
          break
        }
      }

      // Now we use the information found about what our next operation should be, in order
      // to compute and remove that operation from the mix
      const left = convertHeximalToDecimal(operationArray[nextOperation.index - 1])
      const right = convertHeximalToDecimal(operationArray[nextOperation.index + 1])
      // Now, based on our symbol, we do some math in decimal
      switch (nextOperation.symbol) {
        case OPERATORS.add:
          newValue = left + right
          break
        case OPERATORS.subtract:
          newValue = left - right
          break
        case OPERATORS.multiply:
          newValue = left * right
          break
        case OPERATORS.divide:
          if (right === 0) {
            return ['Infinity']
          } else {
            newValue = left / right
          }
          break
      }
      // Then we convert the result back to heximal and splice it into the array so we can repeat this process recursively.
      // Eventually all operators are stripped away and we have a single number
      operationArray.splice(nextOperation.index - 1, 3, convertDecimalToHeximal(newValue))
      return this.BEDMAS(operationArray)
    }
  }

  /**
   * Go through our operationArray and calculate the actual result of the whole thing.
   */
  evaluate = () => {
    const { operationArray, currentHeximal } = this.state

    if (operationArray.length === 0) {
      // There is nothing to compute
      return
    } else if (operationArray.length === 1) {
      // There is only one value, this should never happen.
      this.setState((state) => ({
        valueToDisplay: operationArray[0],
        operationArray: [],
        justEvaluated: true,
      }))
    } else {
      // Otherwise, push our last number into the array and start evaluating
      if (currentHeximal !== '') {
        operationArray.push(currentHeximal)
      }

      // This is just done in case the user ended the equation with an operation.
      // That operation will have nothing to act on, so we just strip it.
      const lastSymbol = operationArray[operationArray.length - 1]
      switch (lastSymbol) {
        case OPERATORS.add:
        case OPERATORS.subtract:
        case OPERATORS.multiply:
        case OPERATORS.divide: {
          operationArray.pop()
          break
        }
      }
      // Now we reduce our equation to a single value, change to string, and use it.
      const newValue = this.BEDMAS(operationArray)
      const result = newValue.toString()
      if (result === NUMBERS.infinity) {
        this.handleDivideByZero()
        return
      }

      this.setState((state) => ({
        currentHeximal: result,
        valueToDisplay: result,
        operationArray: [],
        justEvaluated: true,
      }))
    }
  }

  render() {
    // In landscape mode we reduce the padding in the button area because the buttons
    // will also be reducing their margin to help look better in that mode.
    const { isPortrait } = this.props
    const padding = isPortrait ? 0 : SIZES.commonSpacing / 2
    const buttonArea = {
      ...styles.buttonArea,
      padding,
    }
    return (
      <View style={styles.container}>
        <CalcScreen
          value={this.state.valueToDisplay}
        />
        <View style={buttonArea}>
          <View style={styles.buttonRow}>
            <CalcButton symbol={NUMBERS.three} onPress={this.numberPressed} isPortrait={isPortrait} />
            <CalcButton symbol={NUMBERS.four} onPress={this.numberPressed} isPortrait={isPortrait} />
            <CalcButton symbol={NUMBERS.five} onPress={this.numberPressed} isPortrait={isPortrait} />
          </View>
          <View style={styles.buttonRow}>
            <CalcButton symbol={NUMBERS.zero} onPress={this.numberPressed} isPortrait={isPortrait} />
            <CalcButton symbol={NUMBERS.one} onPress={this.numberPressed} isPortrait={isPortrait} />
            <CalcButton symbol={NUMBERS.two} onPress={this.numberPressed} isPortrait={isPortrait} />
          </View>
          <View style={styles.buttonRow}>
            <CalcButton symbol={OPERATORS.clear} onPress={this.clear} isPortrait={isPortrait} />
            <CalcButton symbol={OPERATORS.add} onPress={this.operatorPressed} isPortrait={isPortrait} />
            <CalcButton symbol={OPERATORS.subtract} onPress={this.operatorPressed} isPortrait={isPortrait} />
          </View>
          <View style={styles.buttonRow}>
            <CalcButton symbol={OPERATORS.evaluate} onPress={this.evaluate} isPortrait={isPortrait} />
            <CalcButton symbol={OPERATORS.multiply} onPress={this.operatorPressed} isPortrait={isPortrait} />
            <CalcButton symbol={OPERATORS.divide} onPress={this.operatorPressed} isPortrait={isPortrait} />
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'stretch',
    backgroundColor: COLORS.mainBackground,
    padding: SIZES.commonSpacing / 2,
  },
  buttonArea: {
    flex: 5,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'stretch',
  },
  buttonRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
})
