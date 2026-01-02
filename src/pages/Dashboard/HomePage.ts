export class HomePage {
    // ===== Locator =====

    /**
     * Returns the "Welcome!" text element on the Home screen
     */
    get welcomeText() {
        return $('android=new UiSelector().text("Welcome! ")');
    }

    get signOutButton() {
        return $('android=new UiSelector().description("Sign Out")');
    }


    // ===== Methods =====

    /**
     * Verifies that the user is successfully logged in by checking the "Welcome!" text.
     * @throws Error if the "Welcome!" text is not displayed
     * @returns Promise<void>
     */
    async verifyUserIsLoggedIn(): Promise<void> {
        const isDisplayed = await this.welcomeText.isDisplayed();
        if (!isDisplayed) {
            throw new Error('User is not logged in or Welcome text not visible');
        }
    }

    async tapSignOutButton(): Promise<void> {
        await this.signOutButton.click();
    }
}
export default new HomePage();