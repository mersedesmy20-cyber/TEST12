import { NextResponse } from 'next/server';
import { searchTPG } from '@/lib/tpg';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { departure, destination, date, nights, tourists } = body;

        // TPG Search Integration
        console.log('Searching via TPG Scraper...');

        try {
            const tpgResults = await searchTPG({
                destination: destination || '',
                departure: departure || 'kyiv',
                date: date,
                nights: typeof nights === 'string' ? parseInt(nights) : nights
            });

            if (tpgResults.length > 0) {
                console.log('TPG Results Sample:', JSON.stringify(tpgResults[0], null, 2));
                return NextResponse.json({
                    success: true,
                    data: tpgResults,
                    source: 'TPG'
                });
            } else {
                console.log('TPG returned 0 results.');
            }
        } catch (tpgError) {
            console.error('TPG Search failed:', tpgError);
        }

        // Fallback to Mock Data if everything fails
        const mockResults = [
            {
                hotelName: `Grand Hotel TPG Example`,
                price: '25 400 ₴',
                image: '/images/destinations/egypt.jpg',
                link: 'https://agent.tpg.ua/ua', // Valid link
                duration: 7
            }
        ];

        return NextResponse.json({
            success: true,
            data: mockResults,
            isMock: true,
            message: 'Search failed, showing mock data'
        });

    } catch (error) {
        console.error('Search Proxy Error:', error);
        return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
    }
}
