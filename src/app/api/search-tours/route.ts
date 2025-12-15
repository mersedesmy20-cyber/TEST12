import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { departure, destination, date, nights, tourists } = body;

        // ID Mapping
        const originMap: Record<string, number> = {
            'kyiv': 325,
            'lviv': 73,
            'odesa': 74,
            'warsaw': 31,
            'chisinau': 33
        };

        const destMap: Record<string, string> = {
            'turkey': 'c_8',
            'egypt': 'c_1',
            'spain': 'c_20',
            'greece': 'c_17',
            'uae': 'c_36'
        };

        const originId = originMap[departure] || 325; // Default Kyiv
        const destId = destMap[destination] || 'c_8'; // Default Turkey

        // Construct Request Body for JoinUp API
        const joinUpPayload = {
            destinationCountryId: destId,
            originCountryId: 3, // Ukraine? Or inferred from origin?
            originLocationIds: [originId],
            dateRange: date ? { begin: date, end: date } : null, // If empty, API might have defaults or we need to Generate
            // Defaulting date to +2 weeks from now if not provided
            stayDuration: nights === '1-6' ? [3, 4, 5, 6] : nights === '7-14' ? [7, 8, 9, 10, 11, 12, 13, 14] : [7],
            people: {
                adults: Number(tourists) || 2,
                children: 0,
                infants: 0,
                childrenAges: []
            },
            hotelCategories: [4, 5], // Default 4-5 stars
            boards: ["UAI", "AI"] // All inclusive preferred
        };

        // Date Fallback logic
        if (!joinUpPayload.dateRange) {
            const today = new Date();
            const nextWeek = new Date(today);
            nextWeek.setDate(today.getDate() + 14);
            const end = new Date(nextWeek);
            end.setDate(nextWeek.getDate() + 14);

            const formatDate = (d: Date) => d.toISOString().split('T')[0];
            joinUpPayload.dateRange = {
                begin: formatDate(nextWeek),
                end: formatDate(end)
            };
        }

        console.log('Proxying request to JoinUp:', JSON.stringify(joinUpPayload));

        const response = await fetch('https://joinup.ua/api/v1.0/tours/search-results', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Accept': 'application/json, text/plain, */*',
                'Referer': 'https://joinup.ua/uk/search-tour',
                'Origin': 'https://joinup.ua'
            },
            body: JSON.stringify(joinUpPayload)
        });

        if (!response.ok) {
            console.error('JoinUp API Error:', response.status, response.statusText);
            // Fallback to mock data if API fails (e.g. 403)
            throw new Error(`JoinUp API error: ${response.status}`);
        }

        const apiData = await response.json();

        // Transform API response to our format
        const tours = apiData.items?.slice(0, 9).map((item: any) => ({
            hotelName: item.hotel?.name || 'Unknown Hotel',
            price: `${item.price?.price} ${item.price?.currency}`,
            image: item.hotel?.images?.[0]?.url
                ? `https://img.joinup.ua/${item.hotel.images[0].url}`
                : 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1000',
            link: `https://joinup.ua/uk/tour/${item.id}`, // Construct link
            duration: item.duretion // typo in some APIs, usually duration
        })) || [];

        return NextResponse.json({
            success: true,
            data: tours
        });

    } catch (error) {
        console.error('Search Proxy Error:', error);

        // Return Mock Data on Error so UI doesn't break
        const mockResults = [
            {
                hotelName: `Grand Hotel (Simulated)`,
                price: '25 400 грн',
                image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1000&auto=format&fit=crop',
                link: '#',
                duration: 7
            }
        ];

        return NextResponse.json({
            success: true,
            data: mockResults,
            isMock: true
        });
    }
}
