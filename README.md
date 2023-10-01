# react-copy-button

> Copy to clipboard react button component. Demo: https://cham11ng.github.io/react-copy-button/

[![NPM](https://img.shields.io/npm/v/react-copy-button.svg)](https://www.npmjs.com/package/react-copy-button)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![Deployment Status](https://github.com/cham11ng/react-copy-button/actions/workflows/deploy.yml/badge.svg)](https://github.com/cham11ng/react-copy-button/actions/workflows/deploy.yml)

## Install

```bash
yarn add react-copy-button
or
bun install react-copy-button
```

## Usage

```jsx
// Functional Component with useRef hook.
import React from 'react';
import { useRef } from 'react';
import { useState } from 'react';

function App() {
  const imageRef = useRef();
  const url =
    'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/2000px-React-icon.svg.png';

  return (
    <React.Fragment>
      <div ref={imageRef}>
        <img src={url} />
      </div>
      <CopyButton imageRef={imageRef}>Copy Image</CopyButton>

      <CopyButton text="Text to copy">Copy Text</CopyButton>
      <CopyButton imageURL={url}>Copy Image (New)</CopyButton>
    </React.Fragment>
  );
}

// Class Component
import * as React from 'react';

import CopyButton from 'react-copy-button';

const url =
  'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/2000px-React-icon.svg.png';

class Example extends React.Component {
  constructor(props) {
    super(props);

    this.imageRef = React.createRef();
  }

  render() {
    return (
      <React.Fragment>
        <div ref={this.imageRef}>
          <img src={url} />
        </div>
        <CopyButton imageRef={this.imageRef}>Copy Image</CopyButton>

        <CopyButton text="Text to copy">Copy Text</CopyButton>
        <CopyButton imageURL={url}>Copy Image (New)</CopyButton>
      </React.Fragment>
    );
  }
}
```

## Development

```bash
# Package
$ bun install

$ bun link

$ bun start

$ bun run build

# Example

$ cd example

$ bun install

$ bun start

$ bun run build
```

## Release and Publish

```
$ gh release create 0.2.1 --generate-notes --prerelease

$ bun publish
```

## Browser compatibility

- execCommand [here](https://developer.mozilla.org/en-US/docs/Web/API/Document/execCommand#Browser_compatibility).
- Navigator.clipboard [here](https://developer.mozilla.org/en-US/docs/Web/API/Clipboard_API#browser_compatibility).

## License

MIT © [cham11ng](https://github.com/cham11ng)
