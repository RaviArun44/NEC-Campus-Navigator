import { useEffect, useRef, useState } from 'react';
import { useGoogleMap } from '../../hooks/useGoogleMap';

export default function CampusMapCanvas({
  selected,
  userCoords,
  isNavigating,
  navInfo,
  onNavigate,
  buildings
}) {
  const mapContainerRef = useRef(null);
  const { google, error } = useGoogleMap();
  const [map, setMap] = useState(null);
  
  // Track references to map elements to avoid recreating them
  const markersRef = useRef({});
  const infoWindowRef = useRef(null);
  const userMarkerRef = useRef(null);
  const accuracyCircleRef = useRef(null);
  const directionsRendererRef = useRef(null);

  // Initialize Map
  useEffect(() => {
    if (!google || !mapContainerRef.current || map) return;

    const initializedMap = new google.maps.Map(mapContainerRef.current, {
      center: { lat: 9.1484, lng: 77.8312 }, // NEC Kovilpatti center
      zoom: 17,
      mapTypeId: 'roadmap',
      gestureHandling: 'cooperative',
      mapTypeControl: true,
      mapTypeControlOptions: {
        style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
        position: google.maps.ControlPosition.TOP_RIGHT
      },
      zoomControl: true,
      fullscreenControl: false,
      streetViewControl: false
    });

    // Create a single shared InfoWindow instance
    infoWindowRef.current = new google.maps.InfoWindow();

    // Create DirectionsRenderer instance for routes
    directionsRendererRef.current = new google.maps.DirectionsRenderer({
      map: initializedMap,
      suppressMarkers: true,
      polylineOptions: {
        strokeColor: '#3b82f6',
        strokeOpacity: 0.8,
        strokeWeight: 5
      }
    });

    setMap(initializedMap);
  }, [google, map]);

  // Update Campus Location Markers
  useEffect(() => {
    if (!google || !map) return;

    // Clear existing markers if any
    Object.keys(markersRef.current).forEach((key) => {
      markersRef.current[key].setMap(null);
    });
    markersRef.current = {};

    buildings.forEach((b) => {
      // Skip the 'campus' overview pseudo-building for physical markers
      if (b.id === 'campus') return;

      const marker = new google.maps.Marker({
        position: { lat: b.lat, lng: b.lng },
        map: map,
        title: b.name,
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          fillColor: b.id === 'aids' ? '#7c3aed' : '#ef4444',
          fillOpacity: 0.9,
          strokeColor: '#ffffff',
          strokeWeight: 2,
          scale: 10
        }
      });

      marker.addListener('click', () => {
        const contentString = `
          <div style="color: #1e293b; padding: 0.5rem; font-family: sans-serif; max-width: 220px;">
            <h4 style="margin: 0 0 0.2rem; font-size: 0.9rem; font-weight: bold; color: #1e3a8a;">
              ${b.icon} ${b.name}
            </h4>
            <span style="display: inline-block; font-size: 0.65rem; font-weight: 700; color: #7c3aed; background: #f3e8ff; padding: 2px 6px; border-radius: 4px; margin-bottom: 0.4rem; text-transform: uppercase;">
              ${b.category}
            </span>
            <p style="margin: 0 0 0.6rem; font-size: 0.72rem; color: #64748b; line-height: 1.3;">
              ${b.description}
            </p>
            <button 
              id="info-win-nav-btn-${b.id}"
              style="width: 100%; border: none; background: #3b82f6; color: #fff; padding: 6px 12px; font-size: 0.75rem; font-weight: bold; border-radius: 4px; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 4px;"
            >
              🧭 Navigate Here
            </button>
          </div>
        `;

        infoWindowRef.current.setContent(contentString);
        infoWindowRef.current.open(map, marker);

        // Bind navigation click inside InfoWindow
        google.maps.event.addListenerOnce(infoWindowRef.current, 'domready', () => {
          const btn = document.getElementById(`info-win-nav-btn-${b.id}`);
          if (btn) {
            btn.onclick = () => {
              onNavigate(b);
              infoWindowRef.current.close();
            };
          }
        });
      });

      markersRef.current[b.id] = marker;
    });
  }, [google, map, buildings, onNavigate]);

  // Center/pan Map on building selection change
  useEffect(() => {
    if (!map || !selected) return;

    // Pan map to selected building coordinates
    map.panTo({ lat: selected.lat, lng: selected.lng });
    map.setZoom(selected.zoom || 18);

    // Bounce the selected marker briefly
    const marker = markersRef.current[selected.id];
    if (marker) {
      marker.setAnimation(google.maps.Animation.BOUNCE);
      setTimeout(() => {
        marker.setAnimation(null);
      }, 1400);
      
      // Auto open popup for chosen building
      google.maps.event.trigger(marker, 'click');
    }
  }, [selected, map, google]);

  // Render Live User Location Marker and Accuracy Circle
  useEffect(() => {
    if (!google || !map) return;

    if (userCoords) {
      const pos = { lat: userCoords.lat, lng: userCoords.lng };

      if (!userMarkerRef.current) {
        // Create User Marker (Blue Dot)
        userMarkerRef.current = new google.maps.Marker({
          position: pos,
          map: map,
          title: 'Your Location',
          icon: {
            path: google.maps.SymbolPath.CIRCLE,
            fillColor: '#1a73e8',
            fillOpacity: 1,
            strokeColor: '#ffffff',
            strokeWeight: 2,
            scale: 8
          },
          zIndex: 1000
        });

        // Create Accuracy Circle
        accuracyCircleRef.current = new google.maps.Circle({
          map: map,
          center: pos,
          radius: 15, // Default accuracy radius
          fillColor: '#1a73e8',
          fillOpacity: 0.15,
          strokeColor: '#1a73e8',
          strokeOpacity: 0.4,
          strokeWeight: 1
        });
      } else {
        // Update existing marker and circle
        userMarkerRef.current.setPosition(pos);
        accuracyCircleRef.current.setCenter(pos);
      }

      // If active navigation is running, optionally auto-recenter map on user
      if (isNavigating) {
        map.panTo(pos);
      }
    } else {
      // Clear user marker if coordinates are null
      if (userMarkerRef.current) {
        userMarkerRef.current.setMap(null);
        userMarkerRef.current = null;
      }
      if (accuracyCircleRef.current) {
        accuracyCircleRef.current.setMap(null);
        accuracyCircleRef.current = null;
      }
    }
  }, [google, map, userCoords, isNavigating]);

  // Handle Route Rendering using DirectionsService
  useEffect(() => {
    if (!google || !map || !directionsRendererRef.current) return;

    if (userCoords && selected && selected.id !== 'campus') {
      const directionsService = new google.maps.DirectionsService();
      
      directionsService.route(
        {
          origin: { lat: userCoords.lat, lng: userCoords.lng },
          destination: { lat: selected.lat, lng: selected.lng },
          travelMode: google.maps.TravelMode.WALKING
        },
        (result, status) => {
          if (status === google.maps.DirectionsStatus.OK) {
            directionsRendererRef.current.setDirections(result);
          } else {
            console.error('Directions request failed due to: ' + status);
          }
        }
      );
    } else {
      // Clear directions polyline
      directionsRendererRef.current.setDirections({ routes: [] });
    }
  }, [google, map, userCoords, selected]);

  if (error) {
    return (
      <div style={{ color: '#ef4444', padding: '1rem', background: 'rgba(239,68,68,0.1)', borderRadius: '8px', margin: '1rem' }}>
        ⚠️ Google Maps JS SDK Error: {error.message || 'Check your VITE_GOOGLE_MAPS_API_KEY env key.'}
      </div>
    );
  }

  return (
    <div 
      ref={mapContainerRef} 
      style={{ width: '100%', height: '100%', minHeight: '300px', background: '#0a1222' }} 
    />
  );
}
