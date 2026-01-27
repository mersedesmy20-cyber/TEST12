
// Native fetch in Node 18+

async function test() {
    console.log('Testing API with User Parameters...');
    try {
        const res = await fetch('http://localhost:3000/api/search-tours', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                destination: 'egypt',
                departure: 'chisinau', // Кишинів
                date: '2026-03-15',    // 15.03.2026
                nights: '7-14'
            })
        });
        const data = await res.json();
        console.log('API Response Status:', res.status);
        if (data.success) {
            console.log(`Success! Found ${data.data.length} tours.`);
            if (data.data.length > 0) {
                console.log('First Result:', data.data[0]);
            } else {
                console.log('Data is empty array []');
            }
        } else {
            console.log('API Returned Error:', data);
        }
    } catch (e) {
        console.error('Fetch error:', e);
    }
}
test();
