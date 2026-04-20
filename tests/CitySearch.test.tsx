import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import CitySearch from '../src/components/CitySearch/CitySearch';
import { weatherApi } from '../src/services/weatherApi';

vi.mock('../src/services/weatherApi', () => ({
    weatherApi: {
        searchCities: vi.fn(),
    },
}));

describe('CitySearch', () => {
    const mockOnCitySelect = vi.fn();

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('renders search input', () => {
        render(<CitySearch onCitySelect={mockOnCitySelect} />);
        expect(screen.getByPlaceholderText('Search city...')).toBeInTheDocument();
    });

    it('shows loading state while searching', async () => {
        (weatherApi.searchCities as any).mockImplementation(
            () => new Promise((resolve) => setTimeout(() => resolve([]), 200))
        );

        render(<CitySearch onCitySelect={mockOnCitySelect} />);

        const input = screen.getByPlaceholderText('Search city...');
        fireEvent.change(input, { target: { value: 'Moscow' } });

        await waitFor(() => {
            const dropdown = screen.getByText('Searching...');
            expect(dropdown).toBeInTheDocument();
        }, { timeout: 500 });
    });

    it('displays search results', async () => {
        (weatherApi.searchCities as any).mockResolvedValue([
            { name: 'Moscow', country: 'RU', lat: 55.7558, lon: 37.6173 },
        ]);

        render(<CitySearch onCitySelect={mockOnCitySelect} />);

        const input = screen.getByPlaceholderText('Search city...');
        fireEvent.change(input, { target: { value: 'Moscow' } });

        await waitFor(() => {
            expect(screen.getByText('Moscow, RU')).toBeInTheDocument();
        }, { timeout: 1000 });
    });

    it('calls onCitySelect when city is clicked', async () => {
        (weatherApi.searchCities as any).mockResolvedValue([
            { name: 'Moscow', country: 'RU', lat: 55.7558, lon: 37.6173 },
        ]);

        render(<CitySearch onCitySelect={mockOnCitySelect} />);

        const input = screen.getByPlaceholderText('Search city...');
        fireEvent.change(input, { target: { value: 'Moscow' } });

        await waitFor(() => {
            const cityButton = screen.getByText('Moscow, RU');
            fireEvent.click(cityButton);
            expect(mockOnCitySelect).toHaveBeenCalledWith({
                name: 'Moscow',
                country: 'RU',
                lat: 55.7558,
                lon: 37.6173,
            });
        }, { timeout: 1000 });
    });

    it('shows "No cities found" when no results', async () => {
        (weatherApi.searchCities as any).mockResolvedValue([]);

        render(<CitySearch onCitySelect={mockOnCitySelect} />);

        const input = screen.getByPlaceholderText('Search city...');
        fireEvent.change(input, { target: { value: 'NonExistentCity' } });

        await waitFor(() => {
            expect(screen.getByText('No cities found')).toBeInTheDocument();
        }, { timeout: 1000 });
    });
});