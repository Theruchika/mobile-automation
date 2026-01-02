import { ChainablePromiseElement } from 'webdriverio';

const DEFAULT_TIMEOUT = 5000;

/**
 * Waits for an element to be displayed within the given timeout.
 */
export async function waitForElement(
  element: ChainablePromiseElement<WebdriverIO.Element>,
  timeout = DEFAULT_TIMEOUT
): Promise<void> {
  await element.waitForDisplayed({ timeout });
}

/**
 * Waits for an element to be displayed and clicks it.
 */
export const waitAndClick = async (
  element: ChainablePromiseElement<WebdriverIO.Element>,
  timeout = DEFAULT_TIMEOUT
) => {
  await waitForElement(element, timeout);
  await element.click();
};

/**
 * Waits for an element to be displayed and sets the input value.
 */
export const waitAndSetValue = async (
  element: ChainablePromiseElement<WebdriverIO.Element>,
  value: string,
  timeout = DEFAULT_TIMEOUT
) => {
  await waitForElement(element, timeout);
  await element.setValue(value);
};

/**
 * Waits for an element to be displayed and clears its content.
 */
export const waitAndClear = async (
  element: ChainablePromiseElement<WebdriverIO.Element>,
  timeout = DEFAULT_TIMEOUT
) => {
  await waitForElement(element, timeout);
  await element.clearValue();
};

/**
 * Scrolls vertically to an element containing exact text using Android UIAutomator.
 */
export const scrollToText = async (
  text: string
): Promise<ChainablePromiseElement<WebdriverIO.Element>> => {
  const element = driver.$(
    `android=new UiScrollable(new UiSelector().scrollable(true)).scrollTextIntoView("${text}")`
  );
  await waitForElement(element, 7000);
  return element;
};

/**
 * Performs a swipe gesture from (startX, startY) to (endX, endY).
 */
export const swipe = async (
  startX: number,
  startY: number,
  endX: number,
  endY: number,
  duration = 800
) => {
  await driver.touchPerform([
    { action: 'press', options: { x: startX, y: startY } },
    { action: 'wait', options: { ms: duration } },
    { action: 'moveTo', options: { x: endX, y: endY } },
    { action: 'release' }
  ]);
};

/**
 * Swipe up gesture based on screen size.
 */
export const swipeUp = async (duration = 800) => {
  const { height, width } = await driver.getWindowSize();
  const startX = Math.floor(width / 2);
  const startY = Math.floor(height * 0.8);
  const endY = Math.floor(height * 0.2);
  await swipe(startX, startY, startX, endY, duration);
};

/**
 * Performs a long press on an element.
 */
export const waitAndLongPress = async (
  element: ChainablePromiseElement<WebdriverIO.Element>,
  duration = 1000,
  timeout = DEFAULT_TIMEOUT
) => {
  await waitForElement(element, timeout);
  await driver.touchPerform([
    { action: 'longPress', options: { element: element.elementId, duration } },
    { action: 'release' }
  ]);
};

/**
 * Hides the Android software keyboard if it is displayed.
 */
export const hideKeyboard = async () => {
  try {
    await driver.hideKeyboard();
  } catch {
    // Keyboard not visible - ignore
  }
};

/**
 * Checks if element is displayed within timeout, returns boolean.
 */
export const isElementDisplayed = async (
  element: ChainablePromiseElement<WebdriverIO.Element>,
  timeout = DEFAULT_TIMEOUT
): Promise<boolean> => {
  try {
    await element.waitForDisplayed({ timeout });
    return true;
  } catch {
    return false;
  }

};

/**
 * Waits for an input field to be displayed, clicks it to focus, 
 * pauses briefly for the keyboard to appear, and enters the given text.
 *
 * @param field - The ChainablePromiseElement representing the input field.
 * @param value - The string value to type into the input field.
 */
export async function enterText(
  field: ChainablePromiseElement<WebdriverIO.Element>, 
  value: string
): Promise<void> {
  await waitForElement(field);
  await field.click();
  await driver.pause(500);
  await driver.keys(value);
}
