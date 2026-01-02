import { getRandomEmail, fetchLatestOtp } from '@utils/data.utils';
import LandingPage from '@pages/LandingPage';
import SignUpPage from '@pages/SignUp/SignUpPage';
import EnterVerificationCodePage from '@pages/SignUp/EnterVerificationCodePage';
import DisclaimerPage from '@pages/SignUp/DisclaimerPage';
import HomePage from '@pages/Dashboard/HomePage';
import allure from '@wdio/allure-reporter';


// ===== Test Data =====
const testData = { firstName: 'CodiceTester' };

describe('Sign Up test scenarios - AH-TC-688', () => {

    it('@Regression Verify that the user can Register to the system using their Email address', async () => {
        allure.addTestId('AH-TC-688');
        const email = getRandomEmail();

        // Step 1-2 : Navigate and enter sign up details
        await LandingPage.tapOnEmailButton();
        await SignUpPage.enterFirstName(testData.firstName);
        await SignUpPage.enterEmail(email);
        await SignUpPage.tapOnSendVerificationButton();
        await browser.pause(3000);

        // Fetch latest OTP dynamically
        const otp = await fetchLatestOtp(email);

        // Step 3 : Enter OTP
        await EnterVerificationCodePage.enterOtp(otp);
        await browser.pause(3000);

        // Step 4 : Disclaimer agreement
        await DisclaimerPage.tapDisclaimerCheckbox();
        await DisclaimerPage.tapAcceptButton();
        await browser.pause(2000);

        // Step 5 : Verify user is logged in
        await HomePage.verifyUserIsLoggedIn();

        await HomePage.tapSignOutButton();
    });
});
