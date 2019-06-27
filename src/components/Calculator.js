// @flow
import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import { CalcScreen } from './CalcScreen'
import { CalcButton } from './CalcButton'
import { convertDecimalToHeximal, convertHeximalToDecimal } from '../utils'

const NUMBERS = {
  zero: '0',
  one: '1',
  two: '2',
  three: '3',
  four: '4',
  five: '5',
}

const OPERATORS = {
  add: '+',
  subtract: '-',
  multiply: '*',
  divide: '/',
  evaluate: '=',
  clear: 'C',
}

const initialState = {
  totalDecimal: 0,
  totalHeximal: '',
  currentHeximal: '',
  nextOperation: '',
}

type Props = {}
type State = {
  totalDecimal: number,
  totalHeximal: string,
  currentHeximal: string,
  nextOperation: string,
}
export class Calculator extends Component<Props, State> {
  state = initialState

  _handlePress = (symbol: string) => {
    if (!isNaN(parseInt(symbol))) {
      // Symbol is one our numbers
      this.setState((state) => ({
        currentHeximal: state.currentHeximal + symbol,
      }))
    } else if (symbol === OPERATORS.evaluate) {
      let newValue = this.state.totalDecimal
      switch (this.state.nextOperation) {
        case OPERATORS.add: {
          newValue += convertHeximalToDecimal(this.state.currentHeximal)
          break
        }
        case OPERATORS.subtract: {
          newValue -= convertHeximalToDecimal(this.state.currentHeximal)
          break
        }
        case OPERATORS.multiply: {
          newValue *= convertHeximalToDecimal(this.state.currentHeximal)
          break
        }
        case OPERATORS.divide: {
          newValue /= convertHeximalToDecimal(this.state.currentHeximal)
          break
        }
        default: {
          break
        }
      }
      this.setState((state) => ({
        totalDecimal: newValue,
        nextOperation: '',
        currentHeximal: '',
      }))
    } else if (symbol === OPERATORS.clear) {
      this.setState(() => initialState)
    } else if (this.state.currentHeximal !== '') {
      // Symbol must be an operator
      this.setState((state) => ({
        nextOperation: symbol,
        totalDecimal: convertHeximalToDecimal(state.currentHeximal),
        currentHeximal: '',
      }))
    }
  }

  render() {
    console.log(this.state)
    return (
      <View style={styles.container}>
        <CalcScreen
          total={convertDecimalToHeximal(this.state.totalDecimal)}
          current={this.state.currentHeximal}
        />
        <View style={styles.buttonArea}>
          <View style={styles.buttonRow}>
            <CalcButton symbol={NUMBERS.zero} onPress={this._handlePress} />
            <CalcButton symbol={NUMBERS.one} onPress={this._handlePress} />
            <CalcButton symbol={NUMBERS.two} onPress={this._handlePress} />
          </View>
          <View style={styles.buttonRow}>
            <CalcButton symbol={NUMBERS.three} onPress={this._handlePress} />
            <CalcButton symbol={NUMBERS.four} onPress={this._handlePress} />
            <CalcButton symbol={NUMBERS.five} onPress={this._handlePress} />
          </View>
          <View style={styles.buttonRow}>
            <CalcButton symbol={OPERATORS.add} onPress={this._handlePress} />
            <CalcButton
              symbol={OPERATORS.subtract}
              onPress={this._handlePress}
            />
            <CalcButton symbol={OPERATORS.clear} onPress={this._handlePress} />
          </View>
          <View style={styles.buttonRow}>
            <CalcButton
              symbol={OPERATORS.multiply}
              onPress={this._handlePress}
            />
            <CalcButton symbol={OPERATORS.divide} onPress={this._handlePress} />
            <CalcButton
              symbol={OPERATORS.evaluate}
              onPress={this._handlePress}
            />
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
    backgroundColor: 'green',
    width: '100%',
  },
  buttonArea: {
    flex: 3,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'stretch',
    backgroundColor: 'green',
  },
  buttonRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
})
