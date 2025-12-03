import { useState, useMemo } from 'react';
import { cars } from '@/lib/carData';
import type { Car } from '@/lib/carData';

export interface FilterState {
    location: string;
    pickupDate: string;
    returnDate: string;
    carType: string;
    priceRange: [number, number];
}

export function useCarFilters(initialFilters?: Partial<FilterState>) {
    const [filters, setFilters] = useState<FilterState>({
        location: initialFilters?.location || '',
        pickupDate: initialFilters?.pickupDate || '',
        returnDate: initialFilters?.returnDate || '',
        carType: initialFilters?.carType || '',
        priceRange: initialFilters?.priceRange || [0, 200000],
    });

    const filteredCars = useMemo(() => {
        return cars.filter((car) => {
            // Filter by car type/category
            if (filters.carType && filters.carType !== '') {
                if (car.category !== filters.carType) return false;
            }

            // Filter by price range
            if (car.price < filters.priceRange[0] || car.price > filters.priceRange[1]) {
                return false;
            }

            return true;
        });
    }, [filters]);

    const updateFilter = (key: keyof FilterState, value: any) => {
        setFilters(prev => ({ ...prev, [key]: value }));
    };

    const clearFilters = () => {
        setFilters({
            location: '',
            pickupDate: '',
            returnDate: '',
            carType: '',
            priceRange: [0, 200000],
        });
    };

    const activeFilterCount = useMemo(() => {
        let count = 0;
        if (filters.location) count++;
        if (filters.pickupDate) count++;
        if (filters.returnDate) count++;
        if (filters.carType) count++;
        if (filters.priceRange[0] > 0 || filters.priceRange[1] < 200000) count++;
        return count;
    }, [filters]);

    return {
        filters,
        filteredCars,
        updateFilter,
        clearFilters,
        activeFilterCount,
        totalResults: filteredCars.length,
    };
}
