import React from "react";
import { useRef } from "react";
import { useState } from "react";

import { CopyButton } from "react-copy-button";

const TIMEOUT_DURATION = 1000;

function App() {
  const imgRef = useRef();
  const [isTextCopied, setTextCopied] = useState(false);
  const [isImageCopied, setImageCopied] = useState(false);
  const [copyValue, updateValues] = useState({ copy: "", image: "" });

  const handleChange = (event) =>
    updateValues({ ...copyValue, [event.target.name]: event.target.value });

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

  return (
    <main className="wrapper">
      <section className="container">
        <div className="row">
          <div className="column column-80 column-offset-10">
            <h1># React Copy Button</h1>
            <input
              type="text"
              name="text"
              placeholder="Type text"
              onChange={handleChange}
            />
            <CopyButton
              className="button button-outline"
              text={copyValue.text}
              onClick={handleTextCopy}
            >
              {isTextCopied ? "Text Copied!" : "Copy Text"}
            </CopyButton>
            <hr />
            <input
              type="text"
              name="image"
              value={copyValue.image}
              placeholder="Paste image url here"
              onChange={handleChange}
            />
            <div style={{ textAlign: "center", padding: 40 }} ref={imgRef}>
              <img
                height={400}
                src={
                  copyValue.image ||
                  "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/2000px-React-icon.svg.png"
                }
                alt="React Copy Button"
              />
            </div>
            <CopyButton
              className="button button-outline"
              imgRef={imgRef}
              onClick={handleImageCopy}
            >
              {isImageCopied ? "Image Copied!" : "Copy Image"}
            </CopyButton>
          </div>
        </div>
      </section>
    </main>
  );
}

export default App;
