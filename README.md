# react-copy-button

> Copy to clipboard react button component. Demo: https://cham11ng.github.io/react-copy-button/

[![NPM](https://img.shields.io/npm/v/react-copy-button.svg)](https://www.npmjs.com/package/react-copy-button)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![Build Status](https://travis-ci.org/cham11ng/react-copy-button.svg?branch=master)](https://travis-ci.org/cham11ng/react-copy-button)

## Install

```bash
yarn add react-copy-button
```

## Usage

```jsx
// Functional Component with useRef hook.
import React from 'react';
import { useRef } from 'react';
import { useState } from 'react';

function App() {
  const imgRef = useRef();

  return (
    <React.Fragment>
      <div ref={imgRef}>
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/2000px-React-icon.svg.png" />
      </div>
      <CopyButton imgRef={imgRef}>Copy Image</CopyButton>
      <CopyButton text="Text to copy">Copy Text</CopyButton>
    </React.Fragment>
  );
}

// Class Component
import * as React from 'react';

import CopyButton from 'react-copy-button';

class Example extends React.Component {
  constructor(props) {
    super(props);

    this.imgRef = React.createRef();
  }

  render() {
    return (
      <React.Fragment>
        <div ref={this.imgRef}>
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/2000px-React-icon.svg.png" />
        </div>
        <CopyButton imgRef={this.imgRef}>Copy Image</CopyButton>
        <CopyButton text="Text to copy">Copy Text</CopyButton>
      </React.Fragment>
    );
  }
}
```

## Development

```bash
pnpm install
```

## Browser compatibility

For browser compatibility check [here](https://developer.mozilla.org/en-US/docs/Web/API/Document/execCommand#Browser_compatibility).

## License

MIT © [cham11ng](https://github.com/cham11ng)
