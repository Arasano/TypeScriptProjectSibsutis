import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import WeatherCard from '../src/components/WeatherCard/WeatherCard';
import { WeatherData } from '../src/types/Weather';

const mockWeather: WeatherData = {
    coord: { lon: 37.6173, lat: 55.7558 },
    weather: [{ id: 800, main: 'Clear', description: 'clear sky', icon: '01d' }],
    main: {
        temp: 20,
        feels_like: 19,
        temp_min: 18,
        temp_max: 22,
        pressure: 1015,
        humidity: 65,
    },
    visibility: 10000,
    wind: { speed: 3.5, deg: 180 },
    clouds: { all: 0 },
    dt: Date.now() / 1000,
    sys: { country: 'RU', sunrise: Date.now() / 1000, sunset: Date.now() / 1000 },
    timezone: 10800,
    id: 524901,
    name: 'Moscow',
    cod: 200,
};

describe('WeatherCard', () => {
    it('renders city name', () => {
        render(<WeatherCard weather={mockWeather} cityName="Moscow" />);
        expect(screen.getByText('Moscow')).toBeInTheDocument();
    });

    it('renders temperature', () => {
        render(<WeatherCard weather={mockWeather} cityName="Moscow" />);
        expect(screen.getByText('20°C')).toBeInTheDocument();
    });

    it('renders feels like temperature', () => {
        render(<WeatherCard weather={mockWeather} cityName="Moscow" />);
        expect(screen.getByText('Feels like 19°C')).toBeInTheDocument();
    });

    it('renders weather description', () => {
        render(<WeatherCard weather={mockWeather} cityName="Moscow" />);
        expect(screen.getByText('clear sky')).toBeInTheDocument();
    });

    it('renders humidity', () => {
        render(<WeatherCard weather={mockWeather} cityName="Moscow" />);
        expect(screen.getByText('65%')).toBeInTheDocument();
    });

    it('renders wind speed', () => {
        render(<WeatherCard weather={mockWeather} cityName="Moscow" />);
        expect(screen.getByText('3.5 m/s')).toBeInTheDocument();
    });

    it('renders pressure', () => {
        render(<WeatherCard weather={mockWeather} cityName="Moscow" />);
        expect(screen.getByText('1015 hPa')).toBeInTheDocument();
    });

    it('renders date', () => {
        render(<WeatherCard weather={mockWeather} cityName="Moscow" />);
        const dateElement = screen.getByText(/^[A-Z][a-z]+, [A-Z][a-z]+ \d+, \d+$/);
        expect(dateElement).toBeInTheDocument();
    });
});