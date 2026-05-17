import { motion } from 'motion/react';
import { 
  Leaf, 
  Zap, 
  Wind, 
  Sun, 
  Heart, 
  ChevronRight,
  Droplets,
  Sprout,
  Store,
  Users,
  MessageSquare
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function Home() {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=2000" 
            alt="Sustainable Farm" 
            className="w-full h-full object-cover opacity-80"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-cream/90 via-brand-cream/40 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <span className="inline-block px-4 py-1.5 bg-brand-green/10 text-brand-green rounded-full text-xs font-mono uppercase tracking-widest mb-6 border border-brand-green/20">
              {t('joined_kc')}
            </span>
            <h1 className="text-6xl md:text-8xl font-serif font-bold text-stone-900 leading-[0.9] tracking-tighter mb-8">
              {t('hero_title').split(' ')[0]} <span className="text-brand-green italic underline decoration-stone-200 underline-offset-8">{t('hero_title').split(' ').slice(1).join(' ')}</span>
            </h1>
            <p className="text-xl text-stone-700 font-serif italic mb-10 leading-relaxed">
              {t('hero_subtitle')}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/market" className="px-8 py-4 bg-brand-green text-brand-cream rounded-full font-medium hover:bg-brand-leaf transition-all shadow-lg flex items-center gap-2 group">
                {t('btn_browse')} <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/education" className="px-8 py-4 border border-brand-green text-brand-green rounded-full font-medium hover:bg-brand-green/5 transition-all">
                {t('btn_learn')}
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-32 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div>
              <h2 className="text-5xl font-serif font-bold text-brand-green mb-8 leading-tight">
                Vedic, Yogic & <br/> Electroculture
              </h2>
              <p className="text-stone-600 text-lg leading-relaxed mb-12">
                Universal Farm combines ancient wisdom with subtle energy technologies to create vibrant, high-nutrient ecosystems. We move beyond artificial lab-grown products to nurture better DNA configuration and human prosperity.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-orange-50 rounded-2xl flex items-center justify-center shrink-0 border border-orange-100">
                    <Sun className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <h4 className="font-bold mb-2">Vedic Practices</h4>
                    <p className="text-stone-500 leading-relaxed">Ancient agrarian rites that align farming cycles with planetary rhythms.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center shrink-0 border border-blue-100">
                    <Zap className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-bold mb-2">Electroculture</h4>
                    <p className="text-stone-500 leading-relaxed">Harnessing atmospheric energy using copper antennas to speed growth naturally.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&q=80&w=1000" 
                alt="Natural Farm" 
                className="rounded-[40px] shadow-2xl relative z-10"
                referrerPolicy="no-referrer"
              />
              <div className="absolute -top-12 -right-12 w-48 h-48 bg-brand-green rounded-full blur-[80px] opacity-20"></div>
              <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-orange-500 rounded-full blur-[100px] opacity-10"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action - KC credits */}
      <section className="py-32 px-4 bg-brand-green text-brand-cream relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-brand-cream rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        </div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <Heart className="w-16 h-16 mx-auto mb-8 text-brand-cream/80" />
          <h2 className="text-4xl md:text-6xl font-serif font-bold mb-8">Join the KC Economy</h2>
          <p className="text-xl opacity-90 mb-12 leading-relaxed font-light">
            Kindness Credits (KC) are our community currency. Exchange services like harvesting help, equipment rental, or organic surplus through a tax-heaven ecosystem powered by Universal Law.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link to="/wallet" className="px-10 py-5 bg-white text-brand-green rounded-full font-bold hover:shadow-xl transition-all">
              Convert Fiat to KC
            </Link>
            <Link to="/dashboard" className="px-10 py-5 border border-white text-white rounded-full font-bold hover:bg-white/10 transition-all">
              List Your Farm
            </Link>
          </div>
        </div>
      </section>

      {/* Feature Grids */}
      <section className="py-32 px-4 bg-brand-cream">
        <div className="max-w-7xl mx-auto text-center mb-20">
          <h3 className="text-xs font-mono uppercase tracking-[0.4em] text-brand-earth mb-4">Community Ecosystem</h3>
          <h2 className="text-5xl font-serif font-bold text-brand-green">How We Flourish Together</h2>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: Store,
              title: "Product Exchange",
              desc: "Pure natural organic farmers offer their products—including Vedic Fungi & Electroculture Mushrooms—directly using KC."
            },
            {
              icon: Users,
              title: "Service Collaboration",
              desc: "Rent equipment or swap labor hours. A collaborative agricultural nervous system."
            },
            {
              icon: MessageSquare,
              title: "Knowledge Forum",
              desc: "Share R&D on electroculture, yogic appliances, and sustainable DNA upliftment."
            }
          ].map((feature, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -10 }}
              className="bg-white p-10 rounded-[32px] border border-stone-100 shadow-sm"
            >
              <div className="w-14 h-14 bg-brand-cream rounded-2xl flex items-center justify-center mb-8 border border-stone-100">
                <feature.icon className="w-7 h-7 text-brand-green" />
              </div>
              <h4 className="text-2xl font-serif font-bold mb-4">{feature.title}</h4>
              <p className="text-stone-500 leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
