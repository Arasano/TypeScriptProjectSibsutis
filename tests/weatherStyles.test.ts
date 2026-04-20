import { describe, it, expect } from 'vitest';
import {
    getWeatherGradient,
    getAQILevel,
    getAQIColor,
    formatTemperature,
    formatTime,
    formatDate,
    formatDayName,
    roundToOneDecimal,
    roundToInteger,
} from '../src/utils/weatherStyles';

describe('weatherStyles', () => {
    describe('getWeatherGradient', () => {
        it('returns sunny gradient for Clear weather', () => {
            const gradient = getWeatherGradient('Clear', false);
            expect(gradient).toContain('56CCF2');
        });

        it('returns night gradient', () => {
            const gradient = getWeatherGradient('Clear', true);
            expect(gradient).toContain('1e3c72');
        });

        it('returns rain gradient', () => {
            const gradient = getWeatherGradient('Rain', false);
            expect(gradient).toContain('4B79A1');
        });

        it('returns default gradient for unknown weather', () => {
            const gradient = getWeatherGradient('Unknown', false);
            expect(gradient).toContain('56CCF2');
        });
    });

    describe('getAQILevel', () => {
        it('returns Good for AQI 1', () => {
            expect(getAQILevel(1)).toBe('Good');
        });

        it('returns Fair for AQI 2', () => {
            expect(getAQILevel(2)).toBe('Fair');
        });

        it('returns Moderate for AQI 3', () => {
            expect(getAQILevel(3)).toBe('Moderate');
        });

        it('returns Poor for AQI 4', () => {
            expect(getAQILevel(4)).toBe('Poor');
        });

        it('returns Very Poor for AQI 5', () => {
            expect(getAQILevel(5)).toBe('Very Poor');
        });

        it('returns Unknown for invalid AQI', () => {
            expect(getAQILevel(10)).toBe('Unknown');
        });
    });

    describe('getAQIColor', () => {
        it('returns green for good AQI', () => {
            expect(getAQIColor(1)).toBe('#4CAF50');
        });

        it('returns yellow for moderate AQI', () => {
            expect(getAQIColor(3)).toBe('#FFC107');
        });

        it('returns red for poor AQI', () => {
            expect(getAQIColor(5)).toBe('#F44336');
        });
    });

    describe('formatTemperature', () => {
        it('formats positive temperature', () => {
            expect(formatTemperature(20)).toBe('20°C');
        });

        it('formats negative temperature', () => {
            expect(formatTemperature(-5)).toBe('-5°C');
        });

        it('rounds decimal temperature', () => {
            expect(formatTemperature(20.7)).toBe('21°C');
        });
    });

    describe('formatTime', () => {
        it('formats time correctly', () => {
            const timestamp = new Date('2024-01-01T14:30:00Z').getTime() / 1000;
            const time = formatTime(timestamp);
            expect(time).toMatch(/^\d{2}:\d{2}$/);
        });
    });

    describe('formatDate', () => {
        it('formats date in English', () => {
            const timestamp = Date.now() / 1000;
            const date = formatDate(timestamp);
            expect(date).toMatch(/^[A-Z][a-z]+, [A-Z][a-z]+ \d+, \d+$/);
        });
    });

    describe('formatDayName', () => {
        it('returns short day name', () => {
            const timestamp = Date.now() / 1000;
            const day = formatDayName(timestamp);
            expect(day.length).toBeLessThanOrEqual(4);
        });
    });

    describe('roundToOneDecimal', () => {
        it('rounds to one decimal', () => {
            expect(roundToOneDecimal(3.567)).toBe(3.6);
        });

        it('keeps one decimal', () => {
            expect(roundToOneDecimal(3.5)).toBe(3.5);
        });
    });

    describe('roundToInteger', () => {
        it('rounds to integer', () => {
            expect(roundToInteger(3.7)).toBe(4);
        });

        it('rounds down', () => {
            expect(roundToInteger(3.2)).toBe(3);
        });
    });
});