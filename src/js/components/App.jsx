import React, { Component } from 'react'
import SimpleSwitch from './SimpleSwitch'

import endpointConfig from '../../config/endpoint'
import Endpoint from '../api/Endpoint'

import SetupScreen from './SetupScreen'
import ProgressScreen from './ProgressScreen'
import SaveScreen from './SaveScreen'

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentState: 0,
      progress: 100
    };

    this.switchState = this.switchState.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
    this.onMessage = this.onMessage.bind(this);
  }

  componentDidMount() {
    this.endpoint = new Endpoint();
    this.endpoint.setAutoreconnect(true);
    this.endpointListener = this.endpoint.addListener(this.onMessage);
    this.endpoint.connect(endpointConfig.url);
  }

  componentWillUnmount() {
    this.endpoint.removeListener(this.endpointListener);
  }

  switchState(state) {
    this.setState({currentState: state});
  }

  sendMessage (msg) {
    this.endpoint.send(msg);
  }

  onMessage (msg) {
    if(msg.action == 'switchState')
      this.setState({currentState: msg.data.state});
    else if(msg.action == 'updateProgress')
      this.setState({progress: msg.data.progress});
  }

  render() {
    return (
      <div className='app-wrap'>
        <div className='app'>
          <SimpleSwitch current={this.state.currentState} states={[
            <SetupScreen switchState={this.switchState} sendMessage={this.sendMessage} />,
            <ProgressScreen switchState={this.switchState} sendMessage={this.sendMessage} progress={this.state.progress} />,
            <SaveScreen switchState={this.switchState} sendMessage={this.sendMessage} />
          ]} />
        </div>
      </div>
    )
  }
}
