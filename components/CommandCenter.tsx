import React, { useState } from 'react';
import { ReportParameters } from '../types';
import { 
    Terminal, Play, CheckCircle2, ShieldAlert, 
    Globe, Lock
} from 'lucide-react';

interface CommandCenterProps {
    savedReports: ReportParameters[];
    onCreateNew: () => void;
    onLoadReport: (report: ReportParameters) => void;
    onOpenInstant: () => void;
    onOpenSimulator: () => void;
}

const CommandCenter: React.FC<CommandCenterProps> = ({ 
    onCreateNew,
    onOpenSimulator
}) => {
    const [accepted, setAccepted] = useState(false);

    return (
        <div className="h-full w-full flex-1 bg-stone-50 flex items-center justify-center p-6 font-sans overflow-y-auto">
            <div className="max-w-5xl w-full bg-white shadow-2xl border border-stone-200 rounded-sm overflow-hidden flex flex-col md:flex-row min-h-[600px]">
                
                {/* Left Panel: Introduction */}
                <div className="md:w-1/2 bg-bw-navy p-10 text-white flex flex-col justify-between relative overflow-hidden">
                    {/* Background Tech pattern */}
                    <div className="absolute inset-0 opacity-10 pointer-events-none" 
                         style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '30px 30px' }}>
                    </div>

                    <div className="relative z-10">
                        <div className="flex items-center gap-2 text-bw-gold font-bold tracking-widest text-xs uppercase mb-8">
                            <Terminal size={14} /> Nexus Intelligence OS v4.2
                        </div>
                        
                        <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6 leading-tight">
                            The world's most advanced economic intelligence engine.
                        </h1>
                        <p className="text-gray-400 text-lg leading-relaxed">
                            Deploy autonomous agents. Deterministically model economic physics. Calculate success probability based on 100 years of historical data.
                        </p>
                    </div>

                    <div className="relative z-10 mt-12 space-y-6">
                        <div className="flex gap-4">
                            <div className="text-bw-gold font-bold text-xl">01</div>
                            <div>
                                <h4 className="font-bold text-white text-sm uppercase tracking-wide">Calibrate Mission</h4>
                                <p className="text-xs text-gray-500 mt-1">Input Strategic Intent & Constraints. System weights SPI™ & IVAS™ engines to your context.</p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="text-bw-gold font-bold text-xl">02</div>
                            <div>
                                <h4 className="font-bold text-white text-sm uppercase tracking-wide">Deploy Agents</h4>
                                <p className="text-xs text-gray-500 mt-1">9 Specialized AI Agents cross-reference global data streams to build a multi-perspective model.</p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="text-bw-gold font-bold text-xl">03</div>
                            <div>
                                <h4 className="font-bold text-white text-sm uppercase tracking-wide">Execute & Analyze</h4>
                                <p className="text-xs text-gray-500 mt-1">Receive calculated probability scores and a concrete strategic roadmap.</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Panel: Terms & Entry */}
                <div className="md:w-1/2 p-10 flex flex-col bg-stone-50">
                    <div className="flex-1">
                        <h3 className="text-bw-navy font-bold uppercase tracking-widest text-sm mb-6 flex items-center gap-2">
                            <ShieldAlert size={16} className="text-bw-gold" /> Terms of Engagement & Compliance
                        </h3>

                        <div className="space-y-4 text-xs text-stone-600 bg-white p-6 rounded-sm border border-stone-200 h-64 overflow-y-auto custom-scrollbar shadow-inner">
                            <p><strong className="text-stone-900 block mb-1">1. Authorized Use & Access Protocols</strong> This system is strictly for authorized strategic analysis. Access rights and data depth are calibrated to the user's declared Skill Level (Novice, Experienced, Expert). All inputs, including custom entity data, are processed via secure enterprise gateways. Unlawful data injection is prohibited.</p>
                            
                            <p><strong className="text-stone-900 block mb-1">2. Decision Support & Authority</strong> BW Global Advisory provides insights for informational purposes. The Nexus OS outputs are probabilistic. Users operating at 'Novice' levels should verify insights with 'Expert' domain holders. Strategic decisions remain the sole responsibility of the user.</p>
                            
                            <p><strong className="text-stone-900 block mb-1">3. Data Privacy & Sovereignty</strong> We adhere to strict GDPR and local data sovereignty laws. Custom operational data (Revenue, Headcount) and specific strategic intents are isolated. No user-specific data is used to train public foundation models.</p>
                            
                            <p><strong className="text-stone-900 block mb-1">4. Financial & Operational Models</strong> The SCF (Strategic Cash Flow) and IVAS (Investment Viability Assessment) models are simulations based on provided Operational Scale and historical benchmarks. They do not constitute financial advice and scale dynamically with input granularity.</p>
                            
                            <p><strong className="text-stone-900 block mb-1">5. Historical Context & Predictive Limits</strong> The system utilizes a proprietary dataset spanning ~1925-2025 (100 Years) to identify long-wave economic cycles and failure patterns. Users acknowledge that past performance is used for predictive modeling only. Black swan events outside the training data may impact accuracy.</p>
                            
                            <p><strong className="text-stone-900 block mb-1">6. Autonomous Agent Liability</strong> The system deploys semi-autonomous AI agents ("Scout", "Diplomat", "Strategist") to construct intelligence dossiers. While these agents operate within strict ethical guardrails, their outputs are generative. Users must validate critical data points.</p>
                            
                            <p><strong className="text-stone-900 block mb-1">7. Neuro-Symbolic Logic Gatekeepers</strong> The "Gatekeeper Protocol" enforces logical consistency checks on user inputs. The system reserves the right to halt analysis if inputs contradict established economic physics or fail the 100-Point checklist, ensuring integrity of the final dossier.</p>
                        </div>
                    </div>

                    <div className="mt-8 border-t border-stone-200 pt-8">
                        <label className="flex items-center gap-3 cursor-pointer mb-8 select-none group">
                            <div className={`w-5 h-5 border rounded flex items-center justify-center transition-all ${accepted ? 'bg-bw-navy border-bw-navy' : 'bg-white border-stone-300 group-hover:border-bw-navy'}`}>
                                {accepted && <CheckCircle2 className="w-3.5 h-3.5 text-white" />}
                            </div>
                            <input type="checkbox" className="hidden" checked={accepted} onChange={e => setAccepted(e.target.checked)} />
                            <span className="text-sm font-bold text-stone-700">I accept terms to unlock system access</span>
                        </label>

                        <div className="grid grid-cols-2 gap-4">
                            <button 
                                onClick={onCreateNew}
                                disabled={!accepted}
                                className="bg-bw-navy text-white py-4 px-6 rounded-sm font-bold text-sm uppercase tracking-wide flex items-center justify-center gap-2 hover:bg-bw-gold hover:text-bw-navy transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                            >
                                {!accepted ? <Lock size={16} /> : <Play size={16} />}
                                Enter Intelligence Hub
                            </button>
                            
                            <button 
                                onClick={onOpenSimulator}
                                className="bg-white text-stone-600 border border-stone-300 py-4 px-6 rounded-sm font-bold text-sm uppercase tracking-wide flex items-center justify-center gap-2 hover:bg-stone-100 hover:text-stone-900 transition-all shadow-sm"
                            >
                                <Globe size={16} />
                                View System Monitor
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default CommandCenter;