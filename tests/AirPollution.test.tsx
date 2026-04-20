import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import AirPollution from '../src/components/AirPollution/AirPollution';
import { AirPollutionData } from '../src/types/Weather';

const mockPollution: AirPollutionData = {
    coord: { lon: 37.6173, lat: 55.7558 },
    list: [
        {
            main: { aqi: 2 },
            components: {
                co: 300,
                no: 0.5,
                no2: 18,
                o3: 58,
                so2: 5,
                pm2_5: 12,
                pm10: 16,
                nh3: 2,
            },
            dt: Date.now() / 1000,
        },
    ],
};

describe('AirPollution', () => {
    it('renders air quality title', () => {
        render(<AirPollution pollution={mockPollution} />);
        expect(screen.getByText('Air Quality')).toBeInTheDocument();
    });

    it('renders AQI value', () => {
        render(<AirPollution pollution={mockPollution} />);
        expect(screen.getByText('2')).toBeInTheDocument();
    });

    it('renders AQI level', () => {
        render(<AirPollution pollution={mockPollution} />);
        expect(screen.getByText('Fair')).toBeInTheDocument();
    });

    it('renders PM2.5 value', () => {
        render(<AirPollution pollution={mockPollution} />);
        expect(screen.getByText('12 μg/m³')).toBeInTheDocument();
    });

    it('renders PM10 value', () => {
        render(<AirPollution pollution={mockPollution} />);
        expect(screen.getByText('16 μg/m³')).toBeInTheDocument();
    });

    it('renders O3 value', () => {
        render(<AirPollution pollution={mockPollution} />);
        expect(screen.getByText('58 μg/m³')).toBeInTheDocument();
    });

    it('renders NO2 value', () => {
        render(<AirPollution pollution={mockPollution} />);
        expect(screen.getByText('18 μg/m³')).toBeInTheDocument();
    });
});