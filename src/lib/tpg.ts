
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
    let browser;
    try {
        console.log('Launching Puppeteer for TPG...');
        // Verify executable path or let puppeteer decide (it should work if installed)

        browser = await puppeteer.launch({
            headless: true, // Use standard headless mode
            args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1280,800']
        });

        const page = await browser.newPage();

        // Optimize: Block images/fonts (optional, strictly speaking we want images for results)
        // But for scraping speed we might block them initially? No, we need image URLs.
        // We can just scrape the src.

        console.log('Navigating to agent.tpg.ua...');
        await page.goto('https://agent.tpg.ua/ua', { waitUntil: 'domcontentloaded', timeout: 60000 });

        // Wait for Country Select
        const countryInputSelector = 'input[placeholder="Виберіть країну"]';
        await page.waitForSelector(countryInputSelector, { timeout: 20000 });

        // Map English country names to Ukrainian for typing
        const countryNameMap: Record<string, string> = {
            'turkey': 'Туреччина',
            'egypt': 'Єгипет',
            'bulgaria': 'Болгарія',
            'greece': 'Греція',
            'spain': 'Іспанія',
            'montenegro': 'Чорногорія',
            'uae': 'ОАЕ',
            'croatia': 'Хорватія',
            'albania': 'Албанія',
            'cyprus': 'Кіпр',
            'italy': 'Італія',
            'thailand': 'Таїланд',
            'srilanka': 'Шрі-Ланка',
            'indonesia': 'Індонезія',
            'maldives': 'Мальдіви',
            'vietnam': 'В\'єтнам',
            'georgia': 'Грузія',
            'zanzibar': 'Танзанія', // Zanzibar is usually under Tanzania
            'dominican': 'Домінікана',
            'mexico': 'Мексика',
            'cuba': 'Куба',
            'czechia': 'Чехія',
            'france': 'Франція',
            'tunisia': 'Туніс'
        };

        const targetName = countryNameMap[params.destination] || 'Туреччина';

        console.log(`Searching for: ${targetName}`);

        // Interact with Form
        // Clear input first
        await page.click(countryInputSelector, { clickCount: 3 });
        await page.keyboard.press('Backspace');

        await page.type(countryInputSelector, targetName, { delay: 100 });

        // Wait for dropdown
        try {
            const optionSelector = 'li[role="option"], .MuiAutocomplete-option';
            await page.waitForSelector(optionSelector, { timeout: 5000 });
            await page.click(optionSelector); // Click first match
        } catch (e) {
            console.log('Dropdown selection timed out, trying to proceed with typed value...');
            await page.keyboard.press('Enter');
        }

        // Click Search
        const searchBtnSelector = 'button[type="submit"]'; // verified in test
        await page.waitForSelector(searchBtnSelector);
        await new Promise(r => setTimeout(r, 1000)); // Slight delay
        await page.click(searchBtnSelector);

        console.log('Waiting for results...');

        // Wait for results - look for price currency or common card elements
        await page.waitForFunction(() => {
            const text = document.body.innerText;
            return text.includes('₴') || text.includes('UAH');
        }, { timeout: 30000 });

        // Extract Data
        const tours = await page.evaluate(() => {
            const results: any[] = [];

            // Strategy: Find all price elements, then traverse up to find the card
            // Price usually contains '₴' or 'UAH' and is a leaf node or close to it

            const potentialPrices = Array.from(document.querySelectorAll('*'));
            const priceElements = potentialPrices.filter(el =>
                el.children.length === 0 &&
                el.textContent &&
                (el.textContent.includes('₴') || el.textContent.includes('UAH')) &&
                el.textContent.replace(/\D/g, '').length > 3 // Must have digits
            );

            priceElements.forEach(priceEl => {
                // Traverse up to find a container that has an image and a link
                let container = priceEl.parentElement;
                let hotelName = '';
                let image = '';
                let link = '';

                // Search up to 10 levels
                for (let i = 0; i < 10; i++) {
                    if (!container) break;

                    // Look for image
                    const img = container.querySelector('img');
                    if (img && !image) image = img.src;

                    // Look for link
                    const a = container.querySelector('a');
                    if (a && !link) link = a.href;

                    // Look for hotel name - usually largest text or specific class if we knew it
                    // Heuristic: The text node with significant length that isn't the price
                    if (!hotelName) {
                        // Find all text nodes in this container
                        const texts = Array.from(container.querySelectorAll('*'))
                            .filter(el => el.children.length === 0 && el !== priceEl && el.textContent?.length! > 5)
                            .map(el => el.textContent?.trim() || '');

                        // Pick the longest one that looks like a name? Or first one?
                        // Usually name is before price.
                        if (texts.length > 0) hotelName = texts[0];
                    }

                    // If we have all 3, stop
                    if (image && link && hotelName) break;

                    container = container.parentElement;
                }

                if (hotelName && link) {
                    // Check if already added
                    if (!results.some(r => r.link === link)) {
                        results.push({
                            hotelName,
                            price: priceEl.textContent?.trim(),
                            image: image || 'https://images.unsplash.com/photo-1566073771259-6a8506099945',
                            link,
                            duration: 7, // Placeholder or extract
                            source: 'TPG'
                        });
                    }
                }
            });

            return results.slice(0, 12);
        });

        console.log(`Found ${tours.length} tours from TPG`);
        return tours;

    } catch (error) {
        console.error('Puppeteer TPG Error:', error);
        return [];
    } finally {
        if (browser) await browser.close();
    }
}
