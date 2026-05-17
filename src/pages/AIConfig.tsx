import { motion } from 'motion/react';
import { 
  Cpu, 
  Scale, 
  Map, 
  ShieldAlert, 
  Eye, 
  MessageSquare,
  Milestone,
  CheckCircle2
} from 'lucide-react';

export default function AIConfig() {
  const guidelines = [
    {
      icon: Eye,
      title: "Radical Transparency",
      desc: "Every AI decision in our ecosystem must be audible and traceable to protect organic integrity."
    },
    {
      icon: Scale,
      title: "Biological Supremacy",
      desc: "AI must always serve biological life and human well-being, never override natural intuition."
    },
    {
      icon: ShieldAlert,
      title: "Data Sovereignty",
      desc: "Farmers own 100% of their soil and heart data. No training on community wisdom without consent."
    }
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 py-24">
      <header className="mb-24 text-center">
        <Cpu className="w-16 h-16 text-brand-green mx-auto mb-8" />
        <h1 className="text-6xl font-serif font-bold text-stone-900 mb-6 tracking-tight">Ethical AI Guidelines</h1>
        <p className="text-xl text-stone-500 font-serif italic max-w-2xl mx-auto">
          "Ensuring technology remains our servant, never our master, as we align with natural law."
        </p>
      </header>

      <div className="space-y-12">
        {guidelines.map((g, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row gap-8 p-10 bg-white rounded-[40px] border border-stone-100 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="w-16 h-16 shrink-0 bg-brand-cream rounded-2xl flex items-center justify-center border border-stone-100">
              <g.icon className="w-8 h-8 text-brand-green" />
            </div>
            <div>
              <h3 className="text-2xl font-serif font-bold mb-4">{g.title}</h3>
              <p className="text-stone-600 leading-relaxed text-lg">
                {g.desc}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      <section className="mt-32 p-16 bg-stone-900 rounded-[50px] text-brand-cream relative overflow-hidden">
        <div className="relative z-10">
          <Milestone className="w-12 h-12 mb-10 text-brand-green" />
          <h2 className="text-4xl font-serif font-bold mb-12">Implementation Roadmap</h2>
          
          <div className="space-y-8">
            {[
              { status: 'done', title: "Vedic Algorithm Integration", date: "Q1 2026" },
              { status: 'current', title: "KC Economic Safeguards", date: "Q2 2026" },
              { status: 'future', title: "Decentralized Seed Governance", date: "Q4 2026" }
            ].map((step, i) => (
              <div key={i} className="flex items-center justify-between group">
                <div className="flex items-center gap-6">
                  <div className={`w-3 h-3 rounded-full ${step.status === 'done' ? 'bg-brand-green' : step.status === 'current' ? 'bg-orange-400 animate-pulse' : 'bg-stone-700'}`}></div>
                  <span className={`text-lg font-serif ${step.status === 'future' ? 'opacity-40' : ''}`}>{step.title}</span>
                </div>
                <div className="font-mono text-[10px] tracking-widest opacity-40 group-hover:opacity-100 transition-opacity">
                  {step.date}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Background Gradients */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-green rounded-full blur-[120px] opacity-20 -translate-y-1/2 translate-x-1/2"></div>
      </section>

      <section className="mt-40 text-center">
        <CheckCircle2 className="w-12 h-12 text-brand-green mx-auto mb-8" />
        <h2 className="text-4xl font-serif font-bold mb-6">Robust Feedback Loop</h2>
        <p className="text-stone-500 max-w-xl mx-auto mb-10 leading-relaxed">
          Our development is iterative. Share your thoughts on AI ethics, community governance, or technical features to help us build a better world together.
        </p>
        <button className="bg-brand-green text-brand-cream px-10 py-4 rounded-full font-bold hover:bg-brand-leaf transition-all shadow-lg">
          Submit Feedback
        </button>
      </section>
    </div>
  );
}
