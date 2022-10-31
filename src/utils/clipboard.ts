const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

/**
 * Copy text to clipboard.
 *
 * @param  {string} text
 * @returns Promise
 */
export async function copyTextToClipboard(text: string): Promise<void> {
  if (navigator.clipboard) {
    await navigator.clipboard.writeText(text);
  } else {
    copyTextLegacy(text);
  }
}

/**
 * Convert image to return Blob object before writing it to the clipboard.
 *
 * @param  {string} url
 * @returns {Promise<Blob}
 */
async function getImageBlobFromUrl(url: string): Promise<Blob> {
  const data = await fetch(url);
  const blob = await data.blob();

  return blob;
}

/**
 * Only 'text/plain' and 'image/png' are implemented in both Chrome and Safari.
 * This is workaround for SVGs, as they can be copied as 'text/plain'
 * instead of 'image/svg+xml'.
 *
 * @param  {string} url
 * @returns {Promise<Blob}
 */
async function getTextBlobFromUrl(url: string): Promise<Blob> {
  const response = await fetch(url);
  const source = await response.text();

  return new Blob([source], { type: 'text/plain' });
}

/**
 * Copy image to clipboard.
 *
 * Chromium browsers require a Blob type when you create a
 * new ClipboardItem e.g. {'<IMAGE MIME TYPE>': Blob},
 * Safari on the other hand requires an unresolved Promise
 * that returns a Blob object e.g. {'<IMAGE MIME TYPE>': Promise<Blob>}.
 *
 * @param  {string} url
 * @param  {HTMLDivElement} element
 * @returns {Promise<void>}
 */
export async function copyImageToClipboard(
  content: string | HTMLDivElement
): Promise<void> {
  if (content instanceof HTMLDivElement) {
    copyImageLegacy(content);

    return;
  }

  if (navigator.clipboard) {
    // TODO: Fix hardcoded png.
    const { type: mimeType } = isSafari
      ? { type: 'image/png' }
      : await getImageBlobFromUrl(content);
    const blobPromise =
      mimeType === 'image/svg'
        ? getTextBlobFromUrl(content)
        : getImageBlobFromUrl(content);

    let clipboardObject: { [key: string]: any };

    if (isSafari) {
      clipboardObject = { [mimeType]: blobPromise };
    } else {
      clipboardObject = { [mimeType]: await blobPromise };
    }

    navigator.clipboard
      .write([new window.ClipboardItem(clipboardObject)])
      .catch((err) => console.warn(`Image not supported.`, err));

    return;
  }

  console.warn(
    "'navigator.clipboard' is not supported in this browser. Pass element instead."
  );
}

/**
 * Copies given text to clipboard. It creates textarea element and sets given text to value, appends the
 * element to HTML document outside the screen to make it invisible and copies the selected text from
 * textarea element. Also it checks for previously selected content. If a selection existed before
 * copying, it unselects everything on the HTML document restores the original selection.
 *
 * @param {string} text
 * @returns {any}
 */
export function copyTextLegacy(text: string): any {
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
    // Fixed Prevent scrolling to bottom of page in MS Edge.
    element.style.position = 'fixed';
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
export function copyImageLegacy(element: HTMLDivElement): boolean {
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
