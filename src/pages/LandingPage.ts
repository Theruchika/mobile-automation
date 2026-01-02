import { $ } from '@wdio/globals';
import { ChainablePromiseElement } from 'webdriverio';
import { waitForElement } from '@utils/actions.utils';

class LandingPage {

    // ===== Locators =====

    get googleSignupButton(): ChainablePromiseElement<WebdriverIO.Element> {
        return $('//android.widget.Button[contains(@content-desc, "Continue with Google")]');
    }

    get eMailSignupButton(): ChainablePromiseElement<WebdriverIO.Element> {
        return $('//android.widget.Button[contains(@content-desc, "Continue with Email")]');
    }

    get loginText(): ChainablePromiseElement<WebdriverIO.Element> {
        return $('android=new UiSelector().text("Log in")');
    }

        // ===== Methods =====
    /**
     * Tap on the google Signup button after waiting for it to be visible.
     */
    async tapOnWebViewButton(): Promise<void> {
        await waitForElement(this.googleSignupButton);
        await this.googleSignupButton.click();
    }

        /**
     * Tap on the google Signup button after waiting for it to be visible.
     */
    async tapOnEmailButton(): Promise<void> {
        await waitForElement(this.eMailSignupButton);
        await this.eMailSignupButton.click();
    }

    /**
     * Tap on the Login after waiting for it to be visible.
     */
        async tapOnLogin (): Promise<void> {
        await waitForElement(this.loginText);
        await this.loginText.click();
    }

}

export default new LandingPage();
