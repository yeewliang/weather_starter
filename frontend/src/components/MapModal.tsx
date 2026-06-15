import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import { divIcon, LatLngBounds, type LatLngExpression } from 'leaflet';
import { CloseIcon } from './icons';
import { formatTemperature } from './format';
import { useStore } from '../state/store';
import type { Location } from '../types';

interface MapModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FitBoundsHandlerProps {
  locations: Location[];
}

function FitBoundsHandler({ locations }: FitBoundsHandlerProps) {
  const map = useMap();

  useEffect(() => {
    if (locations.length === 0) return;

    if (locations.length === 1) {
      // Center on single location with zoom 11
      map.setView([locations[0].latitude, locations[0].longitude], 11);
    } else {
      // Fit bounds to show all locations
      const bounds = new LatLngBounds(
        locations.map((loc) => [loc.latitude, loc.longitude] as LatLngExpression)
      );
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [locations, map]);

  return null;
}

export function createWeatherIcon(weather: Location['weather']) {
  const temp = formatTemperature(weather?.temperature_c);
  const condition = weather?.condition ?? 'Unknown';
  const label = `${temp} · ${condition}`;

  return divIcon({
    html: `
      <div class="weather-marker-container">
        <div class="weather-label">${label}</div>
        <div class="pin-icon"></div>
      </div>
    `,
    className: 'weather-marker',
    iconSize: [40, 50],
    iconAnchor: [20, 50],
  });
}

export function MapModal({ isOpen, onClose }: MapModalProps) {
  const { locations } = useStore();

  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen || locations.length === 0) return null;

  const center: LatLngExpression = [locations[0].latitude, locations[0].longitude];

  const content = (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative h-full w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-[1000] flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/60 backdrop-blur-xl transition-colors hover:bg-black/80"
          aria-label="Close map"
        >
          <CloseIcon className="h-5 w-5 text-white" />
        </button>

        <MapContainer
          center={center}
          zoom={11}
          scrollWheelZoom={true}
          className="h-full w-full"
          zoomControl={true}
        >
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          />
          <FitBoundsHandler locations={locations} />
          {locations.map((location) => (
            <Marker
              key={location.id}
              position={[location.latitude, location.longitude]}
              icon={createWeatherIcon(location.weather)}
            />
          ))}
        </MapContainer>
      </div>
    </div>
  );

  return createPortal(content, document.body);
}
