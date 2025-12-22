const puppeteer = require('puppeteer');

async function debugTPG() {
    const browser = await puppeteer.launch({ headless: false }); // Visible
    const page = await browser.newPage();
    await page.setViewport({ width: 1400, height: 900 });

    try {
        await page.goto('https://agent.tpg.ua/ua', { waitUntil: 'networkidle2' });

        // Setup Search like the user
        // Country: Egypt
        await page.click('input[placeholder="Виберіть країну"]', { clickCount: 3 });
        await page.type('input[placeholder="Виберіть країну"]', 'Єгипет', { delay: 50 });
        await page.keyboard.press('Enter');

        // Departure: Warsaw
        await new Promise(r => setTimeout(r, 1000));
        await page.click('input[placeholder="Виберіть місто"]', { clickCount: 3 });
        await page.type('input[placeholder="Виберіть місто"]', 'Варшава', { delay: 50 });
        await page.keyboard.press('Enter');

        // Search
        await page.click('button[type="submit"]');
        console.log('Clicked search...');

        // Wait for results
        await new Promise(r => setTimeout(r, 15000)); // Wait 15s

        // Dump DOM details
        const details = await page.evaluate(() => {
            // Find anything that looks like a result
            const cards = Array.from(document.querySelectorAll('div, a, article')).filter(el => {
                return (el.innerText.includes('₴') || el.innerText.includes('UAH')) && el.querySelector('img');
            });

            return cards.slice(0, 5).map(c => ({
                tag: c.tagName,
                class: c.className,
                text: c.innerText.substring(0, 100),
                hasLink: !!c.querySelector('a'),
                linkHref: c.querySelector('a')?.href || ''
            }));
        });

        console.log('Debug Results:', JSON.stringify(details, null, 2));

    } catch (e) {
        console.error(e);
    } finally {
        await browser.close();
    }
}
debugTPG();
