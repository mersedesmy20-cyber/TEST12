import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { departure, destination, date, nights, tourists } = body;

        // ID Mapping - Origins (departure cities)
        const originMap: Record<string, number> = {
            'kyiv': 325,
            'lviv': 73,
            'odesa': 74,
            'warsaw': 31,
            'chisinau': 33
        };

        // ID Mapping - Destinations (countries)
        const destMap: Record<string, string> = {
            'turkey': 'c_8',
            'egypt': 'c_1',
            'spain': 'c_20',
            'greece': 'c_17',
            'montenegro': 'c_28',      // Fixed: was c_14
            'dominican': 'c_24',
            'uae': 'c_36',
            'thailand': 'c_16',        // Fixed: was c_32
            // New countries - Phase 1
            'albania': 'c_122',
            'tunisia': 'c_58',
            'zanzibar': 'c_107'
        };

        const originId = originMap[departure] || 325; // Default Kyiv
        const destId = destination ? destMap[destination] : ''; // Empty means all destinations

        // Extract numeric ID for API (remove 'c_' prefix)
        const destIdNumber = destId ? parseInt(destId.replace('c_', ''), 10) : null;

        // Construct Request Body for JoinUp API
        const joinUpPayload = {
            destinationCountryId: destIdNumber,
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

        // Try API first
        try {
            console.log('--- JoinUp API Request ---');
            console.log('Payload:', JSON.stringify(joinUpPayload, null, 2));

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

            console.log('API Response Status:', response.status);

            if (response.ok) {
                const apiData = await response.json();
                console.log('API Response Data (first item):', apiData.items?.[0] ? JSON.stringify(apiData.items[0]) : 'No items');
                console.log('API Response Total Items:', apiData.items?.length || 0);

                // Transform API response to our format
                const tours = apiData.items?.slice(0, 9).map((item: any) => ({
                    hotelName: item.hotel?.name || 'Unknown Hotel',
                    price: `${item.price?.price} ${item.price?.currency}`,
                    image: item.hotel?.images?.[0]?.url
                        ? `https://img.joinup.ua/${item.hotel.images[0].url}`
                        : 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1000',
                    link: `https://joinup.ua/uk/tour/${item.id}`,
                    duration: item.duretion || item.duration || 7
                })) || [];

                if (tours.length > 0) {
                    return NextResponse.json({
                        success: true,
                        data: tours,
                        source: 'api'
                    });
                }
            } else {
                const errorText = await response.text();
                console.log('API Error Response:', errorText);
            }

            console.log('API failed or returned no results, trying HTML fallback...');
        } catch (apiError) {
            console.log('API request error, trying HTML fallback...', apiError);
        }

        // Fallback to HTML parsing
        const urlParams = new URLSearchParams({
            hotel_categories: '4,5',
            boards: 'UAI,AI',
            stay: '7',
            default: 'true',
            origins: originId.toString(),
            ...(destId && { destinations: destId }),
            pax_adl: (joinUpPayload.people.adults || 2).toString()
        });

        const htmlUrl = `https://joinup.ua/uk/tours?${urlParams.toString()}`;
        console.log('Fetching HTML from:', htmlUrl);

        const htmlResponse = await fetch(htmlUrl, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
                'Accept-Language': 'uk,en;q=0.9',
                'Referer': 'https://joinup.ua/uk/search-tour'
            }
        });

        if (!htmlResponse.ok) {
            throw new Error(`HTML fetch error: ${htmlResponse.status}`);
        }

        const html = await htmlResponse.text();

        // Parse HTML using regex patterns based on browser research
        const tours: any[] = [];

        // Pattern to find tour cards - looking for hotel links with class 'tour-line__name-link'
        const hotelLinkRegex = /<a[^>]*class=["']tour-line__name-link["'][^>]*href=["']([^"']*)["'][^>]*>([^<]+)<\/a>/g;
        const matches = [...html.matchAll(hotelLinkRegex)];

        for (let i = 0; i < Math.min(matches.length, 9); i++) {
            const match = matches[i];
            const tourLink = match[1];
            const hotelName = match[2].trim();

            // Try to find price near this hotel (looking backwards in HTML)
            const beforeMatch = html.substring(Math.max(0, match.index! - 500), match.index!);
            const priceMatch = beforeMatch.match(/(\d{1,3}(?:[\s,]\d{3})*)[\s]*(?:₴|грн)/g);
            const price = priceMatch ? priceMatch[priceMatch.length - 1] : '—';

            // Try to find duration (number followed by nights indication)
            const durationMatch = beforeMatch.match(/(\d+)[\s]*(?:ночей|ночі|ніч)/i);
            const duration = durationMatch ? parseInt(durationMatch[1]) : 7;

            // Try to find image - look for swiper-slide image near this tour
            const imageContext = html.substring(Math.max(0, match.index! - 1000), match.index! + 500);
            const imageMatch = imageContext.match(/<img[^>]*src=["']([^"']*)["'][^>]*>/i);
            let imageUrl = 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1000';

            if (imageMatch && imageMatch[1]) {
                const imgSrc = imageMatch[1];
                if (imgSrc.startsWith('http')) {
                    imageUrl = imgSrc;
                } else if (imgSrc.startsWith('/')) {
                    imageUrl = `https://joinup.ua${imgSrc}`;
                } else {
                    imageUrl = `https://cms.joinup.travel${imgSrc.startsWith('/') ? '' : '/'}${imgSrc}`;
                }
            }

            tours.push({
                hotelName,
                price,
                image: imageUrl,
                link: tourLink.startsWith('http') ? tourLink : `https://joinup.ua${tourLink}`,
                duration
            });
        }

        return NextResponse.json({
            success: true,
            data: tours,
            source: 'html'
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
