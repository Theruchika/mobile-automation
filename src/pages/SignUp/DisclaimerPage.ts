import { ChainablePromiseElement } from 'webdriverio';
import { waitForElement } from '@utils/actions.utils'; // adjust path as needed

export class DisclaimerPage {
    // ===== Locators =====

    /** Returns the checkbox element on the Disclaimer screen */
    get disclaimerCheckbox(): ChainablePromiseElement<WebdriverIO.Element> {
        return $('android=new UiSelector().className("android.widget.CheckBox").clickable(true)');
    }

    /** Returns the "I understand and accept" button element */
    get acceptButton(): ChainablePromiseElement<WebdriverIO.Element> {
        return $('~I understand and accept'); // accessibility id shortcut
    }

    // ===== Methods =====

    /**
     * Taps the Disclaimer checkbox if it's not already checked
     */
    async tapDisclaimerCheckbox(): Promise<void> {
        const checkbox = this.disclaimerCheckbox; // keep as ChainablePromiseElement
        await waitForElement(checkbox);

        const isChecked = await checkbox.getAttribute('checked');
        if (isChecked !== 'true') {
            await checkbox.click();
        }
    }

    /**
     * Taps the "I understand and accept" button
     */
    async tapAcceptButton(): Promise<void> {
        const button = this.acceptButton;
        await waitForElement(button);
        await button.click();
    }
}


export default new DisclaimerPage();


