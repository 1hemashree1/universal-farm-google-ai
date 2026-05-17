import { useState, useEffect, createContext, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './lib/firebase.ts';
import { useTranslation } from 'react-i18next';
import { 
  Sprout, 
  Store, 
  Users, 
  MessageSquare, 
  Wallet as WalletIcon,
  BookOpen,
  Cpu,
  Heart,
  LayoutDashboard,
  Settings as SettingsIcon,
  Globe,
  Palette,
  X
} from 'lucide-react';

import Home from './pages/Home.tsx';
import Marketplace from './pages/Marketplace.tsx';
import WalletPage from './pages/Wallet.tsx';
import Education from './pages/Education.tsx';
import AIConfig from './pages/AIConfig.tsx';
import Donations from './pages/Donations.tsx';

// Theme Context
const ThemeContext = createContext({
  color: '#2d5a27',
  setColor: (color: string) => {},
});

// Settings Modal
function SettingsModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const { color, setColor } = useContext(ThemeContext);
  const { i18n, t } = useTranslation();

  const colors = [
    { name: 'Forest', value: '#2d5a27' },
    { name: 'Ocean', value: '#1a4d6e' },
    { name: 'Earth', value: '#5d4037' },
    { name: 'Royal', value: '#311b92' },
    { name: 'Rose', value: '#880e4f' },
  ];

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'bn', name: 'Bengali' },
    { code: 'hi', name: 'Hindi' },
    { code: 'es', name: 'Spanish' },
    { code: 'fr', name: 'French' },
    { code: 'de', name: 'German' },
    { code: 'du', name: 'Dutch' },
    // Adding placeholders for others mentioned
    { code: 'as', name: 'Assamese' },
    { code: 'ne', name: 'Nepali' },
    { code: 'mr', name: 'Marathi' },
    { code: 'ur', name: 'Urdu' },
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-stone-900/40 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative bg-white w-full max-w-md rounded-[40px] p-10 shadow-2xl overflow-hidden">
        <button onClick={onClose} className="absolute top-8 right-8 text-stone-400 hover:text-stone-900 transition-colors">
          <X className="w-6 h-6" />
        </button>

        <h2 className="text-3xl font-serif font-bold mb-8">Personalize</h2>

        <div className="space-y-10">
          <div>
            <label className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.2em] text-stone-400 mb-6">
              <Palette className="w-4 h-4" /> Brand Theme
            </label>
            <div className="flex flex-wrap gap-4">
              {colors.map((c) => (
                <button
                  key={c.value}
                  onClick={() => setColor(c.value)}
                  className={`w-12 h-12 rounded-2xl transition-all ${color === c.value ? 'ring-4 ring-offset-4 ring-stone-900 scale-90' : 'hover:scale-105'}`}
                  style={{ backgroundColor: c.value }}
                  title={c.name}
                />
              ))}
            </div>
          </div>

          <div>
            <label className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.2em] text-stone-400 mb-6">
              <Globe className="w-4 h-4" /> Language Selection
            </label>
            <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => i18n.changeLanguage(lang.code)}
                  className={`px-4 py-3 rounded-xl text-xs font-bold text-left transition-all ${i18n.language === lang.code ? 'bg-stone-900 text-white' : 'bg-stone-50 text-stone-600 hover:bg-stone-100'}`}
                >
                  {lang.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        <p className="mt-10 text-[10px] text-stone-400 font-mono italic text-center">
          Settings are saved to your local browser session.
        </p>
      </div>
    </div>
  );
}

// Navbar Component
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-brand-cream/80 backdrop-blur-md py-4 shadow-sm' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-brand-green rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
              <Sprout className="text-white w-6 h-6" />
            </div>
            <div>
              <span className="text-xl font-serif font-black tracking-tight text-stone-900 block leading-none">UNIVERSAL FARM</span>
              <span className="text-[8px] font-mono uppercase tracking-[0.2em] text-brand-leaf">Vedic • Yogic • Electroculture</span>
            </div>
          </Link>

          <div className="hidden lg:flex items-center gap-12 text-stone-600 font-mono text-[10px] uppercase tracking-widest">
            <Link to="/market" className="hover:text-brand-green transition-colors">{t('nav_marketplace')}</Link>
            <Link to="/education" className="hover:text-brand-green transition-colors">{t('nav_education')}</Link>
            <Link to="/wallet" className="hover:text-brand-green transition-colors font-bold text-brand-green">{t('nav_wallet')} (KC)</Link>
            <Link to="/forum" className="hover:text-brand-green transition-colors">{t('nav_forum')}</Link>
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsSettingsOpen(true)}
              className="p-3 text-stone-400 hover:text-stone-900 transition-colors"
            >
              <SettingsIcon className="w-5 h-5" />
            </button>
            <Link to="/donations" className="hidden sm:flex items-center gap-2 px-4 py-2 bg-brand-green text-brand-cream rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-brand-leaf transition-all shadow-md">
              <Heart className="w-3 h-3" /> Donate
            </Link>
            <Link to="/dashboard" className="p-3 bg-stone-900 text-white rounded-xl hover:bg-stone-800 transition-colors">
              <LayoutDashboard className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </nav>
      <SettingsModal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
    </>
  );
}

