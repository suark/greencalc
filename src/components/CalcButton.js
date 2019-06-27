// @flow
import React, { Component } from 'react'
import { StyleSheet, Button } from 'react-native'

type Props = {
  symbol: string,
  onPress: (any) => void,
}

export default class CalcButton extends Component<Props> {
  render() {
    return (
      <Button
        onPress={this.props.onPress}
        title={this.props.symbol}
        // accessibilityLabel
        // color
        // disabled
        // testID
        // hasTVPreferredFocus
      />
    )
  }
}

// const styles = StyleSheet.create({})
