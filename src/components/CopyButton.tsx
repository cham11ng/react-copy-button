import * as React from 'react';

import { copyTextToClipboard, copyImageToClipboard } from '../utils/clipboard';

interface CopyButtonProps {
  text?: string;
  className: string;
  children: React.ReactNode;
  onClick?: () => void;
  imgRef?: React.RefObject<HTMLDivElement>;
}

/**
 * @class CopyButton
 *
 * Copy to clipboard component.
 */
class CopyButton extends React.Component<CopyButtonProps> {
  componentDidMount() {
    this.props.imgRef && this.props.imgRef.current;
  }

  _handleClick = () => {
    this.props.text && copyTextToClipboard(this.props.text);

    this.props.imgRef &&
      this.props.imgRef.current &&
      copyImageToClipboard(this.props.imgRef.current);

    this.props.onClick && this.props.onClick();
  };

  render() {
    const { className, children } = this.props;

    return (
      <button className={className} onClick={this._handleClick}>
        {children}
      </button>
    );
  }
}

export default CopyButton;
