import { baseConfig } from './wdio.base.conf';
import { APP_DETAILS } from '../src/constants/app.constants';


export const config = {
  ...baseConfig,

  capabilities: [
    {
      // Change these capabilities as per your local setup
      platformName: 'Android',
      'appium:deviceName': 'Pixel_9',
      'appium:automationName': 'UiAutomator2',
      //'appium:app': 'C:/Users/RuchikaPramodyaKalud/Downloads/android.wdio.native.app.v1.0.8.apk',
      'appium:appPackage': APP_DETAILS.PACKAGE,
      'appium:appActivity': APP_DETAILS.ACTIVITY,
    }
  ],

  services: [['appium', { command: 'appium' }]],
};
