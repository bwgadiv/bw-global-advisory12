import React, { useEffect, useState } from 'react';
import { ArrowDown, Activity, Database, Radio, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';

interface HeroProps {
  onOpenSystem: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenSystem }) => {
  const [scanLine, setScanLine] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setScanLine((prev) => (prev + 1) % 100);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-screen w-full overflow-hidden flex items-center bg-bw-navy">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2600&q=80" 
          alt="Urban Complexity" 
          className="w-full h-full object-cover opacity-20 grayscale"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-bw-navy via-bw-navy/95 to-bw-navy/70" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-screen-2xl mx-auto px-8 md:px-12 py-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            {/* Left: The Narrative */}
            <div className="lg:col-span-7 space-y-8">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                >
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-white leading-[1.1] mb-8">
                        Where data ends, real value begins. <br/>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-bw-gold to-white">
                            We built the engine to calculate it.
                        </span>
                    </h1>

                    <div className="space-y-6 text-lg text-gray-300 max-w-3xl leading-relaxed font-light">
                        <p>
                            Regional economies are the bedrock of national GDPs, yet they remain structurally invisible to global capital. The problem isn't a lack of opportunity; it's a lack of reliable, forward-looking intelligence.
                        </p>
                        <p className="text-white font-medium border-l-4 border-bw-gold pl-6 py-2 bg-white/5 rounded-r-lg">
                            "The system doesn't offer advice; it calculates advantage."
                        </p>
                        <p>
                            By analyzing a century of investment successes and failures, we built an operating system that models the underlying physics of market entry. It quantifies what others guess, turning ambiguity into a calculated, strategic advantage.
                        </p>
                    </div>

                    <div className="mt-10 flex flex-col sm:flex-row gap-8 items-start sm:items-center">
                        <div onClick={onOpenSystem} className="cursor-pointer group flex items-center gap-4 flex-shrink-0">
                            <div className="w-16 h-16 rounded-full bg-bw-gold flex items-center justify-center shadow-lg shadow-bw-gold/20 group-hover:bg-white transition-all duration-300">
                                <ArrowDown className="text-bw-navy w-6 h-6 transition-colors" />
                            </div>
                            <div>
                                <span className="block text-xs text-gray-400 uppercase tracking-widest mb-1">Initialize System</span>
                                <span className="text-white font-bold text-lg group-hover:text-bw-gold transition-colors">Enter Nexus OS</span>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Right: The Capital Blindspot Callout & Visual */}
            <div className="lg:col-span-5 relative">
                <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1, delay: 0.3 }}
                    className="relative"
                >
                    {/* Visual Element */}
                    <div className="h-[400px] w-full rounded-sm overflow-hidden border border-gray-700 bg-black/80 shadow-2xl relative group mb-6">
                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/grid-me.png')] opacity-20"></div>
                        
                        {/* Scanning Effect */}
                        <div 
                            className="absolute inset-0 border-b-2 border-red-500/50 shadow-[0_0_20px_rgba(239,68,68,0.3)] z-20 transition-all duration-100 ease-linear"
                            style={{ height: `${scanLine}%` }}
                        />
                        
                        {/* Data Points */}
                        <div className="absolute top-[30%] left-[20%] w-2 h-2 bg-red-500 rounded-full animate-ping" />
                        <div className="absolute top-[30%] left-[20%] w-2 h-2 bg-red-500 rounded-full" />
                        
                        <div className="absolute bottom-[40%] right-[30%] w-2 h-2 bg-bw-gold rounded-full animate-ping delay-700" />
                        <div className="absolute bottom-[40%] right-[30%] w-2 h-2 bg-bw-gold rounded-full delay-700" />

                        {/* HUD */}
                        <div className="absolute top-4 left-4 right-4 flex justify-between text-[10px] font-mono text-gray-500 uppercase">
                            <span>Pattern Scan: 100-Year Depth</span>
                            <span>{scanLine}% Complete</span>
                        </div>
                        
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="text-center p-6 bg-black/60 backdrop-blur-md border border-white/10 rounded-lg max-w-xs">
                                <Activity className="w-8 h-8 text-bw-gold mx-auto mb-2" />
                                <div className="text-white font-bold text-lg">Deterministic Economic Physics</div>
                                <div className="text-xs text-gray-400 mt-1">Calculating Asymmetric Advantage</div>
                            </div>
                        </div>
                    </div>

                    {/* Capital Blindspot Callout Box */}
                    <div className="bg-gradient-to-br from-stone-900 to-black border-l-4 border-red-500 p-6 rounded-r-lg shadow-xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-10">
                            <AlertTriangle className="w-12 h-12 text-white" />
                        </div>
                        <h3 className="text-red-500 font-bold uppercase tracking-widest text-xs mb-2 flex items-center gap-2">
                            <Radio className="w-4 h-4 animate-pulse" /> The Capital Blindspot
                        </h3>
                        <p className="text-gray-300 text-sm leading-relaxed relative z-10">
                            "Global investment is concentrated in less than 10% of the world's jurisdictions. This isn't a strategy; it's a systemic failure of imagination, driven by outdated data and a reliance on familiar networks. Nexus AI was built to correct this inefficiency."
                        </p>
                    </div>
                </motion.div>
            </div>

        </div>
      </div>
    </div>
  );
};