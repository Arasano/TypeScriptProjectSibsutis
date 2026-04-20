import { describe, it, expect, vi } from 'vitest';
import { weatherApi } from '../src/services/weatherApi';

// Мокаем axios
vi.mock('axios', () => ({
    default: {
        get: vi.fn(),
    },
}));

import axios from 'axios';

describe('weatherApi', () => {
    const mockAxios = axios as any;

    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe('searchCities', () => {
        it('returns empty array for short query', async () => {
            const result = await weatherApi.searchCities('a');
            expect(result).toEqual([]);
        });

        it('calls API for valid query', async () => {
            mockAxios.get.mockResolvedValue({
                data: [{ name: 'Moscow', lat: 55.7558, lon: 37.6173, country: 'RU' }],
            });

            const result = await weatherApi.searchCities('Moscow');

            expect(mockAxios.get).toHaveBeenCalledWith(
                expect.stringContaining('geo/1.0/direct'),
            );
            expect(result.length).toBeGreaterThan(0);
        });

        it('handles API error', async () => {
            mockAxios.get.mockRejectedValue(new Error('Network error'));

            const result = await weatherApi.searchCities('Moscow');
            expect(result).toEqual([]);
        });
    });

    describe('getCurrentWeather', () => {
        it('fetches weather data', async () => {
            mockAxios.get.mockResolvedValue({
                data: {
                    name: 'Moscow',
                    main: { temp: 20, humidity: 65, pressure: 1015 },
                    weather: [{ description: 'clear sky', icon: '01d' }],
                    wind: { speed: 3.5 },
                    sys: { sunrise: Date.now() / 1000, sunset: Date.now() / 1000 },
                    dt: Date.now() / 1000,
                    cod: 200,
                },
            });

            const result = await weatherApi.getCurrentWeather(55.7558, 37.6173);

            expect(mockAxios.get).toHaveBeenCalledWith(
                expect.stringContaining('weather'),
            );
            expect(result.name).toBe('Moscow');
        });
    });

    describe('getForecast', () => {
        it('fetches forecast data', async () => {
            mockAxios.get.mockResolvedValue({
                data: {
                    cod: '200',
                    list: [{ dt: Date.now() / 1000, main: { temp: 20 } }],
                    city: { name: 'Moscow' },
                },
            });

            const result = await weatherApi.getForecast(55.7558, 37.6173);

            expect(mockAxios.get).toHaveBeenCalledWith(
                expect.stringContaining('forecast'),
            );
            expect(result.cod).toBe('200');
        });
    });

    describe('getAirPollution', () => {
        it('fetches pollution data', async () => {
            mockAxios.get.mockResolvedValue({
                data: {
                    list: [{ main: { aqi: 2 }, components: { pm2_5: 10 } }],
                },
            });

            const result = await weatherApi.getAirPollution(55.7558, 37.6173);

            expect(mockAxios.get).toHaveBeenCalledWith(
                expect.stringContaining('air_pollution'),
            );
            expect(result.list[0].main.aqi).toBe(2);
        });
    });
});