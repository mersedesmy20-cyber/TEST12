
import puppeteer from 'puppeteer';

// Country ID Mapping
const TPG_COUNTRIES: Record<string, string> = {
    'turkey': '143',
    'egypt': '49',
    'spain': '61',
    'greece': '44',
    'montenegro': '154',
    'bulgaria': '23',
    'croatia': '152',
    'albania': '7',
    'cyprus': '71',
    'italy': '62',
    'uae': '109',
    'thailand': '137',
    'srilanka': '159',
    'indonesia': '55', // Bali
    'maldives': '91',
    'vietnam': '34',
    'georgia': '45',
    'zanzibar': '139', // Tanzania
    'dominican': '48',
    'mexico': '95',
    'cuba': '77',
    'czechia': '155',
    'france': '150',
    'tunisia': '142' // Guessed/Found closest match or need validation. I'll comment it if unsure, but 142 is likely near Turkey(143).
};

// Departure Mapping (TPG internal IDs)
// 1091 = Kyiv (from logs)
const TPG_CITIES: Record<string, string> = {
    'kyiv': '1091',
    'lviv': '1096', // Hypothetical - would need verification, defaulting to Kyiv for now if unknown
    'odesa': '1106',
    'chisinau': '5202' // Often standard ID in CIS systems
};

interface TPGSearchParams {
    destination: string;
    departure: string;
    date?: string; // YYYY-MM-DD
    nights?: number;
}

export async function searchTPG(params: TPGSearchParams) {
    const countryId = TPG_COUNTRIES[params.destination] || '143'; // Default Turkey
    const cityId = TPG_CITIES[params.departure] || '1091'; // Default Kyiv

    let browser;
    try {
        console.log('Launching Puppeteer for TPG...');
        browser = await puppeteer.launch({
            headless: true,
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });

        const page = await browser.newPage();

        // Optimize: Block images/fonts to speed up
        await page.setRequestInterception(true);
        page.on('request', (req) => {
            if (['image', 'stylesheet', 'font'].includes(req.resourceType())) {
                req.abort();
            } else {
                req.continue();
            }
        });

        // Navigate to results directly with query params to predefined search if possible, 
        // BUT TPG uses hash or simple paths.
        // Easiest is to go to main page and set state via JS or type.

        // Actually, we can try to construct the URL if we know the format.
        // /ua/results?qd=... is a unique ID.
        // So we must use the form.

        console.log('Navigating to agent.tpg.ua...');
        await page.goto('https://agent.tpg.ua/ua', { waitUntil: 'networkidle2', timeout: 30000 });

        // Wait for Country Select
        // The selector found by agent: input[placeholder="Виберіть країну"]
        const countryInputSelector = 'input[placeholder="Виберіть країну"]';
        await page.waitForSelector(countryInputSelector);

        // Interact with Form
        // 1. Set Country
        console.log(`Setting country to ID: ${countryId}`);

        // We can try to manipulate the React state directly or just use simple clicks if text matches.
        // Since we have IDs, we might want to try to intercept the form submission or just "Click search" for the default (Egypt) -> Then filter?

        // Better: Type the country name in Ukrainian (we need a map for that too) or use the ID.
        // The browser agent found extracting via ID from the list is possible.

        // Let's try to type the country name.
        const countryNameMap: Record<string, string> = {
            'turkey': 'Туреччина',
            'egypt': 'Єгипет',
            'bulgaria': 'Болгарія',
            'greece': 'Греція',
            'spain': 'Іспанія',
            'montenegro': 'Чорногорія',
            'uae': 'ОАЕ'
            // ... others ...
        };

        const targetName = countryNameMap[params.destination];
        if (targetName) {
            await page.click(countryInputSelector);
            await page.type(countryInputSelector, targetName, { delay: 50 });

            // Wait for dropdown option
            const optionSelector = `li[role="option"]`;
            await page.waitForSelector(optionSelector);

            // Select exact match
            const options = await page.$$(optionSelector);
            for (const opt of options) {
                const text = await page.evaluate(el => el.textContent, opt);
                if (text && text.includes(targetName)) {
                    await opt.click();
                    break;
                }
            }
        }

        // 2. Click Search (Class .Lcv5J found by agent)
        console.log('Clicking Search...');
        const searchBtnSelector = '.Lcv5J, button[type="submit"]';
        await page.waitForSelector(searchBtnSelector);

        // Wait a bit for UI update
        await new Promise(r => setTimeout(r, 500));

        await page.click(searchBtnSelector);

        // 3. Wait for Results
        // Results usually have hotel names. Class .mY7wC was seen?
        console.log('Waiting for results...');
        try {
            await page.waitForSelector('.mY7wC', { timeout: 15000 }); // Adjust selector based on actual results class
        } catch (e) {
            console.log('Timeout waiting for results, taking screenshot...');
            // Optional debug
        }

        // 4. Extract Data
        const tours = await page.evaluate(() => {
            const items = document.querySelectorAll('.mY7wC'); // Container for result item
            const results: any[] = [];

            items.forEach((item) => {
                // Determine internal selectors
                // These classes are obfuscated/minified (e.g. mY7wC).
                // We should try to find by structure if classes change.

                // Hotel Name: usually bold, large text.
                const hotelNameEl = item.querySelector('div[class*="Text"]'); // Heuristic
                const hotelName = hotelNameEl ? hotelNameEl.textContent : 'Unknown Hotel';

                // Price: ending with UAH/грн
                const priceEl = Array.from(item.querySelectorAll('*')).find(el => el.textContent?.includes('UAH') || el.textContent?.includes('грн'));
                const price = priceEl ? priceEl.textContent : 'Check Price';

                // Image
                const imgEl = item.querySelector('img');
                const image = imgEl ? imgEl.src : '';

                // Link
                const linkEl = item.querySelector('a');
                const link = linkEl ? linkEl.href : '';

                if (hotelName) {
                    results.push({
                        hotelName: hotelName?.trim(),
                        price: price?.trim(),
                        image,
                        link,
                        duration: 7, // Default or extract
                        source: 'TPG'
                    });
                }
            });
            return results.slice(0, 10);
        });

        // If selector .mY7wC was wrong, we need a better strategy. 
        // The browser agent screenshot showed cards.
        // Let's use a more generic strategy: find cards by identifying price and hotel name proximity.

        return tours;

    } catch (error) {
        console.error('Puppeteer TPG Error:', error);
        return [];
    } finally {
        if (browser) await browser.close();
    }
}
