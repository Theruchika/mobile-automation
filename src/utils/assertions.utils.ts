import { expect } from 'chai';
import { ChainablePromiseElement } from 'webdriverio';
import { waitForElement } from './actions.utils';
import allure from '@wdio/allure-reporter';

/**
 * Logs a step to both console and Allure report
 * @param message Message to log
 */
function step(message: string) {
  console.log(`[STEP] ${message}`);
  allure.addStep(message);
}

/**
 * Returns a human-readable description of an element
 * @param element The element to describe
 */
async function describeElement(element: ChainablePromiseElement<WebdriverIO.Element>): Promise<string> {
  try {
    const selector = element.selector || 'unknown selector';
    const text = await element.getText().catch(() => '');
    return `"${selector}"${text ? ` (text: "${text}")` : ''}`;
  } catch {
    return 'element';
  }
}

/**
 * Asserts that the given element contains expected text.
 *
 * @param element - The element to check.
 * @param expectedText - The text expected to be contained in the element.
 * @param timeout - Optional timeout for waiting the element to appear.
 */
export async function assertElementContainsText(
  element: ChainablePromiseElement<WebdriverIO.Element>,
  expectedText: string,
  timeout = 5000,
): Promise<void> {
  const desc = await describeElement(element);
  step(`Checking if element ${desc} contains text: "${expectedText}"`);
  await waitForElement(element, timeout);
  const actualText = await element.getText();
  expect(actualText).to.include(
    expectedText,
    `Expected element ${desc} text to include "${expectedText}", but got "${actualText}"`
  );
  step(`✅ Element ${desc} contains expected text: "${expectedText}"`);
}

/**
 * Asserts that the given element is visible.
 *
 * @param element - The element to check.
 * @param timeout - Optional timeout for waiting the element to appear.
 */
export async function assertElementIsVisible(
  element: ChainablePromiseElement<WebdriverIO.Element>,
  timeout = 5000,
): Promise<void> {
  const desc = await describeElement(element);
  step(`Checking if element ${desc} is visible`);
  await waitForElement(element, timeout);
  const isDisplayed = await element.isDisplayed();
  expect(isDisplayed, `Expected element ${desc} to be visible`).to.be.true;
  step(`✅ Element ${desc} is visible`);
}

/**
 * Asserts that the given element is enabled.
 *
 * @param element - The element to check.
 */
export async function assertElementIsEnabled(
  element: ChainablePromiseElement<WebdriverIO.Element>,
): Promise<void> {
  const desc = await describeElement(element);
  step(`Checking if element ${desc} is enabled`);
  const isEnabled = await element.isEnabled();
  expect(isEnabled, `Expected element ${desc} to be enabled`).to.be.true;
  step(`✅ Element ${desc} is enabled`);
}