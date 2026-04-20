import axios from 'axios';
import { WeatherData, ForecastData, AirPollutionData, CityInfo } from '../types/Weather';

const API_KEY = 'cd19f9f9c4c2fb4324c459684be5d2ed';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

const USE_MOCKS = false;

export const weatherApi = {
    getCurrentWeather: async (lat: number, lon: number): Promise<WeatherData> => {
        const response = await axios.get<WeatherData>(
            `${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
        );
        return response.data;
    },

    getForecast: async (lat: number, lon: number): Promise<ForecastData> => {
        const response = await axios.get<ForecastData>(
            `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
        );
        return response.data;
    },

    getAirPollution: async (lat: number, lon: number): Promise<AirPollutionData> => {
        const response = await axios.get<AirPollutionData>(
            `${BASE_URL}/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`
        );
        return response.data;
    },

    searchCities: async (query: string): Promise<CityInfo[]> => {
        if (!query || query.length < 2) {
            return [];
        }

        try {
            const response = await axios.get<CityInfo[]>(
                `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=10&appid=${API_KEY}`
            );
            return response.data || [];
        } catch (error) {
            console.error('Error searching cities:', error);
            return [];
        }
    },
};