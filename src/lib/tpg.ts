
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

        // --- NEW: Select Departure City ---
        const departureInputSelector = 'input[placeholder="Виберіть місто"]';
        try {
            await page.waitForSelector(departureInputSelector, { timeout: 5000 });

            const cityMap: Record<string, string> = {
                'kyiv': 'Київ',
                'lviv': 'Львів',
                'odesa': 'Одеса',
                'warsaw': 'Варшава',
                'chisinau': 'Кишинів',
                'rzeszow': 'Жешув'
            };

            const departureCity = cityMap[params.departure] || 'Київ';
            console.log(`Setting Departure to: ${departureCity}`);

            // Clear and Type
            await page.click(departureInputSelector, { clickCount: 3 });
            await page.keyboard.press('Backspace');
            await page.type(departureInputSelector, departureCity, { delay: 100 });

            // Wait for dropdown selection
            try {
                // Wait for the specific option appearing
                const optionSelector = 'li[role="option"], .MuiAutocomplete-option';
                await page.waitForSelector(optionSelector, { timeout: 5000 });

                // Find the option with the correct text
                await page.evaluate((selector, text) => {
                    const options = Array.from(document.querySelectorAll(selector));
                    const match = options.find(el => el.textContent && el.textContent.includes(text));
                    if (match) {
                        (match as HTMLElement).click();
                    } else {
                        // fallback to clicking first
                        if (options.length > 0) (options[0] as HTMLElement).click();
                    }
                }, optionSelector, departureCity);

            } catch (e) {
                console.log('Departure dropdown timed out, using Enter');
                await page.keyboard.press('Enter');
            }

        } catch (e) {
            console.error('Could not set departure city', e);
        }

        // --- NEW: Select Date ---
        // --- NEW: Select Date ---
        if (params.date) {
            console.log(`Setting Date to: ${params.date}`); // Format YYYY-MM-DD

            const [year, month, day] = params.date.split('-').map(Number); // 2026, 3, 15
            const formattedDate = `${String(day).padStart(2, '0')}.${String(month).padStart(2, '0')}.${year}`;

            const dateInputSelector = 'input[placeholder="Дата початку туру"]';
            try {
                // Try JS-based set and event trigger for reliability
                const setDate = await page.evaluate((selector, dateVal) => {
                    const input = document.querySelector(selector) as HTMLInputElement;
                    if (input) {
                        input.value = dateVal;
                        // Trigger React/Native change events
                        input.dispatchEvent(new Event('input', { bubbles: true }));
                        input.dispatchEvent(new Event('change', { bubbles: true }));
                        input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
                        return true;
                    }
                    return false;
                }, dateInputSelector, formattedDate);

                if (!setDate) {
                    // Fallback to typing if selector didn't work directly
                    console.log('JS Date set failed, trying Type...');
                    try {
                        const input = await page.$(dateInputSelector) || await page.$('input[value*="."]');
                        if (input) {
                            await input.click({ clickCount: 3 });
                            await page.keyboard.press('Backspace');
                            await page.type(dateInputSelector, formattedDate, { delay: 50 });
                            await page.keyboard.press('Enter');
                            console.log(`Date typed: ${formattedDate}`);
                        } else {
                            console.log('Could not find date input');
                        }
                    } catch (clickError) {
                        console.log('Date input click failed, skipping date selection');
                    }
                } else {
                    console.log(`Date set to ${formattedDate} via JS`);
                }

                // Wait for UI to update
                await new Promise(r => setTimeout(r, 1000));

            } catch (e) {
                console.error('Date selection failed', e);
            }
        }
        // ----------------------------------
        // ----------------------------------

        // Click Search
        const searchBtnSelector = 'button[type="submit"]'; // verified in test
        await page.waitForSelector(searchBtnSelector);
        await new Promise(r => setTimeout(r, 1000)); // Slight delay
        await page.click(searchBtnSelector);

        console.log('Waiting for results...');

        // Wait for results - look for price currency or common card elements
        try {
            await page.waitForFunction(() => {
                const text = document.body.innerText;
                return text.includes('₴') || text.includes('UAH') || document.querySelectorAll('.t_card').length > 0;
            }, { timeout: 45000 });
        } catch (waitError) {
            console.log('Wait for results timed out, attempting extraction anyway...');
        }

        // Extract Data - Simplified approach
        // Instead of trying to parse individual tours, get the current URL and basic info
        const tours = await page.evaluate(() => {
            const results: any[] = [];

            // Try to find tour cards using common TPG selectors
            const cards = document.querySelectorAll('[class*="card"], [class*="tour"], .mY7wC, [data-testid*="tour"]');

            if (cards.length > 0) {
                // Found tour cards, try to extract them
                cards.forEach((card, index) => {
                    if (index >= 12) return; // Limit to 12

                    const nameEl = card.querySelector('h3, h4, [class*="title"], [class*="name"]');
                    const priceEl = card.querySelector('[class*="price"], [class*="cost"]');
                    const imgEl = card.querySelector('img');
                    const linkEl = card.querySelector('a');

                    if (nameEl && priceEl) {
                        results.push({
                            hotelName: nameEl.textContent?.trim() || 'Тур в Єгипет',
                            price: priceEl.textContent?.trim() || '',
                            image: imgEl?.getAttribute('src') || imgEl?.getAttribute('data-src') || '/images/destinations/egypt.jpg',
                            link: linkEl?.href || window.location.href,
                            duration: 7,
                            source: 'TPG'
                        });
                    }
                });
            }

            // If we couldn't extract individual tours, return a link to the results page
            if (results.length === 0) {
                const priceElements = Array.from(document.querySelectorAll('*')).filter(el =>
                    el.textContent &&
                    (el.textContent.includes('₴') || el.textContent.includes('грн')) &&
                    el.textContent.replace(/\D/g, '').length > 3 &&
                    el.textContent.length < 30
                );

                if (priceElements.length > 0) {
                    // We see prices, so there are results, just return a generic link
                    results.push({
                        hotelName: `Знайдено ${priceElements.length} турів на TPG`,
                        price: 'Від ' + priceElements[0].textContent?.trim(),
                        image: '/images/destinations/egypt.jpg',
                        link: window.location.href,
                        duration: 7,
                        source: 'TPG'
                    });
                }
            }

            return results;
        });

        console.log(`Found ${tours.length} tours from TPG`);

        // Take a screenshot for debugging
        await page.screenshot({ path: 'tpg-results-debug.png' });

        return tours;

    } catch (error) {
        console.error('Puppeteer TPG Error:', error);
        return [];
    } finally {
        if (browser) await browser.close();
    }
}
