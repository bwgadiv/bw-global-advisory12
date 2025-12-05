
import React from 'react';
import { Network, BarChart3, TrendingUp, Cpu, Layers, Database, Globe } from 'lucide-react';
import { Service } from '../types';

const engines: Service[] = [
  {
    id: 'ivas',
    title: 'IVAS™ Engine',
    subtitle: 'Investment Viability Assessment',
    description: 'Calculates the "Velocity of Capital." IVAS™ models how quickly an investment can actually be deployed in a specific region, factoring in bureaucratic friction, infrastructure lag, and local partner capability.',
    icon: <BarChart3 className="h-8 w-8 text-bw-gold" />,
  },
  {
    id: 'spi',
    title: 'SPI™ Engine',
    subtitle: 'Strategic Partnership Index',
    description: 'Measures "Symbiotic Fit." SPI™ moves beyond basic due diligence to analyze operational compatibility. It assigns a probability score to a partnership\'s long-term survival based on historical cultural and operational data.',
    icon: <Network className="h-8 w-8 text-bw-gold" />,
  },
  {
    id: 'scf',
    title: 'SCF™ Engine',
    subtitle: 'Strategic Cash Flow',
    description: 'Projects the "Knock-On Effect." SCF™ is a non-linear financial model that simulates second and third-order economic impacts, showing how a single investment creates ripples across the regional ecosystem.',
    icon: <TrendingUp className="h-8 w-8 text-bw-gold" />,
  },
];

