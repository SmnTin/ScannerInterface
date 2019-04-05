import React, { Component } from 'react'

import messageGenerators from '../api/messageGenerators'

export default class ProgressScreen extends Component {
  render() {
    return (
      <div>
        <h2>Сканирование</h2>
        <label>
          Прогресс
        </label>
        <div className="progress">
          <div
            className="progress-bar"
            role="progressbar"
            style={{width: this.props.progress + "%"}}
            aria-valuenow={this.props.progress}
            aria-valuemin="0"
            aria-valuemax="100"
          />
        </div>
        <br/>
        <br/>
        <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
          <button
            className="btn"
            onClick={()=>{
              this.props.sendMessage(messageGenerators.genCancelScanning());
              this.props.switchState(0);
            }}
          >
            Стоп
          </button>
          {this.props.progress == 100 ?
            <button
              className="btn btn-primary"
              onClick={()=>{
                this.props.sendMessage(messageGenerators.genFinishScanning());
                // this.props.switchState(2);
              }}
            >
              Далее
            </button>
            :
            <div />
          }
        </div>
      </div>
    )
  }
}
