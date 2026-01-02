import { $ } from '@wdio/globals';
import { ChainablePromiseElement } from 'webdriverio';
import { waitForElement } from '@utils/actions.utils';

class LoginPage {
    // ===== Locators =====

    get emailField(): ChainablePromiseElement<WebdriverIO.Element> {
        return $('android=new UiSelector().resourceId("text-input-outline")');
    }

    get sendVerificationCodeBtn(): ChainablePromiseElement<WebdriverIO.Element> {
        return $('android=new UiSelector().description("Send Verification Code")');
    }

    
    // ===== Methods =====


    /**
     * Enter email into the email field after waiting for it to be visible.
     */
        async enterEmail(email: string): Promise<void> {
        await waitForElement(this.emailField);
        await this.emailField.click();  
        await driver.pause(500);
        await driver.keys(email);  
        }
    /**
     * Tap on the Send Verification button after waiting for it to be visible.
     */

    async tapOnSendVerificationButton(): Promise<void> {
        await waitForElement(this.sendVerificationCodeBtn);
        await this.sendVerificationCodeBtn.click();
    }

}

export default new LoginPage();