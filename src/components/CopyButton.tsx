import * as React from 'react';
import { copyImageToClipboard, copyTextToClipboard } from '../utils/clipboard';

type CopyProps = {
  children: React.ReactNode;
  className?: string;
  onCopy?: () => void;
  text?: string;
  imageURL?: string;
  imageRef?: React.RefObject<HTMLDivElement>;
} & (
  | { text: string }
  | { imageURL: string }
  | { imageRef: React.RefObject<HTMLDivElement> }
);

const CopyButton = (props: CopyProps) => {
  const { text, imageURL, imageRef, className, children } = props;

  const handleClick = () => {
    if (text !== undefined) {
      copyTextToClipboard(text);
    }

    const content = imageURL || imageRef?.current;

    if (content) {
      copyImageToClipboard(content);
    }

    props.onCopy && props.onCopy();
  };

  return (
    <button type="button" className={className} onClick={handleClick}>
      {children}
    </button>
  );
};

export default CopyButton;
