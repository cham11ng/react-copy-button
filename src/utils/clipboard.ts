/**
 * Copies given text to clipboard. It creates textarea element and sets given text to value, appends the
 * element to HTML document outside the screen to make it invisible and copies the selected text from
 * textarea element. Also it checks for previously selected content. If a selection existed before
 * copying, it unselects everything on the HTML document restores the original selection.
 *
 * @param {string} text
 * @returns {any}
 */
export function copyTextToClipboard(text: string): any {
  // IE specific code path to prevent textarea being shown while dialog is visible.
  if ((window as any).clipboardData && (window as any).clipboardData.setData) {
    return (window as any).clipboardData.setData('Text', text);
  }

  if (
    document.queryCommandSupported &&
    document.queryCommandSupported('copy')
  ) {
    const selectionArea = document.getSelection();
    const element = document.createElement('textarea');

    element.textContent = text;
    element.style.left = '-9999px';
    element.style.position = 'fixed'; // fixed Prevent scrolling to bottom of page in MS Edge.
    element.setAttribute('readonly', '');

    document.body.appendChild(element);
    element.select();
    element.focus();

    try {
      return document.execCommand('copy'); // Security exception may be thrown by some browsers.
    } catch (ex) {
      console.warn('Copy to clipboard failed.', ex);

      return false;
    } finally {
      document.body.removeChild(element);

      if (selectionArea) {
        const selected =
          selectionArea.rangeCount > 0 ? selectionArea.getRangeAt(0) : false;

        if (selected) {
          selectionArea.removeAllRanges();
          selectionArea.addRange(selected);
        }
      }
    }
  }
}

/**
 * Copies given image containing element to clipboard.
 * The image element should be wrapped with div.
 *
 * @param {HTMLDivElement} element
 * @returns {boolean}
 */
export function copyImageToClipboard(element: HTMLDivElement): boolean {
  const selection = window.getSelection();
  const range = document.createRange();

  if (!selection) {
    return false;
  }

  range.selectNodeContents(element);
  selection.removeAllRanges();
  selection.addRange(range);

  try {
    return document.execCommand('copy'); // Security exception may be thrown by some browsers.
  } catch (ex) {
    console.warn('Copy to clipboard failed.', ex);

    return false;
  } finally {
    selection.removeAllRanges();
  }
}
