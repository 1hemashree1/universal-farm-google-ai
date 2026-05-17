import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Heart, 
  HandHeart, 
  Globe, 
  BarChart3, 
  FileText, 
  Users, 
  PieChart,
  ShieldCheck,
  TrendingUp
} from 'lucide-react';
import { collection, query, getDocs, orderBy } from 'firebase/firestore';
import { db } from '../lib/firebase.ts';
import { Donation } from '../types.ts';

export default function Donations() {
  const [donations, setDonations] = useState<Donation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDonations() {
      try {
        const snap = await getDocs(query(collection(db, 'donations'), orderBy('timestamp', 'desc')));
        setDonations(snap.docs.map(d => ({ id: d.id, ...d.data() } as Donation)));
      } catch (e) {
        console.error("Donation fetch error:", e);
      }
      setLoading(false);
    }
    fetchDonations();
  }, []);

  const totalKC = donations.reduce((acc, d) => acc + d.amountKC, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 py-20">
      <header className="mb-24 text-center max-w-3xl mx-auto">
        <div className="inline-flex p-4 bg-red-50 rounded-3xl mb-8 border border-red-100">
          <Heart className="w-8 h-8 text-red-500 fill-red-500/10" />
        </div>
        <h1 className="text-6xl font-serif font-bold text-stone-900 mb-6 tracking-tight italic">Nurture the Seed</h1>
        <p className="text-xl text-stone-500 font-serif leading-relaxed">
          Your contributions fuel R&D into Electroculture, community platform development, and the expansion of the Universal Law Trust.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-32">
        {/* Support Cards */}
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            { 
              icon: Globe, 
              title: "Global Stewardship", 
              desc: "Acquire land for community-run Vedic demonstration farms.",
              color: "bg-blue-50 text-blue-600 border-blue-100"
            },
            { 
              icon: BarChart3, 
              title: "Open Source R&D", 
              desc: "Funding for Electroculture hardware and yogic science studies.",
              color: "bg-orange-50 text-orange-600 border-orange-100"
            },
            { 
              icon: Users, 
              title: "Farmer Grants", 
              desc: "Micro-loans in KC for farmers transitioning to natural methods.",
              color: "bg-brand-cream text-brand-green border-stone-200"
            },
            { 
              icon: ShieldCheck, 
              title: "Legal Protection", 
              desc: "Securing tax-heaven statuses under the Universal Law Trust.",
              color: "bg-stone-50 text-stone-900 border-stone-200"
            }
          ].map((item, i) => (
            <motion.div 
              key={i}
              whileHover={{ scale: 1.02 }}
              className={`p-10 rounded-[40px] border ${item.color} flex flex-col items-start gap-8 group`}
            >
              <div className="p-4 bg-white rounded-2xl shadow-sm group-hover:shadow-md transition-shadow">
                <item.icon className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-2xl font-serif font-bold mb-4">{item.title}</h3>
                <p className="opacity-90 leading-relaxed text-sm italic">{item.desc}</p>
              </div>
              <button className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest mt-auto hover:translate-x-2 transition-transform">
                Fund this <HandHeart className="w-4 h-4" />
              </button>
            </motion.div>
          ))}
        </div>

        {/* Transparency Box */}
        <div className="bg-brand-green rounded-[40px] p-10 text-brand-cream shadow-2xl relative overflow-hidden flex flex-col justify-between">
          <div className="relative z-10">
            <PieChart className="w-12 h-12 mb-8 opacity-40" />
            <h3 className="text-3xl font-serif font-bold mb-6">Transparency Report</h3>
            <p className="text-brand-cream/70 italic text-sm mb-12">
              Every cent is tracked on our public KC ledger to ensure total accountability.
            </p>
            
            <div className="space-y-6">
              <div className="flex justify-between items-end">
                <span className="text-xs uppercase font-mono tracking-widest opacity-60">Total KC Contributed</span>
                <span className="text-4xl font-serif font-bold">{loading ? '...' : totalKC.toLocaleString()}</span>
              </div>
              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: '75%' }}
                  className="h-full bg-brand-cream"
                ></motion.div>
              </div>
              <div className="flex justify-between font-mono text-[10px] uppercase tracking-widest opacity-50">
                <span>R&D (45%)</span>
                <span>Expansion (30%)</span>
              </div>
            </div>
          </div>
          
          <button className="relative z-10 mt-12 w-full py-5 bg-white text-brand-green rounded-2xl font-bold hover:bg-brand-cream transition-all flex items-center justify-center gap-3">
            <FileText className="w-5 h-5" /> View Public Ledger
          </button>

          {/* Decor */}
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-orange-400 rounded-full blur-[100px] opacity-20 translate-x-1/3 translate-y-1/3"></div>
        </div>
      </div>

      {/* Recent Donations */}
      <section className="bg-white rounded-[50px] p-12 border border-stone-100 shadow-sm overflow-x-auto">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-3xl font-serif font-bold flex items-center gap-3">
            <TrendingUp className="w-8 h-8 text-stone-200" /> Recent Contributions
          </h2>
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-stone-400 bg-stone-50 px-4 py-2 rounded-full border border-stone-100">Live Feed</span>
        </div>

        <table className="w-full text-left">
          <thead>
            <tr className="text-[10px] font-mono text-stone-400 uppercase tracking-widest border-b border-stone-100">
              <th className="pb-6 px-4">Donor Hash</th>
              <th className="pb-6 px-4">Amount</th>
              <th className="pb-6 px-4">Category</th>
              <th className="pb-6 px-4 text-right">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-50">
            {loading ? (
              [1,2,3].map(i => <tr key={i} className="animate-pulse"><td colSpan={4} className="py-8 bg-stone-50/50 rounded-xl"></td></tr>)
            ) : donations.length > 0 ? (
              donations.map((d) => (
                <tr key={d.id} className="group hover:bg-stone-50 transition-colors">
                  <td className="py-8 px-4 font-mono text-xs text-stone-500">
                    {d.donorId ? `USR-${d.donorId.slice(0, 8)}` : 'Anonymous'}
                  </td>
                  <td className="py-8 px-4">
                    <span className="font-serif font-bold text-lg">{d.amountKC.toLocaleString()} <span className="text-xs text-stone-400 font-mono italic">KC</span></span>
                  </td>
                  <td className="py-8 px-4">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${d.category === 'R&D' ? 'bg-orange-50 text-orange-600' : 'bg-brand-cream text-brand-green'}`}>
                      {d.category}
                    </span>
                  </td>
                  <td className="py-8 px-4 text-right font-mono text-[10px] opacity-40">
                    {new Date(d.timestamp).toLocaleDateString()}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="py-20 text-center text-stone-400 font-serif italic italic">No donations yet. Be the first to plant a seed.</td>
              </tr>
            )}
          </tbody>
        </table>
      </section>
    </div>
  );
}
