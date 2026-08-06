import { useEffect, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';

export function useGoogleMap(apiKey) {
  const [google, setGoogle] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const key = apiKey || import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '';
    
    const loader = new Loader({
      apiKey: key,
      version: 'weekly',
      libraries: ['geometry']
    });

    loader.load()
      .then((g) => {
        setGoogle(g);
      })
      .catch((e) => {
        console.error('Failed to load Google Maps SDK', e);
        setError(e);
      });
  }, [apiKey]);

  return { google, error };
}