export const Services: React.FC = () => {
  return (
    <section id="nexus-core" className="py-24 bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <path d="M0 0 L100 100 M100 0 L0 100" stroke="black" strokeWidth="0.5" />
          </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-bw-navy text-white text-xs font-bold uppercase tracking-widest mb-4">
             <Cpu size={12} className="text-bw-gold" /> System Capabilities
          </div>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-bw-navy mb-6">
            An Engine, Not an Opinion.
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            The BWGA system is not just a data tool; it's a <strong>circuit breaker</strong> for the inefficient feedback loop that traps 90% of global capital in the same 10% of markets. It operates on the premise that the answers to today's economic challenges are buried in the successes and failures of the last century.
          </p>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            By reverse-engineering a century of economic history, we built a system that replaces subjective advice with mathematical proof. It deploys a swarm of specialized AI agents to analyze historical patterns, calculate the probability of a partnership's survival (SPI™), and model the true velocity of capital (IVAS™), turning ambiguity into a calculated advantage.
          </p>
        </div>

        {/* The Engines */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {engines.map((engine) => (
            <div key={engine.id} className="group p-8 border border-gray-200 bg-white hover:border-bw-gold transition-all duration-500 rounded-sm relative shadow-sm hover:shadow-2xl">
              <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity transform group-hover:scale-110 duration-500">
                {React.cloneElement(engine.icon as React.ReactElement<{ className?: string }>, { className: 'h-40 w-40 text-bw-navy' })}
              </div>
              
              <div className="mb-8 p-4 bg-bw-light rounded-sm w-fit group-hover:bg-bw-navy transition-colors duration-300">
                {React.cloneElement(engine.icon as React.ReactElement<{ className?: string }>, { className: 'h-8 w-8 text-bw-navy group-hover:text-bw-gold transition-colors duration-300' })}
              </div>
              
              <div className="relative z-10">
                <h4 className="text-2xl font-serif font-bold text-bw-navy mb-2">{engine.title}</h4>
                <p className="text-xs font-bold text-bw-gold uppercase tracking-widest mb-6">{engine.subtitle}</p>
                <p className="text-gray-600 leading-relaxed text-sm border-l-2 border-gray-100 pl-4 group-hover:border-bw-gold transition-colors duration-300">
                  {engine.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Full Stack Context */}
        <div className="mt-20 bg-stone-900 text-white p-12 rounded-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-bw-gold/5 rounded-full blur-[100px] pointer-events-none"></div>
            
            <div className="relative z-10 grid md:grid-cols-12 gap-12 items-center">
                <div className="md:col-span-7">
                    <div className="flex items-center gap-3 mb-4">
                        <Layers className="w-5 h-5 text-bw-gold" />
                        <h3 className="text-bw-gold font-bold uppercase tracking-widest text-xs">The Full Stack</h3>
                    </div>
                    <h4 className="text-3xl font-serif font-bold mb-6 leading-tight">
                        Engineered to Eliminate the <br/>Cost of Uncertainty.
                    </h4>
                    <p className="text-gray-400 leading-relaxed text-lg mb-6">
                        When data is missing, risk feels infinite. The BWGA System's 19 analytical cores were built to relieve that pressure. By tasking our AI with reconstructing economic data from historical precedent, we turn "unknown" regions into a landscape of calculated probabilities.
                    </p>
                    <p className="text-gray-400 leading-relaxed text-sm border-l-2 border-white/10 pl-4">
                        From Cultural Asymmetry (CCI) to Regulatory Friction (RFI), the system doesn't guess; it triangulates truth from fragmented signals.
                    </p>
                </div>
                
                <div className="md:col-span-5 grid gap-4">
                    <div className="bg-white/5 p-6 rounded border border-white/10 hover:bg-white/10 transition-colors">
                        <Database className="w-8 h-8 text-bw-gold mb-3" />
                        <div className="text-xl font-bold">Validated Against History</div>
                        <p className="text-xs text-gray-500 mt-1">
                            Every engine is validated against a century of economic precedent to prove its ability to identify the root causes of failure and the hidden drivers of success.
                        </p>
                    </div>
                    <div className="bg-white/5 p-6 rounded border border-white/10 hover:bg-white/10 transition-colors">
                        <Globe className="w-8 h-8 text-blue-400 mb-3" />
                        <div className="text-xl font-bold">Inference Engine for Data Voids</div>
                        <p className="text-xs text-gray-500 mt-1">
                            Where data is missing, the system infers economic structure from analogous markets, filling the information void that traditionally keeps capital away.
                        </p>
                    </div>
                </div>
            </div>
        </div>

        {/* NEW CASE STUDY: BRAIN DRAIN */}
        <div className="mt-24">
            <div className="text-center mb-16">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-100 text-red-800 text-xs font-bold uppercase tracking-widest mb-4">
                    Real World Application
                </div>
                <h3 className="text-3xl font-serif font-bold text-bw-navy">The "Brain Drain" and the Battle for High-Value Jobs</h3>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-16">
                {/* The Problem */}
                <div>
                    <h4 className="text-xl font-bold text-bw-navy mb-4 border-l-4 border-red-500 pl-4">The Problem</h4>
                    <p className="text-gray-600 leading-relaxed mb-6">
                        A common and vicious cycle for many regional cities is the "brain drain." They invest heavily in education, producing skilled graduates in fields like engineering, finance, and technology. However, these graduates often leave for major metropolitan centers because that's where the high-paying, career-advancing jobs are perceived to be. The regional city has the talent, but it lacks the high-value employers to retain it.
                    </p>
                    <p className="text-gray-600 leading-relaxed">
                        Simultaneously, a successful mid-sized tech company in a major city like Sydney or London is facing its own problems:
                    </p>
                    <ul className="mt-4 space-y-2">
                        <li className="flex items-start gap-3 text-gray-700 text-sm">
                            <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 flex-shrink-0"></span>
                            <span><strong>Sky-high operational costs:</strong> Office rent and salaries are becoming unsustainable.</span>
                        </li>
                        <li className="flex items-start gap-3 text-gray-700 text-sm">
                            <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 flex-shrink-0"></span>
                            <span><strong>Intense competition for talent:</strong> They are constantly being outbid for top engineers by larger corporations.</span>
                        </li>
                        <li className="flex items-start gap-3 text-gray-700 text-sm">
                            <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 flex-shrink-0"></span>
                            <span><strong>Employee burnout:</strong> Long commutes and a high cost of living are leading to high turnover.</span>
                        </li>
                    </ul>
                </div>

                {/* The Disconnect */}
                <div>
                    <h4 className="text-xl font-bold text-bw-navy mb-4 border-l-4 border-bw-gold pl-4">The Disconnect</h4>
                    <p className="text-gray-600 leading-relaxed mb-6">
                        The regional city has a surplus of affordable, skilled talent and a lower cost of living. The tech company needs exactly that to scale effectively. Yet, they remain invisible to each other.
                    </p>
                    <div className="space-y-6">
                        <div className="bg-stone-50 p-6 rounded-sm border-l-2 border-stone-200">
                            <p className="text-sm text-gray-700 italic">
                                "The regional city's economic development office doesn't know how to effectively reach and pitch to this specific type of tech company. They might send generic brochures or attend broad trade shows, but they can't articulate a data-driven, compelling business case."
                            </p>
                        </div>
                        <div className="bg-stone-50 p-6 rounded-sm border-l-2 border-stone-200">
                            <p className="text-sm text-gray-700 italic">
                                "The tech company's CEO has never even considered the regional city as a viable option. Their board, investors, and advisors all operate within the 'major city' feedback loop. To them, moving to a regional area feels like a massive, unquantifiable risk. They have no data on the local talent pool's specific skills, the reliability of the local infrastructure, or the potential for government partnership."
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* The Solution */}
            <div className="bg-bw-light border border-stone-200 rounded-sm p-10 lg:p-16">
                <div className="text-center mb-12">
                    <h4 className="text-2xl font-serif font-bold text-bw-navy">How Your System Solves This</h4>
                    <p className="text-gray-500 mt-2">This is where your system becomes the bridge.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {/* For Regional City */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-8 h-8 rounded-full bg-bw-navy text-white flex items-center justify-center font-bold text-sm">1</div>
                            <h5 className="font-bold text-lg text-bw-navy">For the Regional City (The 'Novice' User)</h5>
                        </div>
                        <ul className="space-y-4">
                            <li className="text-sm text-gray-600 leading-relaxed">
                                The mayor or economic development officer uses the system. They select their persona ('Government') and their objective ('Attract Foreign Direct Investment').
                            </li>
                            <li className="text-sm text-gray-600 leading-relaxed">
                                The system guides them through the process, helping them define their city's assets (e.g., "University with strong engineering program," "Low commercial rent," "Available land for development").
                            </li>
                            <li className="text-sm text-gray-600 leading-relaxed">
                                The system's <em>MatchmakingEngine</em> and <em>CorporateStrategyAgent</em> then scan global data to find companies that are a perfect fit—companies that are struggling with the exact problems the regional city solves (high costs, talent competition).
                            </li>
                            <li className="text-sm text-gray-600 leading-relaxed">
                                The system generates a "Strategic Outreach Dossier" and a "Precedent-Based" letter using the LetterGeneratorModal. This isn't a generic brochure; it's a highly specific, evidence-based proposal for the tech company, showing them, "Based on the historical success of [Similar Tech Company] in [Similar Regional City], we project a 40% reduction in your opex and a 75% increase in employee retention by relocating your R&D hub here."
                            </li>
                        </ul>
                    </div>

                    {/* For Tech Company */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-8 h-8 rounded-full bg-bw-gold text-bw-navy flex items-center justify-center font-bold text-sm">2</div>
                            <h5 className="font-bold text-lg text-bw-navy">For the Tech Company (The 'Experienced' User)</h5>
                        </div>
                        <ul className="space-y-4">
                            <li className="text-sm text-gray-600 leading-relaxed">
                                The CEO, having received this compelling, data-backed letter, decides to investigate. They use the system to run their own analysis.
                            </li>
                            <li className="text-sm text-gray-600 leading-relaxed">
                                They input their company's profile and their strategic need ("Reduce operational costs and improve talent retention").
                            </li>
                            <li className="text-sm text-gray-600 leading-relaxed">
                                The system's <em>HistoricalPatternAgent</em> finds case studies of other tech companies that successfully "de-centralized" parts of their operations.
                            </li>
                            <li className="text-sm text-gray-600 leading-relaxed">
                                The <em>IVAS™ engine</em> calculates the true "time-to-value" of setting up an office in the regional city, modeling everything from the time it takes to get permits to the time it takes to hire 50 qualified engineers.
                            </li>
                            <li className="text-sm text-gray-600 leading-relaxed">
                                The <em>SPI™ engine</em> calculates the probability of a successful partnership with the local university to create a talent pipeline.
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="mt-12 text-center border-t border-stone-200 pt-8">
                    <p className="text-lg font-serif font-medium text-bw-navy max-w-3xl mx-auto">
                        "By providing a common, data-driven language, your system allows these two entities, who would otherwise never find each other, to connect and create mutual value. It breaks the 'brain drain' cycle for the city and solves the scaling problem for the company, all by replacing biased opinion and incomplete information with calculated, historical evidence."
                    </p>
                </div>
            </div>
        </div>

      </div>
    </section>
  );
};
