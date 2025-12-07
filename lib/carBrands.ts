// Car brand data with real 3D model URLs
export interface CarBrand {
  name: string;
  logo: string;
  modelUrl: string; // GLB model URL
  cars: number[]; // Car IDs from carData
}

export const carBrands: CarBrand[] = [
  {
    name: 'Mercedes',
    logo: '/images/brands/mercedes.png',
    modelUrl: 'https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/mercedes.glb',
    cars: [1, 4] // Mercedes E-Class, GLA
  },
  {
    name: 'BMW',
    logo: '/images/brands/bmw.png',
    modelUrl: 'https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/bmw.glb',
    cars: [2] // BMW i4
  },
  {
    name: 'Audi',
    logo: '/images/brands/audi.png',
    modelUrl: 'https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/audi.glb',
    cars: [3] // Audi e-tron
  },
  {
    name: 'Honda',
    logo: '/images/brands/honda.png',
    modelUrl: 'https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/honda.glb',
    cars: [5] // Honda CR-V
  },
  {
    name: 'Toyota',
    logo: '/images/brands/toyota.png',
    modelUrl: 'https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/toyota.glb',
    cars: [6] // Toyota Highlander
  },
  {
    name: 'Ford',
    logo: '/images/brands/ford.png',
    modelUrl: 'https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/ford.glb',
    cars: [7] // Ford Explorer
  },
  {
    name: 'Nissan',
    logo: '/images/brands/nissan.png',
    modelUrl: 'https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/nissan.glb',
    cars: [8] // Nissan Maxima
  },
  {
    name: 'Jeep',
    logo: '/images/brands/jeep.png',
    modelUrl: 'https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/jeep.glb',
    cars: [9] // Jeep Grand Cherokee
  }
];

// Map car ID to model URL
export const getCarModelUrl = (carId: number): string => {
  const brand = carBrands.find(b => b.cars.includes(carId));
  return brand?.modelUrl || '/models/default_car.glb';
};

// Get brand by car ID
export const getCarBrand = (carId: number): CarBrand | undefined => {
  return carBrands.find(b => b.cars.includes(carId));
};
