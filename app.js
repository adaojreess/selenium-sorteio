const { Builder, By, Key, until, Actions } = require('selenium-webdriver');

const webdriver = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const chromedriver = require('chromedriver');
const { elementIsDisabled, elementTextMatches, elementIsEnabled } = require('selenium-webdriver/lib/until');

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const example = async () => {
    var driver = new webdriver.Builder().withCapabilities(webdriver.Capabilities.chrome()).build();

    var person = require('./src')(); 

    try {
        await driver.get('https://wn.nr/mqzSb4');

        await driver.findElements({ className: 'tally' }).then(list => list[2].click()); // click in the phone button

        await driver.findElement(webdriver.By.id('em4966831Details')).sendKeys(person.phone); // writing in the phone field

        var listButton = await driver.findElements({ className: 'btn btn-primary' });

        for (let element of listButton) {
            var text = await element.getText();
            if (text === "Continue") {
                await element.click()
                break;
            }
        } // click in the continue button

        var inputName = await driver.findElements({ css: "div.form-wrapper input[name='name']" });
        await inputName[2].sendKeys(person.fullname);

        var inputEmail = await driver.findElements({ css: "div.form-wrapper input[name='email']" });
        await inputEmail[2].sendKeys(person.email);

        var buttonSave = await driver.findElements({ css: 'span.ng-scope' });

        for (let element of buttonSave) {
            var text = await element.getText();
            if (text === "Save") {
                await element.click();
                break;
            }
        } // click save button



    } catch (e) {

    } finally {
        await sleep(2000);
        await driver.quit();
        return example();
    }
};

(async function init() {
    chrome.setDefaultService(new chrome.ServiceBuilder(chromedriver.path).build());
    await example();
})();