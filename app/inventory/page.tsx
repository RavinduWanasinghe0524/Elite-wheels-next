'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cars, Car } from '@/lib/carData';
import CarCard3D from '@/components/CarCard3D';
import ParticleBackground from '@/components/ParticleBackground';
import Image from 'next/image';

type ViewMode = 'grid' | 'list';
type SortOption = 'price-low' | 'price-high' | 'year-new' | 'year-old' | 'name';

export default function Inventory() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMake, setSelectedMake] = useState('all');
  const [selectedPrice, setSelectedPrice] = useState('all');
  const [selectedYear, setSelectedYear] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [sortBy, setSortBy] = useState<SortOption>('price-low');
  const [favorites, setFavorites] = useState<number[]>([]);
  const [compareList, setCompareList] = useState<number[]>([]);

  const makes = useMemo(() => ['all', ...Array.from(new Set(cars.map(car => car.make)))], []);
  const years = useMemo(() => ['all', ...Array.from(new Set(cars.map(car => car.year))).sort((a, b) => b - a)], []);
  const categories = useMemo(() => ['all', ...Array.from(new Set(cars.map(car => car.category)))], []);

  const toggleFavorite = (id: number) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(fav => fav !== id) : [...prev, id]
    );
  };

  const toggleCompare = (id: number) => {
    if (compareList.includes(id)) {
      setCompareList(prev => prev.filter(item => item !== id));
    } else if (compareList.length < 3) {
      setCompareList(prev => [...prev, id]);
    }
  };

  const filteredCars = useMemo(() => {
    let filtered = cars.filter(car => {
      const matchesSearch = 
        car.make.toLowerCase().includes(searchTerm.toLowerCase()) || 
        car.model.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesMake = selectedMake === 'all' || car.make === selectedMake;
      
      const matchesPrice = selectedPrice === 'all' || 
        (selectedPrice === '30000' && car.price <= 30000) ||
        (selectedPrice === '50000' && car.price <= 50000) ||
        (selectedPrice === '80000' && car.price <= 80000) ||
        (selectedPrice === '100000' && car.price <= 100000);
      
      const matchesYear = selectedYear === 'all' || car.year.toString() === selectedYear;
      const matchesCategory = selectedCategory === 'all' || car.category === selectedCategory;

      return matchesSearch && matchesMake && matchesPrice && matchesYear && matchesCategory;
    });

    // Sort
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'year-new':
        filtered.sort((a, b) => b.year - a.year);
        break;
      case 'year-old':
        filtered.sort((a, b) => a.year - b.year);
        break;
      case 'name':
        filtered.sort((a, b) => `${a.make} ${a.model}`.localeCompare(`${b.make} ${b.model}`));
        break;
    }

    return filtered;
  }, [searchTerm, selectedMake, selectedPrice, selectedYear, selectedCategory, sortBy]);

  const compareItems = compareList.map(id => cars.find(car => car.id === id)!);

  return (
    <div className="min-h-screen pt-24 pb-12 px-6 relative">
      <ParticleBackground />
      
      <div className="container mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-7xl font-display font-bold mb-4">
            Our <span className="text-gradient-gold">Inventory</span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Explore our curated collection of {cars.length} premium vehicles
          </p>
          
          {/* Stats */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="flex justify-center gap-8 mt-8"
          >
            <div className="glass px-6 py-3 rounded-full border border-gold/20">
              <span className="text-gold font-bold text-xl">{filteredCars.length}</span>
              <span className="text-gray-400 ml-2">Available</span>
            </div>
            <div className="glass px-6 py-3 rounded-full border border-gold/20">
              <span className="text-gold font-bold text-xl">{favorites.length}</span>
              <span className="text-gray-400 ml-2">Favorites</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Filters */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card p-6 md:p-8 rounded-2xl mb-8 shadow-2xl border border-gold/10"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-4">
            <input
              type="text"
              placeholder="🔍 Search make or model..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-gold transition-all placeholder-gray-500 hover:border-white/30"
            />
            
            <select
              value={selectedMake}
              onChange={(e) => setSelectedMake(e.target.value)}
              className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-gold transition-all hover:border-white/30"
            >
              <option value="all">All Makes</option>
              {makes.filter(m => m !== 'all').map(make => (
                <option key={make} value={make}>{make}</option>
              ))}
            </select>

            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-gold transition-all hover:border-white/30"
            >
              <option value="all">All Categories</option>
              {categories.filter(c => c !== 'all').map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>

            <select
              value={selectedPrice}
              onChange={(e) => setSelectedPrice(e.target.value)}
              className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-gold transition-all hover:border-white/30"
            >
              <option value="all">Max Price</option>
              <option value="30000">$30,000</option>
              <option value="50000">$50,000</option>
              <option value="80000">$80,000</option>
              <option value="100000">$100,000</option>
            </select>

            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-gold transition-all hover:border-white/30"
            >
              <option value="all">Year</option>
              {years.filter(y => y !== 'all').map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>

          {/* Sort and View Controls */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-4 border-t border-white/10">
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-400">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-gold transition-all"
              >
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="year-new">Year: Newest First</option>
                <option value="year-old">Year: Oldest First</option>
                <option value="name">Name: A-Z</option>
              </select>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-gold text-black' : 'glass text-gray-400 hover:text-white'}`}
                title="Grid View"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-all ${viewMode === 'list' ? 'bg-gold text-black' : 'glass text-gray-400 hover:text-white'}`}
                title="List View"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </motion.div>

        {/* Compare Bar */}
        <AnimatePresence>
          {compareList.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="glass-card p-4 rounded-xl mb-8 border border-gold/20"
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <span className="text-gold font-bold">Compare ({compareList.length}/3)</span>
                  <div className="flex gap-2">
                    {compareItems.map(car => (
                      <div key={car.id} className="glass px-4 py-2 rounded-lg flex items-center gap-2">
                        <span className="text-sm">{car.make} {car.model}</span>
                        <button onClick={() => toggleCompare(car.id)} className="text-gray-400 hover:text-white">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
                <button
                  className="btn-gold px-6 py-2 text-sm"
                  disabled={compareList.length < 2}
                >
                  Compare Now
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Car Grid/List */}
        <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8' : 'space-y-6'}>
          <AnimatePresence mode="popLayout">
            {filteredCars.map((car, index) => (
              viewMode === 'grid' ? (
                <motion.div
                  key={car.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: -20 }}
                  transition={{ delay: index * 0.05, duration: 0.3 }}
                  className="relative group"
                >
                  <CarCard3D car={car} onViewDetails={setSelectedCar} />
                  <div className="absolute top-4 right-4 flex flex-col gap-2 z-10">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => toggleFavorite(car.id)}
                      className={`p-2 rounded-full glass border ${favorites.includes(car.id) ? 'border-gold bg-gold/20' : 'border-white/10'}`}
                    >
                      <svg className={`w-5 h-5 ${favorites.includes(car.id) ? 'fill-gold stroke-gold' : 'stroke-white fill-none'}`} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => toggleCompare(car.id)}
                      className={`p-2 rounded-full glass border ${compareList.includes(car.id) ? 'border-gold bg-gold/20' : 'border-white/10'} ${compareList.length >= 3 && !compareList.includes(car.id) ? 'opacity-50 cursor-not-allowed' : ''}`}
                      disabled={compareList.length >= 3 && !compareList.includes(car.id)}
                    >
                      <svg className={`w-5 h-5 ${compareList.includes(car.id) ? 'stroke-gold' : 'stroke-white'}`} fill="none" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                    </motion.button>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key={car.id}
                  layout
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ delay: index * 0.03, duration: 0.3 }}
                  className="glass-card rounded-2xl overflow-hidden border border-white/10 hover:border-gold/30 transition-all group"
                >
                  <div className="grid md:grid-cols-3 gap-6 p-6">
                    <div className="relative h-48 md:h-full rounded-xl overflow-hidden">
                      <Image src={car.image} alt={`${car.make} ${car.model}`} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                    </div>
                    <div className="md:col-span-2 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="text-2xl font-display font-bold text-white mb-1">{car.make} {car.model}</h3>
                            <p className="text-gold text-xl font-bold">${car.price.toLocaleString()}</p>
                          </div>
                          <div className="flex gap-2">
                            <button onClick={() => toggleFavorite(car.id)} className={`p-2 rounded-full glass ${favorites.includes(car.id) ? 'border-gold' : 'border-white/10'}`}>
                              <svg className={`w-5 h-5 ${favorites.includes(car.id) ? 'fill-gold stroke-gold' : 'stroke-white fill-none'}`} viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                              </svg>
                            </button>
                            <button onClick={() => toggleCompare(car.id)} className={`p-2 rounded-full glass ${compareList.includes(car.id) ? 'border-gold' : 'border-white/10'}`}>
                              <svg className={`w-5 h-5 ${compareList.includes(car.id) ? 'stroke-gold' : 'stroke-white'}`} fill="none" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                              </svg>
                            </button>
                          </div>
                        </div>
                        <div className="flex gap-4 mb-4">
                          <span className="glass px-3 py-1 rounded-full text-sm">{car.year}</span>
                          <span className="glass px-3 py-1 rounded-full text-sm text-gold">{car.category}</span>
                        </div>
                        <p className="text-gray-400 text-sm line-clamp-2">{car.description}</p>
                      </div>
                      <button onClick={() => setSelectedCar(car)} className="btn-gold mt-4 self-start">View Details</button>
                    </div>
                  </div>
                </motion.div>
              )
            ))}
          </AnimatePresence>
        </div>

        {filteredCars.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-20"
          >
            <div className="glass-card inline-block p-12 rounded-3xl border border-gold/20">
              <svg className="w-20 h-20 text-gray-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-2xl text-gray-400 mb-2">No cars found</p>
              <p className="text-gray-500">Try adjusting your filters</p>
            </div>
          </motion.div>
        )}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedCar && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
            onClick={() => setSelectedCar(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="glass-card rounded-3xl overflow-hidden max-w-5xl w-full border border-gold/20 shadow-2xl shadow-gold/10"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="grid md:grid-cols-2">
                <div className="relative h-72 md:h-full min-h-[400px]">
                  <Image
                    src={selectedCar.image}
                    alt={`${selectedCar.make} ${selectedCar.model}`}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                  <button
                    onClick={() => toggleFavorite(selectedCar.id)}
                    className={`absolute top-4 right-4 p-3 rounded-full glass border ${favorites.includes(selectedCar.id) ? 'border-gold bg-gold/20' : 'border-white/10'}`}
                  >
                    <svg className={`w-6 h-6 ${favorites.includes(selectedCar.id) ? 'fill-gold stroke-gold' : 'stroke-white fill-none'}`} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </button>
                </div>
                <div className="p-10 flex flex-col justify-center">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h2 className="text-4xl font-display font-bold mb-2 text-white">{selectedCar.make} {selectedCar.model}</h2>
                      <p className="text-gold text-3xl font-bold">${selectedCar.price.toLocaleString()}</p>
                    </div>
                    <button
                      onClick={() => setSelectedCar(null)}
                      className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-full"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>

                  <div className="space-y-6 mb-8">
                    <div className="flex justify-between border-b border-white/10 pb-3">
                      <span className="text-gray-400">Year</span>
                      <span className="font-bold text-white">{selectedCar.year}</span>
                    </div>
                    <div className="flex justify-between border-b border-white/10 pb-3">
                      <span className="text-gray-400">Category</span>
                      <span className="font-bold text-white">{selectedCar.category}</span>
                    </div>
                    <div className="pt-2">
                      <h4 className="text-sm font-bold text-gold mb-2 uppercase tracking-wider">Description</h4>
                      <p className="text-gray-300 leading-relaxed">{selectedCar.description}</p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button
                      className="flex-1 py-4 btn-gold text-lg shadow-lg shadow-gold/20"
                      onClick={() => alert('Contact feature coming soon!')}
                    >
                      Inquire Now
                    </button>
                    <button
                      onClick={() => toggleCompare(selectedCar.id)}
                      className={`px-6 py-4 rounded-full border-2 font-bold transition-all ${compareList.includes(selectedCar.id) ? 'border-gold text-gold bg-gold/10' : 'border-white/20 text-white hover:border-gold hover:text-gold'}`}
                    >
                      {compareList.includes(selectedCar.id) ? 'In Compare' : 'Compare'}
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
