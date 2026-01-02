import * as dotenv from 'dotenv';
dotenv.config();
import { browser } from '@wdio/globals';
import path from 'path';
import { exec, execSync } from 'child_process';

export const baseConfig = {
    runner: 'local',
    specs: ['../src/tests/**/*.ts'],
    maxInstances: 1,

    logLevel: 'info',
    bail: 0,
    baseUrl: 'http://localhost',
    waitforTimeout: 10000,
    connectionRetryTimeout: 90000,
    connectionRetryCount: 3,

    framework: 'mocha',
    reporters: [
        'spec',
        ['allure', {
            outputDir: 'reports/allure-results',
            disableWebdriverStepsReporting: false,
            disableWebdriverScreenshotsReporting: false,
            useCucumberStepReporter: false,
        }]
    ],

    mochaOpts: {
        ui: 'bdd',
        timeout: 60000,
    },

    autoCompileOpts: {
        autoCompile: true,
        tsNodeOpts: {
            transpileOnly: true,
            project: './tsconfig.json',
        },
    },

    /**
     * Save screenshot on failure
     */
    afterTest: async function(test, context, { error, result, duration, passed, retries }) {
        if (!passed) {
            await browser.saveScreenshot(`./reports/allure-results/${test.title}.png`);
        }
    },

    /**
     * Generate HTML report automatically after tests
     */

    onComplete: function() {
    if (process.env.GENERATE_REPORT === 'true') {
        const resultsDir = path.resolve('./reports/allure-results');
        const reportDir = path.resolve('./reports/allure-report');

        try {
            console.log('Generating Allure report...');
            execSync(`allure generate "${resultsDir}" -o "${reportDir}" --clean`, { stdio: 'inherit' });
            console.log('Allure report successfully generated at', reportDir);

            console.log('Opening Allure report...');
            exec(`start "" allure open "${reportDir}"`, (err) => {
                if (err) console.error('Failed to open Allure report:', err);
            });

        } catch (error) {
            console.error('Error generating/opening Allure report:', error);
        }
    } else {
        console.log('Skipping Allure report generation.');
    }
}
  
};
