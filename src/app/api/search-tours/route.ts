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
                image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1000&auto=format&fit=crop',
                link: '#',
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
