import { getRandomEmail, fetchLatestOtp } from '@utils/data.utils';
import LandingPage from '@pages/LandingPage';
import SignUpPage from '@pages/SignUp/SignUpPage';
import EnterVerificationCodePage from '@pages/SignUp/EnterVerificationCodePage';
import DisclaimerPage from '@pages/SignUp/DisclaimerPage';
import HomePage from '@pages/Dashboard/HomePage';
import LoginPage from '@pages/Login/LoginPage';
import allure from '@wdio/allure-reporter';

// ===== Test Data =====
const testData = { firstName: 'CodiceTester' };
let email: string;

describe('Login test scenarios - AH-TC-110', () => {

    before(async () => {
        // Setup for sign-up process
        email = getRandomEmail();

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
        await HomePage.verifyUserIsLoggedIn();
        await HomePage.tapSignOutButton();

        await SignUpPage.tapOnLogin();

    });


        it('@Regression Verify the user can enter a valid OTP and proceed to login successfully', async () => {
        allure.addTestId('AH-TC-110');


        // Step 1-2 : Navigate and enter login details
        await LoginPage.enterEmail(email);
        await LoginPage.tapOnSendVerificationButton();

        // Fetch latest OTP dynamically
        const otp = await fetchLatestOtp(email);
        await EnterVerificationCodePage.enterOtp(otp);
        
        await HomePage.verifyUserIsLoggedIn();
        await HomePage.tapSignOutButton();
        
        });
    });

    describe('Login with invalid OTP - AH-TC-111', () => {
        it('@Regression Verify system shows an error for invalid OTP', async () => {
        allure.addTestId('AH-TC-111');

        // Step 1-2 : Navigate and enter login details
        await LandingPage.tapOnLogin();
        await LoginPage.enterEmail(email);
        await LoginPage.tapOnSendVerificationButton();

        // Enter an invalid OTP
        await EnterVerificationCodePage.enterOtp("123456");
        await browser.pause(2000);
        await EnterVerificationCodePage.verifyInvalidCodeError();  

        });

});
