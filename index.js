const puppeteer = require('puppeteer');

main = () => {
    tinderOpen();
}

tinderOpen = async () => {
    try {
    const url = 'https://tinder.com/';
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    await page.goto(url);
    await page.screenshot({path: '1-tinder_firstPage.png'});

    console.log('URL reached');

    await page._client.send("Emulation.clearDeviceMetricsOverride");

    await page.waitForXPath('(//*[@id="content"]/div/div[1]/div/main/div[1]/div/div/div/div/header/div/div[2]/div[2]/button)');
    const [loginButton] = await page.$x('(//*[@id="content"]/div/div[1]/div/main/div[1]/div/div/div/div/header/div/div[2]/div[2]/button)');
    await loginButton.click();
   
    console.log("login button clicked!");

    await page.waitForXPath('(//*[@id="modal-manager"]/div/div)');

    await page.waitForXPath('(//*[@id="modal-manager"]/div/div/div[1]/div/div[3]/span/div[1]/div/button)');
    const [googleLoginButton] = await page.$x('(//*[@id="modal-manager"]/div/div/div[1]/div/div[3]/span/div[1]/div/button)');
    await googleLoginButton.click();

    const newPagePromise = new Promise(x => 
        browser.once('targetcreated', target => x(target.page)))

    const googlePopup = await newPagePromise;
    console.log("google login clicked!");


    // await browser.close();

    // console.log('Browser closed!');
    } catch (error) {
        console.log(error);
    }
}



main();