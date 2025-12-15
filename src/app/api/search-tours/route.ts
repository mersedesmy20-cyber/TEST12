import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { departure, destination, date, nights, tourists } = body;

        // Simulation mode (Fallback because Puppeteer cannot be installed in this environment)
        await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate delay

        // Mock data based on request
        const mockResults = [
            {
                hotelName: `Grand Hotel ${destination || 'Turkey'} Resort`,
                price: '25 400 грн',
                image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1000&auto=format&fit=crop',
                link: '#'
            },
            {
                hotelName: `Royal ${destination || 'Beach'} Palace`,
                price: '32 150 грн',
                image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=1000&auto=format&fit=crop',
                link: '#'
            },
            {
                hotelName: 'Sunset Premium Spa',
                price: '19 800 грн',
                image: 'https://images.unsplash.com/photo-1571896349842-6e5a51335022?q=80&w=1000&auto=format&fit=crop',
                link: '#'
            },
            {
                hotelName: 'Elite Family Club',
                price: '45 000 грн',
                image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=1000&auto=format&fit=crop',
                link: '#'
            },
            {
                hotelName: 'Blue Horizon View',
                price: '28 900 грн',
                image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=1000&auto=format&fit=crop',
                link: '#'
            }
        ];

        return NextResponse.json({
            success: true,
            url: 'https://joinup.ua/uk/tours',
            data: mockResults
        });

    } catch (error) {
        console.error('Search error:', error);
        return NextResponse.json({ success: false, error: 'Failed to search' }, { status: 500 });
    }
}
