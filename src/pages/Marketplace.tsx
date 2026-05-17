import React, { useState, useEffect } from 'react';
import { collection, query, getDocs } from 'firebase/firestore';
import { db } from '../lib/firebase.ts';
import { Product, Service } from '../types.ts';
import { 
  Search, 
  Filter, 
  Store, 
  Activity, 
  ShoppingBag,
  Wrench,
  Tag,
  ArrowRight
} from 'lucide-react';
import { motion } from 'motion/react';

export default function Marketplace() {
  const [products, setProducts] = useState<Product[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [activeTab, setActiveTab] = useState<'products' | 'services'>('products');
  const [loading, setLoading] = useState(true);

  const mushroomFeatured = [
    {
      id: 'm1',
      name: "Vedic Reishi Extract",
      description: "Grown under classical raga vibrations, harvested during the full moon for maximum potency.",
      priceKC: 120,
      category: "Fungi",
      imageUrl: "https://images.unsplash.com/photo-1635334138122-48769389279f?auto=format&fit=crop&q=80&w=800"
    },
    {
      id: 'm2',
      name: "Electroculture Lions Mane",
      description: "Stimulated with 12V atmospheric copper antennas. Giant, dense, and nutrient-packed.",
      priceKC: 85,
      category: "Fungi",
      imageUrl: "https://images.unsplash.com/photo-1594747447432-841f4eb4d7bc?auto=format&fit=crop&q=80&w=800"
    },
    {
      id: 'm3',
      name: "Cordyceps Sinensis (Natural)",
      description: "Wild-crafted using traditional Himalayan methods. Pure DNA configuration.",
      priceKC: 300,
      category: "Fungi",
      imageUrl: "https://images.unsplash.com/photo-1628543102308-9a4c1a69a48b?auto=format&fit=crop&q=80&w=800"
    }
  ];

  useEffect(() => {
    async function fetchData() {
      try {
        const prodSnap = await getDocs(query(collection(db, 'products')));
        const servSnap = await getDocs(query(collection(db, 'services')));
        setProducts(prodSnap.docs.map(d => ({ id: d.id, ...d.data() } as Product)));
        setServices(servSnap.docs.map(d => ({ id: d.id, ...d.data() } as Service)));
      } catch (e) {
        console.error("Marketplace fetch error:", e);
      }
      setLoading(false);
    }
    fetchData();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
        <div>
          <h1 className="text-5xl font-serif font-bold text-brand-green mb-4">Farm Marketplace</h1>
          <p className="text-stone-500 font-serif italic text-lg">Pure organic products & community service exchange</p>
        </div>
        
        <div className="flex gap-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
            <input 
              type="text" 
              placeholder="Search farm goods..."
              className="pl-12 pr-6 py-4 bg-white border border-stone-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-green/10 w-full md:w-64"
            />
          </div>
          <button className="p-4 bg-white border border-stone-100 rounded-2xl hover:bg-stone-50 transition-colors">
            <Filter className="w-5 h-5 text-stone-600" />
          </button>
        </div>
      </div>

      {/* Featured Fungi Section */}
      <section className="mb-24">
        <div className="flex items-center gap-4 mb-10">
          <div className="h-px bg-stone-100 flex-grow"></div>
          <h2 className="text-sm font-mono text-stone-400 uppercase tracking-[0.4em]">Featured Fungi</h2>
          <div className="h-px bg-stone-100 flex-grow"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {mushroomFeatured.map((m) => (
            <ProductCard key={m.id} product={m as Product} />
          ))}
        </div>
      </section>

      {/* Tabs */}
      <div className="flex items-center gap-8 border-b border-stone-100 mb-12">
        <button 
          onClick={() => setActiveTab('products')}
          className={`pb-4 text-sm font-mono tracking-widest uppercase transition-all relative ${activeTab === 'products' ? 'text-brand-green font-bold' : 'text-stone-400 hover:text-stone-600'}`}
        >
          Farm Products
          {activeTab === 'products' && (
            <motion.div layoutId="tab" className="absolute bottom-0 left-0 w-full h-0.5 bg-brand-green" />
          )}
        </button>
        <button 
          onClick={() => setActiveTab('services')}
          className={`pb-4 text-sm font-mono tracking-widest uppercase transition-all relative ${activeTab === 'services' ? 'text-brand-green font-bold' : 'text-stone-400 hover:text-stone-600'}`}
        >
          Community Services
          {activeTab === 'services' && (
            <motion.div layoutId="tab" className="absolute bottom-0 left-0 w-full h-0.5 bg-brand-green" />
          )}
        </button>
      </div>

      {/* Grid */}
      {loading ? (
        <div className="py-20 text-center animate-pulse text-stone-300 font-mono tracking-widest uppercase text-xs">
          Nurturing Data...
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {activeTab === 'products' ? (
            products.length > 0 ? (
              products.map((p) => <ProductCard key={p.id} product={p} />)
            ) : (
              <EmptyState title="No products yet" label="Be the first to list items from your farm." />
            )
          ) : (
            services.length > 0 ? (
              services.map((s) => <ServiceCard key={s.id} service={s} />)
            ) : (
              <EmptyState title="No services listed" label="Offer your help or equipment to the community." />
            )
          )}
        </div>
      )}
    </div>
  );
}

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  return (
    <motion.div 
      whileHover={{ y: -8 }}
      className="bg-white rounded-[40px] overflow-hidden border border-stone-100 shadow-sm transition-all hover:shadow-xl"
    >
      <div className="aspect-square relative overflow-hidden">
        <img 
          src={product.imageUrl || `https://images.unsplash.com/photo-1623348646971-79ed8c9000bd?auto=format&fit=crop&q=80&w=600`} 
          alt={product.name} 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold text-brand-green uppercase tracking-widest border border-white">
          {product.category}
        </div>
      </div>
      <div className="p-8">
        <h3 className="text-xl font-serif font-bold mb-2">{product.name}</h3>
        <p className="text-stone-500 text-sm mb-6 line-clamp-2 leading-relaxed">
          {product.description}
        </p>
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[10px] text-stone-400 font-mono uppercase tracking-widest">Price</span>
            <span className="text-xl font-bold text-brand-green">{product.priceKC} <span className="text-xs font-mono opacity-60">KC</span></span>
          </div>
          <button className="w-10 h-10 bg-stone-900 text-white rounded-full flex items-center justify-center hover:bg-brand-green transition-colors shadow-lg">
            <ShoppingBag className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

const ServiceCard: React.FC<{ service: Service }> = ({ service }) => {
  return (
    <motion.div 
      whileHover={{ y: -8 }}
      className="bg-brand-cream border border-stone-200 rounded-[40px] p-8 transition-all hover:shadow-xl group"
    >
      <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center mb-6 border border-stone-100 shadow-sm group-hover:scale-110 transition-transform">
        <Wrench className="w-5 h-5 text-brand-green" />
      </div>
      <h3 className="text-2xl font-serif font-bold mb-4">{service.title}</h3>
      <p className="text-stone-500 text-sm mb-8 leading-relaxed">
        {service.description}
      </p>
      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs font-mono uppercase tracking-widest">
          <span className="text-stone-400">Rate</span>
          <span className="font-bold text-brand-green">{service.rateKC} KC / hr</span>
        </div>
        <button className="w-full py-4 bg-brand-green text-brand-cream rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-brand-leaf transition-all shadow-md">
          Request Service <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
}

function EmptyState({ title, label }: { title: string, label: string }) {
  return (
    <div className="col-span-full py-32 flex flex-col items-center justify-center text-center bg-white rounded-[40px] border border-dashed border-stone-200">
      <Activity className="w-16 h-16 text-stone-200 mb-6" />
      <h3 className="text-2xl font-serif font-bold text-stone-800 mb-2">{title}</h3>
      <p className="text-stone-400 max-w-xs">{label}</p>
    </div>
  );
}
