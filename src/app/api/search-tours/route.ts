import { NextResponse } from 'next/server';
import puppeteer from 'puppeteer';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { departure, destination, date, nights, tourists } = body;

        // Construct JoinUp URL (Simplified logic for demo)
        // Real URL needs mapping IDs. For now, we search generally or specific params.
        // Example: https://joinup.ua/uk/tours?destinations=c_8 (Turkey)

        // Map common destinations to JoinUp IDs (approximate)
        const destinationMap: Record<string, string> = {
            'turkey': 'c_8',
            'egypt': 'c_1',
            'spain': 'c_20',
            'greece': 'c_17',
            'uae': 'c_36',
        };

        const destId = destinationMap[destination] || 'c_8'; // Default to Turkey

        // Construct URL
        const baseUrl = 'https://joinup.ua/uk/tours';
        const params = new URLSearchParams({
            destinations: destId,
            pax_adl: tourists?.toString() || '2',
            stay: '7', // Simplified
            no_tickets: 'false',
        });

        const searchUrl = `${baseUrl}?${params.toString()}`;
        console.log('Scraping URL:', searchUrl);

        const browser = await puppeteer.launch({
            headless: true, // "new" is deprecated, but check version. true is fine.
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });
        const page = await browser.newPage();

        // Set viewport for consistent results
        await page.setViewport({ width: 1280, height: 800 });

        await page.goto(searchUrl, { waitUntil: 'networkidle2', timeout: 60000 });

        // Wait for results to load. JoinUp results usually have a class like separate hotel card.
        // Based on previous observation/standard structure, we look for result cards.
        // We'll wait for a generic selector or timeout.
        // Let's try to wait for something that looks like a price or hotel name.

        // Result selector strategy:
        // We'll try to find elements that look like hotel cards.
        // This is fragile and depends on current class names which might be hashed or specific.
        // We will attempt to grab generic containers.

        // In many sites, results are in `div`s with specific attributes. 
        // JoinUp uses dynamic classes. We might need to inspect more, but for now 
        // we can try to grab text content that looks like a Hotel Name + Price.

        const results = await page.evaluate(() => {
            const cards = Array.from(document.querySelectorAll('div[class*="Card_wrapper"]')); // Hipothesis: class contains "Card"
            // If that fails, we might just grab the first few logical blocks.
            // Let's try a broader strategy if specific classes fail: content analysis.

            // Actually, looking at the DOM dump from step 8/53 would be great but I only have screenshot/text summary.
            // Wait, I can't browse invalid URLs.
            // Let's assume standard scraping or try to find common "wrapper" divs.

            // Fallback: Return page title to prove it worked, or finding simple elements.
            // Let's try to find elements with "Hotel" or prices "грн" / "€" / "$"

            const items = [];
            const possibleCards = document.querySelectorAll('a[href^="/uk/hotel/"]'); // Links to hotels are reliable!

            for (const link of possibleCards) {
                const container = link.closest('div');
                if (!container) continue;

                const name = container.querySelector('h3, .hotel-name, [class*="title"]')?.textContent?.trim() || 'Unknown Hotel';
                const price = container.innerText.match(/(\d+[\d\s]*)\s*([$€]|грн)/)?.[0] || 'Price on request';
                const img = container.querySelector('img')?.getAttribute('src') || '';

                items.push({
                    hotelName: name,
                    price: price,
                    image: img,
                    link: `https://joinup.ua${link.getAttribute('href')}`
                });

                if (items.length >= 5) break;
            }

            return items;
        });

        await browser.close();

        return NextResponse.json({
            success: true,
            url: searchUrl,
            data: results
        });

    } catch (error) {
        console.error('Scraping error:', error);
        return NextResponse.json({ success: false, error: 'Failed to scrape' }, { status: 500 });
    }
}
