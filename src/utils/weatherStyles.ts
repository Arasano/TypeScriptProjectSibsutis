import { WeatherData } from '../types/Weather';

export const getWeatherGradient = (weatherMain: string, isNight: boolean): string => {
    if (isNight) {
        return 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)';
    }

    const gradients: Record<string, string> = {
        Clear: 'linear-gradient(135deg, #56CCF2 0%, #2F80ED 100%)',
        Clouds: 'linear-gradient(135deg, #757F9A 0%, #D7DDE8 100%)',
        Rain: 'linear-gradient(135deg, #4B79A1 0%, #283E51 100%)',
        Drizzle: 'linear-gradient(135deg, #89F7FE 0%, #66A6FF 100%)',
        Thunderstorm: 'linear-gradient(135deg, #373B44 0%, #4286f4 100%)',
        Snow: 'linear-gradient(135deg, #E6DADA 0%, #274046 100%)',
        Mist: 'linear-gradient(135deg, #606c88 0%, #3f4c6b 100%)',
    };

    return gradients[weatherMain] || gradients.Clear;
};

export const getWeatherIconUrl = (iconCode: string): string => {
    return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
};

export const getAQILevel = (aqi: number): string => {
    const levels: Record<number, string> = {
        1: 'Good',
        2: 'Fair',
        3: 'Moderate',
        4: 'Poor',
        5: 'Very Poor',
    };
    return levels[aqi] || 'Unknown';
};

export const getAQIColor = (aqi: number): string => {
    const colors: Record<number, string> = {
        1: '#4CAF50',
        2: '#8BC34A',
        3: '#FFC107',
        4: '#FF9800',
        5: '#F44336',
    };
    return colors[aqi] || '#9E9E9E';
};

export const formatTemperature = (temp: number): string => {
    return `${Math.round(temp)}°C`;
};

export const formatTime = (timestamp: number): string => {
    return new Date(timestamp * 1000).toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
    });
};

export const formatDate = (timestamp: number): string => {
    return new Date(timestamp * 1000).toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
};

export const formatDayName = (timestamp: number): string => {
    return new Date(timestamp * 1000).toLocaleDateString('en-US', {
        weekday: 'short',
    });
};

export const roundToOneDecimal = (num: number): number => {
    return Math.round(num * 10) / 10;
};

export const roundToInteger = (num: number): number => {
    return Math.round(num);
};