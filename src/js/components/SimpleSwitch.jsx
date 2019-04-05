import React, { Component } from 'react'

export default class SimpleSwitch extends Component {
  render() {
    return this.props.states[this.props.current];
  }
}
