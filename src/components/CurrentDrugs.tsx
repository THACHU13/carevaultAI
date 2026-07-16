import React, { useState } from 'react';
import { Pill, Activity, AlertTriangle, ShieldCheck, Plus, Trash2, Calendar, Clock, Heart } from 'lucide-react';
import { emergencyProfile } from '../data';

interface Medication {
  name: string;
  dose: string;
  freq: string;
  indication: string;
  prescribedDate: string;
  status: 'Active' | 'Discontinued';
}

export default function CurrentDrugs() {
  const [meds, setMeds] = useState<Medication[]>([
    {
      name: 'Metformin',
      dose: '500mg',
      freq: 'Twice daily (BID)',
      indication: 'Type 2 Diabetes Mellitus',
      prescribedDate: 'August 12, 2025',
      status: 'Active',
    },
    {
      name: 'Lisinopril',
      dose: '10mg',
      freq: 'Once daily (QD)',
      indication: 'Essential Hypertension',
      prescribedDate: 'September 04, 2025',
      status: 'Active',
    },
    {
      name: 'Albuterol Inhaler',
      dose: '90 mcg',
      freq: 'As needed (PRN)',
      indication: 'Chronic Bronchial Asthma',
      prescribedDate: 'May 18, 2025',
      status: 'Active',
    },
  ]);

  const [newMed, setNewMed] = useState({
    name: '',
    dose: '',
    freq: '',
    indication: '',
  });

  const [showAddForm, setShowAddForm] = useState(false);

  const suggestedSafeMeds = [
    {
      name: 'Amlodipine (Norvasc)',
      dose: '5mg',
      freq: 'Once daily (QD)',
      indication: 'Essential Hypertension',
      description: 'Calcium channel blocker. Zero airway resistance risk (unlike contraindicated beta-blockers) and Penicillin-free.',
    },
    {
      name: 'Montelukast (Singulair)',
      dose: '10mg',
      freq: 'Once daily at bedtime (QHS)',
      indication: 'Chronic Bronchial Asthma',
      description: 'Leukotriene inhibitor. Excellent daily controller for asthma, highly compatible with allergy profiles.',
    },
    {
      name: 'Sitagliptin (Januvia)',
      dose: '100mg',
      freq: 'Once daily (QD)',
      indication: 'Type 2 Diabetes Mellitus',
      description: 'DPP-4 inhibitor. Elevates glycemic management safely alongside Metformin without allergic cross-reactions.',
    }
  ];

  const handleAddMed = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMed.name || !newMed.dose) return;

    const added: Medication = {
      name: newMed.name,
      dose: newMed.dose,
      freq: newMed.freq || 'Once daily (QD)',
      indication: newMed.indication || 'Unspecified indication',
      prescribedDate: new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }),
      status: 'Active',
    };

    setMeds([...meds, added]);
    setNewMed({ name: '', dose: '', freq: '', indication: '' });
    setShowAddForm(false);
  };

  const handleQuickAddSuggested = (suggested: typeof suggestedSafeMeds[0]) => {
    // Avoid duplicates
    if (meds.some(m => m.name.toLowerCase().includes(suggested.name.split(' ')[0].toLowerCase()))) {
      return;
    }

    const added: Medication = {
      name: suggested.name,
      dose: suggested.dose,
      freq: suggested.freq,
      indication: suggested.indication,
      prescribedDate: new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }),
      status: 'Active',
    };

    setMeds([...meds, added]);
  };

  const removeMed = (index: number) => {
    setMeds(meds.filter((_, i) => i !== index));
  };

  return (
    <div className="bg-slate-50 min-h-[calc(100vh-140px)] py-6 px-4 md:px-8 animate-fade-in" id="current-drugs-view">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header Block */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="space-y-1">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 flex items-center space-x-2">
              <Pill className="h-6 w-6 text-teal-600" />
              <span>Current Drug Directory</span>
            </h2>
            <p className="text-xs text-slate-500">
              Active pharmacotherapy regimens for V Rahul. Synchronized across care nodes.
            </p>
          </div>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="self-start md:self-auto flex items-center space-x-1.5 px-4 py-2 bg-teal-600 hover:bg-teal-500 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-teal-600/10 active:scale-95 cursor-pointer"
          >
            <Plus className="h-4 w-4" />
            <span>{showAddForm ? 'Cancel Add' : 'Prescribe Medicine'}</span>
          </button>
        </div>

        {/* Info Banner */}
        <div className="p-4 bg-teal-50/60 border border-teal-150 rounded-2xl flex items-start space-x-3 text-teal-800 text-xs">
          <ShieldCheck className="h-5.5 w-5.5 text-teal-600 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold block text-teal-900">Verified Drug Ledger</span>
            This screen displays medications actively recorded in your EHR. The <b>AI Drugs Predictor</b> will evaluate newly suggested treatments against this exact active list.
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Drugs List */}
          <div className="lg:col-span-2 space-y-4">
            {showAddForm && (
              <form onSubmit={handleAddMed} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4 animate-slide-in">
                <h3 className="font-bold text-slate-900 text-sm">Add New Prescribed Medication</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase">Drug Name</label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. Lisinopril, Ibuprofen"
                      value={newMed.name}
                      onChange={(e) => setNewMed({ ...newMed, name: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-250 rounded-xl px-3.5 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-teal-500 text-slate-800 font-sans"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase">Dosage</label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. 10mg, 500mg, 2 puffs"
                      value={newMed.dose}
                      onChange={(e) => setNewMed({ ...newMed, dose: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-250 rounded-xl px-3.5 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-teal-500 text-slate-800 font-sans"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase">Frequency</label>
                    <input
                      type="text"
                      placeholder="e.g. Once daily, Twice daily, As needed"
                      value={newMed.freq}
                      onChange={(e) => setNewMed({ ...newMed, freq: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-250 rounded-xl px-3.5 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-teal-500 text-slate-800 font-sans"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase">Indication (Reason)</label>
                    <input
                      type="text"
                      placeholder="e.g. Hypertension, Infection"
                      value={newMed.indication}
                      onChange={(e) => setNewMed({ ...newMed, indication: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-250 rounded-xl px-3.5 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-teal-500 text-slate-800 font-sans"
                    />
                  </div>
                </div>
                <div className="flex justify-end pt-2">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-teal-600 hover:bg-teal-500 text-white rounded-xl text-xs font-bold transition-all shadow-md active:scale-95 cursor-pointer"
                  >
                    Add to Directory
                  </button>
                </div>
              </form>
            )}

            <div className="space-y-3">
              {meds.length === 0 ? (
                <div className="bg-white border border-slate-200 rounded-2xl p-8 text-center text-slate-400">
                  <Pill className="h-8 w-8 mx-auto mb-2 text-slate-300" />
                  No medications active in the directory.
                </div>
              ) : (
                meds.map((med, i) => (
                  <div
                    key={i}
                    className="bg-white border border-slate-200 rounded-2xl p-5 hover:border-slate-300 hover:shadow-sm transition-all flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
                  >
                    <div className="flex items-start space-x-4">
                      <div className="p-3 bg-teal-50 border border-teal-100 rounded-xl text-teal-600 shrink-0">
                        <Pill className="h-5.5 w-5.5" />
                      </div>
                      <div className="space-y-1 text-left">
                        <div className="flex items-center space-x-2">
                          <h4 className="font-extrabold text-sm text-slate-900">{med.name}</h4>
                          <span className="px-2 py-0.5 bg-green-50 border border-green-150 text-green-700 text-[9px] font-bold uppercase rounded">
                            {med.status}
                          </span>
                        </div>
                        <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs text-slate-500 font-sans font-medium">
                          <p className="flex items-center space-x-1">
                            <Clock className="h-3 w-3 text-slate-400" />
                            <span><b>Dose & Freq:</b> {med.dose} · {med.freq}</span>
                          </p>
                          <p className="flex items-center space-x-1">
                            <Heart className="h-3 w-3 text-slate-400" />
                            <span><b>Indication:</b> {med.indication}</span>
                          </p>
                          <p className="flex items-center space-x-1 col-span-2 mt-1 text-[10px] text-slate-400">
                            <Calendar className="h-3 w-3 text-slate-400" />
                            <span>Prescribed: {med.prescribedDate}</span>
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <button
                      onClick={() => removeMed(i)}
                      className="self-end sm:self-auto p-2 bg-slate-50 hover:bg-rose-50 text-slate-400 hover:text-rose-600 rounded-lg border border-slate-150 transition-all cursor-pointer"
                      title="Discontinue Medication"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))
              )}
            </div>

            {/* Suggested Safe Prescriptions Section */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
              <div className="flex items-center space-x-2">
                <ShieldCheck className="h-5 w-5 text-teal-600" />
                <h3 className="font-bold text-slate-900 text-sm">Suggested Clinically Safe Prescriptions</h3>
              </div>
              <p className="text-xs text-slate-500 leading-normal font-sans font-medium">
                These medications are highly compatible with V Rahul's documented allergies (Penicillin, Latex, Peanuts) and chronic conditions (Asthma, Diabetes, Hypertension). They are not currently in the patient's active prescriptions.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
                {suggestedSafeMeds.map((sm, index) => {
                  const isAlreadyAdded = meds.some(m => m.name.toLowerCase().includes(sm.name.split(' ')[0].toLowerCase()));
                  return (
                    <div
                      key={index}
                      className={`border rounded-xl p-4 flex flex-col justify-between space-y-3 transition-all ${
                        isAlreadyAdded
                          ? 'bg-slate-50/50 border-slate-150 opacity-60'
                          : 'bg-teal-50/20 border-teal-100 hover:border-teal-500 hover:shadow-sm'
                      }`}
                    >
                      <div className="space-y-1.5 text-left">
                        <div className="flex items-center justify-between">
                          <span className="font-extrabold text-xs text-slate-900">{sm.name}</span>
                          <span className="px-1.5 py-0.2 bg-teal-100 text-teal-800 text-[8px] font-black uppercase rounded">
                            {sm.dose}
                          </span>
                        </div>
                        <span className="text-[9px] font-bold text-teal-700 bg-teal-50 px-1.5 py-0.5 rounded-md inline-block">
                          {sm.indication}
                        </span>
                        <p className="text-[10px] text-slate-500 leading-normal font-sans font-medium">
                          {sm.description}
                        </p>
                      </div>

                      <button
                        type="button"
                        disabled={isAlreadyAdded}
                        onClick={() => handleQuickAddSuggested(sm)}
                        className={`w-full py-1.5 rounded-lg text-[10px] font-bold transition-all flex items-center justify-center space-x-1 cursor-pointer select-none ${
                          isAlreadyAdded
                            ? 'bg-slate-100 text-slate-400 border border-slate-200'
                            : 'bg-teal-600 hover:bg-teal-500 text-white shadow-sm shadow-teal-600/10 active:scale-97'
                        }`}
                      >
                        {isAlreadyAdded ? (
                          <span>Prescribed & Active</span>
                        ) : (
                          <>
                            <Plus className="h-3 w-3" />
                            <span>Add Prescription</span>
                          </>
                        )}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Sidebar Patient Context Summary card */}
          <div className="space-y-6 text-left">
            {/* Allergies and Chronic conditions widget */}
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
              <h3 className="font-bold text-xs text-slate-900 uppercase tracking-widest font-mono">Patient Clinical Safety Profile</h3>
              
              {/* Allergies */}
              <div className="space-y-2 border-b border-slate-100 pb-4">
                <span className="text-[10px] font-bold text-slate-400 uppercase block">Documented Allergies</span>
                <div className="flex flex-wrap gap-1.5">
                  {emergencyProfile.allergies.map((allergy, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 bg-rose-50 border border-rose-150 text-rose-700 font-extrabold text-[10px] rounded-lg flex items-center space-x-1.5"
                    >
                      <AlertTriangle className="h-3 w-3 text-rose-500 shrink-0" />
                      <span>{allergy}</span>
                    </span>
                  ))}
                </div>
              </div>

              {/* Conditions */}
              <div className="space-y-2">
                <span className="text-[10px] font-bold text-slate-400 uppercase block">Chronic Diagnosis & Diseases</span>
                <div className="flex flex-wrap gap-1.5">
                  {emergencyProfile.conditions.map((cond, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 bg-slate-100 border border-slate-200 text-slate-700 font-extrabold text-[10px] rounded-lg flex items-center space-x-1.5"
                    >
                      <Activity className="h-3 w-3 text-slate-500 shrink-0" />
                      <span>{cond}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Ingestion status card */}
            <div className="bg-slate-900 border border-slate-800 text-white rounded-2xl p-5 shadow-lg space-y-3.5">
              <div className="flex items-center space-x-2">
                <ShieldCheck className="h-4.5 w-4.5 text-teal-400" />
                <h4 className="font-bold text-xs text-slate-200 uppercase tracking-wider">Clinical Node Interop</h4>
              </div>
              <p className="text-xs text-slate-400 leading-normal font-sans font-medium">
                Active medication matching with Apollo Hospital, Quest Labs, and Apollo Pharmacy Network is configured over secure HL7 FHIR APIs.
              </p>
              <div className="text-[10px] font-mono font-medium text-emerald-400 bg-slate-950 p-2 rounded-xl border border-emerald-500/10 flex items-center justify-between">
                <span>INTEROP STATE:</span>
                <span className="font-extrabold flex items-center space-x-1">
                  <span className="h-1.5 w-1.5 bg-emerald-500 rounded-full animate-ping mr-1" />
                  SECURED LINK
                </span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
