import React from 'react';
import { useRef } from 'react';
import { useState } from 'react';

import { CopyButton } from 'react-copy-button';

const TIMEOUT_DURATION = 1000;

function App() {
  const imageRef = useRef();
  const [isTextCopied, setTextCopied] = useState(false);
  const [isImageCopied, setImageCopied] = useState(false);
  const [isImageNewCopied, setImageNewCopied] = useState(false);
  const [copyState, updateValues] = useState({
    text: 'Hello World!',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/2000px-React-icon.svg.png'
  });

  const handleChange = (event) =>
    updateValues({ ...copyState, [event.target.name]: event.target.value });

  const handleTextCopy = () => {
    if (!isTextCopied) {
      setTextCopied(true);
      setTimeout(() => setTextCopied(false), TIMEOUT_DURATION);
    }
  };

  const handleImageCopy = () => {
    if (!isImageCopied) {
      setImageCopied(true);
      setTimeout(() => setImageCopied(false), TIMEOUT_DURATION);
    }
  };

  const handleNewImageCopy = () => {
    if (!isImageNewCopied) {
      setImageNewCopied(true);
      setTimeout(() => setImageNewCopied(false), TIMEOUT_DURATION);
    }
  };

  return (
    <main className="wrapper">
      <section className="container">
        <div className="row">
          <div className="column column-80 column-offset-10">
            <h1># React Copy Button</h1>
            <input
              type="text"
              name="text"
              value={copyState.text}
              placeholder="Type text"
              onChange={handleChange}
            />
            <CopyButton
              className="button button-outline"
              text={copyState.text}
              onClick={handleTextCopy}
            >
              {isTextCopied ? 'Text Copied!' : 'Copy Text'}
            </CopyButton>
            <hr />
            <input
              type="text"
              name="image"
              value={copyState.image}
              placeholder="Paste image url here"
              onChange={handleChange}
            />
            <div style={{ textAlign: 'center', padding: 40 }} ref={imageRef}>
              <img height={200} src={copyState.image} alt="React Copy Button" />
            </div>
            <CopyButton
              className="button button-outline"
              imageRef={imageRef}
              onClick={handleImageCopy}
            >
              {isImageCopied ? 'Image Copied!' : 'Copy Image'}
            </CopyButton>
            <CopyButton
              className="button button-outline"
              imageURL={copyState.image}
              onClick={handleNewImageCopy}
            >
              {isImageNewCopied ? 'Image Copied! (New)' : 'Copy Image (New)'}
            </CopyButton>
          </div>
        </div>
      </section>
    </main>
  );
}

export default App;
