const puppeteer = require('puppeteer');

async function testTPG() {
    console.log('🚀 Starting TPG Search Test...');
    let browser;
    try {
        browser = await puppeteer.launch({
            headless: false, // Show browser for visual verification
            defaultViewport: null,
            args: ['--start-maximized']
        });

        const page = await browser.newPage();

        console.log('🌐 Navigating to agent.tpg.ua/ua...');
        await page.goto('https://agent.tpg.ua/ua', { waitUntil: 'networkidle2', timeout: 60000 });

        console.log('✅ Page loaded. Looking for country input...');

        // Selectors to verify
        const countryInputSelector = 'input[placeholder="Виберіть країну"]';

        try {
            await page.waitForSelector(countryInputSelector, { timeout: 10000 });
            console.log('✅ Country input found!');

            // Try to type Turkey
            console.log('⌨️ Typing "Туреччина"...');
            await page.type(countryInputSelector, 'Туреччина', { delay: 100 });

            // Look for dropdown
            const optionSelector = 'li[role="option"], .MuiAutocomplete-option'; // Fallback for MUI which is common
            try {
                const opt = await page.waitForSelector(optionSelector, { timeout: 5000 });
                console.log('✅ Dropdown options appeared.');
                await opt.click();
                console.log('✅ Clicked first option.');
            } catch (e) {
                console.log('⚠️ No dropdown options found or timed out.');
            }

        } catch (e) {
            console.error('❌ Could not find Country input. The selector might be wrong.');
            // Take screenshot if failed
            await page.screenshot({ path: 'tpg-error.png' });
        }

        const searchBtnSelector = 'button[type="submit"], .Lcv5J';
        try {
            await page.waitForSelector(searchBtnSelector, { timeout: 5000 });
            console.log('✅ Search button found! Clicking...');
            await page.click(searchBtnSelector);


            console.log('⏳ Waiting for results...');
            // Wait for results - check common containers
            try {
                // Wait for something that looks like a grid or list
                await page.waitForFunction(() => {
                    // Return the first element that looks like a result card
                    return document.querySelector('div[class*="Card"], div[class*="Result"], article, .mY7wC');
                }, { timeout: 15000 });

                console.log('✅ Results detected.');

                // Dump the HTML of the first few results to find selectors
                const resultHTML = await page.evaluate(() => {
                    const bestContainer = document.querySelector('div[class*="list"]') || document.body;
                    // Try to find a repeating element
                    const cards = Array.from(document.querySelectorAll('div, article, li')).filter(el => {
                        return el.textContent.includes('UAH') && el.querySelector('img');
                    });
                    if (cards.length > 0) {
                        return cards[0].outerHTML; // Return first card
                    }
                    return "No specific card found, body: " + document.body.innerText.substring(0, 500);
                });

                console.log('🔍 Result HTML Snippet:', resultHTML.substring(0, 2000));
            } catch (e) {
                console.error('⚠️ Timeout waiting for results or analyzing them.', e);
            }


            console.log('📸 Taking screenshot of results...');
            await page.screenshot({ path: 'tpg-results.png' });
            console.log('✅ Saved tpg-results.png');


        } catch (e) {
            console.error('⚠️ Could not find or click Search button', e);
        }

    } catch (error) {

        console.error('❌ specific error:', error);
    } finally {
        console.log('👋 Closing browser in 5 seconds...');
        await new Promise(r => setTimeout(r, 5000));
        if (browser) await browser.close();
    }
}

testTPG();
