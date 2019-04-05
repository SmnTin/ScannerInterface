import React, { Component } from 'react'

import messageGenerators from '../api/messageGenerators'

export default class SetupScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      qualityValue: 3,
      partialScanning: false,
      angle: 360
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(value) {
    return (event) => {
      let ns = {};
      ns[value] = event.target.value;
      this.setState(ns);
    };
  }

  handleCheck(value) {
    return () => {
      let ns = {};
      ns[value] = !this.state[value];
      this.setState(ns);
    };
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({angle: Math.min(360, Math.max(1, this.state.angle))}, () => {
      // this.props.switchState(1);
      this.props.sendMessage(messageGenerators.genStartScanning(this.state.qualityValue, this.state.partialScanning, this.state.angle));
    })
  }

  render() {
    return (
      <div>
        <h2>Настройки</h2>

        <div className="setup-form" onSubmit={this.handleSubmit}>
          <form>
            <label htmlFor="qualityInput">
              Качество
            </label>
            <select
              className="form-control"
              id="qualityInput"
              value={this.state.qualityValue}
              onChange={this.handleChange("qualityValue")}
            >
              <option value={1}>Очень низкое</option>
              <option value={2}>Низкое</option>
              <option value={3}>Нормас под пивас</option>
              <option value={4}>Высокое</option>
              <option value={5}>Очень высокое</option>
            </select>
            <br />
            
            <input
              className="form-check-input"
              type="checkbox"
              value={this.state.partialScanning}
              onChange={this.handleCheck("partialScanning")}
              id="partialScanningInput"
            />
            <label htmlFor="partialScanningInput">
              Частичное сканирование
            </label>
            
            {this.state.partialScanning ? 
              <div style={{width: "100%"}}>
                <label htmlFor="angleRangeInput">
                  Угол
                </label>
                <input
                  className="form-control"
                  type="number"
                  value={this.state.angle}
                  onChange={this.handleChange("angle")}
                />
              </div>
              :
              <div />
            }

            <br/>

            <div style={{textAlign: "right", width: "100%"}}>
              <button className="btn btn-primary" type="submit">Сканировать</button>
            </div>
          </form>
        </div>
      </div>
    )
  }
}
