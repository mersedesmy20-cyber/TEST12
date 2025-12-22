const puppeteer = require('puppeteer');

async function checkDeparture() {
    const browser = await puppeteer.launch({
        headless: false,
        args: ['--start-maximized']
    });
    const page = await browser.newPage();
    await page.goto('https://agent.tpg.ua/ua', { waitUntil: 'networkidle2' });

    console.log('Page loaded. Checking for departure inputs...');

    // Dump all inputs and selects
    const inputs = await page.evaluate(() => {
        const els = Array.from(document.querySelectorAll('input, select, [role="button"]'));
        return els.map(e => ({
            tagName: e.tagName,
            id: e.id,
            class: e.className,
            placeholder: e.placeholder || '',
            text: e.innerText || '',
            value: e.value || ''
        }));
    });

    console.log('Inputs found:', JSON.stringify(inputs, null, 2));

    await page.screenshot({ path: 'tpg-form.png' });
    await browser.close();
}

checkDeparture();
