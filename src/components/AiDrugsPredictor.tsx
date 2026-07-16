import React, { useState } from 'react';
import { Sparkles, AlertTriangle, ShieldCheck, HelpCircle, Loader2, RefreshCw, ArrowRight, Activity, Layers, CornerDownRight } from 'lucide-react';
import { emergencyProfile } from '../data';

interface PredictionResponse {
  safetyRating: 'SAFE' | 'WARNING' | 'CONTRAINDICATED';
  predictionSummary: string;
  interactions?: {
    severity: string;
    description: string;
    mechanism?: string;
  }[];
  allergyRisk: {
    hasRisk: boolean;
    description?: string;
  };
  conditionRisk: {
    hasRisk: boolean;
    description?: string;
  };
  alternatives: {
    name: string;
    reason: string;
  }[];
}

export default function AiDrugsPredictor() {
  const [newMedication, setNewMedication] = useState('');
  const [loading, setLoading] = useState(false);
  const [prediction, setPrediction] = useState<PredictionResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Quick test configurations with explicit expected clinical safety outcomes
  const quickTests = [
    { 
      name: 'Amoxicillin', 
      description: 'Tests direct Penicillin allergy cross-reactivity.',
      expectedOutcome: 'ALLERGY RISK', 
      type: 'allergy' 
    },
    { 
      name: 'Propranolol', 
      description: 'Tests bronchial Asthma beta-blocker restriction.', 
      expectedOutcome: 'CONTRAINDICATED', 
      type: 'contraindicated' 
    },
    { 
      name: 'Ibuprofen', 
      description: 'Tests Lisinopril drug interaction & Asthma sensitivity.', 
      expectedOutcome: 'WARNING', 
      type: 'warning' 
    },
    { 
      name: 'Atorvastatin', 
      description: 'Tests standard clinically compatible therapy.', 
      expectedOutcome: 'SAFE', 
      type: 'safe' 
    },
  ];

  const handlePredict = async (medName: string) => {
    const medToPredict = medName || newMedication;
    if (!medToPredict.trim()) return;

    setLoading(true);
    setError(null);
    setPrediction(null);

    // If clicking quick test, sync input field
    if (medName) {
      setNewMedication(medName);
    }

    try {
      const response = await fetch('/api/predict-drug', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          newMedication: medToPredict,
          allergies: emergencyProfile.allergies,
          chronicConditions: emergencyProfile.conditions,
          currentMedications: emergencyProfile.medications.map(m => m.name),
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch AI safety analysis.');
      }

      const data = await response.json();
      setPrediction(data);
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'The drug prediction service is temporarily unavailable.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-50 min-h-[calc(100vh-140px)] py-6 px-4 md:px-8 animate-fade-in" id="ai-drugs-predictor-view">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header Section */}
        <div className="space-y-1">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 flex items-center space-x-2">
            <Sparkles className="h-6 w-6 text-teal-600 animate-pulse" />
            <span>AI Drug Interaction & Safety Predictor</span>
          </h2>
          <p className="text-xs text-slate-500">
            Real-time cross-referencing of newly prescribed compounds with the patient's verified allergies, conditions, and active pharmaceutical ledger.
          </p>
        </div>

        {/* Clinical Context Sidebar / Header Bar */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
          <h3 className="font-bold text-xs text-slate-900 uppercase tracking-widest font-mono mb-3">Verified Active Patient Profile</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            {/* Current Medications */}
            <div className="space-y-2 border-slate-100 md:border-r md:pr-4">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Current Prescriptions</span>
              <div className="space-y-1">
                {emergencyProfile.medications.map((m, idx) => (
                  <div key={idx} className="flex items-center space-x-2 text-xs text-slate-700">
                    <span className="h-1.5 w-1.5 rounded-full bg-teal-500 shrink-0" />
                    <span><b>{m.name}</b> {m.dose} ({m.freq})</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Active Allergies */}
            <div className="space-y-2 border-slate-100 md:border-r md:pr-4 md:pl-2">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Documented Allergies</span>
              <div className="flex flex-wrap gap-1">
                {emergencyProfile.allergies.map((a, idx) => (
                  <span key={idx} className="px-2 py-0.5 bg-rose-50 border border-rose-100 text-rose-700 font-bold text-[10px] rounded">
                    {a}
                  </span>
                ))}
              </div>
            </div>

            {/* Chronic Diagnoses */}
            <div className="space-y-2 md:pl-2">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Chronic Diagnosis / Conditions</span>
              <div className="flex flex-wrap gap-1">
                {emergencyProfile.conditions.map((c, idx) => (
                  <span key={idx} className="px-2 py-0.5 bg-slate-100 border border-slate-150 text-slate-700 font-bold text-[10px] rounded">
                    {c}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Form & Quick Test Panel */}
          <div className="lg:col-span-5 space-y-6 text-left">
            {/* Interactive Prescribing form */}
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
              <h3 className="font-bold text-slate-900 text-sm">Enter Candidate Medication</h3>
              
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-400 uppercase block">Chemical Compound / Drug Name</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="e.g. Amoxicillin, Ibuprofen, Propranolol, Atorvastatin..."
                    value={newMedication}
                    onChange={(e) => setNewMedication(e.target.value)}
                    className="flex-1 bg-slate-50 border border-slate-250 rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-teal-500 text-slate-800 font-sans font-medium"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handlePredict('');
                    }}
                  />
                  <button
                    onClick={() => handlePredict('')}
                    disabled={loading || !newMedication.trim()}
                    className="px-4 py-2.5 bg-teal-600 hover:bg-teal-500 disabled:bg-slate-200 text-white disabled:text-slate-400 font-bold text-xs rounded-xl transition-all shadow-md shadow-teal-600/10 active:scale-95 flex items-center justify-center space-x-1 cursor-pointer select-none"
                  >
                    {loading ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <span>Analyze</span>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Prescriptions Test Matrix */}
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-3">
              <h4 className="font-bold text-xs text-slate-400 uppercase tracking-widest font-mono">Quick Safety Demo Prescriptions</h4>
              <p className="text-[11px] text-slate-500">
                Click any pre-configured chemical to test how the AI evaluation handles allergies, drug interactions, and chronic condition rules instantly.
              </p>
              
              <div className="space-y-2 pt-1">
                {quickTests.map((qt, idx) => (
                  <button
                    key={idx}
                    disabled={loading}
                    onClick={() => handlePredict(qt.name)}
                    className="w-full p-3 bg-slate-50 border border-slate-200 hover:border-teal-500 hover:bg-teal-50/20 text-left rounded-xl transition-all group flex items-center justify-between cursor-pointer active:scale-[0.99]"
                  >
                    <div className="space-y-1 pr-2">
                      <div className="flex items-center space-x-2">
                        <span className="font-bold text-xs text-slate-800 group-hover:text-teal-700 transition-colors">{qt.name}</span>
                        <span className={`px-1.5 py-0.5 text-[8px] font-black uppercase tracking-wider rounded border ${
                          qt.type === 'safe'
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                            : qt.type === 'warning'
                            ? 'bg-amber-50 text-amber-700 border-amber-200'
                            : 'bg-rose-50 text-rose-700 border-rose-200'
                        }`}>
                          {qt.expectedOutcome}
                        </span>
                      </div>
                      <p className="text-[10px] text-slate-400 font-medium leading-tight">{qt.description}</p>
                    </div>
                    <ArrowRight className="h-4 w-4 text-slate-350 group-hover:text-teal-600 transition-colors transform group-hover:translate-x-0.5 shrink-0" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* AI Output / Results Panel */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {loading && (
              <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center shadow-sm flex flex-col items-center justify-center space-y-4 min-h-[300px]">
                <div className="p-4 bg-teal-50 rounded-full animate-pulse border border-teal-100">
                  <Loader2 className="h-8 w-8 text-teal-600 animate-spin" />
                </div>
                <div className="space-y-1.5">
                  <h4 className="font-bold text-slate-900 text-sm">Grounded Pharmacological Analysis Active</h4>
                  <p className="text-xs text-slate-400 max-w-sm mx-auto leading-relaxed">
                    Querying model and cross-checking FDA guidelines for drug interactions, pediatric/adult allergy profiles, and chronic broncho-pulmonary asthma contraindications...
                  </p>
                </div>
              </div>
            )}

            {error && (
              <div className="bg-rose-50 border border-rose-200 rounded-2xl p-6 text-slate-800 space-y-2">
                <AlertTriangle className="h-6 w-6 text-rose-600" />
                <h4 className="font-bold text-sm text-rose-950">Safety Check Execution Failed</h4>
                <p className="text-xs text-rose-700">{error}</p>
                <button
                  onClick={() => handlePredict('')}
                  className="mt-2 inline-flex items-center space-x-1.5 px-3 py-1.5 bg-rose-100 hover:bg-rose-200 text-rose-800 text-xs font-bold rounded-xl transition-all cursor-pointer"
                >
                  <RefreshCw className="h-3.5 w-3.5" />
                  <span>Retry Safety Run</span>
                </button>
              </div>
            )}

            {!loading && !error && !prediction && (
              <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center shadow-sm flex flex-col items-center justify-center space-y-3 min-h-[300px]">
                <HelpCircle className="h-10 w-10 text-slate-300" />
                <div className="space-y-1">
                  <h4 className="font-bold text-slate-750 text-sm">Awaiting Prescription Entry</h4>
                  <p className="text-xs text-slate-400 max-w-xs mx-auto">
                    Select a quick test drug or type a custom pharmaceutical compound to start the AI clinical evaluation engine.
                  </p>
                </div>
              </div>
            )}

            {!loading && !error && prediction && (
              <div className="space-y-6 animate-slide-in">
                {/* Master Safety Scorecard */}
                <div className={`border rounded-2xl p-5 shadow-sm transition-all ${
                  prediction.safetyRating === 'SAFE'
                    ? 'bg-emerald-50/70 border-emerald-200 text-emerald-900 shadow-emerald-500/5'
                    : prediction.safetyRating === 'WARNING'
                    ? 'bg-amber-50/70 border-amber-200 text-amber-900 shadow-amber-500/5'
                    : 'bg-rose-50/70 border-rose-200 text-rose-900 shadow-rose-500/5'
                }`}>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start space-x-4">
                      <div className={`p-3 rounded-xl border shrink-0 mt-0.5 ${
                        prediction.safetyRating === 'SAFE'
                          ? 'bg-emerald-100 border-emerald-200 text-emerald-700'
                          : prediction.safetyRating === 'WARNING'
                          ? 'bg-amber-100 border-amber-200 text-amber-700'
                          : 'bg-rose-100 border-rose-200 text-rose-700'
                      }`}>
                        {prediction.safetyRating === 'SAFE' ? (
                          <ShieldCheck className="h-6 w-6" />
                        ) : (
                          <AlertTriangle className="h-6 w-6 animate-bounce" />
                        )}
                      </div>
                      <div className="space-y-1.5 text-left">
                        <span className="text-[10px] font-bold uppercase tracking-widest font-mono text-slate-400 block">AI CLINICAL DECISION MATRIX</span>
                        <h3 className="font-extrabold text-base tracking-tight flex items-center space-x-2">
                          <span>Prescription Check:</span>
                          <span className={`px-2.5 py-0.5 rounded-lg text-xs font-black uppercase border ${
                            prediction.safetyRating === 'SAFE'
                              ? 'bg-emerald-600 text-white border-emerald-700 shadow-sm'
                              : prediction.safetyRating === 'WARNING'
                              ? 'bg-amber-500 text-white border-amber-600 shadow-sm'
                              : 'bg-rose-600 text-white border-rose-700 shadow-sm animate-pulse'
                          }`}>
                            {prediction.safetyRating}
                          </span>
                        </h3>
                        <p className="text-xs leading-relaxed font-sans font-semibold text-slate-800 bg-white/70 p-3 rounded-xl border border-white/80 shadow-inner">
                          {prediction.predictionSummary}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Specific Risk Blocks */}
                <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
                  <h3 className="font-bold text-xs text-slate-900 uppercase tracking-widest font-mono border-b border-slate-100 pb-2">Safety Profile Audit</h3>
                  
                  <div className="space-y-4">
                    {/* Allergy Risk */}
                    <div className="flex items-start space-x-3 text-xs">
                      <div className={`p-1.5 rounded-lg shrink-0 mt-0.5 ${prediction.allergyRisk.hasRisk ? 'bg-rose-50 text-rose-600 border border-rose-100' : 'bg-slate-50 text-slate-450 border border-slate-100'}`}>
                        <AlertTriangle className="h-4 w-4" />
                      </div>
                      <div className="space-y-1">
                        <span className="font-bold text-slate-900 block">Allergic Reactivity Check</span>
                        <p className="text-slate-500">
                          {prediction.allergyRisk.hasRisk
                            ? prediction.allergyRisk.description
                            : 'No cross-reactivity risks detected with known allergen records (Penicillin, Latex, Peanuts).'}
                        </p>
                      </div>
                    </div>

                    {/* Condition Risk */}
                    <div className="flex items-start space-x-3 text-xs">
                      <div className={`p-1.5 rounded-lg shrink-0 mt-0.5 ${prediction.conditionRisk.hasRisk ? 'bg-rose-50 text-rose-600 border border-rose-100' : 'bg-slate-50 text-slate-450 border border-slate-100'}`}>
                        <Activity className="h-4 w-4" />
                      </div>
                      <div className="space-y-1">
                        <span className="font-bold text-slate-900 block">Chronic Conditions & Comorbidities</span>
                        <p className="text-slate-500">
                          {prediction.conditionRisk.hasRisk
                            ? prediction.conditionRisk.description
                            : 'This compound is highly compatible with the documented conditions (Type 2 Diabetes, Hypertension, Chronic Asthma).'}
                        </p>
                      </div>
                    </div>

                    {/* Drug-Drug Interactions */}
                    {prediction.interactions && prediction.interactions.length > 0 && (
                      <div className="space-y-3 pt-2 border-t border-slate-100">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block font-mono">Drug-Drug Clinical Contraindications</span>
                        
                        <div className="space-y-2">
                          {prediction.interactions.map((it, idx) => (
                            <div key={idx} className="bg-slate-50 border border-slate-150 rounded-xl p-3 text-xs space-y-1.5">
                              <div className="flex items-center justify-between">
                                <span className="font-bold text-slate-900">{it.description}</span>
                                <span className={`px-2 py-0.2 rounded font-mono text-[9px] font-black uppercase ${
                                  it.severity === 'HIGH'
                                    ? 'bg-rose-50 text-rose-700 border border-rose-150'
                                    : 'bg-amber-50 text-amber-700 border border-amber-150'
                                }`}>
                                  {it.severity} Severity
                                </span>
                              </div>
                              {it.mechanism && (
                                <p className="text-[11px] text-slate-500 flex items-start">
                                  <CornerDownRight className="h-3.5 w-3.5 mr-1 text-slate-400 shrink-0 mt-0.5" />
                                  <span>{it.mechanism}</span>
                                </p>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Safe Alternatives Recommendation Panel */}
                <div className="bg-teal-900 border border-teal-950 text-white rounded-2xl p-5 shadow-lg space-y-3.5">
                  <div className="flex items-center space-x-2">
                    <Layers className="h-4.5 w-4.5 text-teal-400 shrink-0" />
                    <h4 className="font-bold text-xs text-slate-250 uppercase tracking-wider">Clinically Suggested Safe Alternatives</h4>
                  </div>
                  
                  {prediction.alternatives && prediction.alternatives.length > 0 ? (
                    <div className="space-y-3">
                      {prediction.alternatives.map((alt, idx) => (
                        <div key={idx} className="bg-slate-950/40 border border-white/10 rounded-xl p-3 space-y-1">
                          <span className="text-teal-400 font-extrabold text-xs block">{alt.name}</span>
                          <p className="text-[11px] text-teal-150/90 leading-normal">{alt.reason}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-teal-200">
                      No pharmacological alternatives are required because the prescribed medication is evaluated as safe for the patient.
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
