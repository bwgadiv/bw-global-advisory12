import React, { useState } from 'react';
import { NeuroSymbolicState, DynamicFormula } from '../types';
import { NeuroSymbolicEngine } from '../services/ruleEngine';
import { Calculator, Play, Save, Trash2, Plus } from 'lucide-react';

interface FormulaBuilderProps {
    state: NeuroSymbolicState;
    onUpdate: (newState: NeuroSymbolicState) => void;
}

export const FormulaBuilder: React.FC<FormulaBuilderProps> = ({ state, onUpdate }) => {
    const [name, setName] = useState('');
    const [expression, setExpression] = useState('');
    const [testResult, setTestResult] = useState<string | number | null>(null);

    const handleTest = () => {
        const tempFormula: DynamicFormula = {
            id: 'temp',
            name: 'Test',
            expression: expression,
            variables: []
        };
        const result = NeuroSymbolicEngine.evaluateFormula(tempFormula, state.variableStore);
        setTestResult(result);
    };

    const handleSave = () => {
        if (!name || !expression) return;
        const newState = NeuroSymbolicEngine.createFormula(name, expression, state);
        onUpdate(newState);
        setName('');
        setExpression('');
        setTestResult(null);
    };

    const handleDelete = (id: string) => {
        onUpdate({
            ...state,
            formulas: state.formulas.filter(f => f.id !== id)
        });
    };

    return (
        <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm space-y-6">
            <div className="flex items-center gap-3 border-b border-stone-100 pb-4">
                <div className="bg-purple-100 p-2 rounded-lg text-purple-700">
                    <Calculator className="w-5 h-5" />
                </div>
                <div>
                    <h3 className="font-bold text-stone-900">Dynamic Logic Engine</h3>
                    <p className="text-xs text-stone-500">Define custom formulas for the Nexus Brain to evaluate.</p>
                </div>
            </div>

            {/* Builder Input */}
            <div className="bg-stone-50 p-4 rounded-lg border border-stone-200 space-y-3">
                <div>
                    <label className="text-xs font-bold text-stone-600 uppercase">Rule Name</label>
                    <input 
                        className="w-full p-2 text-sm border border-stone-300 rounded focus:ring-2 focus:ring-purple-500 outline-none"
                        placeholder="e.g. Risk Weighted Revenue"
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                </div>
                <div>
                    <label className="text-xs font-bold text-stone-600 uppercase">Expression</label>
                    <div className="flex gap-2">
                        <input 
                            className="w-full p-2 text-sm border border-stone-300 rounded focus:ring-2 focus:ring-purple-500 outline-none font-mono"
                            placeholder="e.g. revenue_score * 1.5 - risk_score"
                            value={expression}
                            onChange={e => setExpression(e.target.value)}
                        />
                        <button 
                            onClick={handleTest}
                            className="px-3 bg-stone-200 hover:bg-stone-300 rounded text-stone-600 font-bold text-xs"
                            title="Test Calculation"
                        >
                            <Play className="w-4 h-4" />
                        </button>
                    </div>
                    <div className="mt-1 text-[10px] text-stone-400">
                        Available variables: {Object.keys(state.variableStore).join(', ')}
                    </div>
                </div>
                
                {testResult !== null && (
                    <div className="bg-white p-2 rounded border border-stone-200 text-xs font-mono flex justify-between items-center">
                        <span className="text-stone-500">Result:</span>
                        <span className="font-bold text-purple-700">{testResult}</span>
                    </div>
                )}

                <button 
                    onClick={handleSave}
                    disabled={!name || !expression}
                    className="w-full py-2 bg-purple-600 hover:bg-purple-700 text-white rounded font-bold text-xs flex items-center justify-center gap-2 disabled:opacity-50 transition-colors"
                >
                    <Save className="w-3 h-3" /> Save Rule to Engine
                </button>
            </div>

            {/* Existing Formulas */}
            <div>
                <h4 className="text-xs font-bold text-stone-500 uppercase mb-2">Active Logic Rules</h4>
                <div className="space-y-2">
                    {state.formulas.map(f => {
                        const currentVal = NeuroSymbolicEngine.evaluateFormula(f, state.variableStore);
                        return (
                            <div key={f.id} className="flex items-center justify-between p-3 bg-white border border-stone-200 rounded-lg hover:border-purple-200 transition-colors group">
                                <div>
                                    <div className="font-bold text-sm text-stone-800">{f.name}</div>
                                    <div className="text-[10px] font-mono text-stone-500">{f.expression}</div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="text-xs font-bold bg-stone-100 px-2 py-1 rounded text-stone-600">{currentVal}</span>
                                    {!f.isSystem && (
                                        <button 
                                            onClick={() => handleDelete(f.id)}
                                            className="text-stone-300 hover:text-red-500 transition-colors"
                                        >
                                            <Trash2 className="w-3 h-3" />
                                        </button>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};
