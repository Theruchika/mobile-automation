import * as dotenv from 'dotenv';
import { APP_DETAILS } from '../src/constants/app.constants';
dotenv.config();

import { baseConfig } from './wdio.base.conf';

export const config = {
  ...baseConfig,

  // BrowserStack credentials
  user: process.env.BROWSERSTACK_USERNAME,
  key: process.env.BROWSERSTACK_ACCESS_KEY,

  hostname: 'hub.browserstack.com',
  port: 443,
  path: '/wd/hub',
  protocol: 'https',

  maxInstances: 2, // Number of parallel devices

  capabilities: [
    // === Android Devices ===
    {
      platformName: 'Android',
      'appium:automationName': 'UiAutomator2',
      'appium:app': 'bs://4a8c2824219b9bca43a0b675bab2d3d695a9bf3e', // Android APK
      'appium:appPackage': APP_DETAILS.PACKAGE,
      'appium:appActivity': APP_DETAILS.ACTIVITY,
      'appium:newCommandTimeout': 300,
      'bstack:options': {
        deviceName: 'Google Pixel 6',
        osVersion: '12.0',
        projectName: 'Akesa Test',
        buildName: 'Build 4',
        sessionName: 'Android WDIO Session',
        debug: true,
        networkLogs: true,
        appiumVersion: '1.22.0',
      },
    },
    {
      platformName: 'Android',
      'appium:automationName': 'UiAutomator2',
      'appium:app': 'bs://4a8c2824219b9bca43a0b675bab2d3d695a9bf3e', // Android APK
      'appium:appPackage': APP_DETAILS.PACKAGE,
      'appium:appActivity': APP_DETAILS.ACTIVITY,
      'appium:newCommandTimeout': 300,
      'bstack:options': {
        deviceName: 'Google Pixel 9',
        osVersion: '15.0',
        projectName: 'Akesa Test',
        buildName: 'Build 4',
        sessionName: 'Android WDIO Session',
        debug: true,
        networkLogs: true,
        appiumVersion: '1.22.0',
      },
    },

    // === iOS Devices ===
    /*
    {
      platformName: 'iOS',
      'appium:automationName': 'XCUITest',
      'appium:app': 'bs://e480ab387deaa9e069e0e0d20910cf4a007f2c07', // iOS IPA
      'bstack:options': {
        deviceName: 'iPhone 14',
        osVersion: '16',
        projectName: 'Akesa Test',
        buildName: 'Build 4',
        sessionName: 'iOS WDIO Session',
        debug: true,
        networkLogs: true,
        appiumVersion: '1.22.0',
      },
    },
    */
  ],

  services: ['browserstack'],
};
