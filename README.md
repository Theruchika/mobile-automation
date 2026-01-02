# Akesa Health Automation Project

Automates testing for the **Akesa Health mobile app** using **WebdriverIO + Appium** with **TypeScript**, **Mocha**, and **Allure reporting**.

---

## 🛠 Tools & Tech

* WebdriverIO | Appium | TypeScript | Mocha | Chai | Allure
* Android Emulator & BrowserStack

---

## 🛑 Prerequisites

* Node.js & npm: `node -v`, `npm -v`
* JDK: set `JAVA_HOME`
* Android Studio & Emulator: create AVD and start emulator
* Appium: `npm install -g appium`, verify with `appium --version`
* ADB: verify devices with `adb devices`

---

## ⚙️ Setup

```bash
git clone https://github.com/codicetech/akesa-mobile-automation
cd akesa-health-automation
npm install
```

* Configure environment variables in `.env`

  * `GENERATE_REPORT=true` → Allure report is generated automatically and opened after tests
  * `GENERATE_REPORT=false` → Allure report is skipped
* Update `config/wdio.*.ts` files as needed

---

## 📦 Commands

| Command                   | Description                     |
| ------------------------- | ------------------------------- |
| `npm run test:local`      | Run tests on local emulator     |
| `npm run test:bs`         | Run tests on BrowserStack       |
| `npm run allure:generate` | Manually generate Allure report |
| `npm run allure:open`     | Open Allure report              |
| `npm run allure:clean`    | Clean previous reports          |

> **Note:** Allure report generation is automatically controlled by `GENERATE_REPORT` in `.env`. Screenshots are saved for failed tests in `./reports/allure-results/`.

---

## 🏗 Project Structure

```
src/
├── constants    # Fixed values
├── fixtures     # Test data
├── pages        # Page Object Model
├── tests        # Automated tests
└── utils        # Helper functions
config/          # WebdriverIO/Appium configs
reports/         # Allure & test reports
logs/            # Execution logs
.env             # Environment variables (including GENERATE_REPORT)
```

---

## 🔑 Best Practices

* Use Page Object Model for screens
* Prefer accessibility IDs over XPath
* Reuse utilities for waits/assertions
* Parameterize sensitive data via `.env`
* Tag tests (`@smoke`, `@regression`) for selective runs

---

## 🏃 Running Tests

```bash
# Run tests on local emulator
npm run test:local

# Run tests on BrowserStack
npm run test:bs

# Allure report generation is automatic if GENERATE_REPORT=true
# No separate command needed
```
