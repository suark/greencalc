// @flow
import React, { Component } from 'react'
import { StyleSheet, Text, TouchableOpacity, Dimensions } from 'react-native'
import { COLORS, SIZES } from '../styles'

type Props = {
  symbol: string,
  onPress: (symbol: string) => void,
  isPortrait: boolean,
}
export class CalcButton extends Component<Props> {
  _onPress = () => {
    this.props.onPress(this.props.symbol)
  }

  render() {
    const { isPortrait } = this.props
    const margin = isPortrait ? SIZES.commonSpacing : SIZES.commonSpacing / 2
    const buttonStyle = {
      ...styles.button,
      margin,
    }
    return (
      <TouchableOpacity style={buttonStyle} onPress={this._onPress}>
        <Text style={styles.buttonText}>{this.props.symbol}</Text>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  button: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.buttonBackground,
    borderRadius: SIZES.commonRadius,
  },
  buttonText: {
    fontSize: SIZES.fontSize,
    color: COLORS.buttonText,
  }
})
