import React, { useState } from 'react';
import { MedicalRecord } from '../types';
import { Upload, Link, AlertTriangle, Sparkles, ChevronLeft, ChevronRight, FileText, Shield, Heart, Plus, ShieldCheck, Activity, Users, Lock } from 'lucide-react';

interface DashboardProps {
  records: MedicalRecord[];
  isVerified: boolean;
  onUploadClick: () => void;
  onLinkHealthIdClick: () => void;
  onEmergencyClick: () => void;
  onSelectRecord: (record: MedicalRecord) => void;
}

const aiInsights = [
  {
    category: 'LATEST BLOODWORK',
    isNew: true,
    title: 'Lipid Profile Analysis',
    text: 'Cholesterol levels show a 12% improvement compared to Aug 2023. HDL remains within the optimal range.',
    actionText: 'Open Full Analysis'
  },
  {
    category: 'CARDIOLOGY',
    isNew: false,
    title: 'Annual ECG Trends',
    text: 'Stable sinus rhythm noted. No significant changes from baseline data. Exercise tolerance metrics are high.',
    actionText: 'Open Full Analysis'
  },
  {
    category: 'MEDICATION ADHERENCE',
    isNew: false,
    title: 'Prescription Review',
    text: 'Potential interaction detected between new supplement and Lisinopril. Consult Dr. Chen before intake.',
    actionText: 'Review Warning',
    warning: true
  }
];

