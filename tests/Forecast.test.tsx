import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Forecast from '../src/components/Forecast/Forecast';
import { ForecastData } from '../src/types/Weather';

const mockForecast: ForecastData = {
    cod: '200',
    message: 0,
    cnt: 8,
    list: [
        {
            dt: Date.now() / 1000,
            main: {
                temp: 20,
                feels_like: 19,
                temp_min: 18,
                temp_max: 22,
                pressure: 1015,
                humidity: 65,
            },
            weather: [{ id: 800, main: 'Clear', description: 'clear sky', icon: '01d' }],
            clouds: { all: 0 },
            wind: { speed: 3, deg: 180 },
            visibility: 10000,
            pop: 0,
            dt_txt: new Date().toISOString(),
        },
    ],
    city: {
        id: 524901,
        name: 'Moscow',
        coord: { lat: 55.7558, lon: 37.6173 },
        country: 'RU',
        population: 1000000,
        timezone: 10800,
        sunrise: Date.now() / 1000,
        sunset: Date.now() / 1000,
    },
};

describe('Forecast', () => {
    it('renders forecast title', () => {
        render(<Forecast forecast={mockForecast} />);
        expect(screen.getByText('7-Day Forecast')).toBeInTheDocument();
    });

    it('renders temperature range', () => {
        render(<Forecast forecast={mockForecast} />);
        expect(screen.getByText('18°C / 22°C')).toBeInTheDocument();
    });

    it('shows empty state when no data', () => {
        const emptyForecast = { ...mockForecast, list: [] };
        render(<Forecast forecast={emptyForecast} />);
        expect(screen.getByText('Forecast data not available')).toBeInTheDocument();
    });
});