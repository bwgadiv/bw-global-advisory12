
import React, { useState, useEffect, useRef } from 'react';
import { 
  User, Users, Target, Globe, ShieldCheck, Zap, 
  Layout, FileText, CheckCircle2, ChevronRight, 
  ChevronLeft, Play, Settings, Database, 
  Briefcase, Clock, AlertTriangle, Layers,
  ArrowRight, Search, Plus, Trash2, MapPin,
  TrendingUp, BarChart3, Scale, Info, Building2, MousePointerClick, Flag, History, PenTool,
  Network, Cpu, MessageSquare, Mic, Share2, ListTodo, ToggleLeft, ToggleRight, CheckSquare, Square,
  BrainCircuit, HelpCircle
} from 'lucide-react';
import { ReportParameters, ReportData, GenerationPhase, LiveOpportunityItem, ReportSection, NeuroSymbolicState, CopilotInsight } from '../types';
import { 
    ORGANIZATION_TYPES, 
    REGIONS_AND_COUNTRIES, 
    INDUSTRIES, 
    RISK_APPETITE_LEVELS, 
    TIME_HORIZONS,
    GLOBAL_CITY_DATABASE,
    ORGANIZATION_SCALE_BANDS,
    DECISION_AUTHORITY_LEVELS,
    MISSION_TYPES,
    PRIORITY_THEMES,
    TARGET_COUNTERPART_TYPES,
    SUCCESS_METRICS,
    POLITICAL_SENSITIVITIES,
    FUNDING_SOURCES,
    PROCUREMENT_MODES,
    SECTOR_OPPORTUNITIES,
    GOVERNMENT_INCENTIVES,
    DOMAIN_OBJECTIVES,
    AVAILABLE_AGENTS,
    OUTPUT_FORMATS,
    LETTER_STYLES,
    REPORT_DEPTHS,
    SECTOR_DEPARTMENTS,
    SECTOR_THEMES,
    GLOBAL_DEPARTMENTS,
    GLOBAL_ROLES,
    GLOBAL_LEGAL_ENTITIES,
    GLOBAL_STRATEGIC_INTENTS,
    GLOBAL_COUNTERPARTS,
    GLOBAL_INCENTIVES,
    GLOBAL_CAPITAL_SOURCES,
    GLOBAL_OPERATIONAL_MODELS
} from '../constants';

// Module Imports
import RocketEngineModule from './RocketEngineModule';
import MatchmakingEngine from './MatchmakingEngine';
import HistoricalContextComponent from './HistoricalContextComponent';
import { TemporalAnalysisComponent } from './TemporalAnalysisComponent';
import { LetterGeneratorModal } from './LetterGeneratorModal';
import { AnalysisModal } from './AnalysisModal';
import { AddOpportunityModal } from './AddOpportunityModal';
import DueDiligenceSuite from './DueDiligenceSuite';
import GlobalPartnerSearch from './GlobalPartnerSearch';
import { ComparativeAnalysis } from './ComparativeAnalysis';
import ScenarioSimulator from './ScenarioSimulator'; 
import CompetitorMap from './CompetitorMap'; 
import { FormulaBuilder } from './FormulaBuilder'; 
import { ChecklistGatekeeper } from './ChecklistGatekeeper'; 
import { INITIAL_CHECKLIST, INITIAL_FORMULAS, NeuroSymbolicEngine } from '../services/ruleEngine'; 
import MultiAgentOrchestrator from '../services/MultiAgentOrchestrator';

// Icons
import { RocketIcon, MatchMakerIcon, GlobeIcon, BarChart } from './Icons';

interface MainCanvasProps {
  params: ReportParameters;
  setParams: (params: ReportParameters) => void;
  reportData: ReportData;
  isGenerating: boolean;
  generationPhase: GenerationPhase;
  generationProgress: number;
  onGenerate: () => void;
  reports: ReportParameters[];
  onOpenReport: (report: ReportParameters) => void;
  onDeleteReport: (id: string) => void;
  onNewAnalysis: () => void;
  onCopilotMessage?: (msg: CopilotInsight) => void;
}

