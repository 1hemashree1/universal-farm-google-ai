import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Wallet, 
  ArrowUpRight, 
  ArrowDownLeft, 
  History, 
  ShieldCheck, 
  RefreshCw,
  ShoppingCart,
  Globe
} from 'lucide-react';
import { auth, db } from '../lib/firebase.ts';
import { doc, getDoc } from 'firebase/firestore';

type Currency = 'EUR' | 'INR' | 'USD';

export default function WalletPage() {
  const [balance, setBalance] = useState(0);
  const [loading, setLoading] = useState(true);
  const [exchangeAmount, setExchangeAmount] = useState('');
  const [exchangeType, setExchangeType] = useState<'fiat-to-kc' | 'kc-to-fiat'>('fiat-to-kc');
  const [selectedCurrency, setSelectedCurrency] = useState<Currency>('EUR');

  // Realistic/Specified rates
  // 1 KC = 8 EUR
  // User example: 1 EUR = 100 INR -> 1 KC = 800 INR
  const rates = {
    EUR: 8,
    INR: 800,
    USD: 8.5 // Just an estimate fallback
  };

  useEffect(() => {
    async function getBalance() {
      if (auth.currentUser) {
        try {
          const userDoc = await getDoc(doc(db, 'users', auth.currentUser.uid));
          if (userDoc.exists()) {
            setBalance(userDoc.data().kcBalance || 0);
          }
        } catch (e) {
          console.error("Error fetching balance:", e);
        }
      }
      setLoading(false);
    }
    getBalance();
  }, []);

  const currentKCPrice = rates[selectedCurrency];

  const calculateResult = () => {
    if (!exchangeAmount) return '0.00';
    const amount = Number(exchangeAmount);
    if (exchangeType === 'fiat-to-kc') {
      return (amount / currentKCPrice).toFixed(2);
    } else {
      return (amount * currentKCPrice).toFixed(2);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-16">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Balance Card */}
        <div className="lg:col-span-2 space-y-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-brand-green p-10 rounded-[40px] text-brand-cream shadow-2xl relative overflow-hidden"
          >
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-8 text-brand-cream/80 uppercase tracking-[0.3em] font-mono text-[10px]">
                <ShieldCheck className="w-4 h-4" /> Secure KC Wallet
              </div>
              <p className="text-sm opacity-80 mb-2">Available Kindness Credits</p>
              <h2 className="text-7xl font-serif font-bold mb-10 tabular-nums">
                {loading ? '---' : balance.toLocaleString()} <span className="text-3xl font-mono uppercase tracking-widest opacity-60">KC</span>
              </h2>
              
              <div className="flex gap-4">
                <button className="flex-grow flex items-center justify-center gap-2 bg-white text-brand-green py-4 rounded-2xl font-bold hover:bg-brand-cream transition-all shadow-lg">
                  <ArrowDownLeft className="w-5 h-5" /> Receive
                </button>
                <button className="flex-grow flex items-center justify-center gap-2 bg-brand-leaf text-brand-cream py-4 rounded-2xl font-bold border border-brand-cream/20 hover:bg-brand-green transition-all shadow-lg">
                  <ArrowUpRight className="w-5 h-5" /> Send
                </button>
              </div>
            </div>
            
            {/* Abstract Background Shapes */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-leaf rounded-full blur-[100px] opacity-40 translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-orange-400 rounded-full blur-[80px] opacity-20 -translate-x-1/4 translate-y-1/4"></div>
          </motion.div>

          {/* Exchange Portal */}
          <div className="bg-white p-10 rounded-[40px] border border-stone-100 shadow-sm">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
              <h3 className="text-3xl font-serif font-bold text-brand-green flex items-center gap-3">
                <RefreshCw className="w-8 h-8 text-stone-300" /> Exchange Facility
              </h3>
              
              <div className="flex items-center gap-2 bg-stone-50 p-1 rounded-xl border border-stone-100">
                <Globe className="w-4 h-4 text-stone-400 ml-2" />
                {(['EUR', 'INR', 'USD'] as Currency[]).map((cur) => (
                  <button
                    key={cur}
                    onClick={() => setSelectedCurrency(cur)}
                    className={`px-3 py-1 rounded-lg text-[10px] font-bold transition-all ${selectedCurrency === cur ? 'bg-white shadow-sm text-brand-green' : 'text-stone-400 hover:text-stone-600'}`}
                  >
                    {cur}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-8 p-1 bg-stone-50 rounded-2xl">
              <button 
                onClick={() => setExchangeType('fiat-to-kc')}
                className={`py-3 rounded-xl text-sm font-bold transition-all ${exchangeType === 'fiat-to-kc' ? 'bg-white shadow-sm text-brand-green' : 'text-stone-400'}`}
              >
                Fiat to KC
              </button>
              <button 
                onClick={() => setExchangeType('kc-to-fiat')}
                className={`py-3 rounded-xl text-sm font-bold transition-all ${exchangeType === 'kc-to-fiat' ? 'bg-white shadow-sm text-brand-green' : 'text-stone-400'}`}
              >
                KC to Fiat
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-[10px] font-mono uppercase tracking-widest text-stone-400 mb-2 ml-4">
                  {exchangeType === 'fiat-to-kc' ? `Amount in ${selectedCurrency}` : 'Amount in KC'}
                </label>
                <div className="relative">
                  <input 
                    type="number" 
                    value={exchangeAmount}
                    onChange={(e) => setExchangeAmount(e.target.value)}
                    placeholder="0.00"
                    className="w-full bg-stone-50 border border-stone-100 rounded-2xl py-6 px-8 text-2xl font-serif focus:outline-none focus:ring-2 focus:ring-brand-green/20"
                  />
                  <div className="absolute right-8 top-1/2 -translate-y-1/2 text-stone-400 font-mono font-bold">
                    {exchangeType === 'fiat-to-kc' ? selectedCurrency : 'KC'}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-center py-4">
                <div className="h-px bg-stone-100 flex-grow"></div>
                <div className="px-6 text-stone-300 transform rotate-90 md:rotate-0">
                  <RefreshCw className="w-5 h-5" />
                </div>
                <div className="h-px bg-stone-100 flex-grow"></div>
              </div>

              <div className="bg-stone-50 rounded-2xl p-8 flex justify-between items-center border border-stone-100">
                <div className="flex flex-col">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-stone-400 mb-1">You will receive</span>
                  <span className="text-3xl font-serif font-bold text-brand-green">
                    {calculateResult()}
                  </span>
                </div>
                <div className="text-xl font-mono font-bold text-stone-300">
                  {exchangeType === 'fiat-to-kc' ? 'KC' : selectedCurrency}
                </div>
              </div>

              <div className="text-[10px] text-center text-stone-400 font-mono italic">
                Current Rate: 1 KC = {currentKCPrice} {selectedCurrency}
              </div>

              <button className="w-full bg-stone-900 text-white py-5 rounded-2xl font-bold hover:bg-stone-800 transition-all shadow-xl mt-6">
                Complete Exchange
              </button>
              
              <p className="text-center text-[10px] text-stone-400 uppercase tracking-[0.2em] mt-4">
                Powered by Universal Law Community Trust • Tax Protected Assets
              </p>
            </div>
          </div>
        </div>

        {/* Sidebar / Stats */}
        <div className="space-y-8">
          <div className="bg-white p-8 rounded-[32px] border border-stone-100 shadow-sm">
            <h4 className="text-xs font-mono uppercase tracking-widest text-stone-400 mb-6 flex items-center gap-2">
              <History className="w-4 h-4" /> Recent Activity
            </h4>
            <div className="space-y-6">
              {[1, 2, 3].map((_, i) => (
                <div key={i} className="flex justify-between items-center group cursor-pointer">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-stone-50 rounded-xl flex items-center justify-center group-hover:bg-brand-green group-hover:text-white transition-all">
                      <ShoppingCart className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-sm font-bold">Organic Veggie Pack</p>
                      <p className="text-[10px] text-stone-400 uppercase tracking-widest font-mono">Purchase • 2h ago</p>
                    </div>
                  </div>
                  <span className="text-sm font-bold text-red-500">-24 KC</span>
                </div>
              ))}
              <button className="w-full text-[10px] font-mono uppercase tracking-widest text-brand-green hover:underline mt-4">
                View Full Ledger
              </button>
            </div>
          </div>

          <div className="bg-white p-8 rounded-[32px] border border-stone-100 shadow-sm overflow-hidden relative">
            <div className="relative z-10">
              <h4 className="text-xs font-mono uppercase tracking-widest text-stone-400 mb-6">KC Ecosystem</h4>
              <div className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-stone-500">Local Circulation</span>
                  <span className="font-bold">142.5k KC</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-stone-500">Kindness Multiplier</span>
                  <span className="font-bold text-brand-green">1.25x</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-stone-500">Tax Safe Zone</span>
                  <span className="font-bold">100%</span>
                </div>
              </div>
            </div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-stone-50 rounded-full blur-3xl -mr-16 -mt-16"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
