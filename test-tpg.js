const puppeteer = require('puppeteer');

async function testTPG() {
    console.log('🚀 Starting TPG Debug Test (Chisinau + Date)...');
    let browser;
    try {
        browser = await puppeteer.launch({
            headless: false,
            defaultViewport: null,
            args: ['--start-maximized']
        });

        const page = await browser.newPage();

        // --- STEP 1: LOAD PAGE ---
        console.log('1️⃣ Navigating to agent.tpg.ua/ua...');
        await page.goto('https://agent.tpg.ua/ua', { waitUntil: 'networkidle2', timeout: 60000 });
        console.log('✅ Page loaded.');
        await page.screenshot({ path: 'debug-step1-loaded.png' });

        // --- STEP 2: SELECT COUNTRY (EGYPT) ---
        console.log('2️⃣ Selecting Country: Egypt...');
        const countryInputSelector = 'input[placeholder="Виберіть країну"]';
        try {
            await page.waitForSelector(countryInputSelector, { timeout: 10000 });

            // Focus and clear
            await page.click(countryInputSelector);
            await page.click(countryInputSelector, { clickCount: 3 });
            await page.keyboard.press('Backspace');

            // Type slowly
            await page.type(countryInputSelector, 'Єгипет', { delay: 100 });
            await new Promise(r => setTimeout(r, 1500)); // Wait longer for API

            // Select from dropdown
            const optionSelector = 'li[role="option"], .MuiAutocomplete-option';
            await page.waitForSelector(optionSelector, { timeout: 5000 });
            await page.click(optionSelector);
            console.log('✅ Selected Country: Egypt');

        } catch (e) {
            console.error('❌ Failed to select country:', e);
            await page.screenshot({ path: 'debug-error-country.png' });
            return; // Stop if country fails
        }

        await new Promise(r => setTimeout(r, 1000)); // Wait for UI update
        await page.screenshot({ path: 'debug-step2-country-set.png' });

        // --- STEP 3: SELECT DEPARTURE (CHISINAU) ---
        console.log('3️⃣ Selecting Departure: Chisinau...');
        const departureInputSelector = 'input[placeholder="Виберіть місто"]';

        try {
            // Check if disabled
            await page.waitForSelector(departureInputSelector, { timeout: 10000 });
            const isDisabled = await page.$eval(departureInputSelector, el => el.disabled);
            if (isDisabled) {
                console.log('⚠️ Departure input is disabled! Waiting...');
                await page.waitForFunction((sel) => !document.querySelector(sel).disabled, {}, departureInputSelector);
            }

            // Focus and clear
            await page.click(departureInputSelector, { clickCount: 3 });
            await page.keyboard.press('Backspace');

            // Type slowly - Use 'Кишинів'
            await page.type(departureInputSelector, 'Кишинів', { delay: 100 });
            await new Promise(r => setTimeout(r, 1500));

            // Select from dropdown
            const cityOptionSelector = 'li[role="option"], .MuiAutocomplete-option';
            try {
                await page.waitForSelector(cityOptionSelector, { timeout: 5000 });
                // Evaluate to find text 'Кишинів'
                const clicked = await page.evaluate(() => {
                    const opts = Array.from(document.querySelectorAll('li[role="option"], .MuiAutocomplete-option'));
                    const target = opts.find(o => o.innerText.includes('Кишинів')) || opts[0];
                    if (target) {
                        target.click();
                        return true;
                    }
                    return false;
                });

                if (!clicked) throw new Error('City option not found');
                console.log('✅ Selected Departure: Chisinau');
            } catch (e) {
                console.log('⚠️ City Dropdown Timeout, pressing Enter');
                await page.keyboard.press('Enter');
            }

        } catch (e) {
            console.error('❌ Failed to select departure:', e);
            console.log('⚠️ Attempting fallback: Press Enter');
            await page.keyboard.press('Enter');
            await page.screenshot({ path: 'debug-error-city.png' });
        }
        await page.screenshot({ path: 'debug-step3-city-set.png' });

        // --- STEP 3.5: SELECT DATE (15.03.2026) ---
        console.log('3️⃣.5️⃣ Selecting Date: 15.03.2026...');
        const dateInputSelector = 'input[placeholder="Дата початку туру"], input[placeholder*="Дата"]';
        try {
            // Try to find reasonable date input
            const dateInput = await page.$(dateInputSelector) || await page.$('input[value*="."]');
            if (dateInput) {
                await dateInput.click({ clickCount: 3 });
                await page.keyboard.press('Backspace');
                await page.type(dateInputSelector, '15.03.2026', { delay: 100 });
                await page.keyboard.press('Enter');
                console.log('✅ Typed Date: 15.03.2026');
            } else {
                console.log('⚠️ Date input not found!');
            }
        } catch (e) {
            console.error('Date Error', e);
        }
        await page.screenshot({ path: 'debug-step3.5-date-set.png' });

        // --- STEP 4: SEARCH ---
        console.log('4️⃣ Clicking Search...');
        const searchBtnSelector = 'button[type="submit"]';
        await page.click(searchBtnSelector);

        // --- STEP 5: WAIT FOR RESULTS ---
        console.log('5️⃣ Waiting for results (up to 20s)...');

        try {
            await page.waitForFunction(() => {
                const text = document.body.innerText;
                if (text.includes('₴') || text.includes('UAH')) return true;
                return false;
            }, { timeout: 20000 });

            console.log('✅ Results appeared!');
            await page.screenshot({ path: 'debug-step5-results.png' });

            // Extract what we see
            const cardTexts = await page.evaluate(() => {
                const cards = Array.from(document.querySelectorAll('div, a, article')).filter(el =>
                    (el.innerText.includes('₴') || el.innerText.includes('UAH')) &&
                    el.innerText.length < 200 &&
                    !el.tagName.includes('SCRIPT')
                );
                return cards.map(c => c.innerText.substring(0, 50));
            });
            console.log('🔎 Found Items:', cardTexts);

        } catch (e) {
            console.log('⚠️ No results found within timeout.');
            await page.screenshot({ path: 'debug-step5-no-results.png' });
        }

    } catch (error) {
        console.error('❌ Critical Error:', error);
    } finally {
        console.log('👋 Closing in 5s...');
        await new Promise(r => setTimeout(r, 5000));
        if (browser) await browser.close();
    }
}

testTPG();
