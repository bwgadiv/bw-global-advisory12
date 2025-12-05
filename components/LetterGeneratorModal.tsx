import React, { useState, useEffect, useCallback, useMemo } from 'react';
import useEscapeKey from '../hooks/useEscapeKey';
import { X, Mail, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { ReportParameters } from '../types';
import { PrecedentMatchingEngine } from '../services/historicalDataEngine';

interface LetterGeneratorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onGenerate: (reportContent: string, reportParameters: any) => Promise<string>;
  reportContent: string;
  reportParameters: any;
}

export const LetterGeneratorModal: React.FC<LetterGeneratorModalProps> = ({ 
  isOpen, 
  onClose, 
  onGenerate, 
  reportContent, 
  reportParameters 
}) => {
  useEscapeKey(onClose);
  const [letterContent, setLetterContent] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copySuccess, setCopySuccess] = useState('');
  const [letterType, setLetterType] = useState<'formal' | 'precedent_based' | 'strategic'>('precedent_based');

  // Generate precedent-based letter content
  const generatePrecedentBasedLetter = useCallback((): string => {
    const precedents = PrecedentMatchingEngine.findMatches(reportParameters as ReportParameters, 0.65);
    const bestMatch = precedents[0];
    const caseStudy = bestMatch?.historicalCase;

    if (!caseStudy) {
      return generateFormalLetter();
    }

    const today = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    const orgName = reportParameters.organizationName || 'Our Organization';
    const country = reportParameters.country || 'your target market';
    const successFactors = bestMatch.applicableFactors.successFactors.slice(0, 3);
    const roiAchieved = caseStudy.outcomes.roiAchieved ? `${caseStudy.outcomes.roiAchieved}x ROI` : 'significant value creation';

    return `
${today}

To Whom It May Concern,

STRATEGIC OPPORTUNITY: Investment Partnership in ${country}

${orgName} is exploring strategic expansion opportunities in ${country} and would value your partnership in this initiative. Our analysis suggests remarkable alignment with successful historical precedents.

EVIDENCE-BASED FOUNDATION:
Our due diligence team has analyzed historical investment patterns across 30 years and identified a particularly relevant precedent: the ${caseStudy.id} in ${caseStudy.country} (${caseStudy.year}).

That initiative achieved:
• ${caseStudy.outcomes.jobsCreated?.toLocaleString() || 'Significant'} jobs created
• ${roiAchieved}
• ${caseStudy.outcomes.result === 'success' ? 'Sustainable, long-term operations' : 'Important lessons for success'}

APPLICABLE SUCCESS FACTORS:
Based on this historical precedent, we identify these as critical to your engagement:
${successFactors.map((f, i) => `${i + 1}. ${f}`).join('\n')}

STRATEGIC ALIGNMENT:
Your organization's profile (${reportParameters.revenueBand || 'substantial'} revenue scale, ${reportParameters.decisionAuthority || 'executive'} decision authority) aligns exceptionally well with organizations that succeed in this phase of market development.

PROPOSED ENGAGEMENT:
We propose a phased partnership:
• Phase 1 (Months 1-3): Strategic partnership framework and regulatory pathway
• Phase 2 (Months 4-12): Operational launch and initial market entry
• Phase 3 (Months 13+): Scaling and optimization based on historical timelines

TIMELINE & NEXT STEPS:
We recommend an initial exploratory meeting within the next 30 days to:
✓ Validate market assumptions from our precedent analysis
✓ Discuss government partnership opportunities
✓ Outline resource requirements and ROI projections

Our analysis indicates that organizations that engage within this timeframe achieve their investment milestones ahead of schedule.

CONFIDENCE & SUPPORT:
With ${Math.round(bestMatch.similarity.overall)}% similarity to successful precedent, we approach this partnership with high confidence. Our team has deep expertise in implementing the identified success factors.

We look forward to partnering with you on this strategic opportunity.

Best regards,

[Your Name]
${orgName}
[Your Title]
[Your Contact Information]

---
This letter is grounded in historical evidence analysis of ${precedents.length} similar investment cases.
Confidence Level: ${bestMatch.confidenceLevel.toUpperCase()}
`;
  }, [reportParameters]);

  const generateFormalLetter = (): string => {
    const today = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    const orgName = reportParameters.organizationName || 'Our Organization';
    const country = reportParameters.country || 'your target market';

    return `
${today}

To Whom It May Concern,

PARTNERSHIP OPPORTUNITY: Strategic Investment in ${country}

${orgName} is exploring partnership opportunities in ${country} and believes your organization would be an excellent match for this initiative.

OPPORTUNITY OVERVIEW:
We are seeking to establish operations in ${country} with the strategic intent to ${reportParameters.strategicIntent || 'expand our market presence'}. This represents a significant opportunity for mutual value creation.

KEY CONSIDERATIONS:
• Target Region: ${country}
• Investment Scale: ${reportParameters.calibration?.constraints?.budgetCap || 'TBD'}
• Target Partners: ${reportParameters.targetCounterpartType || 'Strategic partners'}
• Timeline: ${reportParameters.expansionTimeline || '18-24 months'} to positive ROI

NEXT STEPS:
We would like to propose an initial meeting to discuss:
1. Your organization's capabilities and interest in this market
2. Potential areas of collaboration and partnership structure
3. Commercial terms and mutual value creation

We anticipate reaching a framework agreement within 60 days.

ENGAGEMENT:
Please respond to indicate your availability for a call or meeting within the next two weeks.

Best regards,

[Your Name]
${orgName}
[Your Title]
[Your Contact Information]
`;
  };

  // Generate content based on letter type
  const generateLetterContent = useCallback(async () => {
    setIsGenerating(true);
    setError(null);
    setCopySuccess('');

    try {
      let content = '';

      if (letterType === 'precedent_based') {
        content = generatePrecedentBasedLetter();
      } else if (letterType === 'formal') {
        content = generateFormalLetter();
      } else {
        // Strategic letter with detailed roadmap
        const precedents = PrecedentMatchingEngine.findMatches(reportParameters as ReportParameters, 0.65);
        const bestMatch = precedents[0];
        content = generatePrecedentBasedLetter(); // Use same as precedent_based for now
      }

      setLetterContent(content);
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred.';
      setError(`Failed to generate letter: ${errorMessage}`);
    } finally {
      setIsGenerating(false);
    }
  }, [letterType, generatePrecedentBasedLetter]);

  useEffect(() => {
    if (isOpen) {
      generateLetterContent();
    }
  }, [isOpen, letterType, generateLetterContent]);

  const handleCopyToClipboard = () => {
    if (!letterContent) return;
    navigator.clipboard.writeText(letterContent).then(() => {
      setCopySuccess('Copied to clipboard!');
      setTimeout(() => setCopySuccess(''), 2000);
    }, (err) => {
      setCopySuccess('Failed to copy.');
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div 
        className="bg-white border border-stone-200 rounded-xl shadow-2xl w-full max-w-3xl h-[90vh] flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        <header className="p-6 border-b border-stone-200 flex-shrink-0">
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center gap-3">
              <Mail className="w-8 h-8 text-blue-600" />
              <div>
                <h2 className="text-xl font-bold text-stone-900">Strategic Outreach Letter</h2>
                <p className="text-sm text-stone-500">Evidence-based partnership letter with historical precedent</p>
              </div>
            </div>
            <button onClick={onClose} className="p-1 text-stone-500 hover:text-stone-900 transition">
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Letter Type Selector */}
          <div className="flex gap-2">
            {(['formal', 'precedent_based', 'strategic'] as const).map((type) => (
              <button
                key={type}
                onClick={() => setLetterType(type)}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg border transition-all ${
                  letterType === type
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                }`}
              >
                {type === 'formal' && 'Formal'}
                {type === 'precedent_based' && 'Precedent-Based'}
                {type === 'strategic' && 'Strategic Roadmap'}
              </button>
            ))}
          </div>
        </header>

        <main className="flex-grow overflow-y-auto p-6">
          {isGenerating && (
            <div className="flex flex-col items-center justify-center h-full text-stone-500">
              <Loader2 className="animate-spin w-8 h-8 mb-4 text-blue-600" />
              <p className="font-semibold">Generating {letterType === 'precedent_based' ? 'precedent-based' : letterType} letter...</p>
              <p className="text-xs text-stone-400 mt-2">Using historical case analysis</p>
            </div>
          )}
          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-red-900">Error</p>
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          )}
          {!isGenerating && !error && letterContent && (
            <textarea
              readOnly
              value={letterContent}
              className="w-full h-full p-4 bg-stone-50 border border-stone-300 rounded-lg text-stone-800 font-sans text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Letter content will appear here..."
            />
          )}
        </main>

        <footer className="p-6 border-t border-stone-200 flex-shrink-0 flex justify-between items-center gap-4">
          <div className="flex items-center gap-2 text-xs text-stone-500">
            {letterType === 'precedent_based' && (
              <>
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span>Based on historical precedent analysis</span>
              </>
            )}
          </div>
          <div className="flex items-center gap-3">
            {copySuccess && (
              <span className="text-sm text-green-600 font-semibold flex items-center gap-1">
                <CheckCircle className="w-4 h-4" /> {copySuccess}
              </span>
            )}
            <button
              onClick={handleCopyToClipboard}
              disabled={isGenerating || !letterContent}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-bold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Copy Letter
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-stone-200 text-stone-800 rounded-lg hover:bg-stone-300 transition-colors text-sm font-bold"
            >
              Close
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
};