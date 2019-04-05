import React, { Component } from 'react'

import messageGenerators from '../api/messageGenerators'

export default class SaveScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      filename: ""
    }
  }
  render() {
    return (
      <div>
        <h2>Сохранение</h2>
        <label htmlFor="filenameInput">
          Имя файла
        </label>
        <input
          className="form-control"
          type="text"
          id="filenameInput"
          value={this.state.filename}
          onChange={(e) => this.setState({filename: e.target.value})}
        />
        <br/>
        <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
          <button
            className="btn"
            onClick={()=>{
              this.props.sendMessage(messageGenerators.genDeleteFile());
              // this.props.switchState(0);
            }}
          >
            Удалить
          </button>
          <button
            className="btn btn-primary"
            onClick={()=>{
              this.props.sendMessage(messageGenerators.genSaveFile(this.state.filename));
              // this.props.switchState(0);
            }}
          >
            Сохранить
          </button>
        </div>
      </div>
    )
  }
}
