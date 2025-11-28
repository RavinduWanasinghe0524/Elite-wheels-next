export interface Car {
    id: number;
    make: string;
    model: string;
    year: number;
    price: number;
    image: string;
    description: string;
    category: string;
}

export const cars: Car[] = [
    {
        id: 1,
        make: 'Mercedes',
        model: 'E-Class',
        year: 2022,
        price: 53999,
        image: '/images/ME.webp',
        description: 'The Mercedes E-Class is a luxury sedan known for its smooth ride, advanced safety features, and sophisticated design.',
        category: 'Sedan'
    },
    {
        id: 2,
        make: 'BMW',
        model: 'i4',
        year: 2023,
        price: 75999,
        image: '/images/i4.avif',
        description: 'The BMW i4 is an all-electric sedan with sporty handling and a range of up to 300 miles, offering an exhilarating yet sustainable drive.',
        category: 'Electric'
    },
    {
        id: 3,
        make: 'Audi',
        model: 'e-tron',
        year: 2023,
        price: 65999,
        image: '/images/A E.avif',
        description: 'The Audi e-tron is a luxury electric SUV that combines Audi’s elegance with modern electric technology, providing a comfortable and eco-friendly ride.',
        category: 'Electric SUV'
    },
    {
        id: 4,
        make: 'Mercedes',
        model: 'GLA',
        year: 2022,
        price: 49999,
        image: '/images/GLA.avif',
        description: 'The Mercedes GLA is a compact SUV with luxury interiors, smooth handling, and the latest safety features, making it an ideal urban choice.',
        category: 'SUV'
    },
    {
        id: 5,
        make: 'Honda',
        model: 'CR-V',
        year: 2024,
        price: 32999,
        image: '/images/CRV.avif',
        description: 'The Honda CR-V is a reliable and spacious SUV with impressive fuel efficiency and a reputation for durability, ideal for families and adventurers alike.',
        category: 'SUV'
    },
    {
        id: 6,
        make: 'Toyota',
        model: 'Highlander',
        year: 2023,
        price: 41999,
        image: '/images/Hi.avif',
        description: 'The Toyota Highlander is a mid-size SUV that offers ample seating, a smooth ride, and reliable performance for both city and off-road adventures.',
        category: 'SUV'
    },
    {
        id: 7,
        make: 'Ford',
        model: 'Explorer',
        year: 2024,
        price: 42999,
        image: '/images/FE.avif',
        description: 'The Ford Explorer is a rugged SUV with powerful engine options, versatile seating, and modern tech features, perfect for both daily commutes and road trips.',
        category: 'SUV'
    },
    {
        id: 8,
        make: 'Nissan',
        model: 'Maxima',
        year: 2023,
        price: 35999,
        image: '/images/NM.avif',
        description: 'The Nissan Maxima is a sleek sedan with a powerful V6 engine and premium interior, providing a luxurious and engaging driving experience.',
        category: 'Sedan'
    },
    {
        id: 9,
        make: 'Jeep',
        model: 'Grand Cherokee',
        year: 2024,
        price: 47999,
        image: '/images/JG.avif',
        description: 'The Jeep Grand Cherokee is a capable SUV that combines off-road readiness with advanced technology and a comfortable cabin.',
        category: 'SUV'
    },
    {
        id: 10,
        make: 'Porsche',
        model: 'Cayenne',
        year: 2024,
        price: 89999,
        image: '/images/PC.avif',
        description: 'The Porsche Cayenne is a luxury SUV with sports car performance, featuring precise handling and powerful engines for a thrilling drive.',
        category: 'Luxury SUV'
    },
    {
        id: 11,
        make: 'Lexus',
        model: 'NX',
        year: 2023,
        price: 44999,
        image: '/images/LN.avif',
        description: 'The Lexus NX is a compact luxury SUV known for its comfortable ride, upscale interior, and advanced safety features.',
        category: 'Luxury SUV'
    },
    {
        id: 12,
        make: 'Chevrolet',
        model: 'Blazer',
        year: 2024,
        price: 39999,
        image: '/images/CV.avif',
        description: 'The Chevrolet Blazer is a mid-size SUV with sporty design, modern technology, and a comfortable interior, suitable for everyday driving.',
        category: 'SUV'
    },
    {
        id: 13,
        make: 'Tesla',
        model: 'Model Y',
        year: 2023,
        price: 53999,
        image: '/images/TY.avif',
        description: 'The Tesla Model Y is a compact electric SUV with spacious seating, impressive range, and Tesla’s signature tech features.',
        category: 'Electric SUV'
    },
    {
        id: 14,
        make: 'BMW',
        model: 'X3',
        year: 2022,
        price: 49999,
        image: '/images/X3.avif',
        description: 'The BMW X3 is a luxury compact SUV with dynamic handling and an upscale cabin, offering a balance of comfort and performance.',
        category: 'Luxury SUV'
    },
    {
        id: 15,
        make: 'Audi',
        model: 'Q5',
        year: 2023,
        price: 57999,
        image: '/images/Q5.avif',
        description: 'The Audi Q5 is a versatile luxury SUV that blends high-tech features with refined comfort and a powerful engine.',
        category: 'Luxury SUV'
    },
    {
        id: 16,
        make: 'Honda',
        model: 'Pilot',
        year: 2023,
        price: 37999,
        image: '/images/HP.webp',
        description: 'The Honda Pilot is a spacious SUV with three rows of seating, ideal for larger families and comfortable long trips.',
        category: 'SUV'
    },
    {
        id: 17,
        make: 'Toyota',
        model: 'Corolla Cross',
        year: 2023,
        price: 26999,
        image: '/images/TC.avif',
        description: 'The Toyota Corolla Cross is a compact SUV that combines fuel efficiency with a practical design, perfect for city driving.',
        category: 'SUV'
    },
    {
        id: 18,
        make: 'Ford',
        model: 'Edge',
        year: 2023,
        price: 33999,
        image: '/images/FED.avif',
        description: 'The Ford Edge is a mid-size SUV that offers a smooth ride, ample space, and the latest Ford technology for an enjoyable driving experience.',
        category: 'SUV'
    },
    {
        id: 19,
        make: 'Nissan',
        model: 'Pathfinder',
        year: 2024,
        price: 38999,
        image: '/images/NPa.avif',
        description: 'The Nissan Pathfinder is a capable SUV with rugged styling and three-row seating, designed for family adventures and daily comfort.',
        category: 'SUV'
    },
    {
        id: 20,
        make: 'Tesla',
        model: 'Model S',
        year: 2024,
        price: 94999,
        image: '/images/T S.avif',
        description: 'The Tesla Model S is a luxury electric sedan with a high range and rapid acceleration, offering one of the best driving experiences for electric vehicles.',
        category: 'Electric'
    },
    {
        id: 21,
        make: 'Toyota',
        model: 'Prius',
        year: 2024,
        price: 28999,
        image: 'https://images.unsplash.com/photo-1617469767053-d3b523a0b982?w=800&h=600&fit=crop',
        description: 'The Toyota Prius is a pioneering hybrid vehicle known for exceptional fuel economy, making it perfect for Sri Lankan roads and traffic conditions.',
        category: 'Hybrid'
    },
    {
        id: 22,
        make: 'Toyota',
        model: 'Land Cruiser',
        year: 2023,
        price: 89999,
        image: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=800&h=600&fit=crop',
        description: 'The legendary Toyota Land Cruiser offers unmatched durability and off-road capability, ideal for Sri Lankan terrain and long-lasting performance.',
        category: 'SUV'
    },
    {
        id: 23,
        make: 'Suzuki',
        model: 'Alto',
        year: 2023,
        price: 12999,
        image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&h=600&fit=crop',
        description: 'The Suzuki Alto is a compact and fuel-efficient city car, perfect for navigating urban Sri Lankan traffic with minimal running costs.',
        category: 'Hatchback'
    },
    {
        id: 24,
        make: 'Suzuki',
        model: 'Swift',
        year: 2024,
        price: 18999,
        image: 'https://images.unsplash.com/photo-1621135802920-133df287f89c?w=800&h=600&fit=crop',
        description: 'The Suzuki Swift combines sporty styling with excellent fuel efficiency and reliability, making it a popular choice in Sri Lanka.',
        category: 'Hatchback'
    },
    {
        id: 25,
        make: 'Mitsubishi',
        model: 'Outlander',
        year: 2023,
        price: 36999,
        image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800&h=600&fit=crop',
        description: 'The Mitsubishi Outlander is a versatile SUV with plug-in hybrid option, offering practicality and efficiency for Sri Lankan families.',
        category: 'SUV'
    },
    {
        id: 26,
        make: 'Honda',
        model: 'Civic',
        year: 2023,
        price: 29999,
        image: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800&h=600&fit=crop',
        description: 'The Honda Civic is a reliable sedan with refined performance and low maintenance costs, highly popular in the Sri Lankan market.',
        category: 'Sedan'
    },
    {
        id: 27,
        make: 'Toyota',
        model: 'Aqua',
        year: 2024,
        price: 24999,
        image: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=800&h=600&fit=crop',
        description: 'The Toyota Aqua (Prius C) is a compact hybrid perfect for Sri Lankan roads, offering exceptional fuel economy and reliability.',
        category: 'Hybrid'
    },
    {
        id: 28,
        make: 'Nissan',
        model: 'Leaf',
        year: 2023,
        price: 32999,
        image: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=800&h=600&fit=crop',
        description: 'The Nissan Leaf is a fully electric vehicle with zero emissions, ideal for eco-conscious Sri Lankan drivers and city commuting.',
        category: 'Electric'
    },
    {
        id: 29,
        make: 'Honda',
        model: 'Vezel',
        year: 2023,
        price: 31999,
        image: 'https://images.unsplash.com/photo-1581540222194-0def2dda95b8?w=800&h=600&fit=crop',
        description: 'The Honda Vezel (HR-V) is a stylish compact SUV with hybrid options, combining practicality with fuel efficiency for Sri Lankan roads.',
        category: 'SUV'
    },
    {
        id: 30,
        make: 'Suzuki',
        model: 'Wagon R',
        year: 2024,
        price: 15999,
        image: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&h=600&fit=crop',
        description: 'The Suzuki Wagon R is a practical tall-wagon with excellent fuel economy and spacious interior, perfect for Sri Lankan families.',
        category: 'Hatchback'
    },
    {
        id: 31,
        make: 'Toyota',
        model: 'Vitz',
        year: 2023,
        price: 17999,
        image: 'https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=800&h=600&fit=crop',
        description: 'The Toyota Vitz (Yaris) is a reliable compact hatchback known for durability and low running costs, extremely popular in Sri Lanka.',
        category: 'Hatchback'
    },
    {
        id: 32,
        make: 'Mitsubishi',
        model: 'Montero Sport',
        year: 2023,
        price: 54999,
        image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&h=600&fit=crop',
        description: 'The Mitsubishi Montero Sport is a rugged SUV with excellent off-road capability and spacious 7-seater configuration.',
        category: 'SUV'
    },
    {
        id: 33,
        make: 'Toyota',
        model: 'Camry Hybrid',
        year: 2024,
        price: 42999,
        image: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=800&h=600&fit=crop',
        description: 'The Toyota Camry Hybrid offers luxury sedan comfort with hybrid efficiency, perfect for executive transport in Sri Lanka.',
        category: 'Hybrid'
    },
    {
        id: 34,
        make: 'Honda',
        model: 'Fit',
        year: 2023,
        price: 19999,
        image: 'https://images.unsplash.com/photo-1590362891991-f776e747a588?w=800&h=600&fit=crop',
        description: 'The Honda Fit (Jazz) is a versatile hatchback with flexible interior space and excellent fuel economy, ideal for Sri Lankan city driving.',
        category: 'Hatchback'
    },
    {
        id: 35,
        make: 'Nissan',
        model: 'X-Trail',
        year: 2024,
        price: 44999,
        image: 'https://images.unsplash.com/photo-1622116423558-646c36c576a1?w=800&h=600&fit=crop',
        description: 'The Nissan X-Trail is a comfortable 7-seater SUV with advanced safety features and hybrid options for Sri Lankan families.',
        category: 'SUV'
    }
];
