// @flow
import React, { Component } from 'react'
import { StyleSheet, Button, View } from 'react-native'

type Props = {
  symbol: string,
  onPress: (symbol: string) => void,
}

export class CalcButton extends Component<Props> {
  _onPress = () => {
    this.props.onPress(this.props.symbol)
  }

  render() {
    return (
      <View style={styles.button}>
        <Button onPress={this._onPress} title={this.props.symbol} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  button: {
    marginTop: 32,
    width: 80,
  },
})
