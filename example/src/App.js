import React, { Component } from 'react';

import { CopyButton } from 'react-copy-button';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.imgRef = React.createRef();
    this.state = {
      text: '',
      image: ''
    };
  }

  _handleChange = event => this.setState({ [event.target.name]: event.target.value });

  render() {
    return (
      <main class="wrapper">
        <section class="container">
          <div class="row">
            <div className="column column-80 column-offset-10">
              <h1># React Copy Button</h1>
              <input type="text" name="text" placeholder="Type text" onChange={this._handleChange} />
              <CopyButton className="button button-outline" text={this.state.text}>
                Copy Text
              </CopyButton>
              <hr />
              <input
                type="text"
                name="image"
                value={this.state.image}
                placeholder="Paste image url here"
                onChange={this._handleChange}
              />
              <div style={{ textAlign: 'center' }} ref={this.imgRef}>
                <img src={this.state.image || 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/2000px-React-icon.svg.png'} alt="Image" />
              </div>
              <CopyButton className="button button-outline" imgRef={this.imgRef}>
                Copy Image
              </CopyButton>
            </div>
          </div>
        </section>
      </main>
    );
  }
}
