import { $ } from '@wdio/globals';
import { ChainablePromiseElement } from 'webdriverio';
import { waitForElement, enterText } from '@utils/actions.utils';


class SignUpPage {

    // ===== Locators ===== 
    get firstNameField(): ChainablePromiseElement<WebdriverIO.Element> {
        return $('android=new UiSelector().resourceId("text-input-outline").instance(0)');
    }

    get emailField(): ChainablePromiseElement<WebdriverIO.Element> {
        return $('android=new UiSelector().resourceId("text-input-outline").instance(1)');
    }

    get sendVerificationCodeBtn(): ChainablePromiseElement<WebdriverIO.Element> {
        return $('//android.widget.Button[contains(@content-desc, "Send Verification Code")]');
    }

    get loginText(): ChainablePromiseElement<WebdriverIO.Element> {
        return $('android=new UiSelector().text("Log in")');
    }


   // ===== Methods =====


    /**
     * Enter first name into the first name field after waiting for it to be visible.
     */
    async enterFirstName(firstName: string) {
        await enterText(this.firstNameField, firstName);
    }

    /**
     * Enter email into the email field after waiting for it to be visible.
     */
    async enterEmail(email: string) {
        await enterText(this.emailField, email);
    }

    /**
     * Tap on the Send Verification button after waiting for it to be visible.
     */

    async tapOnSendVerificationButton(): Promise<void> {
        await waitForElement(this.sendVerificationCodeBtn);
        await this.sendVerificationCodeBtn.click();
    }

        /**
     * Tap on the Login after waiting for it to be visible.
     */
        async tapOnLogin (): Promise<void> {
        await waitForElement(this.loginText);
        await this.loginText.click();
    }

}

export default new SignUpPage();