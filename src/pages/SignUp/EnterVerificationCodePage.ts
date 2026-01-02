import { $$ } from '@wdio/globals';
import { ChainablePromiseElement } from 'webdriverio';

class EnterVerificationCodePage {

    // ===== Locators ===== 
    get otpBoxes(): ChainablePromiseElement<WebdriverIO.Element>[] {
        // $$ returns ChainablePromiseArray<ElementArray>, which is compatible at runtime
        return $$('android=new UiSelector().className("android.view.ViewGroup").enabled(true)') as unknown as ChainablePromiseElement<WebdriverIO.Element>[];
    }

    get invalidCodeMessage(): ChainablePromiseElement<WebdriverIO.Element> {
        return $('android=new UiSelector().text("Invalid OTP. Please check and try again")');

    }

    // ===== Methods =====
        /**
     * Enters the OTP into the input boxes.
     * Waits for all OTP boxes to appear and types each digit safely.
     * @param otp - The OTP string to enter (e.g., "123456")
     * @throws Error if OTP boxes are fewer than the OTP length
     */

    async enterOtp(otp: string): Promise<void> {

            // Wait for OTP boxes to appear
            await browser.waitUntil(
                async () => {
                    const boxes = await this.otpBoxes;
                    return boxes.length >= otp.length;
                },
                {
                    timeout: 5000,
                    timeoutMsg: `Expected ${otp.length} OTP boxes to be visible, but fewer were found`,
                }
            );

            const boxes = await this.otpBoxes;

            if (boxes.length < otp.length) {
                throw new Error(
                    `OTP boxes (${boxes.length}) are fewer than digits in OTP (${otp.length})`
                );
            }

            // Type OTP into each box
            for (let i = 0; i < otp.length; i++) {
                const box = boxes[i];
                await box.click();
                await driver.keys(otp[i]);
                await browser.pause(100);
            }
    }

        async verifyInvalidCodeError(): Promise<void> {
        const isDisplayed = await this.invalidCodeMessage.isDisplayed();
        if (!isDisplayed) {
            throw new Error('Invalid OTP error message is not displayed');
        }
    }
}

export default new EnterVerificationCodePage();
