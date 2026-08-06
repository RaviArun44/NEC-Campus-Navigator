import { useState, useCallback, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './CampusMap.module.css';

// --- Building Data ---
const buildings = [
  {
    id: 'campus', name: 'Full Campus Overview', shortName: 'Full Campus',
    icon: '\uD83C\uDFEB', category: 'Overview',
    mapQuery: 'National+Engineering+College+Kovilpatti',
    lat: 9.1484, lng: 77.8312, zoom: 17,
    description: 'Full campus overview of NEC, Kovilpatti.',
  },
  {
    id: 'admin', name: 'Administrative Block', shortName: 'Admin Block',
    icon: '\uD83C\uDFDB\uFE0F', category: 'Admin',
    mapQuery: 'National+Engineering+College+Kovilpatti',
    lat: 9.149011, lng: 77.831993, zoom: 18,
    description: 'Principal Office, Dean Offices, Administration.',
  },
  {
    id: 'principal', name: 'Principal Room', shortName: 'Principal',
    icon: '\uD83C\uDF93', category: 'Admin',
    mapQuery: 'National+Engineering+College+Kovilpatti',
    lat: 9.148433, lng: 77.832515, zoom: 18,
    description: "Principal's Office - NEC Kovilpatti.",
  },
  {
    id: 'coe', name: 'COE / Autonomous Block', shortName: 'COE Office',
    icon: '\uD83D\uDCCB', category: 'Admin',
    mapQuery: 'National+Engineering+College+Kovilpatti',
    lat: 9.149011, lng: 77.831993, zoom: 18,
    description: 'Controller of Examinations - Exam registration, results, hall tickets.',
  },
  {
    id: 'cse', name: 'CSE Department', shortName: 'CSE',
    icon: '\uD83D\uDCBB', category: 'Academic',
    mapQuery: 'National+Engineering+College+Kovilpatti',
    lat: 9.1469, lng: 77.8323, zoom: 18,
    description: 'Computer Science and Engineering Department.',
  },
  {
    id: 'it', name: 'IT Department', shortName: 'IT',
    icon: '\uD83C\uDF10', category: 'Academic',
    mapQuery: 'National+Engineering+College+Kovilpatti',
    lat: 9.1476, lng: 77.8317, zoom: 18,
    description: 'Information Technology Department.',
  },
  {
    id: 'eee', name: 'EEE Department', shortName: 'EEE',
    icon: '\u26A1', category: 'Academic',
    mapQuery: 'National+Engineering+College+Kovilpatti',
    lat: 9.1465, lng: 77.8318, zoom: 18,
    description: 'Electrical and Electronics Engineering.',
  },
  {
    id: 'aids', name: 'AI & DS Department', shortName: 'AI & DS',
    icon: '\uD83E\uDD16', category: 'Academic',
    mapQuery: 'National+Engineering+College+Kovilpatti',
    lat: 9.146497, lng: 77.830864, zoom: 18,
    description: 'Department of Artificial Intelligence & Data Science, National Engineering College.',
    aliases: ['Department of EIE', 'EIE', 'AI & DS', 'Artificial Intelligence & Data Science', 'AIDS Department']
  },
  {
    id: 'ece', name: 'ECE Department', shortName: 'ECE',
    icon: '\uD83D\uDCE1', category: 'Academic',
    mapQuery: 'National+Engineering+College+Kovilpatti',
    lat: 9.146995, lng: 77.830821, zoom: 18,
    description: 'Electronics and Communication Engineering.',
  },
  {
    id: 'mech', name: 'Mechanical Department', shortName: 'Mechanical',
    icon: '\u2699\uFE0F', category: 'Academic',
    mapQuery: 'National+Engineering+College+Kovilpatti',
    lat: 9.149484, lng: 77.830424, zoom: 18,
    description: 'Mechanical Engineering Department.',
  },
  {
    id: 'civil', name: 'Civil Department', shortName: 'Civil',
    icon: '\uD83C\uDFD7\uFE0F', category: 'Academic',
    mapQuery: 'National+Engineering+College+Kovilpatti',
    lat: 9.149079, lng: 77.831292, zoom: 18,
    description: 'Civil Engineering Department.',
  },
  {
    id: 'first-year', name: 'First Year Block', shortName: 'First Year',
    icon: '\uD83C\uDF92', category: 'Academic',
    mapQuery: 'National+Engineering+College+Kovilpatti',
    lat: 9.148434, lng: 77.831234, zoom: 18,
    description: 'First Year Engineering classes block.',
  },
  {
    id: 'workshop', name: 'Workshop / Lab Block', shortName: 'Workshop',
    icon: '\uD83D\uDD27', category: 'Academic',
    mapQuery: 'National+Engineering+College+Kovilpatti',
    lat: 9.1478, lng: 77.8308, zoom: 18,
    description: 'Engineering workshops and practical labs.',
  },
  {
    id: 'library', name: 'Central Library', shortName: 'Library',
    icon: '\uD83D\uDCDA', category: 'Facility',
    mapQuery: 'National+Engineering+College+Kovilpatti',
    lat: 9.148434, lng: 77.831234, zoom: 18,
    description: 'Central Library with digital and physical resources.',
  },
  {
    id: 'auditorium', name: 'Auditorium', shortName: 'Auditorium',
    icon: '\uD83C\uDFAD', category: 'Facility',
    mapQuery: 'National+Engineering+College+Kovilpatti',
    lat: 9.149398, lng: 77.832127, zoom: 18,
    description: 'Main campus auditorium for events and seminars.',
  },
  {
    id: 'canteen-1styear', name: '1st Year Canteen', shortName: '1st Yr Canteen',
    icon: '\uD83C\uDF7D\uFE0F', category: 'Facility',
    mapQuery: 'National+Engineering+College+Kovilpatti',
    lat: 9.148171, lng: 77.831922, zoom: 18,
    description: '1st Year student canteen - near First Year block.',
  },
  {
    id: 'canteen-mech', name: 'Mech Canteen', shortName: 'Mech Canteen',
    icon: '🍲', category: 'Facility',
    mapQuery: 'National+Engineering+College+Kovilpatti',
    lat: 9.149351, lng: 77.831919, zoom: 18,
    description: 'Canteen near Mechanical Engineering Department.',
  },
  {
    id: 'canteen-cse', name: 'CSE Canteen', shortName: 'CSE Canteen',
    icon: '🥪', category: 'Facility',
    mapQuery: 'National+Engineering+College+Kovilpatti',
    lat: 9.1472272, lng: 77.8324029, zoom: 18,
    description: 'Canteen near CSE / IT Department block.',
  },
  {
    id: 'sports', name: 'Sports Ground', shortName: 'Sports Ground',
    icon: '\u26BD', category: 'Facility',
    mapQuery: 'National+Engineering+College+Kovilpatti',
    lat: 9.1476, lng: 77.8295, zoom: 18,
    description: 'Multi-sport ground - Cricket, Football, Basketball.',
  },
  {
    id: 'boys-hostel-1', name: 'Boys Hostel 1', shortName: 'Boys Hostel 1',
    icon: '\uD83C\uDFE0', category: 'Hostel',
    mapQuery: 'NEC+Boys+Hostel+Kovilpatti',
    lat: 9.147129, lng: 77.827891, zoom: 18,
    description: 'Boys Hostel Block 1.',
  },
  {
    id: 'boys-hostel-2', name: 'Boys Hostel 2', shortName: 'Boys Hostel 2',
    icon: '\uD83C\uDFE0', category: 'Hostel',
    mapQuery: 'NEC+Boys+Hostel+2+Kovilpatti',
    lat: 9.148795, lng: 77.826977, zoom: 18,
    description: 'Boys Hostel Block 2.',
  },
  {
    id: 'ladies-hostel', name: 'Girls Hostel', shortName: 'Girls Hostel',
    icon: '\uD83C\uDFE1', category: 'Hostel',
    mapQuery: 'NEC+Girls+Hostel+Kovilpatti',
    lat: 9.150541, lng: 77.833234, zoom: 18,
    description: 'Girls Hostel Block - NEC Kovilpatti.',
  },
];

const categoryColors = {
  Overview: '#a78bfa',
  Academic: '#4086ff',
  Admin:    '#ffcc00',
  Hostel:   '#28a745',
  Facility: '#ff6b35',
};

const categories = ['All', 'Academic', 'Admin', 'Hostel', 'Facility', 'Overview'];

// Helpers
function buildMapUrl(query, zoom) {
  return `https://maps.google.com/maps?q=${query}&hl=en&z=${zoom}&output=embed`;
}

function buildDirectionsUrl(userLat, userLng, destLat, destLng) {
  return `https://maps.google.com/maps?saddr=${userLat},${userLng}&daddr=${destLat},${destLng}&dirflg=w&keep=1&iwloc=A&output=embed`;
}

function haversineDistance(lat1, lon1, lat2, lon2) {
  const R = 6371000;
  const p1 = (lat1 * Math.PI) / 180;
  const p2 = (lat2 * Math.PI) / 180;
  const dp = ((lat2 - lat1) * Math.PI) / 180;
  const dl = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dp / 2) * Math.sin(dp / 2) +
    Math.cos(p1) * Math.cos(p2) * Math.sin(dl / 2) * Math.sin(dl / 2);
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function formatDistance(m) {
  return m >= 1000 ? `${(m / 1000).toFixed(2)} km` : `${Math.round(m)} m`;
}

function formatETA(m) {
  const mins = Math.ceil((m * 1.25) / 80);
  if (mins < 60) return `~${mins} min walk`;
  return `~${Math.floor(mins / 60)}h ${mins % 60}m walk`;
}

function getBearing(lat1, lon1, lat2, lon2) {
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const lat1Rad = (lat1 * Math.PI) / 180;
  const lat2Rad = (lat2 * Math.PI) / 180;
  const y = Math.sin(dLon) * Math.cos(lat2Rad);
  const x = Math.cos(lat1Rad) * Math.sin(lat2Rad) - Math.sin(lat1Rad) * Math.cos(lat2Rad) * Math.cos(dLon);
  const brng = (Math.atan2(y, x) * 180) / Math.PI;
  return (brng + 360) % 360;
}

export default function CampusMap() {
  const [selected, setSelected] = useState(buildings[0]);
  const [mapSrc, setMapSrc]     = useState(buildMapUrl(buildings[0].mapQuery, buildings[0].zoom));
  const [filter, setFilter]     = useState('All');
  const [search, setSearch]     = useState('');
  const [sidebarCollapsedMobile, setSidebarCollapsedMobile] = useState(true);

  // Navigation state
  const [isLocating, setIsLocating] = useState(false);
  const [navInfo, setNavInfo]       = useState(null);
  const [locError, setLocError]     = useState(null);
  const [isNavigating, setIsNavigating] = useState(false);
  const [guideText, setGuideText]   = useState('');
  const [isMobile, setIsMobile]     = useState(window.innerWidth <= 768);
  const [sheetExpanded, setSheetExpanded] = useState('collapsed'); // 'collapsed', 'half', 'full'

  // Real-time GPS watch refs
  const watchIdRef    = useRef(null);
  const destRef       = useRef(null);
  const userCoordsRef = useRef(null);
  const simIntervalRef = useRef(null);

  // Resize listener for responsive mobile layout
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const stopWatch = useCallback(() => {
    if (watchIdRef.current !== null) {
      navigator.geolocation.clearWatch(watchIdRef.current);
      watchIdRef.current = null;
    }
    if (simIntervalRef.current !== null) {
      clearInterval(simIntervalRef.current);
      simIntervalRef.current = null;
    }
    setIsNavigating(false);
    setGuideText('');
  }, []);

  useEffect(() => () => stopWatch(), [stopWatch]);

  const filtered = buildings.filter((b) => {
    const matchCat    = filter === 'All' || b.category === filter;
    const searchLower = search.toLowerCase();
    const matchSearch = b.name.toLowerCase().includes(searchLower) ||
                        b.shortName.toLowerCase().includes(searchLower) ||
                        (b.aliases && b.aliases.some(alias => alias.toLowerCase().includes(searchLower)));
    return matchCat && matchSearch;
  });

  const handleSelect = useCallback((b) => {
    stopWatch();
    setSelected(b);
    setNavInfo(null);
    setLocError(null);
    setMapSrc(buildMapUrl(b.mapQuery, b.zoom));
    setSidebarCollapsedMobile(true);
  }, [stopWatch]);

  const [navStatus, setNavStatus]   = useState('');

  const handleNavigate = useCallback((b) => {
    if (!navigator.geolocation) {
      setLocError('Geolocation is not supported by your browser.');
      return;
    }

    stopWatch();
    destRef.current = b;
    setIsLocating(true);
    setLocError(null);
    setNavInfo(null);
    setNavStatus('Route Ready');

    // Route Preview: Get position once, show preview line and distance
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const dest = destRef.current;
        if (!dest) return;
        const { latitude, longitude } = pos.coords;
        userCoordsRef.current = { lat: latitude, lng: longitude };
        const dist = haversineDistance(latitude, longitude, dest.lat, dest.lng);
        setNavInfo({
          distance: formatDistance(dist),
          eta: formatETA(dist),
          arrival: new Date(Date.now() + Math.ceil((dist * 1.25) / 80) * 60000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        });
        setMapSrc(buildDirectionsUrl(latitude, longitude, dest.lat, dest.lng));
        setIsLocating(false);
      },
      (err) => {
        setIsLocating(false);
        setLocError('Unable to fetch preview location.');
      },
      { enableHighAccuracy: false, timeout: 5000, maximumAge: 60000 }
    );
  }, [stopWatch]);

  function startActiveNavigation(b) {
    if (!navigator.geolocation) {
      setLocError('Geolocation is not supported by your browser.');
      return;
    }

    // Toggle logic for Stop Navigation
    if (isNavigating) {
      stopWatch();
      setNavStatus('Navigation Stopped');
      // Reset back to preview map url
      if (userCoordsRef.current) {
        setMapSrc(buildDirectionsUrl(userCoordsRef.current.lat, userCoordsRef.current.lng, b.lat, b.lng));
      } else {
        setMapSrc(buildMapUrl(b.mapQuery, b.zoom));
      }
      return;
    }

    destRef.current = b;
    setIsNavigating(true);
    setNavStatus('Navigation Started');

    // MOBILE MODE (Real GPS Tracking)
    let lastMapLat = null;
    let lastMapLng = null;

    watchIdRef.current = navigator.geolocation.watchPosition(
      (pos) => {
        const { latitude, longitude, accuracy } = pos.coords;
        console.log(`[Live GPS Node] Lat: ${latitude}, Lng: ${longitude}, Accuracy: ${accuracy}m`);
        userCoordsRef.current = { lat: latitude, lng: longitude };
        const dest = destRef.current;
        if (!dest) return;

        setNavStatus('Navigating...');
        const dist = haversineDistance(latitude, longitude, dest.lat, dest.lng);
        const etaMins = Math.ceil((dist * 1.25) / 80);
        
        setNavInfo({
          distance: formatDistance(dist),
          eta: formatETA(dist),
          arrival: new Date(Date.now() + etaMins * 60000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        });

        // Turn guidance
        if (dist <= 10) {
          setGuideText('Destination Reached 🎉');
          setNavStatus('Destination Reached');
        } else {
          const bearing = getBearing(latitude, longitude, dest.lat, dest.lng);
          if (bearing >= 337.5 || bearing < 22.5) setGuideText('⬆ Head North');
          else if (bearing >= 22.5 && bearing < 67.5) setGuideText('↗ Head Northeast');
          else if (bearing >= 67.5 && bearing < 112.5) setGuideText('→ Head East');
          else if (bearing >= 112.5 && bearing < 157.5) setGuideText('↘ Head Southeast');
          else if (bearing >= 157.5 && bearing < 202.5) setGuideText('↓ Head South');
          else if (bearing >= 202.5 && bearing < 247.5) setGuideText('↙ Head Southwest');
          else if (bearing >= 247.5 && bearing < 292.5) setGuideText('← Head West');
          else setGuideText('↖ Head Northwest');
        }

        // Follow user coordinates
        if (lastMapLat === null || lastMapLng === null) {
          lastMapLat = latitude;
          lastMapLng = longitude;
          setMapSrc(`https://maps.google.com/maps?saddr=${latitude},${longitude}&daddr=${dest.lat},${dest.lng}&dirflg=w&mode=d&keep=1&iwloc=A&output=embed`);
        } else {
          const movement = haversineDistance(latitude, longitude, lastMapLat, lastMapLng);
          if (movement >= 10) {
            lastMapLat = latitude;
            lastMapLng = longitude;
            setMapSrc(`https://maps.google.com/maps?saddr=${latitude},${longitude}&daddr=${dest.lat},${dest.lng}&dirflg=w&mode=d&keep=1&iwloc=A&output=embed`);
          }
        }
      },
      (err) => {
        setNavStatus('Live location unavailable');
        if (err.code === 1) {
          setLocError('Location access denied. Please enable GPS permissions.');
        } else {
          setLocError('GPS signal lost. Live location unavailable.');
        }
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  }

  function openDirectionsInMaps(b) {
    if (userCoordsRef.current) {
      window.open(
        `https://www.google.com/maps/dir/?api=1&origin=${userCoordsRef.current.lat},${userCoordsRef.current.lng}&destination=${b.lat},${b.lng}&travelmode=walking`,
        '_blank'
      );
    } else {
      window.open(
        `https://www.google.com/maps/dir/?api=1&destination=${b.lat},${b.lng}&travelmode=walking`,
        '_blank'
      );
    }
  }

  function openInGoogleMaps(b) {
    window.open(`https://www.google.com/maps/search/?api=1&query=${b.lat},${b.lng}`, '_blank');
  }

  return (
    <div className={`${styles.page} ${isMobile ? styles.mobileLayout : ''}`}>
      {/* Mobile Top Action Bar */}
      {isMobile && selected && (
        <div className={styles.mobileTopActionBar}>
          <button
            className={styles.mobileActionBtn}
            style={{ background: '#7c3aed', borderColor: '#7c3aed' }}
            onClick={() => {
              stopWatch();
              setNavInfo(null);
              setLocError(null);
              setMapSrc(buildMapUrl(selected.mapQuery, selected.zoom));
            }}
          >
            👁️ Overview
          </button>
          <button
            className={styles.mobileActionBtn}
            style={{ background: '#4086ff', borderColor: '#4086ff' }}
            onClick={() => handleNavigate(selected)}
            disabled={isLocating}
          >
            {isLocating ? '⏳ Locating...' : '🧭 Navigate'}
          </button>
          <button
            className={styles.mobileActionBtn}
            style={{ background: '#f59e0b', borderColor: '#f59e0b' }}
            onClick={() => openInGoogleMaps(selected)}
          >
            📍 Open in Maps
          </button>
        </div>
      )}

      {/* Mobile Floating Trigger to toggle sidebar */}
      {isMobile && !isNavigating && (
        <button
          className={styles.mobileListToggle}
          onClick={() => setSidebarCollapsedMobile(!sidebarCollapsedMobile)}
        >
          {sidebarCollapsedMobile ? '🔍 Search & Locations List' : '✕ Close List'}
        </button>
      )}

      {/* -- Sidebar (Hidden on mobile if collapsed or during active navigation) -- */}
      {(!isMobile || !sidebarCollapsedMobile) && !isNavigating && (
        <aside className={styles.sidebar}>
          <div className={styles.searchBox}>
            <span className={styles.searchIcon}>&#128269;</span>
            <input
              type="text"
              placeholder="Search location..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className={styles.searchInput}
            />
          </div>

          <div className={styles.filterRow}>
            {categories.map((cat) => (
              <button
                key={cat}
                className={`${styles.filterBtn} ${filter === cat ? styles.filterActive : ''}`}
                style={filter === cat && cat !== 'All' ? { borderColor: categoryColors[cat], color: categoryColors[cat] } : {}}
                onClick={() => setFilter(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className={styles.buildingList}>
            <AnimatePresence>
              {filtered.length === 0 && (
                <motion.p className={styles.noResults} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  No locations found.
                </motion.p>
              )}
              {filtered.map((b) => (
                <motion.button
                  key={b.id}
                  className={`${styles.buildingItem} ${selected?.id === b.id ? styles.buildingActive : ''}`}
                  style={selected?.id === b.id ? { borderColor: categoryColors[b.category] } : {}}
                  onClick={() => handleSelect(b)}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.18 }}
                  layout
                >
                  <span className={styles.bIcon}>{b.icon}</span>
                  <div className={styles.bInfo}>
                    <span className={styles.bName}>{b.name}</span>
                    <span className={styles.bCategory} style={{ color: categoryColors[b.category] }}>
                      {b.category}
                    </span>
                  </div>
                  {selected?.id === b.id && <span className={styles.bActive}>&#9664;</span>}
                </motion.button>
              ))}
            </AnimatePresence>
          </div>
        </aside>
      )}

      {/* -- Map Panel -- */}
      <div className={styles.mapPanel} style={{ width: (isMobile && isNavigating) ? '100vw' : '' }}>
        
        {/* Compact Navigation Header on Mobile */}
        {isMobile && isNavigating && guideText && (
          <div className={styles.mobileGuideHeader}>
            <span className={styles.mobileGuideArrow}>⬆</span>
            <div>
              <h4 className={styles.mobileGuideTitle}>{guideText}</h4>
              <p className={styles.mobileGuideSub}>Walking to {selected.name}</p>
            </div>
          </div>
        )}

        {/* Desktop Layout Details Panel */}
        {!isMobile && (
          <>
            {/* Info bar (Traditional Layout for Desktop / Tablet) */}
            <AnimatePresence mode="wait">
              <motion.div
                key={selected?.id}
                className={styles.infoBar}
                style={{ borderColor: categoryColors[selected?.category] + '55' }}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.2 }}
              >
                <div className={styles.infoLeft}>
                  <span className={styles.infoIcon}>{selected?.icon}</span>
                  <div>
                    <h2 className={styles.infoName}>{selected?.name}</h2>
                    <p className={styles.infoDesc}>{selected?.description}</p>
                  </div>
                </div>

                <div className={styles.infoActions}>
                  <span
                    className={styles.infoBadge}
                    style={{
                      background: categoryColors[selected?.category] + '22',
                      color: categoryColors[selected?.category],
                      border: `1px solid ${categoryColors[selected?.category]}44`,
                    }}
                  >
                    {selected?.category}
                  </span>

                  <button
                    className={`${styles.navigateBtn} ${isLocating ? styles.locating : ''}`}
                    onClick={() => handleNavigate(selected)}
                    disabled={isLocating}
                  >
                    {isLocating ? (
                      <><span className={styles.spinner} /> Locating&hellip;</>
                    ) : (
                      <>&#129517; Navigate</>
                    )}
                  </button>

                  <button className={styles.openMapsBtn} onClick={() => openInGoogleMaps(selected)}>
                    &#128205; Open in Maps
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Desktop Navigation Info Strip */}
            <AnimatePresence>
              {(navInfo || locError) && (
                <motion.div
                  className={`${styles.navStrip} ${locError ? styles.navStripError : ''}`}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.12 }}
                >
                  {locError ? (
                    <div className={styles.navError}>
                      <span>&#9888;&#65039;</span>
                      <span>{locError}</span>
                      <button className={styles.retryBtn} onClick={() => { setLocError(null); handleNavigate(selected); }}>
                        Retry
                      </button>
                    </div>
                  ) : (
                    <div className={styles.navInfoRow}>
                      {guideText && (
                        <div className={styles.navStat} style={{ background: '#10b981', padding: '4px 10px', borderRadius: '6px' }}>
                          <span className={styles.navStatValue}>{guideText}</span>
                        </div>
                      )}

                      <div className={styles.navStat}>
                        <span className={styles.navStatIcon}>&#128207;</span>
                        <div>
                          <span className={styles.navStatValue}>{navInfo?.distance}</span>
                          <span className={styles.navStatLabel}>Distance</span>
                        </div>
                      </div>

                      <div className={styles.navDivider} />

                      <div className={styles.navStat}>
                        <span className={styles.navStatIcon}>&#9201;&#65039;</span>
                        <div>
                          <span className={styles.navStatValue}>{navInfo?.eta}</span>
                          <span className={styles.navStatLabel}>Walk Time</span>
                        </div>
                      </div>

                      <div className={styles.navDivider} />

                      <div className={styles.navStat}>
                        <span className={styles.navStatIcon}>🕒</span>
                        <div>
                          <span className={styles.navStatValue}>{navInfo?.arrival}</span>
                          <span className={styles.navStatLabel}>Arrival</span>
                        </div>
                      </div>

                      <div className={styles.navStat} style={{ background: '#3b82f6', padding: '4px 10px', borderRadius: '6px' }}>
                        <span className={styles.navStatValue}>{navStatus}</span>
                      </div>

                      <div style={{ display: 'flex', gap: '0.5rem', marginLeft: 'auto' }}>
                        <button
                          className={styles.turnByTurnBtn}
                          style={{ background: isNavigating ? '#dc3545' : '#4086ff', borderColor: isNavigating ? '#dc3545' : '#4086ff' }}
                          onClick={() => startActiveNavigation(selected)}
                        >
                          {isNavigating ? '🛑 Stop Navigation' : '🧭 Start Navigation'}
                        </button>
                        <button
                          className={styles.turnByTurnBtn}
                          onClick={() => openDirectionsInMaps(selected)}
                        >
                          &#128506;&#65039; Turn-by-Turn
                        </button>
                      </div>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </>
        )}

        {/* Mobile Unified Bottom Sheet */}
        {isMobile && selected && (
          <motion.div
            className={styles.mobileBottomPanel}
            animate={{
              height: sheetExpanded === 'collapsed' 
                ? 'clamp(190px, 34vh, 260px)' 
                : sheetExpanded === 'half' 
                ? '58vh' 
                : '85vh'
            }}
            transition={{ type: 'spring', damping: 28, stiffness: 240 }}
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={0.15}
            onDragEnd={(event, info) => {
              // If dragged up (negative y movement)
              if (info.offset.y < -40) {
                if (sheetExpanded === 'collapsed') setSheetExpanded('half');
                else if (sheetExpanded === 'half') setSheetExpanded('full');
              } 
              // If dragged down (positive y movement)
              else if (info.offset.y > 40) {
                if (sheetExpanded === 'full') setSheetExpanded('half');
                else if (sheetExpanded === 'half') setSheetExpanded('collapsed');
              }
            }}
          >
            {/* Top Drag Indicator Handle */}
            <div 
              className={styles.dragHandleWrapper}
              onClick={() => {
                if (sheetExpanded === 'collapsed') setSheetExpanded('half');
                else if (sheetExpanded === 'half') setSheetExpanded('full');
                else setSheetExpanded('collapsed');
              }}
            >
              <div className={styles.dragHandleBar} />
            </div>

            {/* Scrollable Bottom Sheet Content */}
            <div className={styles.mobileBottomContent}>
              {/* Header info */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.5rem', marginBottom: '0.4rem' }}>
                <div>
                  <h3 style={{ margin: 0, fontSize: '0.92rem', color: '#fff', fontWeight: 700 }}>
                    {selected.icon} {selected.name}
                  </h3>
                  <p style={{ margin: '0.1rem 0 0', fontSize: '0.72rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.2 }}>
                    {selected.description}
                  </p>
                </div>
                <span
                  style={{
                    background: categoryColors[selected.category] + '22',
                    color: categoryColors[selected.category],
                    border: `1.5px solid ${categoryColors[selected.category]}55`,
                    padding: '2px 8px',
                    borderRadius: '50px',
                    fontSize: '0.65rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    whiteSpace: 'nowrap'
                  }}
                >
                  {selected.category}
                </span>
              </div>

              {/* If routing preview exists (Show stats, status and start controls) */}
              {(navInfo || locError) && (
                <div style={{ marginTop: '0.5rem', paddingTop: '0.5rem', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                  {locError ? (
                    <div className={styles.navError}>
                      <span>&#9888;&#65039; {locError}</span>
                      <button className={styles.retryBtn} onClick={() => { setLocError(null); handleNavigate(selected); }}>
                        Retry
                      </button>
                    </div>
                  ) : (
                    <div>
                      {/* Stats bar */}
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.2rem', marginBottom: '0.5rem' }}>
                        <div className={styles.navStat}>
                          <span className={styles.navStatValue} style={{ fontSize: '0.85rem' }}>📏 {navInfo?.distance}</span>
                        </div>
                        <div className={styles.navDivider} style={{ height: '14px' }} />
                        <div className={styles.navStat}>
                          <span className={styles.navStatValue} style={{ fontSize: '0.85rem' }}>⏱ {navInfo?.eta}</span>
                        </div>
                        <div className={styles.navDivider} style={{ height: '14px' }} />
                        <div className={styles.navStat}>
                          <span className={styles.navStatValue} style={{ fontSize: '0.85rem' }}>🕒 {navInfo?.arrival}</span>
                        </div>
                        <div className={styles.navDivider} style={{ height: '14px' }} />
                        <div style={{ fontSize: '0.72rem', color: '#ffcc00', fontWeight: 'bold' }}>
                          {navStatus}
                        </div>
                      </div>

                      {/* Action buttons */}
                      <div style={{ display: 'flex', gap: '0.4rem', marginTop: '0.6rem', flexWrap: 'wrap' }}>
                        <button
                          className={styles.turnByTurnBtn}
                          style={{
                            flex: 1.5,
                            minWidth: '100px',
                            background: isNavigating ? '#dc3545' : '#4086ff',
                            borderColor: isNavigating ? '#dc3545' : '#4086ff',
                            padding: '0.55rem 0.2rem',
                            fontSize: '0.74rem',
                            justifyContent: 'center'
                          }}
                          onClick={() => startActiveNavigation(selected)}
                        >
                          {isNavigating ? '🛑 Stop' : '🧭 Start'}
                        </button>
                        <button
                          className={styles.turnByTurnBtn}
                          style={{ flex: 1, minWidth: '85px', padding: '0.55rem 0.2rem', fontSize: '0.74rem', justifyContent: 'center' }}
                          onClick={() => openDirectionsInMaps(selected)}
                        >
                          🗺️ Turn-by-Turn
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* Google Maps iframe */}
        <div className={styles.mapFrame}>
          <AnimatePresence mode="wait">
            <motion.iframe
              key={mapSrc}
              src={mapSrc}
              className={styles.iframe}
              title="Campus Location"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
            />
          </AnimatePresence>

          {/* Floating Actions on Map */}
          {isMobile && userCoordsRef.current && (
            <div className={styles.mapFloatingActions}>
              <button
                className={styles.floatingActionBtn}
                title="Recenter Location"
                onClick={() => {
                  if (userCoordsRef.current) {
                    setMapSrc(buildDirectionsUrl(userCoordsRef.current.lat, userCoordsRef.current.lng, selected.lat, selected.lng));
                  }
                }}
              >
                🎯
              </button>
            </div>
          )}

          {/* Locating overlay */}
          <AnimatePresence>
            {isLocating && (
              <motion.div
                className={styles.locatingOverlay}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className={styles.locatingCard}>
                  <span className={styles.locatingPulse}>&#128225;</span>
                  <p>Detecting your location&hellip;</p>
                  <small>Please allow location access if prompted</small>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
