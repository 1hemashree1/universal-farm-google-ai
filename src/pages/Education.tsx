import { motion } from 'motion/react';
import { 
  BookOpen, 
  Zap, 
  Flower2, 
  Moon, 
  Sun, 
  Wind, 
  Activity,
  Play,
  Lightbulb,
  TreeDeciduous,
  Leaf
} from 'lucide-react';

export default function Education() {
  const sections = [
    {
      icon: Zap,
      title: "Electroculture",
      desc: "Harness atmospheric electricity and magnetism to enhance plant growth without chemicals.",
      points: ["Copper Antenna Construction", "Atmospheric Energy Capture", "Paramagnetic Soil Secrets"],
      videoUrl: "https://www.youtube.com/embed/SOfv6uXf4nU" // Real electroculture demo
    },
    {
      icon: Moon,
      title: "Vedic Agronomy",
      desc: "Agricultural rites align farming cycles with planetary rhythms for optimal harvest quality.",
      points: ["Lunar Planting Calendars", "Agnihotra for Soil Vitality", "Ancient Seed Storage"],
      videoUrl: "https://www.youtube.com/embed/n4K0R_3-B10" // Vedic farming demo
    },
    {
      icon: Flower2,
      title: "Yogic Farming",
      desc: "Applying meditation and positive thought vibrations to nurture the DNA of your crops.",
      points: ["Conscious Seed Soaking", "Sound Frequency Treatment", "Farmer Well-being Protocols"],
      videoUrl: "https://www.youtube.com/embed/xL2L6-hS_B0" // Mindfulness/Yogic farming context
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-20">
      <div className="text-center mb-24 max-w-3xl mx-auto">
        <h1 className="text-6xl font-serif font-bold text-brand-green mb-4 italic">Vedic Academy</h1>
        <p className="text-xl text-stone-500 font-serif italic leading-relaxed">
          Explore the subtle sciences of nature. Our curriculum merges ancient wisdom with modern bio-energetic research.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-40">
        {sections.map((section, idx) => (
          <section key={idx} className={`flex flex-col gap-16 lg:flex-row items-center ${idx % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
            <div className="flex-1 space-y-10">
              <div className="w-16 h-16 bg-white rounded-3xl flex items-center justify-center border border-stone-100 shadow-sm">
                <section.icon className="w-8 h-8 text-brand-green" />
              </div>
              <h2 className="text-5xl font-serif font-bold text-stone-900 leading-tight">{section.title}</h2>
              <p className="text-xl text-stone-600 leading-relaxed max-w-xl italic font-light">
                {section.desc}
              </p>
              <ul className="space-y-6">
                {section.points.map((pt, i) => (
                  <li key={i} className="flex items-center gap-4 text-stone-500 font-mono text-[10px] uppercase tracking-[0.3em]">
                    <div className="w-2 h-2 bg-brand-green rounded-full shadow-[0_0_10px_rgba(45,90,39,0.3)]"></div>
                    {pt}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex-1 w-full aspect-video rounded-[60px] overflow-hidden shadow-2xl relative group bg-stone-100 border-8 border-white">
              <iframe 
                src={section.videoUrl}
                title={section.title}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </section>
        ))}
      </div>

      <div className="mt-40 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { icon: Lightbulb, title: "Theory", desc: "Foundational principles of subtle energy." },
          { icon: TreeDeciduous, title: "Implementation", desc: "Step-by-step guides for your farm." },
          { icon: Leaf, title: "Community R&D", desc: "Crowdsourced research modules." },
          { icon: BookOpen, title: "Library", desc: "Ancient texts translated for today." }
        ].map((app, i) => (
          <div key={i} className="p-8 bg-white border border-stone-100 rounded-[32px] text-center hover:bg-brand-cream transition-colors cursor-pointer group">
            <app.icon className="w-8 h-8 mx-auto mb-6 text-stone-300 group-hover:text-brand-green transition-colors" />
            <h4 className="font-serif font-bold text-xl mb-2">{app.title}</h4>
            <p className="text-xs text-stone-400 font-mono uppercase tracking-wider">{app.desc}</p>
          </div>
        ))}
      </div>

      {/* Footer Quote */}
      <div className="mt-32 text-center py-20 px-4 bg-brand-cream rounded-[50px] border border-stone-200">
        <h3 className="text-3xl font-serif font-bold italic text-stone-400 mb-2">Grow with us.</h3>
        <p className="text-brand-green font-mono uppercase tracking-[0.4em] text-[10px]">Uplifting Mankind through Natural Alignment</p>
      </div>
    </div>
  );
}
