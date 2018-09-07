# react-copy-button

> Copy to clipboard react component.

[![NPM](https://img.shields.io/npm/v/react-copy-button.svg)](https://www.npmjs.com/package/react-copy-button)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![Build Status](https://travis-ci.org/cham11ng/react-copy-button.svg?branch=master)](https://travis-ci.org/cham11ng/react-copy-button)

## Install

```bash
yarn install --save react-copy-button
```

## Usage

```tsx
import * as React from 'react';

import CopyButton from 'react-copy-button';

class Example extends React.Component {
  constructor(props) {
    super(props);

    this.imgRef = React.createRef();
    this.state = {
      text: '',
      image: ''
    };
  }

  render() {
    return (
      <React.Fragment>
        <div ref={this.imgRef}>
          <img src="https://i.imgur.com/nd1ACuf.png" />
        </div>
        <CopyButton imgRef={this.imgRef}>Copy Image</CopyButton>
        <CopyButton text="Text to copy">Copy Text</CopyButton>
      </React.Fragment>
    );
  }
}
```

## License

MIT © [cham11ng](https://github.com/cham11ng)