// Map internal module IDs to display info
const ENGINE_CATALOG = [
    { id: 'rocket_engine', label: 'Nexus Rocket Engine', desc: 'Latent Asset Identification (LAI) & IVAS Scoring.', icon: RocketIcon, color: 'text-orange-600', bg: 'bg-orange-50' },
    { id: 'matchmaking', label: 'Symbiotic Matchmaker', desc: 'Identify high-asymmetry partners globally.', icon: MatchMakerIcon, color: 'text-blue-600', bg: 'bg-blue-50' },
    { id: 'historical_precedents', label: 'Historical Precedents', desc: 'Match strategy against 100 years of case studies.', icon: History, color: 'text-stone-600', bg: 'bg-stone-100' },
    { id: 'temporal_analysis', label: 'Temporal Phase Analysis', desc: 'Lifecycle stage detection & progression modeling.', icon: Clock, color: 'text-cyan-600', bg: 'bg-cyan-50' },
    { id: 'geopolitics', label: 'Geopolitical Forecast', desc: 'Regional stability, currency risk & trade barriers.', icon: GlobeIcon, color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { id: 'governance', label: 'Governance Audit', desc: 'Corruption index, regulatory friction & compliance.', icon: ShieldCheck, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { id: 'deep_reasoning', label: 'Deep Reasoning', desc: 'Adversarial logic check: "Deal Killers" vs "Hidden Gems".', icon: Layout, color: 'text-purple-600', bg: 'bg-purple-50' },
    { id: 'financials', label: 'Financial Modeling', desc: 'Strategic Cash Flow (SCF) & Predictive Growth.', icon: BarChart, color: 'text-green-600', bg: 'bg-green-50' }
];

// Improved SelectOrInput Component with Searchable List
const SelectOrInput = ({
    label,
    value,
    options,
    onChange,
    placeholder = "Enter custom value...",
    fallbackList = []
}: {
    label: string;
    value: string;
    options: { value: string; label: string }[];
    onChange: (val: string) => void;
    placeholder?: string;
    fallbackList?: string[];
}) => {
    const effectiveOptions = options.length > 0 ? options : fallbackList.map(s => ({ value: s, label: s }));
    const isValueInOptions = effectiveOptions.some(o => o.value === value);
    const [isCustomMode, setIsCustomMode] = useState(!isValueInOptions && value !== "");
    const [searchTerm, setSearchTerm] = useState("");
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const filteredOptions = effectiveOptions.filter(opt => 
        opt.label.toLowerCase().includes(searchTerm.toLowerCase())
    );

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="relative group mb-1">
            <div className="flex justify-between items-end mb-1.5">
                <label className="text-xs font-bold text-stone-700 uppercase tracking-wide">{label}</label>
                <button
                    onClick={() => {
                        setIsCustomMode(!isCustomMode);
                        setSearchTerm("");
                        setIsDropdownOpen(false);
                    }}
                    className="text-[10px] flex items-center gap-1.5 font-bold transition-colors text-blue-600 hover:text-blue-800 bg-blue-50 px-2 py-0.5 rounded cursor-pointer select-none"
                >
                    {isCustomMode ? (
                        <>
                            <ListTodo size={12} /> Select from List
                        </>
                    ) : (
                        <>
                            <PenTool size={12} /> Type Manually
                        </>
                    )}
                </button>
            </div>

            {isCustomMode ? (
                <div className="relative animate-in fade-in zoom-in-95 duration-200">
                    <input
                        className="w-full p-3 bg-white border border-blue-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none shadow-sm text-stone-900 placeholder-stone-400"
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                        placeholder={placeholder}
                        autoFocus
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-400 pointer-events-none">
                        <PenTool size={14} />
                    </div>
                </div>
            ) : (
                <div className="relative animate-in fade-in zoom-in-95 duration-200" ref={dropdownRef}>
                    <div 
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className="w-full p-3 bg-stone-50 border border-stone-200 rounded-lg text-sm flex justify-between items-center cursor-pointer hover:border-stone-300 focus:ring-2 focus:ring-stone-800 transition-all text-stone-700 font-medium"
                    >
                        <span className={value ? "text-stone-900" : "text-stone-400"}>
                            {value || `Select ${label}...`}
                        </span>
                        <ChevronRight className={`w-4 h-4 text-stone-400 transition-transform ${isDropdownOpen ? '-rotate-90' : 'rotate-90'}`} />
                    </div>

                    {isDropdownOpen && (
                        <div className="absolute z-50 w-full mt-1 bg-white border border-stone-200 rounded-lg shadow-xl max-h-60 overflow-hidden flex flex-col">
                            <div className="p-2 border-b border-stone-100 bg-stone-50">
                                <div className="flex items-center gap-2 bg-white px-2 rounded border border-stone-200">
                                    <Search className="w-3 h-3 text-stone-400" />
                                    <input 
                                        className="w-full py-1.5 text-xs outline-none bg-transparent"
                                        placeholder="Search options..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        autoFocus
                                    />
                                </div>
                            </div>
                            <div className="overflow-y-auto flex-1 custom-scrollbar">
                                {filteredOptions.map(opt => (
                                    <div 
                                        key={opt.value}
                                        onClick={() => {
                                            onChange(opt.value);
                                            setIsDropdownOpen(false);
                                            setSearchTerm("");
                                        }}
                                        className={`px-4 py-2 text-sm cursor-pointer hover:bg-blue-50 hover:text-blue-700 transition-colors ${value === opt.value ? 'bg-blue-50 text-blue-800 font-bold' : 'text-stone-700'}`}
                                    >
                                        {opt.label}
                                    </div>
                                ))}
                                {filteredOptions.length === 0 && (
                                    <div className="p-3 text-xs text-stone-400 text-center italic">
                                        No matches. Switch to manual entry?
                                    </div>
                                )}
                            </div>
                            <div 
                                onClick={() => {
                                    setIsCustomMode(true);
                                    setIsDropdownOpen(false);
                                    onChange("");
                                }}
                                className="p-2 border-t border-stone-100 bg-stone-50 text-center text-xs font-bold text-blue-600 cursor-pointer hover:bg-stone-100"
                            >
                                + Use Custom Value
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

const MultiSelectWithSearch = ({
    label,
    selectedValues,
    options,
    onChange,
    placeholder = "Select options...",
    allowCustom = true
}: {
    label: string;
    selectedValues: string[];
    options: string[];
    onChange: (values: string[]) => void;
    placeholder?: string;
    allowCustom?: boolean;
}) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [customValue, setCustomValue] = useState("");
    const dropdownRef = useRef<HTMLDivElement>(null);

    const filteredOptions = options.filter(opt => 
        opt.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const toggleValue = (val: string) => {
        if (selectedValues.includes(val)) {
            onChange(selectedValues.filter(v => v !== val));
        } else {
            onChange([...selectedValues, val]);
        }
    };

    const addCustom = () => {
        if (customValue && !selectedValues.includes(customValue)) {
            onChange([...selectedValues, customValue]);
            setCustomValue("");
        }
    };

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="relative group mb-1" ref={dropdownRef}>
            <label className="text-xs font-bold text-stone-700 uppercase tracking-wide mb-1.5 block">{label}</label>
            
            <div 
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className={`w-full p-3 bg-stone-50 border border-stone-200 rounded-lg text-sm flex justify-between items-center cursor-pointer hover:border-stone-300 focus:ring-2 focus:ring-stone-800 transition-all text-stone-700 font-medium min-h-[46px] ${isDropdownOpen ? 'ring-2 ring-stone-800 border-stone-800' : ''}`}
            >
                <div className="flex flex-wrap gap-2 pr-2">
                    {selectedValues.length === 0 && <span className="text-stone-400">{placeholder}</span>}
                    {selectedValues.map(val => (
                        <span key={val} className="px-2 py-0.5 bg-blue-100 text-blue-800 rounded text-xs font-bold border border-blue-200 flex items-center gap-1" onClick={(e) => { e.stopPropagation(); toggleValue(val); }}>
                            {val} <XIcon className="w-3 h-3 hover:text-red-600" />
                        </span>
                    ))}
                </div>
                <ChevronRight className={`w-4 h-4 text-stone-400 transition-transform flex-shrink-0 ${isDropdownOpen ? '-rotate-90' : 'rotate-90'}`} />
            </div>

            {isDropdownOpen && (
                <div className="absolute z-50 w-full mt-1 bg-white border border-stone-200 rounded-lg shadow-2xl max-h-80 overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-200">
                    <div className="p-2 border-b border-stone-100 bg-stone-50">
                        <div className="flex items-center gap-2 bg-white px-2 rounded border border-stone-200">
                            <Search className="w-3 h-3 text-stone-400" />
                            <input 
                                className="w-full py-1.5 text-xs outline-none bg-transparent"
                                placeholder="Search list..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                autoFocus
                            />
                        </div>
                    </div>
                    <div className="overflow-y-auto flex-1 custom-scrollbar p-1">
                        {filteredOptions.map(opt => {
                            const isSelected = selectedValues.includes(opt);
                            return (
                                <div 
                                    key={opt}
                                    onClick={() => toggleValue(opt)}
                                    className={`px-3 py-2 text-sm cursor-pointer hover:bg-stone-50 rounded flex items-center gap-3 transition-colors ${isSelected ? 'bg-blue-50/50' : 'text-stone-700'}`}
                                >
                                    <div className={`w-4 h-4 rounded border flex items-center justify-center flex-shrink-0 ${isSelected ? 'bg-blue-600 border-blue-600' : 'border-stone-300 bg-white'}`}>
                                        {isSelected && <CheckIcon className="w-3 h-3 text-white" />}
                                    </div>
                                    <span className={isSelected ? 'font-bold text-blue-900' : ''}>{opt}</span>
                                </div>
                            );
                        })}
                        {filteredOptions.length === 0 && <div className="p-4 text-xs text-stone-400 text-center">No standard options match. Add custom below.</div>}
                    </div>
                    
                    {allowCustom && (
                        <div className="p-2 border-t border-stone-100 bg-stone-50">
                            <div className="flex gap-2">
                                <input 
                                    className="flex-1 px-3 py-1.5 text-xs border border-stone-300 rounded bg-white outline-none focus:border-blue-500"
                                    placeholder="Add custom entry..."
                                    value={customValue}
                                    onChange={(e) => setCustomValue(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && addCustom()}
                                />
                                <button 
                                    onClick={addCustom}
                                    disabled={!customValue}
                                    className="px-3 py-1 bg-stone-800 text-white rounded text-xs font-bold hover:bg-black disabled:opacity-50"
                                >
                                    Add
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

const XIcon = ({ className, onClick }: { className?: string, onClick?: (e: any) => void }) => (
    <svg className={className} onClick={onClick} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
);

const CheckIcon = ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
);

const MainCanvas: React.FC<MainCanvasProps> = ({ 
    params, setParams, reportData, isGenerating, generationPhase, generationProgress, onGenerate,
    reports, onOpenReport, onDeleteReport, onNewAnalysis, onCopilotMessage
}) => {
    const [step, setStep] = useState<1 | 2 | 3 | 4 | 5 | 6>(1);
    const [orchestratorResults, setOrchestratorResults] = useState<any>(null);
    const [isOpportunityModalOpen, setIsOpportunityModalOpen] = useState(false);
    const [isAnalysisModalOpen, setIsAnalysisModalOpen] = useState(false);
    const [isLetterModalOpen, setIsLetterModalOpen] = useState(false);
    const [isComparativeModalOpen, setIsComparativeModalOpen] = useState(false);
    const [activeModuleConfig, setActiveModuleConfig] = useState<string | null>(null);
    const [resultTab, setResultTab] = useState<'dossier' | 'simulation' | 'market'>('dossier');
    
    const [neuroState, setNeuroState] = useState<NeuroSymbolicState>({
        checklist: INITIAL_CHECKLIST,
        formulas: INITIAL_FORMULAS,
        variableStore: {}
    });

    useEffect(() => {
        const newState = NeuroSymbolicEngine.validateGatekeeper(params, neuroState);
        setNeuroState(newState);
        if(JSON.stringify(newState) !== JSON.stringify(params.neuroSymbolicState)) {
            setParams({...params, neuroSymbolicState: newState});
        }
    }, [params.organizationName, params.country, params.industry, params.strategicIntent, params.revenueBand]); 

    useEffect(() => {
        if (generationPhase === 'complete' && step !== 6) {
            setStep(6);
        }
    }, [generationPhase]);

    useEffect(() => {
        if (!onCopilotMessage) return;
        
        let msg: CopilotInsight | null = null;
        
        if (step === 1) {
             msg = { type: 'insight', title: 'Profile Initialization', description: 'I am calibrating the model based on your organization\'s scale and sector. This baseline determines the "weight" of subsequent risk factors.', confidence: 100 };
        } else if (step === 2) {
             msg = { type: 'strategy', title: 'Mandate Architecture', description: 'I am scanning for "Strategic Drift". Ensure your Problem Statement is specific; vague inputs lead to generic outputs.', confidence: 100 };
        } else if (step === 3) {
             msg = { type: 'insight', title: 'Operational Mechanics Active', description: 'I have activated the Operational Mechanics module. Standard IVAS algorithms are active. Use the Dynamic Logic Engine below if your capital structure or risk profile requires non-linear modeling.', confidence: 100 };
        } else if (step === 4) {
             msg = { type: 'question', title: 'Agent Swarm Deployment', description: 'Select your agent team carefully. Adding "Diplomat" increases political resolution but may slow down the "Forecaster" due to complex dependency checking.', confidence: 100 };
        }

        if (msg) onCopilotMessage({ ...msg, id: Date.now().toString() });
        
    }, [step]);

    const handleParamChange = (key: keyof ReportParameters, value: any) => {
        setParams({ ...params, [key]: value });
    };

    const toggleModule = (moduleId: string) => {
        const current = params.selectedModules || [];
        const updated = current.includes(moduleId)
            ? current.filter(m => m !== moduleId)
            : [...current, moduleId];
        setParams({ ...params, selectedModules: updated });
    };

    const toggleAgent = (agent: string) => {
        const current = params.selectedAgents || [];
        const updated = current.includes(agent)
            ? current.filter(a => a !== agent)
            : [...current, agent];
        setParams({ ...params, selectedAgents: updated });
    };

    const toggleArrayParam = (key: keyof ReportParameters, value: string) => {
        const current = (params[key] as string[]) || [];
        const updated = current.includes(value) 
            ? current.filter(item => item !== value)
            : [...current, value];
        setParams({ ...params, [key]: updated });
    };

    const handleSaveOpportunity = (item: Omit<LiveOpportunityItem, 'isUserAdded' | 'ai_feasibility_score' | 'ai_risk_assessment'>) => {
        const newOpportunity: LiveOpportunityItem = {
            ...item,
            isUserAdded: true,
            ai_feasibility_score: 85,
            ai_risk_assessment: "Preliminary assessment indicates viable entry point."
        };
        setParams({ ...params, activeOpportunity: newOpportunity });
        setIsOpportunityModalOpen(false);
    };

    const renderStep1_Profile = () => {
        const currentSector = params.industry[0] || 'Default';
        const sectorTheme = SECTOR_THEMES[currentSector] || SECTOR_THEMES['Default'];
        const departmentOptionsRaw = SECTOR_DEPARTMENTS[currentSector] || GLOBAL_DEPARTMENTS;
        const departmentOptions = departmentOptionsRaw.map(d => ({ value: d, label: d }));

        return (
            <div className="space-y-8 animate-in fade-in slide-in-from-left-4">
                <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 bg-white border border-stone-200 rounded-xl shadow-sm">
                        <Building2 className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                        <h3 className="text-xl font-serif font-bold text-stone-900">Organization DNA</h3>
                        <p className="text-sm text-stone-500">Comprehensive entity profiling for accurate modelling.</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-8">
                    <div className="bg-stone-50 p-6 rounded-xl border border-stone-200">
                        <label className="block text-sm font-bold text-stone-900 mb-3 uppercase tracking-wide">Analysis Perspective & Skill Level</label>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {[{ id: 'novice', label: 'Novice / Student', desc: 'Guided experience. I need help navigating terms.' }, { id: 'experienced', label: 'Analyst / Lead', desc: 'Standard workflow. I know my requirements.' }, { id: 'expert', label: 'Expert / Executive', desc: 'Advanced tools. Give me raw data & controls.' }].map((level) => (
                                <button key={level.id} onClick={() => handleParamChange('skillLevel', level.id)} className={`p-4 rounded-xl border-2 text-left transition-all ${params.skillLevel === level.id ? 'border-stone-800 bg-white shadow-md ring-1 ring-stone-800' : 'border-stone-200 hover:border-stone-400 text-stone-600 bg-white'}`}>
                                    <div className={`font-bold text-sm mb-1 ${params.skillLevel === level.id ? 'text-stone-900' : 'text-stone-700'}`}>{level.label}</div>
                                    <div className="text-xs text-stone-500">{level.desc}</div>
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm space-y-5">
                        <h4 className="text-xs font-bold text-stone-400 uppercase tracking-widest border-b border-stone-100 pb-2">Corporate Identity</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <SelectOrInput label="Legal Entity Structure" value={params.organizationType} options={GLOBAL_LEGAL_ENTITIES.map(t => ({ value: t, label: t }))} onChange={(val) => handleParamChange('organizationType', val)} placeholder="e.g. Special Purpose Vehicle (SPV)" fallbackList={ORGANIZATION_TYPES} />
                                <SelectOrInput label="Primary Industry Sector" value={params.industry[0] || ''} options={INDUSTRIES.map(i => ({ value: i.title, label: i.title }))} onChange={(val) => handleParamChange('industry', [val])} placeholder="e.g. Renewable Energy" fallbackList={INDUSTRIES.map(i => i.title)} />
                            </div>
                            <div className="space-y-4">
                                <div><label className="text-xs font-bold text-stone-700 block mb-1 uppercase tracking-wide">Organization Name</label><input className="w-full p-3 bg-stone-50 border border-stone-200 rounded-lg text-sm focus:bg-white focus:ring-2 focus:ring-stone-900 outline-none placeholder-stone-400" value={params.organizationName} onChange={(e) => handleParamChange('organizationName', e.target.value)} placeholder="e.g. Acme Global Industries" /></div>
                                <div><label className="text-xs font-bold text-stone-700 block mb-1 uppercase tracking-wide">Headquarters Location</label><input className="w-full p-3 bg-stone-50 border border-stone-200 rounded-lg text-sm focus:bg-white outline-none placeholder-stone-400" value={params.organizationAddress || ''} onChange={(e) => handleParamChange('organizationAddress', e.target.value)} placeholder="e.g. 123 Strategic Ave, London" /></div>
                            </div>
                        </div>
                    </div>

                    <div className={`p-6 rounded-xl border shadow-sm space-y-6 transition-colors duration-500 ${sectorTheme.bg} ${sectorTheme.border}`}>
                        <h4 className={`text-xs font-bold uppercase tracking-widest border-b pb-2 flex justify-between items-center ${sectorTheme.text} border-stone-200/50`}><span>Operational Context & User Role</span><span className="text-xl">{sectorTheme.icon}</span></h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-5">
                                <h5 className={`text-sm font-bold ${sectorTheme.text} border-l-2 border-stone-300 pl-2`}>Organizational Scale</h5>
                                <SelectOrInput label="Annual Revenue Band" value={params.revenueBand || ''} options={ORGANIZATION_SCALE_BANDS.revenue} onChange={(val) => handleParamChange('revenueBand', val)} placeholder="e.g. $2.5M USD" fallbackList={ORGANIZATION_SCALE_BANDS.revenue.map(r => r.label)} />
                                <SelectOrInput label="Global Headcount" value={params.headcountBand || ''} options={ORGANIZATION_SCALE_BANDS.headcount} onChange={(val) => handleParamChange('headcountBand', val)} placeholder="e.g. 15 FTEs" fallbackList={ORGANIZATION_SCALE_BANDS.headcount.map(h => h.label)} />
                            </div>
                            <div className="space-y-5">
                                <h5 className={`text-sm font-bold ${sectorTheme.text} border-l-2 border-stone-300 pl-2`}>Your Role Context</h5>
                                <div><label className="text-xs font-bold text-stone-700 block mb-1 uppercase tracking-wide">Your Name</label><input className="w-full p-3 bg-white border border-stone-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-stone-900 placeholder-stone-400" value={params.userName} onChange={e => handleParamChange('userName', e.target.value)} placeholder="e.g. John Doe" /></div>
                                <SelectOrInput label="Department / Functional Unit" value={params.userDepartment} options={departmentOptions} onChange={(val) => handleParamChange('userDepartment', val)} placeholder="e.g. Strategic Planning Division" fallbackList={GLOBAL_DEPARTMENTS} />
                                <SelectOrInput label="Role Perspective (Authority)" value={params.decisionAuthority || ''} options={GLOBAL_ROLES.map(r => ({value: r, label: r}))} onChange={(val) => handleParamChange('decisionAuthority', val)} placeholder="e.g. Senior Consultant" fallbackList={GLOBAL_ROLES} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const renderStep2_Mandate = () => {
        return (
            <div className="space-y-8 animate-in fade-in slide-in-from-left-4">
                <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 bg-white border border-stone-200 rounded-xl shadow-sm"><Target className="w-6 h-6 text-red-600" /></div>
                    <div><h3 className="text-xl font-serif font-bold text-stone-900">Strategic Mandate</h3><p className="text-sm text-stone-500">Define mission vectors, narrative context, and success metrics.</p></div>
                </div>
                <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm space-y-6">
                    <h4 className="text-xs font-bold text-stone-400 uppercase tracking-widest border-b border-stone-100 pb-2">Mission Architecture</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <MultiSelectWithSearch label="Core Strategic Intent (Select all that apply)" options={GLOBAL_STRATEGIC_INTENTS} selectedValues={Array.isArray(params.strategicIntent) ? params.strategicIntent : [params.strategicIntent].filter(Boolean)} onChange={(values) => handleParamChange('strategicIntent', values)} placeholder="Select Mission Vectors..." />
                        <div className="grid grid-cols-2 gap-4">
                            <div><label className="text-xs font-bold text-stone-700 block mb-1 uppercase tracking-wide">Target Region</label><select className="w-full p-3 bg-stone-50 border border-stone-200 rounded-lg text-sm outline-none cursor-pointer focus:ring-2 focus:ring-stone-800" value={params.region} onChange={(e) => handleParamChange('region', e.target.value)}><option value="">Select Region...</option>{REGIONS_AND_COUNTRIES.map(r => <option key={r.name} value={r.name}>{r.name}</option>)}</select></div>
                            <div><label className="text-xs font-bold text-stone-700 block mb-1 uppercase tracking-wide">Specific Country</label><select className="w-full p-3 bg-stone-50 border border-stone-200 rounded-lg text-sm outline-none cursor-pointer focus:ring-2 focus:ring-stone-800" value={params.country} onChange={(e) => handleParamChange('country', e.target.value)}><option value="">Select Country...</option>{REGIONS_AND_COUNTRIES.find(r => r.name === params.region)?.countries.map(c => (<option key={c} value={c}>{c}</option>)) || <option disabled>Select Region First</option>}</select></div>
                        </div>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm space-y-6">
                    <h4 className="text-xs font-bold text-stone-400 uppercase tracking-widest border-b border-stone-100 pb-2">Strategic Context (Narrative)</h4>
                    <div className="grid grid-cols-1 gap-6">
                        <div><label className="text-xs font-bold text-stone-700 block mb-1 uppercase tracking-wide">Problem Statement / Mission Context</label><textarea className="w-full p-4 bg-stone-50 border border-stone-200 rounded-lg text-sm outline-none resize-none focus:bg-white focus:ring-2 focus:ring-stone-900 transition-all placeholder-stone-400" rows={3} value={params.problemStatement} onChange={(e) => handleParamChange('problemStatement', e.target.value)} placeholder="Describe the specific challenge or opportunity driving this mandate..." /></div>
                        <div><label className="text-xs font-bold text-stone-700 block mb-1 uppercase tracking-wide">Ideal Partner Profile</label><textarea className="w-full p-4 bg-stone-50 border border-stone-200 rounded-lg text-sm outline-none resize-none focus:bg-white focus:ring-2 focus:ring-stone-900 transition-all placeholder-stone-400" rows={2} value={params.idealPartnerProfile} onChange={(e) => handleParamChange('idealPartnerProfile', e.target.value)} placeholder="Describe the attributes of your ideal counterpart..." /></div>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm space-y-6">
                    <h4 className="text-xs font-bold text-stone-400 uppercase tracking-widest border-b border-stone-100 pb-2">Targeting & Mechanics</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <MultiSelectWithSearch label="Target Counterpart Profile" options={GLOBAL_COUNTERPARTS} selectedValues={Array.isArray(params.targetCounterpartType) ? params.targetCounterpartType : [params.targetCounterpartType].filter(Boolean)} onChange={(values) => handleParamChange('targetCounterpartType', values)} placeholder="Select Target Entity Types..." />
                        <MultiSelectWithSearch label="Target Incentives" options={GLOBAL_INCENTIVES} selectedValues={params.targetIncentives || []} onChange={(values) => handleParamChange('targetIncentives', values)} placeholder="Select Desired Incentives..." />
                    </div>
                </div>
            </div>
        );
    };

    const renderStep3_Calibration = () => (
        <div className="space-y-8 animate-in fade-in slide-in-from-left-4">
            <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-white border border-stone-200 rounded-xl shadow-sm">
                    <Scale className="w-6 h-6 text-green-600" />
                </div>
                <div>
                    <h3 className="text-xl font-serif font-bold text-stone-900">Operational Mechanics & Logic</h3>
                    <p className="text-sm text-stone-500">Fine-tune the IVAS algorithms and define custom math rules.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-8">
                    <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm space-y-5">
                        <h4 className="text-xs font-bold text-stone-400 uppercase tracking-widest border-b border-stone-100 pb-2">Capital Structure & Timeline</h4>
                        
                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-xs font-bold text-stone-700 block mb-1 uppercase tracking-wide">Budget Cap</label>
                                    <input 
                                        className="w-full p-3 bg-stone-50 border border-stone-200 rounded-lg text-sm outline-none placeholder-stone-400"
                                        placeholder="$50M USD"
                                        value={params.calibration?.constraints?.budgetCap || ''}
                                        onChange={(e) => setParams({
                                            ...params,
                                            calibration: { ...params.calibration, constraints: { ...params.calibration?.constraints, budgetCap: e.target.value } }
                                        })}
                                    />
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-stone-700 block mb-1 uppercase tracking-wide">Time Horizon</label>
                                    <SelectOrInput
                                        label=""
                                        value={params.expansionTimeline}
                                        options={TIME_HORIZONS.map(t => ({ value: t.label, label: t.label }))}
                                        onChange={(val) => handleParamChange('expansionTimeline', val)}
                                        placeholder="e.g. 18 months"
                                        fallbackList={TIME_HORIZONS.map(t => t.label)}
                                    />
                                </div>
                            </div>

                            <MultiSelectWithSearch
                                label="Target Capital Stack (Select Sources)"
                                options={GLOBAL_CAPITAL_SOURCES}
                                selectedValues={params.fundingSource ? params.fundingSource.split(', ').filter(Boolean) : []}
                                onChange={(values) => handleParamChange('fundingSource', values.join(', '))}
                                placeholder="Select Funding Sources..."
                            />
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm space-y-5">
                        <h4 className="text-xs font-bold text-stone-400 uppercase tracking-widest border-b border-stone-100 pb-2">Operational Chassis</h4>
                        
                        <div className="grid grid-cols-1 gap-4">
                            <SelectOrInput 
                                label="Target Operating Model"
                                value={params.operationalPriority} 
                                options={GLOBAL_OPERATIONAL_MODELS.map(m => ({value: m, label: m}))}
                                onChange={(val) => handleParamChange('operationalPriority', val)}
                                placeholder="Select Model (e.g. Decentralized Hub)"
                                fallbackList={GLOBAL_OPERATIONAL_MODELS}
                            />
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex gap-3 items-start">
                            <HelpCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                            <div>
                                <h4 className="text-sm font-bold text-blue-900">Why the Dynamic Logic Engine?</h4>
                                <p className="text-xs text-blue-800 leading-relaxed mt-1">
                                    Standard economic models (like IVAS) use fixed weights. Real-world deals often have edge cases (e.g., "Ignore political risk if ROI > 40%"). Use the builder below to inject custom math rules that override the standard Nexus scoring algorithms.
                                </p>
                            </div>
                        </div>
                        <FormulaBuilder state={neuroState} onUpdate={setNeuroState} />
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm space-y-5 h-fit">
                    <h4 className="text-xs font-bold text-stone-400 uppercase tracking-widest border-b border-stone-100 pb-2">Risk & Sensitivities</h4>
                    <div>
                        <label className="text-xs font-bold text-stone-700 block mb-3 uppercase tracking-wide">Risk Appetite</label>
                        <div className="space-y-2">
                            {RISK_APPETITE_LEVELS.map((lvl) => (
                                <label key={lvl.value} className={`flex items-center gap-3 p-2 rounded-lg border cursor-pointer transition-all ${params.riskTolerance === lvl.value ? 'bg-stone-900 text-white border-stone-900' : 'bg-white border-stone-200 hover:border-stone-300'}`}>
                                    <input 
                                        type="radio" 
                                        name="risk"
                                        className="hidden"
                                        checked={params.riskTolerance === lvl.value}
                                        onChange={() => {
                                            handleParamChange('riskTolerance', lvl.value);
                                            if (onCopilotMessage) {
                                                onCopilotMessage({
                                                    type: 'warning',
                                                    title: 'Risk Profile Adjusted',
                                                    description: `Shifting to '${lvl.label}' significantly alters the IVAS threshold. Expect stricter partner filtering.`,
                                                    confidence: 95
                                                });
                                            }
                                        }}
                                    />
                                    <div className={`w-3 h-3 rounded-full border flex items-center justify-center ${params.riskTolerance === lvl.value ? 'border-white bg-white' : 'border-stone-400'}`}></div>
                                    <span className="text-xs font-bold">{lvl.label}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                    <div>
                        <label className="text-xs font-bold text-stone-700 block mb-2 uppercase tracking-wide">Political Sensitivities (Red Lines)</label>
                        <div className="flex flex-wrap gap-2">
                            {POLITICAL_SENSITIVITIES.map(sense => (
                                <button
                                    key={sense}
                                    onClick={() => toggleArrayParam('politicalSensitivities', sense)}
                                    className={`px-3 py-1 rounded text-[10px] font-bold border transition-all ${
                                        (params.politicalSensitivities || []).includes(sense)
                                        ? 'bg-red-50 text-red-700 border-red-200'
                                        : 'bg-white text-stone-500 border-stone-200 hover:border-red-200'
                                    }`}
                                >
                                    {sense}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    const renderStep4_Architecture = () => (
        <div className="space-y-8 animate-in fade-in slide-in-from-left-4">
            <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-white border border-stone-200 rounded-xl shadow-sm"><Cpu className="w-6 h-6 text-purple-600" /></div>
                <div><h3 className="text-xl font-serif font-bold text-stone-900">Intelligence Architecture</h3><p className="text-sm text-stone-500">Configure the AI Agent Swarm and Mathematical Engines.</p></div>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm border border-stone-200">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                        <div className="flex justify-between items-center mb-6"><h3 className="text-lg font-bold text-stone-900 flex items-center gap-2"><Layers className="w-5 h-5 text-stone-400" /> Active Math Engines</h3><div className="text-xs font-bold text-stone-400">{(params.selectedModules || []).length} Selected</div></div>
                        <div className="space-y-3">
                            {ENGINE_CATALOG.map(eng => {
                                const isActive = (params.selectedModules || []).includes(eng.id);
                                return (
                                    <div key={eng.id} onClick={() => toggleModule(eng.id)} className={`rounded-lg border p-3 cursor-pointer transition-all ${isActive ? 'bg-stone-50 border-stone-800' : 'bg-white border-stone-200 hover:bg-stone-50'}`}>
                                        <div className="flex items-center gap-3"><div className={`p-1.5 rounded ${isActive ? 'bg-stone-200' : 'bg-stone-50'}`}><eng.icon className={`w-4 h-4 ${isActive ? 'text-stone-900' : 'text-stone-400'}`} /></div><div className="flex-1"><div className="flex justify-between"><div className={`text-xs font-bold ${isActive ? 'text-stone-900' : 'text-stone-500'}`}>{eng.label}</div>{isActive && <CheckCircle2 className="w-3 h-3 text-green-500" />}</div><div className="text-[10px] text-stone-400 leading-tight mt-0.5">{eng.desc}</div></div></div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    <div>
                        <div className="flex justify-between items-center mb-6"><h3 className="text-lg font-bold text-stone-900 flex items-center gap-2"><Users className="w-5 h-5 text-stone-400" /> AI Agent Swarm</h3><div className="text-xs font-bold text-stone-400">{(params.selectedAgents || []).length} Active</div></div>
                        <div className="grid grid-cols-2 gap-3">
                            {AVAILABLE_AGENTS.map(agent => (
                                <button key={agent} onClick={() => toggleAgent(agent)} className={`px-3 py-3 rounded-lg border text-left transition-all ${(params.selectedAgents || []).includes(agent) ? 'bg-blue-50 border-blue-200 text-blue-800 shadow-sm' : 'bg-white border-stone-200 text-stone-500 hover:bg-stone-50'}`}>
                                    <div className="flex items-center gap-2"><div className={`w-2 h-2 rounded-full ${(params.selectedAgents || []).includes(agent) ? 'bg-blue-500 animate-pulse' : 'bg-stone-300'}`}></div><span className="text-xs font-bold">{agent}</span></div>
                                </button>
                            ))}
                        </div>
                        <div className="mt-6 p-4 bg-stone-50 rounded-lg border border-stone-100"><h4 className="text-xs font-bold text-stone-500 uppercase mb-2">Swarm Logic</h4><p className="text-xs text-stone-600 leading-relaxed">Selected agents will run in parallel. "Scout" gathers raw data, "Diplomat" analyzes political risk, and "Strategist" synthesizes the final roadmap.</p></div>
                    </div>
                </div>
            </div>
        </div>
    );

    const renderStep5_Output = () => (
        <div className="space-y-8 animate-in fade-in slide-in-from-left-4">
            <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-white border border-stone-200 rounded-xl shadow-sm"><FileText className="w-6 h-6 text-stone-700" /></div>
                <div><h3 className="text-xl font-serif font-bold text-stone-900">Output Configuration</h3><p className="text-sm text-stone-500">Define the format, tone, and specific deliverables for this mission.</p></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm space-y-6">
                    <h4 className="text-xs font-bold text-stone-400 uppercase tracking-widest border-b border-stone-100 pb-2">Format & Audience</h4>
                    <div><label className="text-xs font-bold text-stone-700 block mb-2 uppercase tracking-wide">Primary Deliverable Format</label><SelectOrInput label="" value={params.outputFormat} options={OUTPUT_FORMATS.map(f => ({ value: f.value, label: f.label }))} onChange={(val) => handleParamChange('outputFormat', val)} placeholder="e.g. Executive Board Pack" fallbackList={OUTPUT_FORMATS.map(f => f.label)} /></div>
                    <div>
                        <label className="text-xs font-bold text-stone-700 block mb-2 uppercase tracking-wide">Report Depth</label>
                        <div className="grid grid-cols-1 gap-2">
                            {REPORT_DEPTHS.map((depth) => (
                                <button key={depth.value} onClick={() => handleParamChange('reportLength', depth.value)} className={`px-4 py-3 rounded-lg border text-left flex justify-between items-center transition-all ${params.reportLength === depth.value ? 'bg-stone-800 text-white border-stone-800' : 'bg-white text-stone-600 border-stone-200 hover:border-stone-400'}`}>
                                    <span className="text-xs font-bold">{depth.label}</span>{params.reportLength === depth.value && <CheckCircle2 size={14} />}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm space-y-6">
                    <h4 className="text-xs font-bold text-stone-400 uppercase tracking-widest border-b border-stone-100 pb-2">Voice & Artifacts</h4>
                    <div><label className="text-xs font-bold text-stone-700 block mb-2 uppercase tracking-wide">Communication Style (Tone)</label><SelectOrInput label="" value={params.letterStyle} options={LETTER_STYLES.map(s => ({ value: s.value, label: s.label }))} onChange={(val) => handleParamChange('letterStyle', val)} placeholder="e.g. Diplomatic / G2G" fallbackList={LETTER_STYLES.map(s => s.label)} /></div>
                    <div>
                        <label className="text-xs font-bold text-stone-700 block mb-2 uppercase tracking-wide">Tactical Emphasis</label>
                        <div className="space-y-4 bg-stone-50 p-4 rounded-lg border border-stone-100">
                            <div><div className="flex justify-between text-[10px] uppercase font-bold text-stone-500 mb-1"><span>Conservative</span><span>Aggressive</span></div><input type="range" className="w-full h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer" /></div>
                            <div><div className="flex justify-between text-[10px] uppercase font-bold text-stone-500 mb-1"><span>Strategic (Long Term)</span><span>Tactical (Immediate)</span></div><input type="range" className="w-full h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer" /></div>
                        </div>
                    </div>
                    <div className="pt-2">
                        <label className="text-xs font-bold text-stone-700 block mb-2 uppercase tracking-wide">Additional Artifacts</label>
                        <div className="flex flex-wrap gap-2">{['Executive Memo', 'Risk Matrix', 'Partner Shortlist', 'Financial Model (XLS)'].map(art => (<span key={art} className="px-3 py-1 bg-stone-100 border border-stone-200 rounded-full text-[10px] font-bold text-stone-600 cursor-pointer hover:bg-stone-200">+ {art}</span>))}</div>
                    </div>
                </div>
            </div>
        </div>
    );

    const handleGenerateReportWithOrchestrator = async () => {
        onGenerate();
        try {
            const results = await MultiAgentOrchestrator.synthesizeAnalysis({
                organizationProfile: params,
                query: params.problemStatement || "General Strategic Analysis",
                dataScope: 'comprehensive',
                includeCustomData: false
            });
            setOrchestratorResults(results);
        } catch (error) {
            console.error("Orchestration failed:", error);
        }
    };

    const renderStep6_Synthesis = () => (
        <div className="h-full flex flex-col items-center justify-center text-center p-4 md:p-12">
            {isGenerating && generationPhase !== 'complete' ? (
                <>
                    <div className="w-20 h-20 border-4 border-stone-200 border-t-stone-900 rounded-full animate-spin mb-8"></div>
                    <h3 className="text-2xl font-serif font-bold text-stone-900 mb-2">Synthesizing Dossier</h3>
                    <p className="text-stone-500 font-mono text-sm uppercase tracking-widest mb-8">{generationPhase} phase... {generationProgress}%</p>
                    <div className="w-96 h-1 bg-stone-200 rounded-full overflow-hidden"><div className="h-full bg-stone-900 transition-all duration-300" style={{width: `${generationProgress}%`}}></div></div>
                </>
            ) : (
                <div className="w-full max-w-6xl text-left h-full flex flex-col">
                    <div className="flex justify-between items-end border-b border-stone-200 pb-2 mb-6 shrink-0">
                        <div>
                            <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-50 text-green-700 rounded-full text-xs font-bold uppercase tracking-widest mb-3 border border-green-100"><CheckCircle2 size={14} /> Intelligence Ready</div>
                            <h1 className="text-3xl font-serif font-bold text-stone-900">Strategic Intelligence Hub</h1>
                            <p className="text-stone-500 mt-1">Prepared for {params.organizationName} targeting {params.country}</p>
                        </div>
                        <div className="flex gap-2">
                            <button onClick={() => setResultTab('dossier')} className={`px-4 py-2 text-sm font-bold rounded-t-lg transition-colors ${resultTab === 'dossier' ? 'bg-stone-900 text-white' : 'bg-stone-100 text-stone-500 hover:bg-stone-200'}`}>Executive Dossier</button>
                            <button onClick={() => setResultTab('simulation')} className={`px-4 py-2 text-sm font-bold rounded-t-lg transition-colors ${resultTab === 'simulation' ? 'bg-stone-900 text-white' : 'bg-stone-100 text-stone-500 hover:bg-stone-200'}`}>Strategic Simulation</button>
                            <button onClick={() => setResultTab('market')} className={`px-4 py-2 text-sm font-bold rounded-t-lg transition-colors ${resultTab === 'market' ? 'bg-stone-900 text-white' : 'bg-stone-100 text-stone-500 hover:bg-stone-200'}`}>Competitive Landscape</button>
                        </div>
                    </div>
                    <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
                        {resultTab === 'dossier' && (
                            <div className="space-y-8 animate-in fade-in">
                                <div className="bg-white border border-stone-200 p-6 rounded-xl shadow-sm flex justify-between items-center">
                                    <div className="text-sm text-stone-600"><strong>Actions:</strong></div>
                                    <div className="flex gap-3">
                                        <button onClick={() => window.print()} className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold rounded-lg text-xs transition-colors">Download PDF</button>
                                        <button onClick={() => setIsLetterModalOpen(true)} className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold rounded-lg text-xs transition-colors">Draft Outreach</button>
                                        <button onClick={() => setIsComparativeModalOpen(true)} className="px-4 py-2 bg-purple-50 text-purple-900 border border-purple-200 font-bold rounded-lg text-xs hover:bg-purple-100 transition-colors flex items-center justify-center gap-2"><Scale size={14} /> Compare</button>
                                    </div>
                                </div>
                                {orchestratorResults && (
                                    <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-6 shadow-sm">
                                        <h3 className="text-lg font-bold text-indigo-900 mb-2 flex items-center gap-2"><BrainCircuit className="w-5 h-5" /> Nexus Agent Synthesis</h3>
                                        <p className="text-sm text-indigo-800 italic mb-4">{orchestratorResults.synthesis.primaryInsight}</p>
                                        <div className="grid md:grid-cols-2 gap-4 text-sm">
                                            <div className="bg-white p-3 rounded border border-indigo-100"><span className="font-bold text-indigo-700 block mb-1">Recommended Next Steps</span><ul className="list-disc pl-4 text-stone-600 space-y-1">{orchestratorResults.synthesis.recommendedNextSteps.map((step: string, i: number) => (<li key={i}>{step}</li>))}</ul></div>
                                            <div className="bg-white p-3 rounded border border-indigo-100"><span className="font-bold text-indigo-700 block mb-1">Data Gaps Identified</span><ul className="list-disc pl-4 text-stone-600 space-y-1">{orchestratorResults.synthesis.dataGaps.map((gap: string, i: number) => (<li key={i}>{gap}</li>))}</ul></div>
                                        </div>
                                    </div>
                                )}
                                {(params.selectedModules || []).includes('rocket_engine') && (<div className="bg-white rounded-xl shadow-sm border border-stone-200 overflow-hidden"><div className="p-4 bg-stone-50 border-b border-stone-200 font-bold text-stone-800 flex items-center gap-2"><RocketIcon className="w-5 h-5 text-orange-500" /> Nexus Rocket Engine Results</div><RocketEngineModule params={params} /></div>)}
                                {(params.selectedModules || []).includes('matchmaking') && (<div className="bg-white rounded-xl shadow-sm border border-stone-200 overflow-hidden"><div className="p-4 bg-stone-50 border-b border-stone-200 font-bold text-stone-800 flex items-center gap-2"><MatchMakerIcon className="w-5 h-5 text-blue-500" /> Strategic Partners</div><div className="p-6"><MatchmakingEngine params={params} autoRun={true} /></div></div>)}
                                {(params.selectedModules || []).includes('historical_precedents') && (<div className="bg-white rounded-xl shadow-sm border border-stone-200 overflow-hidden"><div className="p-4 bg-stone-50 border-b border-stone-200 font-bold text-stone-800 flex items-center gap-2"><History className="w-5 h-5 text-stone-600" /> Historical Context Engine</div><div className="p-6"><HistoricalContextComponent params={params} /></div></div>)}
                                {(params.selectedModules || []).includes('temporal_analysis') && (<div className="bg-white rounded-xl shadow-sm border border-stone-200 overflow-hidden"><div className="p-4 bg-stone-50 border-b border-stone-200 font-bold text-stone-800 flex items-center gap-2"><Clock className="w-5 h-5 text-cyan-600" /> Temporal Phase Analysis</div><div className="p-6"><TemporalAnalysisComponent params={params} /></div></div>)}
                            </div>
                        )}
                        {resultTab === 'simulation' && (<div className="h-[600px] animate-in slide-in-from-right-4"><ScenarioSimulator /></div>)}
                        {resultTab === 'market' && (<div className="h-[600px] animate-in slide-in-from-right-4"><CompetitorMap clientName={params.organizationName} /></div>)}
                    </div>
                </div>
            )}
        </div>
    );

    const LivePreview = () => (
        <div className="h-full flex flex-col bg-stone-100/50 p-8 overflow-y-auto">
            <div className="bg-white rounded-xl shadow-sm border border-stone-200 p-8 min-h-full">
                <div className="border-b border-stone-100 pb-6 mb-6">
                    <div className="flex items-center gap-2 mb-2"><div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div><span className="text-xs font-bold text-stone-400 uppercase tracking-wider">Live Dossier Preview</span></div>
                    <h2 className="text-3xl font-serif font-bold text-stone-900 leading-tight">{params.reportName || 'Untitled Strategic Dossier'}</h2>
                    {params.organizationName && (<p className="text-stone-500 mt-2 text-lg">for <span className="font-bold text-stone-800">{params.organizationName}</span></p>)}
                </div>
                <div className="space-y-8">
                    <div className="space-y-4">
                        <h3 className="text-sm font-bold text-stone-900 border-b border-stone-100 pb-2">1. Identity & Scope</h3>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                            <div><span className="block text-stone-400 text-xs uppercase mb-1">Target Jurisdiction</span><span className="font-medium text-stone-800">{params.country || 'Not Selected'}</span></div>
                            <div><span className="block text-stone-400 text-xs uppercase mb-1">Sector Focus</span><span className="font-medium text-stone-800">{params.industry[0] || 'Not Selected'}</span></div>
                            <div><span className="block text-stone-400 text-xs uppercase mb-1">Revenue Scale</span><span className="font-medium text-stone-800">{params.revenueBand || '-'}</span></div>
                            <div><span className="block text-stone-400 text-xs uppercase mb-1">User Role</span><span className="font-medium text-stone-800">{params.userDepartment || '-'}</span></div>
                        </div>
                    </div>
                    {step >= 2 && (<div className="space-y-4 animate-in fade-in slide-in-from-bottom-2"><h3 className="text-sm font-bold text-stone-900 border-b border-stone-100 pb-2">2. Strategic Mandate</h3><div className="bg-stone-50 p-4 rounded-lg border border-stone-100"><span className="block text-stone-400 text-xs uppercase mb-2">Problem Statement</span><p className="text-sm text-stone-700 italic leading-relaxed">"{params.problemStatement || 'Defining mission parameters...'}"</p></div><div className="flex flex-wrap gap-2">{(Array.isArray(params.strategicIntent) ? params.strategicIntent : [params.strategicIntent]).filter(Boolean).map((intent: string, i: number) => (<span key={i} className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded border border-blue-100 font-medium">{intent}</span>))}</div></div>)}
                    {step >= 3 && (<div className="space-y-4 animate-in fade-in slide-in-from-bottom-2"><h3 className="text-sm font-bold text-stone-900 border-b border-stone-100 pb-2">3. Operational Mechanics</h3><div className="grid grid-cols-2 gap-4 text-sm"><div className="p-3 bg-stone-50 rounded border border-stone-100"><span className="block text-stone-400 text-xs uppercase mb-1">Timeline</span><span className="font-bold text-stone-800">{params.expansionTimeline || '-'}</span></div><div className="p-3 bg-stone-50 rounded border border-stone-100"><span className="block text-stone-400 text-xs uppercase mb-1">Risk Profile</span><span className="font-bold text-stone-800 capitalize">{params.riskTolerance || '-'}</span></div></div></div>)}
                    {step >= 4 && (<div className="space-y-4 animate-in fade-in slide-in-from-bottom-2"><h3 className="text-sm font-bold text-stone-900 border-b border-stone-100 pb-2">4. Intelligence Architecture</h3><div><span className="block text-stone-400 text-xs uppercase mb-2">Active Agents</span><div className="flex flex-wrap gap-2">{(params.selectedAgents || []).map((agent: string) => (<span key={agent} className="px-2 py-1 bg-purple-50 text-purple-700 text-xs rounded border border-purple-100 flex items-center gap-1"><div className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse"></div>{agent}</span>))}</div></div></div>)}
                    {step >= 5 && (<div className="space-y-4 animate-in fade-in slide-in-from-bottom-2"><h3 className="text-sm font-bold text-stone-900 border-b border-stone-100 pb-2">5. Deliverable Config</h3><div className="flex gap-2"><span className="px-2 py-1 bg-stone-100 text-stone-600 text-xs rounded border border-stone-200">{params.outputFormat}</span><span className="px-2 py-1 bg-stone-100 text-stone-600 text-xs rounded border border-stone-200">{params.reportLength}</span></div></div>)}
                </div>
            </div>
        </div>
    );

    return (
        <div className="flex-1 w-full flex h-full bg-stone-50 font-sans text-stone-900 min-w-0">
            <div className={`flex-1 flex flex-col border-r border-stone-200 bg-stone-50/30 transition-all duration-500 ${step === 6 ? 'w-0 opacity-0 hidden' : 'w-[60%] p-8 overflow-y-auto'}`}>
                <div className="max-w-3xl mx-auto w-full">
                    <div className="mb-8">
                        <button onClick={() => setStep(Math.max(1, step - 1) as any)} disabled={step === 1} className="text-stone-400 hover:text-stone-800 mb-4 flex items-center gap-1 text-xs font-bold uppercase tracking-wider disabled:opacity-0 transition-opacity"><ChevronLeft size={14} /> Back</button>
                        <h1 className="text-3xl font-serif font-bold text-stone-900 mb-2">{step === 1 && "Establish Organization DNA"}{step === 2 && "Strategic Mandate"}{step === 3 && "Operational Mechanics"}{step === 4 && "Intelligence Architecture"}{step === 5 && "Output Configuration"}</h1>
                        <p className="text-stone-500 text-sm">{step === 1 && "Deep entity profiling: define scale, authority, and identity."}{step === 2 && "Define specific mission vectors, priorities, and success metrics."}{step === 3 && "Calibrate risk, procurement, and financial constraints."}{step === 4 && "Select specific AI agents and mathematical engines to deploy."}{step === 5 && "Customize the format, tone, and depth of your intelligence dossier."}</p>
                    </div>
                    <div className="flex items-center space-x-2 mb-8">{[1, 2, 3, 4, 5, 6].map(num => (<React.Fragment key={num}><div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${step === num ? 'bg-stone-900 text-white shadow-md scale-110' : step > num ? 'bg-green-500 text-white' : 'bg-stone-200 text-stone-500'}`}>{step > num ? <CheckCircle2 size={14} /> : num}</div>{num < 6 && <div className={`h-1 w-8 rounded-full ${step > num ? 'bg-green-500' : 'bg-stone-200'}`} />} </React.Fragment>))}</div>
                    <div className="min-h-[400px]">
                        {step === 1 && renderStep1_Profile()}
                        {step === 2 && renderStep2_Mandate()}
                        {step === 3 && renderStep3_Calibration()}
                        {step === 4 && renderStep4_Architecture()}
                        {step === 5 && renderStep5_Output()}
                    </div>
                    <div className="mt-8 pt-8 border-t border-stone-200 flex justify-end">
                        {step < 5 ? (
                            <button onClick={() => setStep(step + 1 as any)} disabled={!params.organizationName || (step === 2 && !params.country)} className="px-8 py-3 bg-stone-900 text-white font-bold rounded-lg hover:bg-black transition-all shadow-lg flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed">Next Step <ArrowRight size={16} /></button>
                        ) : (
                            <button onClick={handleGenerateReportWithOrchestrator} className="px-10 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-xl hover:shadow-xl transition-all flex items-center gap-2 transform hover:-translate-y-1"><Play size={20} fill="currentColor" /> Initialize Nexus Core</button>
                        )}
                    </div>
                </div>
            </div>
            <div className={`flex flex-col bg-white transition-all duration-500 ${step === 6 ? 'w-full' : 'w-[40%] shadow-xl'}`}>
                {step < 6 ? <LivePreview /> : renderStep6_Synthesis()}
            </div>
            <AddOpportunityModal isOpen={isOpportunityModalOpen} onClose={() => setIsOpportunityModalOpen(false)} onSave={handleSaveOpportunity} />
            {isAnalysisModalOpen && params.activeOpportunity && (<AnalysisModal item={params.activeOpportunity} region={params.country || 'Global'} onClose={() => setIsAnalysisModalOpen(false)} />)}
            {isComparativeModalOpen && (<ComparativeAnalysis reports={reports} onClose={() => setIsComparativeModalOpen(false)} />)}
            <LetterGeneratorModal isOpen={isLetterModalOpen} onClose={() => setIsLetterModalOpen(false)} onGenerate={async (content) => { return new Promise(resolve => setTimeout(() => resolve(`To Whom It May Concern,\n\n regarding ${params.organizationName}...`), 1000)); }} reportContent={Object.values(reportData).map((s) => (s as ReportSection).content).join('\n')} reportParameters={params} />
            {activeModuleConfig && (
                <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center backdrop-blur-sm p-4">
                    <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-md animate-in fade-in zoom-in-95">
                        <h3 className="text-lg font-bold text-stone-900 mb-4">Configure {ENGINE_CATALOG.find(e => e.id === activeModuleConfig)?.label}</h3>
                        <div className="space-y-4"><div><label className="text-xs font-bold text-stone-500 uppercase">Specific Focus / Context</label><textarea className="w-full mt-1 p-3 border border-stone-200 rounded-lg text-sm h-24 resize-none" placeholder="E.g., Focus specifically on port infrastructure assets..." /></div><div className="flex justify-end gap-2"><button onClick={() => setActiveModuleConfig(null)} className="px-4 py-2 text-stone-500 font-bold text-sm">Cancel</button><button onClick={() => setActiveModuleConfig(null)} className="px-4 py-2 bg-stone-900 text-white font-bold text-sm rounded-lg">Save Config</button></div></div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MainCanvas;
