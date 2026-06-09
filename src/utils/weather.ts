const coordinates: Record<string, { lat: number; lng: number }> = {
  turkey: { lat: 41.0, lng: 28.9 }, // Istanbul
  spain: { lat: 40.4, lng: -3.7 }, // Madrid
  greece: { lat: 37.9, lng: 23.7 }, // Athens
  montenegro: { lat: 42.4, lng: 19.2 }, // Podgorica
  albania: { lat: 41.3, lng: 19.8 }, // Tirana
  france: { lat: 48.8, lng: 2.3 }, // Paris
  italy: { lat: 41.9, lng: 12.4 }, // Rome
  croatia: { lat: 45.8, lng: 15.9 }, // Zagreb
  bulgaria: { lat: 42.6, lng: 23.3 }, // Sofia
  cyprus: { lat: 35.1, lng: 33.3 }, // Nicosia
  czechia: { lat: 50.0, lng: 14.4 }, // Prague
  egypt: { lat: 30.0, lng: 31.2 }, // Cairo
  uae: { lat: 25.2, lng: 55.2 }, // Dubai
  thailand: { lat: 13.7, lng: 100.5 }, // Bangkok
  maldives: { lat: 3.2, lng: 73.2 }, // Male
  bali: { lat: -8.4, lng: 115.1 }, // Bali
  // Fallback default
  default: { lat: 0, lng: 0 }
};

export async function getWeatherForCountry(countryId: string) {
  const coords = coordinates[countryId] || coordinates.default;
  if (coords.lat === 0 && coords.lng === 0) return null;

  try {
    const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${coords.lat}&longitude=${coords.lng}&current_weather=true`, {
      next: { revalidate: 3600 } // Cache for 1 hour
    });
    
    if (!res.ok) return null;
    const data = await res.json();
    return data.current_weather; // { temperature, windspeed, weathercode, time }
  } catch (error) {
    console.error("Failed to fetch weather", error);
    return null;
  }
}

// Map WMO weather codes to emojis
export function getWeatherEmoji(code: number) {
  if (code === 0) return '☀️'; // Clear
  if (code >= 1 && code <= 3) return '⛅'; // Partly cloudy
  if (code >= 45 && code <= 48) return '🌫️'; // Fog
  if (code >= 51 && code <= 67) return '🌧️'; // Rain
  if (code >= 71 && code <= 77) return '❄️'; // Snow
  if (code >= 80 && code <= 82) return '🌧️'; // Showers
  if (code >= 95 && code <= 99) return '⛈️'; // Thunderstorm
  return '🌡️';
}