export default function Dashboard({ records, isVerified, onUploadClick, onLinkHealthIdClick, onEmergencyClick, onSelectRecord }: DashboardProps) {
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [showQrModal, setShowQrModal] = useState(false);
  const [sugarStatus, setSugarStatus] = useState<'low' | 'moderate' | 'normal'>('normal');
  const [wbcStatus, setWbcStatus] = useState<'low' | 'moderate' | 'normal'>('normal');
  const [plateletsStatus, setPlateletsStatus] = useState<'low' | 'moderate' | 'normal'>('normal');

  // Dynamic computed array based on active selections
  const dynamicInsights = [
    // Sugar Insight
    sugarStatus === 'low' ? {
      category: 'SUGAR CRITICAL',
      isNew: true,
      title: 'Hypoglycemia Warning (Low Sugar)',
      text: 'Your blood glucose level is currently low at 65 mg/dL. Consume fast-acting carbohydrates (juice, honey, or glucose tablets) immediately.',
      actionText: 'Rescue Action Plan',
      warning: true
    } : sugarStatus === 'moderate' ? {
      category: 'SUGAR ELEVATED',
      isNew: true,
      title: 'Borderline High Blood Sugar',
      text: 'Your blood glucose level is elevated at 152 mg/dL. This is in the moderate pre-diabetic range. Limit simple carbohydrate intake.',
      actionText: 'View Dietary Plan'
    } : {
      category: 'SUGAR OPTIMAL',
      isNew: false,
      title: 'Glucose Levels Balanced',
      text: 'Your blood sugar is stable at 98 mg/dL. Metformin and diet adherence are highly effective. Keep maintaining a consistent glycemic index.',
      actionText: 'View Glycemic Index'
    },
    // WBC Insight
    wbcStatus === 'low' ? {
      category: 'IMMUNE CRITICAL',
      isNew: true,
      title: 'Leukopenia Alert (Low WBC)',
      text: 'WBC level is low at 2,900 /µL. This indicates a temporarily weakened immune response. Avoid crowded spaces and maintain rigorous hygiene.',
      actionText: 'Infection Precautions',
      warning: true
    } : wbcStatus === 'moderate' ? {
      category: 'IMMUNE BORDERLINE',
      isNew: true,
      title: 'Mild Leukopenia Detected',
      text: 'White blood cell count is borderline low at 4,200 /µL. Continue monitoring for signs of infection like fever, chills, or fatigue.',
      actionText: 'Immunology Support'
    } : {
      category: 'IMMUNE HEALTHY',
      isNew: false,
      title: 'WBC Count Normal',
      text: 'White Blood Cell count is perfectly healthy at 6,800 /µL. Your immune defense metrics are functioning optimally.',
      actionText: 'Immune Dashboard'
    },
    // Platelets Insight
    plateletsStatus === 'low' ? {
      category: 'HEMATOLOGY SEVERE',
      isNew: true,
      title: 'Low Platelet Count Warning',
      text: 'Platelet count is critically low at 85,000 /µL. Risk of bruising or bleeding is elevated. Avoid contact sports and NSAIDs (e.g. ibuprofen).',
      actionText: 'Bleeding Safety Guide',
      warning: true
    } : plateletsStatus === 'moderate' ? {
      category: 'HEMATOLOGY MILD',
      isNew: true,
      title: 'Mild Platelets Deficiency',
      text: 'Platelets are borderline low at 135,000 /µL. Clotting capacity is slightly reduced. Monitor for prolonged bleeding from minor cuts.',
      actionText: 'Coagulation Support'
    } : {
      category: 'HEMATOLOGY OPTIMAL',
      isNew: false,
      title: 'Platelet Count Healthy',
      text: 'Platelet count is safe at 275,000 /µL. Your blood\'s natural clotting capabilities are in the ideal medical range.',
      actionText: 'View Clotting Factors'
    },
    ...aiInsights
  ];

  const nextInsight = () => {
    setCarouselIndex((carouselIndex + 1) % dynamicInsights.length);
  };

  const prevInsight = () => {
    setCarouselIndex((carouselIndex - 1 + dynamicInsights.length) % dynamicInsights.length);
  };

  const currentInsight = dynamicInsights[carouselIndex] || dynamicInsights[0];

  return (
    <div className="bg-[#f8fafc] min-h-[calc(100vh-70px)] py-8 px-4 md:px-8" id="health-dashboard">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header Title Block */}
        <div className="space-y-1 text-left">
          <h1 className="text-2xl md:text-3xl font-display font-extrabold text-slate-900 tracking-tight">Health Dashboard</h1>
          <p className="text-xs md:text-sm text-slate-500 font-sans font-medium">Your protected clinical vault is verified, encrypted, and up to date.</p>
        </div>

        {/* Responsive Desktop Two-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left Column - Main features & logs */}
          <div className="lg:col-span-7 xl:col-span-8 space-y-6">
            
            {/* Action Button: Upload New Report */}
            <button
              onClick={onUploadClick}
              className="w-full bg-gradient-to-r from-teal-800 to-teal-950 text-white rounded-2xl p-5 flex items-center justify-between text-left group hover:from-teal-750 hover:to-teal-900 transition-all duration-300 shadow-[0_4px_20px_rgba(13,148,136,0.12)] border border-teal-800/40 cursor-pointer select-none active:scale-[0.99]"
            >
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-white/10 text-teal-300 rounded-xl group-hover:bg-teal-550 group-hover:text-white transition-all duration-300 shadow-inner">
                  <Upload className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-slate-100">Upload New Report</h3>
                  <p className="text-xs text-teal-200/80 mt-0.5 font-medium">Add PDF, medical scans, or laboratory charts</p>
                </div>
              </div>
              <ChevronRight className="h-5 w-5 text-teal-300 group-hover:text-white group-hover:translate-x-1 transition-all duration-300" />
            </button>

            {/* Action Button: Link Health ID */}
            <button
              onClick={onLinkHealthIdClick}
              className="w-full bg-white border border-slate-200/80 hover:border-teal-300/40 text-slate-800 rounded-2xl p-5 flex items-center justify-between text-left group hover:bg-gradient-to-r hover:from-white hover:to-teal-50/5 hover:shadow-[0_4px_15px_rgba(13,148,136,0.03)] transition-all duration-300 cursor-pointer select-none active:scale-[0.99]"
            >
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-teal-50 text-teal-600 rounded-xl group-hover:bg-teal-100 group-hover:text-teal-700 transition-all duration-300">
                  <Link className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-slate-900 group-hover:text-teal-955 transition-colors">Link Health ID</h3>
                  <p className="text-xs text-slate-500 mt-0.5 font-medium">Sync seamlessly with hospitals and testing facilities</p>
                </div>
              </div>
              <ChevronRight className="h-5 w-5 text-slate-400 group-hover:text-teal-600 group-hover:translate-x-1 transition-all duration-300" />
            </button>

            {isVerified ? (
              <>
                {/* Section: AI Insights block with carousel */}
                <div className="space-y-3.5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Sparkles className="h-4 w-4 text-teal-600" />
                      <h2 className="font-display font-bold text-slate-900 text-lg tracking-tight">AI Diagnostic Insights</h2>
                    </div>
                    
                    {/* Carousel controllers */}
                    <div className="flex space-x-1">
                      <button onClick={prevInsight} className="p-1.5 rounded-lg border border-slate-200 hover:border-teal-200 bg-white hover:bg-teal-5/20 text-slate-600 hover:text-teal-600 cursor-pointer transition-colors active:scale-95">
                        <ChevronLeft className="h-4 w-4" />
                      </button>
                      <button onClick={nextInsight} className="p-1.5 rounded-lg border border-slate-200 hover:border-teal-200 bg-white hover:bg-teal-5/20 text-slate-600 hover:text-teal-600 cursor-pointer transition-colors active:scale-95">
                        <ChevronRight className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  {/* Active Carousel Card */}
                  <div 
                    key={`${carouselIndex}-${sugarStatus}-${wbcStatus}-${plateletsStatus}`}
                    className="bg-gradient-to-br from-teal-50/60 via-teal-50/10 to-white border border-teal-100 border-dashed rounded-2xl p-5.5 space-y-4 shadow-[0_4px_18px_rgba(13,148,136,0.03)] min-h-[145px] flex flex-col justify-between animate-fade-in"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <span className="text-[9px] font-bold text-teal-700 uppercase tracking-widest bg-teal-100/50 px-2 py-0.5 rounded-md">
                          {currentInsight.category}
                        </span>
                        {currentInsight.isNew && (
                          <span className="text-[8px] font-bold bg-teal-600 text-white px-2 py-0.5 rounded-md shadow-sm">NEW</span>
                        )}
                      </div>
                      <h3 className="font-bold text-slate-900 text-sm leading-snug">{currentInsight.title}</h3>
                      <p className="text-xs text-slate-600 leading-relaxed font-normal">{currentInsight.text}</p>
                    </div>

                    <button
                      onClick={() => {
                        if (currentInsight.warning) {
                          alert('Clinical Warning: Concurrent usage of Ginseng or Potassium Supplements with Lisinopril 10mg increases risk of hyperkalemia (high blood potassium levels). Consult your cardiologist.');
                        } else {
                          if (records.length > 0) onSelectRecord(records[0]);
                        }
                      }}
                      className="text-xs font-bold text-teal-600 hover:text-teal-700 flex items-center space-x-1.5 group/link text-left w-fit pt-1 cursor-pointer select-none"
                    >
                      <span>{currentInsight.actionText}</span>
                      <ChevronRight className="h-3.5 w-3.5 group-hover/link:translate-x-0.5 transition-transform" />
                    </button>
                  </div>
                </div>

                {/* Section: Recent Health Activity list */}
                <div className="space-y-3.5">
                  <div className="flex items-center justify-between">
                    <h2 className="font-display font-bold text-slate-900 text-lg tracking-tight">Recent Medical Activity</h2>
                    <button onClick={onLinkHealthIdClick} className="text-xs font-bold text-teal-600 hover:text-teal-700 hover:underline cursor-pointer">
                      See Full Vault
                    </button>
                  </div>

                  {/* List of records */}
                  <div className="space-y-3">
                    {records.map((rec) => (
                      <div
                        key={rec.id}
                        onClick={() => onSelectRecord(rec)}
                        className="bg-white border border-slate-200/80 hover:border-teal-300/40 rounded-2xl p-4.5 flex items-center justify-between hover:bg-teal-5/5 hover:shadow-[0_4px_18px_rgba(13,148,136,0.03)] transition-all duration-300 cursor-pointer shadow-sm group"
                      >
                        <div className="flex items-center space-x-3.5 min-w-0 pr-2">
                          <div className="p-3 bg-teal-50/50 text-teal-600 rounded-xl group-hover:bg-teal-600 group-hover:text-white transition-all duration-300 shadow-sm shrink-0">
                            <FileText className="h-5 w-5" />
                          </div>
                          <div className="min-w-0">
                            <h4 className="font-bold text-slate-900 text-xs leading-snug truncate group-hover:text-teal-950 transition-colors">{rec.title}</h4>
                            <p className="text-[10px] text-slate-400 mt-1 font-sans font-medium">
                              {rec.facility} · {rec.date}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center space-x-2 shrink-0">
                          <span className="text-[9px] font-bold text-teal-700 uppercase bg-teal-50 border border-teal-100 rounded-full px-2.5 py-0.5 font-sans">
                            {rec.status}
                          </span>
                          <ChevronRight className="h-4 w-4 text-slate-300 group-hover:text-teal-600 group-hover:translate-x-0.5 transition-all" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              /* Protected Medical Information Teaser Block when Logged Out */
              <div className="bg-white border border-slate-200/80 rounded-2xl p-6 text-center shadow-sm space-y-4 animate-fade-in">
                <div className="h-14 w-14 bg-teal-50/60 text-teal-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                  <Lock className="h-6 w-6" />
                </div>
                <div className="space-y-1.5">
                  <h3 className="font-display font-bold text-slate-900 text-base">Protected Clinical Records</h3>
                  <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed font-sans font-medium">
                    AI Insights and Recent Health Activity contain protected clinical files (PHI) and are currently locked. Please verify your credentials to decrypt them.
                  </p>
                </div>
                <button
                  onClick={onLinkHealthIdClick}
                  className="inline-flex items-center space-x-2 bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs py-2.5 px-6 rounded-xl transition-all cursor-pointer shadow-lg shadow-teal-600/15 active:scale-95"
                >
                  <ShieldCheck className="h-4 w-4" />
                  <span>Verify OTP & Unlock Vault</span>
                </button>
              </div>
            )}
          </div>

          {/* Right Column - Emergency & Live Bio-Vitals */}
          <div className="lg:col-span-5 xl:col-span-4 space-y-6">
            
            {/* Red Alert: Emergency Info block */}
            <div className="bg-gradient-to-br from-rose-50/50 via-white to-white border-l-4 border-rose-500 border border-slate-200/80 rounded-r-2xl rounded-l-md p-5 shadow-[0_4px_20px_rgba(244,63,94,0.02)] space-y-4 relative overflow-hidden text-left">
              {/* Subtle star watermark */}
              <div className="absolute -top-1 -right-1 text-rose-500/10 pointer-events-none select-none">
                <Heart className="h-24 w-24 stroke-1 fill-rose-500/5" />
              </div>

              <div className="space-y-1 relative z-10">
                <span className="inline-flex items-center space-x-1.5 text-[9px] font-bold bg-rose-500 text-white px-2.5 py-0.5 rounded uppercase tracking-wider shadow-sm">
                  <AlertTriangle className="h-3 w-3" />
                  <span>Critical Emergency Vitals</span>
                </span>
                <div className="grid grid-cols-2 gap-4 pt-3">
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Blood Type</span>
                    <h4 className="text-lg font-extrabold text-slate-900 mt-0.5 font-display flex items-center space-x-1">
                      <Heart className="h-4 w-4 text-rose-500 fill-rose-500 shrink-0" />
                      <span>O Negative (O-)</span>
                    </h4>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Key Allergies</span>
                    <p className="text-xs font-bold text-rose-600 mt-1 leading-snug">Penicillin, Peanuts, Latex</p>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setShowQrModal(true)}
                className="w-full bg-white border border-slate-200 hover:border-rose-300 hover:bg-rose-50/10 rounded-xl py-2.5 text-slate-700 hover:text-slate-900 font-bold text-xs tracking-wide flex items-center justify-center space-x-2 transition-all shadow-sm cursor-pointer select-none active:scale-[0.98]"
              >
                <Users className="h-4 w-4 text-rose-500" />
                <span>Generate First Responder QR</span>
              </button>
            </div>

            {/* Privacy Shield Active card */}
            <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-teal-950 text-white rounded-2xl p-5.5 relative overflow-hidden border border-teal-900/30 shadow-md text-left">
              {/* Transparent shield background decoration */}
              <div className="absolute right-4 bottom-0 h-24 w-24 text-teal-650 opacity-10 pointer-events-none">
                <Shield className="h-full w-full stroke-1" />
              </div>

              <div className="space-y-3 relative z-10">
                <div className="flex items-center space-x-2">
                  <ShieldCheck className="h-5 w-5 text-teal-400" />
                  <h3 className="font-bold text-slate-200 text-sm">Military-Grade Privacy Active</h3>
                </div>
                <p className="text-xs text-slate-400 leading-normal max-w-sm font-sans font-medium">
                  Zero-knowledge AES-256 decryption is safeguarding 248 medical records. Decryption tokens are held securely inside sandbox environments.
                </p>
                
                <div className="flex items-center space-x-1.5 text-[10px] font-bold font-mono text-teal-400 pt-1">
                  <div className="h-2 w-2 bg-emerald-500 rounded-full animate-pulse shadow-sm" />
                  <span>8 SECURE HOSPITALS CONNECTED</span>
                </div>
              </div>
            </div>

            {/* Section: Quick Bio-Stats card */}
            <div className="bg-white border border-slate-200/80 rounded-2xl p-5.5 shadow-sm space-y-4 text-left">
              <div className="flex items-center space-x-2 border-b border-slate-100 pb-3">
                <Activity className="h-4.5 w-4.5 text-teal-600 animate-pulse" />
                <h3 className="font-display font-bold text-slate-900 text-sm">Live Bio-Vitals</h3>
              </div>

              <div className="space-y-4 text-xs font-sans font-medium">
                {/* Blood Pressure */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Blood Pressure</span>
                    <span className="font-extrabold text-teal-600 font-mono">118/76 mmHg</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div className="bg-gradient-to-r from-teal-500 to-emerald-500 h-full rounded-full" style={{ width: '70%' }} />
                  </div>
                </div>

                {/* Resting Heart Rate */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Resting Heart Rate</span>
                    <span className="font-extrabold text-teal-600 font-mono">64 BPM</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div className="bg-gradient-to-r from-teal-500 to-emerald-500 h-full rounded-full" style={{ width: '55%' }} />
                  </div>
                </div>

                {/* Sugar Level */}
                <div className="space-y-2.5 border-t border-slate-100 pt-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-slate-700 font-bold block text-[13px]">Sugar Level</span>
                      <span className="text-[10px] text-slate-400">Blood Glucose Status</span>
                    </div>
                    <div className="text-right">
                      <span className={`font-extrabold text-[13px] font-mono ${
                        sugarStatus === 'low' ? 'text-rose-600' : sugarStatus === 'moderate' ? 'text-amber-500' : 'text-emerald-600'
                      }`}>
                        {sugarStatus === 'low' ? '65 mg/dL' : sugarStatus === 'moderate' ? '152 mg/dL' : '98 mg/dL'}
                      </span>
                      <span className={`block text-[9px] font-bold uppercase tracking-wider ${
                        sugarStatus === 'low' ? 'text-rose-500 animate-pulse' : sugarStatus === 'moderate' ? 'text-amber-500' : 'text-emerald-500'
                      }`}>
                        {sugarStatus === 'low' ? '⚠️ Low' : sugarStatus === 'moderate' ? '⚠️ Moderate' : '✓ Normal'}
                      </span>
                    </div>
                  </div>
                  
                  {/* Dynamic Color Progress Bar */}
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden shadow-inner relative">
                    <div 
                      className={`h-full rounded-full transition-all duration-500 ${
                        sugarStatus === 'low' 
                          ? 'bg-gradient-to-r from-rose-500 to-red-600 shadow-[0_0_8px_rgba(244,63,94,0.5)]' 
                          : sugarStatus === 'moderate' 
                          ? 'bg-gradient-to-r from-amber-400 to-yellow-500 shadow-[0_0_8px_rgba(245,158,11,0.4)]' 
                          : 'bg-gradient-to-r from-emerald-500 to-teal-500 shadow-[0_0_8px_rgba(16,185,129,0.3)]'
                      }`} 
                      style={{ width: sugarStatus === 'low' ? '28%' : sugarStatus === 'moderate' ? '58%' : '85%' }} 
                    />
                  </div>

                  {/* Status Interactive Pill Selector */}
                  <div className="flex items-center space-x-1 justify-end">
                    <span className="text-[9px] text-slate-400 mr-1.5 font-mono">Test Sugar Status:</span>
                    <button
                      type="button"
                      onClick={() => { setSugarStatus('low'); setCarouselIndex(0); }}
                      className={`px-2 py-0.5 rounded-md text-[9px] font-extrabold uppercase transition-all border cursor-pointer select-none ${
                        sugarStatus === 'low'
                          ? 'bg-rose-600 text-white border-rose-700 shadow-sm'
                          : 'bg-slate-50 text-slate-400 hover:text-rose-600 hover:bg-rose-50 border-slate-200'
                      }`}
                    >
                      Low
                    </button>
                    <button
                      type="button"
                      onClick={() => { setSugarStatus('moderate'); setCarouselIndex(0); }}
                      className={`px-2 py-0.5 rounded-md text-[9px] font-extrabold uppercase transition-all border cursor-pointer select-none ${
                        sugarStatus === 'moderate'
                          ? 'bg-amber-500 text-white border-amber-600 shadow-sm'
                          : 'bg-slate-50 text-slate-400 hover:text-amber-600 hover:bg-amber-50 border-slate-200'
                      }`}
                    >
                      Mod
                    </button>
                    <button
                      type="button"
                      onClick={() => { setSugarStatus('normal'); setCarouselIndex(0); }}
                      className={`px-2 py-0.5 rounded-md text-[9px] font-extrabold uppercase transition-all border cursor-pointer select-none ${
                        sugarStatus === 'normal'
                          ? 'bg-emerald-600 text-white border-emerald-700 shadow-sm'
                          : 'bg-slate-50 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 border-slate-200'
                      }`}
                    >
                      Normal
                    </button>
                  </div>
                </div>

                {/* WBC Level */}
                <div className="space-y-2.5 border-t border-slate-100 pt-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-slate-700 font-bold block text-[13px]">WBC Level</span>
                      <span className="text-[10px] text-slate-400">White Blood Cells</span>
                    </div>
                    <div className="text-right">
                      <span className={`font-extrabold text-[13px] font-mono ${
                        wbcStatus === 'low' ? 'text-rose-600' : wbcStatus === 'moderate' ? 'text-amber-500' : 'text-emerald-600'
                      }`}>
                        {wbcStatus === 'low' ? '2,900 /µL' : wbcStatus === 'moderate' ? '4,200 /µL' : '6,800 /µL'}
                      </span>
                      <span className={`block text-[9px] font-bold uppercase tracking-wider ${
                        wbcStatus === 'low' ? 'text-rose-500 animate-pulse' : wbcStatus === 'moderate' ? 'text-amber-500' : 'text-emerald-500'
                      }`}>
                        {wbcStatus === 'low' ? '⚠️ Low' : wbcStatus === 'moderate' ? '⚠️ Moderate' : '✓ Normal'}
                      </span>
                    </div>
                  </div>
                  
                  {/* Dynamic Color Progress Bar */}
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden shadow-inner relative">
                    <div 
                      className={`h-full rounded-full transition-all duration-500 ${
                        wbcStatus === 'low' 
                          ? 'bg-gradient-to-r from-rose-500 to-red-600 shadow-[0_0_8px_rgba(244,63,94,0.5)]' 
                          : wbcStatus === 'moderate' 
                          ? 'bg-gradient-to-r from-amber-400 to-yellow-500 shadow-[0_0_8px_rgba(245,158,11,0.4)]' 
                          : 'bg-gradient-to-r from-emerald-500 to-teal-500 shadow-[0_0_8px_rgba(16,185,129,0.3)]'
                      }`} 
                      style={{ width: wbcStatus === 'low' ? '28%' : wbcStatus === 'moderate' ? '58%' : '85%' }} 
                    />
                  </div>

                  {/* Status Interactive Pill Selector */}
                  <div className="flex items-center space-x-1 justify-end">
                    <span className="text-[9px] text-slate-400 mr-1.5 font-mono">Test WBC Status:</span>
                    <button
                      type="button"
                      onClick={() => { setWbcStatus('low'); setCarouselIndex(1); }}
                      className={`px-2 py-0.5 rounded-md text-[9px] font-extrabold uppercase transition-all border cursor-pointer select-none ${
                        wbcStatus === 'low'
                          ? 'bg-rose-600 text-white border-rose-700 shadow-sm'
                          : 'bg-slate-50 text-slate-400 hover:text-rose-600 hover:bg-rose-50 border-slate-200'
                      }`}
                    >
                      Low
                    </button>
                    <button
                      type="button"
                      onClick={() => { setWbcStatus('moderate'); setCarouselIndex(1); }}
                      className={`px-2 py-0.5 rounded-md text-[9px] font-extrabold uppercase transition-all border cursor-pointer select-none ${
                        wbcStatus === 'moderate'
                          ? 'bg-amber-500 text-white border-amber-600 shadow-sm'
                          : 'bg-slate-50 text-slate-400 hover:text-amber-600 hover:bg-amber-50 border-slate-200'
                      }`}
                    >
                      Mod
                    </button>
                    <button
                      type="button"
                      onClick={() => { setWbcStatus('normal'); setCarouselIndex(1); }}
                      className={`px-2 py-0.5 rounded-md text-[9px] font-extrabold uppercase transition-all border cursor-pointer select-none ${
                        wbcStatus === 'normal'
                          ? 'bg-emerald-600 text-white border-emerald-700 shadow-sm'
                          : 'bg-slate-50 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 border-slate-200'
                      }`}
                    >
                      Normal
                    </button>
                  </div>
                </div>

                {/* Platelets Count */}
                <div className="space-y-2.5 border-t border-slate-100 pt-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-slate-700 font-bold block text-[13px]">Platelets Count</span>
                      <span className="text-[10px] text-slate-400">Blood Clotting Nodes</span>
                    </div>
                    <div className="text-right">
                      <span className={`font-extrabold text-[13px] font-mono ${
                        plateletsStatus === 'low' ? 'text-rose-600' : plateletsStatus === 'moderate' ? 'text-amber-500' : 'text-emerald-600'
                      }`}>
                        {plateletsStatus === 'low' ? '85,000 /µL' : plateletsStatus === 'moderate' ? '135,000 /µL' : '275,000 /µL'}
                      </span>
                      <span className={`block text-[9px] font-bold uppercase tracking-wider ${
                        plateletsStatus === 'low' ? 'text-rose-500 animate-pulse' : plateletsStatus === 'moderate' ? 'text-amber-500' : 'text-emerald-500'
                      }`}>
                        {plateletsStatus === 'low' ? '⚠️ Low' : plateletsStatus === 'moderate' ? '⚠️ Moderate' : '✓ Normal'}
                      </span>
                    </div>
                  </div>
                  
                  {/* Dynamic Color Progress Bar */}
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden shadow-inner relative">
                    <div 
                      className={`h-full rounded-full transition-all duration-500 ${
                        plateletsStatus === 'low' 
                          ? 'bg-gradient-to-r from-rose-500 to-red-600 shadow-[0_0_8px_rgba(244,63,94,0.5)]' 
                          : plateletsStatus === 'moderate' 
                          ? 'bg-gradient-to-r from-amber-400 to-yellow-500 shadow-[0_0_8px_rgba(245,158,11,0.4)]' 
                          : 'bg-gradient-to-r from-emerald-500 to-teal-500 shadow-[0_0_8px_rgba(16,185,129,0.3)]'
                      }`} 
                      style={{ width: plateletsStatus === 'low' ? '28%' : plateletsStatus === 'moderate' ? '58%' : '85%' }} 
                    />
                  </div>

                  {/* Status Interactive Pill Selector */}
                  <div className="flex items-center space-x-1 justify-end">
                    <span className="text-[9px] text-slate-400 mr-1.5 font-mono">Test Platelets Status:</span>
                    <button
                      type="button"
                      onClick={() => { setPlateletsStatus('low'); setCarouselIndex(2); }}
                      className={`px-2 py-0.5 rounded-md text-[9px] font-extrabold uppercase transition-all border cursor-pointer select-none ${
                        plateletsStatus === 'low'
                          ? 'bg-rose-600 text-white border-rose-700 shadow-sm'
                          : 'bg-slate-50 text-slate-400 hover:text-rose-600 hover:bg-rose-50 border-slate-200'
                      }`}
                    >
                      Low
                    </button>
                    <button
                      type="button"
                      onClick={() => { setPlateletsStatus('moderate'); setCarouselIndex(2); }}
                      className={`px-2 py-0.5 rounded-md text-[9px] font-extrabold uppercase transition-all border cursor-pointer select-none ${
                        plateletsStatus === 'moderate'
                          ? 'bg-amber-500 text-white border-amber-600 shadow-sm'
                          : 'bg-slate-50 text-slate-400 hover:text-amber-600 hover:bg-amber-50 border-slate-200'
                      }`}
                    >
                      Mod
                    </button>
                    <button
                      type="button"
                      onClick={() => { setPlateletsStatus('normal'); setCarouselIndex(2); }}
                      className={`px-2 py-0.5 rounded-md text-[9px] font-extrabold uppercase transition-all border cursor-pointer select-none ${
                        plateletsStatus === 'normal'
                          ? 'bg-emerald-600 text-white border-emerald-700 shadow-sm'
                          : 'bg-slate-50 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 border-slate-200'
                      }`}
                    >
                      Normal
                    </button>
                  </div>
                </div>

              </div>
            </div>

          </div>

        </div>

      </div>

      {/* Floating Action Button (FAB) */}
      <button
        onClick={onUploadClick}
        className="fixed bottom-20 right-6 md:right-10 bg-teal-600 hover:bg-teal-500 text-white rounded-full p-4 shadow-xl shadow-teal-600/25 active:scale-95 transition-all cursor-pointer z-40 group"
      >
        <Plus className="h-6 w-6 group-hover:rotate-90 transition-transform duration-300" />
      </button>

      {/* QR Code Scan Modal */}
      {showQrModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 max-w-xs w-full text-center space-y-4 shadow-2xl relative">
            <div className="flex justify-between items-center border-b border-slate-100 pb-2">
              <span className="text-xs font-bold uppercase text-slate-400 font-mono">Emergency Smart-Pass QR</span>
              <button onClick={() => setShowQrModal(false)} className="text-slate-400 hover:text-slate-600 text-lg font-bold p-1 cursor-pointer select-none">×</button>
            </div>
            
            <div className="bg-slate-50 p-4 rounded-2xl flex items-center justify-center border border-slate-100">
              {/* Dummy QR representation */}
              <div className="border-4 border-slate-900 p-2.5 bg-white rounded-xl shadow-md">
                <div className="grid grid-cols-5 gap-0.5">
                  {Array.from({ length: 25 }).map((_, i) => (
                    <div
                      key={i}
                      className={`h-6 w-6 rounded-sm ${(i % 3 === 0 || i % 7 === 1 || i < 5 || i > 20) && !(i === 12 || i === 13) ? 'bg-slate-900' : 'bg-white'}`}
                    />
                  ))}
                </div>
              </div>
            </div>

            <p className="text-[11px] text-slate-500 leading-relaxed font-sans font-medium">
              First responders can scan this cryptographic pass to initiate break-glass flow, loading essential life-support data instantly.
            </p>

            <button
              onClick={() => {
                setShowQrModal(false);
                onEmergencyClick();
              }}
              className="w-full bg-rose-600 text-white hover:bg-rose-500 font-bold text-xs py-2.5 rounded-xl transition-colors cursor-pointer select-none active:scale-95 shadow-lg shadow-rose-600/10"
            >
              Simulate Emergency Scan
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