export default function App() {
  const [user, setUser] = useState<any>(null);
  const [themeColor, setThemeColor] = useState('#2d5a27');

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => setUser(u));
    return () => unsub();
  }, []);

  // Update CSS variables when themeColor changes
  useEffect(() => {
    document.documentElement.style.setProperty('--brand-green', themeColor);
    // Derived dark version for leaf
    const r = parseInt(themeColor.slice(1, 3), 16);
    const g = parseInt(themeColor.slice(3, 5), 16);
    const b = parseInt(themeColor.slice(5, 7), 16);
    const leafColor = `rgb(${Math.max(0, r + 20)}, ${Math.max(0, g + 20)}, ${Math.max(0, b + 20)})`;
    document.documentElement.style.setProperty('--brand-leaf', leafColor);
  }, [themeColor]);

  return (
    <ThemeContext.Provider value={{ color: themeColor, setColor: setThemeColor }}>
      <Router>
        <div className="min-h-screen flex flex-col font-sans">
          <Navbar />
          <main className="flex-grow pt-24 pb-20">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/market" element={<Marketplace />} />
              <Route path="/wallet" element={<WalletPage />} />
              <Route path="/education" element={<Education />} />
              <Route path="/ai-ethics" element={<AIConfig />} />
              <Route path="/donations" element={<Donations />} />
              <Route path="/forum" element={
                <div className="flex items-center justify-center h-full text-stone-400 font-serif italic text-2xl py-40">
                  Community Forum coming soon...
                </div>
              } />
              <Route path="/dashboard" element={
                <div className="flex items-center justify-center h-full text-stone-400 font-serif italic text-2xl py-40">
                  Dashboard & Listings coming soon...
                </div>
              } />
            </Routes>
          </main>
          
          <footer className="bg-stone-900 text-stone-400 py-16 px-4">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
              <div className="col-span-1 md:col-span-2">
                <div className="flex items-center gap-2 mb-6">
                  <Sprout className="text-brand-green w-8 h-8" />
                  <span className="text-2xl font-serif font-bold text-white">Universal Farm</span>
                </div>
                <p className="max-w-md font-serif italic opacity-70 mb-8 leading-relaxed">
                  Empowering farmers through ancient wisdom and subtle technology. Aligned with nature to thrive, not just survive.
                </p>
                <div className="flex gap-4">
                  <div className="w-10 h-10 border border-stone-800 rounded-full flex items-center justify-center hover:bg-white/5 cursor-pointer">
                    <Users className="w-4 h-4" />
                  </div>
                  <div className="w-10 h-10 border border-stone-800 rounded-full flex items-center justify-center hover:bg-white/5 cursor-pointer">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                </div>
              </div>
              
              <div>
                <h5 className="text-white font-mono uppercase tracking-[0.2em] text-[10px] mb-8">Ecosystem</h5>
                <ul className="space-y-4 text-sm">
                  <li><Link to="/market" className="hover:text-white transition-colors">Farm Marketplace</Link></li>
                  <li><Link to="/wallet" className="hover:text-white transition-colors">KC Wallet Exchange</Link></li>
                  <li><Link to="/education" className="hover:text-white transition-colors">Vedic Academy</Link></li>
                  <li><Link to="/forum" className="hover:text-white transition-colors">Community Forum</Link></li>
                </ul>
              </div>
              
              <div>
                <h5 className="text-white font-mono uppercase tracking-[0.2em] text-[10px] mb-8">Mission</h5>
                <ul className="space-y-4 text-sm">
                  <li><Link to="/donations" className="hover:text-white transition-colors">Support R&D</Link></li>
                  <li><Link to="/ai-ethics" className="hover:text-white transition-colors">AI Ethics</Link></li>
                  <li><Link to="/education" className="hover:text-white transition-colors">Electroculture Guide</Link></li>
                  <li><span className="opacity-50">Natural DNA Tech</span></li>
                </ul>
              </div>
            </div>
            <div className="max-w-7xl mx-auto pt-16 mt-16 border-t border-stone-800 flex flex-col md:flex-row justify-between text-[10px] font-mono tracking-[0.3em] uppercase">
              <p>© 2026 UNIVERSAL LAW COMMUNITY TRUST</p>
              <div className="flex gap-8 mt-4 md:mt-0">
                 <Link to="/ai-ethics" className="hover:text-brand-cream">Ethical AI Guidelines</Link>
                 <span>KC KINDNESS CREDITS POWERED</span>
              </div>
            </div>
          </footer>
        </div>
      </Router>
    </ThemeContext.Provider>
  );
}

