import React, { useState } from 'react';
import { initialRecords, initialLogs, initialHospitalRecords } from './data';
import { MedicalRecord, ActivityLog, AppView, HospitalRecord } from './types';
import PRDViewer from './components/PRDViewer';
import Dashboard from './components/Dashboard';
import IdentityVerification from './components/IdentityVerification';
import ReportDetail from './components/ReportDetail';
import EmergencyDashboard from './components/EmergencyDashboard';
import UploadModal from './components/UploadModal';
import CurrentDrugs from './components/CurrentDrugs';
import AiDrugsPredictor from './components/AiDrugsPredictor';
import { ShieldCheck, Lock, Activity, FileText, User, Sparkles, BookOpen, AlertTriangle, ShieldAlert, Key, Terminal, RefreshCw, Layers, CheckCircle2, Check, Pill, ExternalLink, LogOut, Database, Users, Menu, X, ChevronRight } from 'lucide-react';

export default function App() {
  const [records, setRecords] = useState<MedicalRecord[]>(initialRecords);
  const [hospitalRecords, setHospitalRecords] = useState<HospitalRecord[]>(initialHospitalRecords);
  const [viewingHospitalRecords, setViewingHospitalRecords] = useState(false);
  const [generatingId, setGeneratingId] = useState<string | null>(null);
  const [logs, setLogs] = useState<ActivityLog[]>(initialLogs);

  const handleGenerateSummary = (id: string) => {
    setGeneratingId(id);
    setTimeout(() => {
      setHospitalRecords(prev => 
        prev.map(h => h.id === id ? { ...h, isGenerated: true } : h)
      );
      setGeneratingId(null);
      
      const targetHospital = hospitalRecords.find(h => h.id === id);
      if (targetHospital) {
        const newLog: ActivityLog = {
          id: `TXN-GEN-${Math.floor(1000 + Math.random() * 9000)}-HOSP`,
          action: 'AI SUMMARY GENERATION',
          actor: 'Dr. Sarah Chen',
          role: 'Treating Physician',
          timestamp: new Date().toISOString(),
          justification: `AI summary computed for ${targetHospital.hospitalName} clinical notes (Patient: V Rahul).`,
          status: 'SUCCESS',
          ipAddress: '192.168.42.105'
        };
        setLogs(prev => [newLog, ...prev]);
      }
    }, 1500);
  };

  const [overallSummaryState, setOverallSummaryState] = useState<'idle' | 'generating' | 'completed'>('idle');

  const handleGenerateOverallSummary = () => {
    setOverallSummaryState('generating');
    setTimeout(() => {
      setOverallSummaryState('completed');
      
      const newLog: ActivityLog = {
        id: `TXN-SYNTH-${Math.floor(1000 + Math.random() * 9000)}-OK`,
        action: 'CONSOLIDATED MULTI-HOSPITAL SYNTHESIS',
        actor: 'Clinical AI Engine v3.5',
        role: 'Synthesizer Agent',
        timestamp: new Date().toISOString(),
        justification: `Compiled multi-system clinical reports from Apollo, ACS, and Kauvery Hospitals for patient V Rahul. Analyzed drug-drug interactions and dosage compliance.`,
        status: 'SUCCESS',
        ipAddress: '192.168.42.105'
      };
      setLogs(prev => [newLog, ...prev]);
    }, 2000);
  };

  const [activeView, setActiveView] = useState<AppView>('home');
  const [selectedRecord, setSelectedRecord] = useState<MedicalRecord | null>(null);
  const [isVerified, setIsVerified] = useState(false);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [docMode, setDocMode] = useState<'prototype' | 'prd'>('prototype');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Admin audit state
  const [adminPasswordInput, setAdminPasswordInput] = useState('');
  const [adminUnlocked, setAdminUnlocked] = useState(false);

  const handleSelectRecord = (record: MedicalRecord) => {
    setSelectedRecord(record);
  };

  const handleBackToDashboard = () => {
    setSelectedRecord(null);
  };

  const handleUploadSuccess = (newRecord: MedicalRecord) => {
    setRecords([newRecord, ...records]);
    // Log the successful upload event
    const newLog: ActivityLog = {
      id: `TXN-${Math.floor(1000 + Math.random() * 9000)}-UP-OK`,
      action: 'REPORT UPLOAD & AI SUMMARIZE',
      actor: 'Dr. Sarah Chen',
      role: 'Reviewing Clinician',
      timestamp: new Date().toISOString(),
      justification: 'Veto reviewed and approved into persistent secure repository.',
      status: 'SUCCESS',
      ipAddress: '192.168.42.105'
    };
    setLogs([newLog, ...logs]);
  };

  const handleVerificationSuccess = () => {
    setIsVerified(true);
    // Add verify audit log
    const newLog: ActivityLog = {
      id: `TXN-${Math.floor(1000 + Math.random() * 9000)}-VF-OK`,
      action: 'MFA DECRYPTION UNLOCK',
      actor: 'Patient (Self)',
      role: 'Record Principal',
      timestamp: new Date().toISOString(),
      justification: 'Decryption credentials provided via OTP matching.',
      status: 'SUCCESS',
      ipAddress: '192.168.42.105'
    };
    setLogs([newLog, ...logs]);
    
    // Auto navigate to the unlocked Records page
    setActiveView('records');
  };

  const handleLogout = () => {
    setIsVerified(false);
    // Add logout audit log
    const newLog: ActivityLog = {
      id: `TXN-${Math.floor(1000 + Math.random() * 9000)}-LO-OK`,
      action: 'SECURE LOGOUT',
      actor: 'V Rahul',
      role: 'Record Principal',
      timestamp: new Date().toISOString(),
      justification: 'Patient requested session termination. Credentials cleared.',
      status: 'SUCCESS',
      ipAddress: '192.168.42.105'
    };
    setLogs([newLog, ...logs]);
    setActiveView('home');
  };

  const handleEmergencyTimerExpire = () => {
    setIsVerified(false);
    // Add expiration audit log
    const newLog: ActivityLog = {
      id: `TXN-${Math.floor(1000 + Math.random() * 9000)}-EXP-ERR`,
      action: 'BREAK-GLASS EXPIRED',
      actor: 'System Node Sentinel',
      role: 'Automated Access Gatekeeper',
      timestamp: new Date().toISOString(),
      justification: 'Emergency session time limit exceeded. Terminated volatile view.',
      status: 'DENIED',
      ipAddress: '127.0.0.1'
    };
    setLogs([newLog, ...logs]);
    setActiveView('verify');
  };

  const handleTabChange = (tab: AppView) => {
    setSelectedRecord(null);
    if ((tab === 'records' || tab === 'ai' || tab === 'current-drugs' || tab === 'ai-drugs-predictor') && !isVerified) {
      setActiveView('verify');
    } else {
      setActiveView(tab);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 font-sans" id="carevault-root">
      
      {/* Top Main Navigation Header */}
      <header className="sticky top-0 z-50 bg-slate-900 text-white shadow-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="h-9 w-9 bg-teal-600 rounded-xl flex items-center justify-center shadow-lg shadow-teal-550/10">
              <ShieldCheck className="h-5.5 w-5.5 text-white" />
            </div>
            <div>
              <span className="font-display font-bold text-lg tracking-tight text-white block">CareVault AI</span>
              <span className="text-[9px] text-teal-400 uppercase tracking-widest font-mono font-bold block">Secure Repository</span>
            </div>
          </div>

          {/* Hamburger Menu Trigger (Only After Login) */}
          {isVerified && (
            <div className="flex items-center space-x-3.5">
              <div className="hidden sm:flex lg:hidden items-center space-x-3 text-right">
                <div className="text-xs">
                  <p className="font-bold text-slate-200">V Rahul</p>
                  <p className="text-[10px] text-green-400 font-mono font-medium">Verified Patient</p>
                </div>
                <div className="h-8 w-8 bg-teal-600 text-white rounded-full flex items-center justify-center font-bold text-xs shadow">
                  VR
                </div>
              </div>

              {/* 3 Horizontal Bars Hamburger Button */}
              <button
                onClick={() => setIsMenuOpen(true)}
                className="lg:hidden p-2 bg-slate-800 hover:bg-slate-700 text-teal-400 hover:text-teal-300 rounded-xl transition-all cursor-pointer select-none border border-slate-700 active:scale-95 shadow-md flex items-center justify-center h-9 w-9"
                aria-label="Open directory menu"
                id="hamburger-menu-btn"
              >
                <Menu className="h-5.5 w-5.5" />
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Slide-out Hamburger Menu Drawer (Only Active When Opened) */}
      {isVerified && isMenuOpen && (
        <div className="fixed inset-0 z-100 flex justify-end" id="drawer-container">
          {/* Backdrop Overlay */}
          <div
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs transition-opacity duration-300 cursor-pointer"
            onClick={() => setIsMenuOpen(false)}
          />

          {/* Drawer Panel */}
          <div className="relative w-80 max-w-full bg-slate-900 border-l border-slate-800 text-white shadow-2xl h-full flex flex-col z-50 animate-slide-in">
            {/* Drawer Header */}
            <div className="p-5 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="h-8 w-8 bg-teal-600 rounded-lg flex items-center justify-center shadow">
                  <ShieldCheck className="h-5 w-5 text-white" />
                </div>
                <span className="font-display font-bold text-xs tracking-wider text-slate-200 uppercase font-mono">Vault Directory</span>
              </div>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="p-1.5 bg-slate-850 hover:bg-slate-800 text-slate-400 hover:text-white rounded-lg transition-all cursor-pointer select-none border border-slate-800"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Patient Context Block */}
            <div className="p-5 bg-slate-950/40 border-b border-slate-800 flex items-center space-x-3.5">
              <div className="h-10 w-10 bg-teal-600 text-white rounded-xl flex items-center justify-center font-bold text-sm shadow-md">
                VR
              </div>
              <div className="min-w-0 flex-1">
                <h4 className="font-bold text-xs text-slate-100 truncate text-left">V Rahul</h4>
                <p className="text-[10px] text-green-500 font-mono font-medium flex items-center space-x-1 mt-0.5">
                  <span className="h-1.5 w-1.5 bg-green-500 rounded-full animate-pulse" />
                  <span>Verified Patient (MFA)</span>
                </p>
              </div>
            </div>

            {/* Navigation Menu Links */}
            <div className="flex-1 overflow-y-auto p-4 space-y-1 text-left">
              <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest px-2.5 block mb-2 font-mono font-bold">Main Features</span>
              
              {/* Dashboard Link */}
              <button
                onClick={() => {
                  setDocMode('prototype');
                  setActiveView('home');
                  setSelectedRecord(null);
                  setIsMenuOpen(false);
                }}
                className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-all text-left cursor-pointer ${
                  docMode === 'prototype' && activeView === 'home' && !selectedRecord
                    ? 'bg-teal-600 text-white shadow-md shadow-teal-700/10'
                    : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <Activity className="h-4.5 w-4.5 shrink-0" />
                <span>Health Dashboard</span>
              </button>

              {/* Records Vault Link */}
              <button
                onClick={() => {
                  setDocMode('prototype');
                  setActiveView('records');
                  setSelectedRecord(null);
                  setIsMenuOpen(false);
                }}
                className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-all text-left cursor-pointer ${
                  docMode === 'prototype' && activeView === 'records' && !selectedRecord
                    ? 'bg-teal-600 text-white shadow-md shadow-teal-700/10'
                    : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <FileText className="h-4.5 w-4.5 shrink-0" />
                <span>Medical Records Vault</span>
              </button>

              {/* Medicine Vault Section */}
              <div className="pl-3 py-1.5 flex items-center space-x-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest font-mono">
                <Layers className="h-3 w-3 text-teal-500 shrink-0" />
                <span>Medicine Section</span>
              </div>
              <div className="pl-3 space-y-1 pb-1">
                {/* Current Drugs Branch */}
                <button
                  onClick={() => {
                    setDocMode('prototype');
                    setActiveView('current-drugs');
                    setSelectedRecord(null);
                    setIsMenuOpen(false);
                  }}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-xl text-xs font-bold transition-all text-left cursor-pointer ${
                    docMode === 'prototype' && activeView === 'current-drugs'
                      ? 'bg-teal-600 text-white shadow-md shadow-teal-700/10'
                      : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <Pill className="h-4 w-4 shrink-0" />
                  <span>Current Drugs</span>
                </button>

                {/* AI Drugs Predictor Branch */}
                <button
                  onClick={() => {
                    setDocMode('prototype');
                    setActiveView('ai-drugs-predictor');
                    setSelectedRecord(null);
                    setIsMenuOpen(false);
                  }}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-xl text-xs font-bold transition-all text-left cursor-pointer ${
                    docMode === 'prototype' && activeView === 'ai-drugs-predictor'
                      ? 'bg-teal-600 text-white shadow-md shadow-teal-700/10'
                      : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <Sparkles className="h-4 w-4 shrink-0 text-teal-400" />
                  <span>AI Drugs Predictor</span>
                </button>
              </div>

              {/* AI Insights Link */}
              <button
                onClick={() => {
                  setDocMode('prototype');
                  setActiveView('ai');
                  setSelectedRecord(null);
                  setIsMenuOpen(false);
                }}
                className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-all text-left cursor-pointer ${
                  docMode === 'prototype' && activeView === 'ai' && !selectedRecord
                    ? 'bg-teal-600 text-white shadow-md shadow-teal-700/10'
                    : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <Sparkles className="h-4.5 w-4.5 shrink-0" />
                <span>AI Insights Engine</span>
              </button>

              {/* Emergency Link */}
              <button
                onClick={() => {
                  setDocMode('prototype');
                  setActiveView('emergency');
                  setSelectedRecord(null);
                  setIsMenuOpen(false);
                }}
                className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-all text-left cursor-pointer ${
                  docMode === 'prototype' && activeView === 'emergency' && !selectedRecord
                    ? 'bg-rose-700 text-white shadow-md'
                    : 'text-rose-400 hover:bg-rose-950/20 border border-rose-900/15'
                }`}
              >
                <AlertTriangle className="h-4.5 w-4.5 shrink-0 animate-pulse text-rose-500" />
                <span>Emergency Vitals Dashboard</span>
              </button>

              {/* Patient Profile Link */}
              <button
                onClick={() => {
                  setDocMode('prototype');
                  setActiveView('profile');
                  setSelectedRecord(null);
                  setIsMenuOpen(false);
                }}
                className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-all text-left cursor-pointer ${
                  docMode === 'prototype' && activeView === 'profile' && !selectedRecord
                    ? 'bg-teal-600 text-white shadow-md shadow-teal-700/10'
                    : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <User className="h-4.5 w-4.5 shrink-0" />
                <span>Patient Profile & Logs</span>
              </button>

              <div className="h-px bg-slate-800 my-4" />
              
              <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest px-2.5 block mb-2 font-mono font-bold">Requirements & Docs</span>

              {/* Requirements PRD Link */}
              <button
                onClick={() => {
                  setDocMode('prd');
                  setIsMenuOpen(false);
                }}
                className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-all text-left cursor-pointer ${
                  docMode === 'prd'
                    ? 'bg-teal-600 text-white shadow-md shadow-teal-700/10'
                    : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <BookOpen className="h-4.5 w-4.5 shrink-0" />
                <span>Requirements (PRD Spec)</span>
              </button>
            </div>

            {/* Logout Footer Section inside Drawer */}
            <div className="p-5 border-t border-slate-800 bg-slate-950/20">
              <button
                onClick={() => {
                  setIsMenuOpen(false);
                  handleLogout();
                }}
                className="w-full bg-rose-905/65 hover:bg-rose-900/60 border border-rose-900/40 text-rose-300 hover:text-rose-100 rounded-xl py-3 text-xs font-bold flex items-center justify-center space-x-2 transition-all cursor-pointer select-none active:scale-98"
              >
                <LogOut className="h-4 w-4 shrink-0" />
                <span>Secure Session Logout</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* App Body Wrapper with Sidebar for PC */}
      <div className="flex-1 flex flex-col lg:flex-row min-h-[calc(100vh-64px)]">
        
        {/* Desktop Sidebar - Left Column on PC, Hidden on Mobile */}
        {isVerified && (
          <aside className="hidden lg:flex flex-col w-72 bg-slate-900 text-white border-r border-slate-800 shrink-0 h-[calc(100vh-64px)] sticky top-16 z-20">
            {/* Patient Context Block */}
            <div className="p-5 bg-slate-950/40 border-b border-slate-800 flex items-center space-x-3.5">
              <div className="h-10 w-10 bg-teal-600 text-white rounded-xl flex items-center justify-center font-bold text-sm shadow-md shrink-0">
                VR
              </div>
              <div className="min-w-0 flex-1">
                <h4 className="font-bold text-xs text-slate-100 truncate text-left">V Rahul</h4>
                <p className="text-[10px] text-green-500 font-mono font-medium flex items-center space-x-1 mt-0.5">
                  <span className="h-1.5 w-1.5 bg-green-500 rounded-full animate-pulse" />
                  <span>Verified Patient (MFA)</span>
                </p>
              </div>
            </div>

            {/* Navigation Menu Links */}
            <div className="flex-1 overflow-y-auto p-4 space-y-1 text-left">
              <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest px-2.5 block mb-2 font-mono">Main Features</span>
              
              {/* Dashboard Link */}
              <button
                onClick={() => {
                  setDocMode('prototype');
                  setActiveView('home');
                  setSelectedRecord(null);
                }}
                className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-all text-left cursor-pointer ${
                  docMode === 'prototype' && activeView === 'home' && !selectedRecord
                    ? 'bg-teal-600 text-white shadow-md shadow-teal-700/10'
                    : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <Activity className="h-4.5 w-4.5 shrink-0" />
                <span>Health Dashboard</span>
              </button>

              {/* Records Vault Link */}
              <button
                onClick={() => {
                  setDocMode('prototype');
                  setActiveView('records');
                  setSelectedRecord(null);
                }}
                className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-all text-left cursor-pointer ${
                  docMode === 'prototype' && activeView === 'records' && !selectedRecord
                    ? 'bg-teal-600 text-white shadow-md shadow-teal-700/10'
                    : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <FileText className="h-4.5 w-4.5 shrink-0" />
                <span>Medical Records Vault</span>
              </button>

              {/* Medicine Vault Section */}
              <div className="pl-3 py-1.5 flex items-center space-x-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest font-mono">
                <Layers className="h-3 w-3 text-teal-500 shrink-0" />
                <span>Medicine Section</span>
              </div>
              <div className="pl-3 space-y-1 pb-1">
                {/* Current Drugs Branch */}
                <button
                  onClick={() => {
                    setDocMode('prototype');
                    setActiveView('current-drugs');
                    setSelectedRecord(null);
                  }}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-xl text-xs font-bold transition-all text-left cursor-pointer ${
                    docMode === 'prototype' && activeView === 'current-drugs'
                      ? 'bg-teal-600 text-white shadow-md shadow-teal-700/10'
                      : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <Pill className="h-4 w-4 shrink-0" />
                  <span>Current Drugs</span>
                </button>

                {/* AI Drugs Predictor Branch */}
                <button
                  onClick={() => {
                    setDocMode('prototype');
                    setActiveView('ai-drugs-predictor');
                    setSelectedRecord(null);
                  }}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-xl text-xs font-bold transition-all text-left cursor-pointer ${
                    docMode === 'prototype' && activeView === 'ai-drugs-predictor'
                      ? 'bg-teal-600 text-white shadow-md shadow-teal-700/10'
                      : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <Sparkles className="h-4 w-4 shrink-0 text-teal-400" />
                  <span>AI Drugs Predictor</span>
                </button>
              </div>

              {/* AI Insights Link */}
              <button
                onClick={() => {
                  setDocMode('prototype');
                  setActiveView('ai');
                  setSelectedRecord(null);
                }}
                className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-all text-left cursor-pointer ${
                  docMode === 'prototype' && activeView === 'ai' && !selectedRecord
                    ? 'bg-teal-600 text-white shadow-md shadow-teal-700/10'
                    : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <Sparkles className="h-4.5 w-4.5 shrink-0" />
                <span>AI Insights Engine</span>
              </button>

              {/* Emergency Link */}
              <button
                onClick={() => {
                  setDocMode('prototype');
                  setActiveView('emergency');
                  setSelectedRecord(null);
                }}
                className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-all text-left cursor-pointer ${
                  docMode === 'prototype' && activeView === 'emergency' && !selectedRecord
                    ? 'bg-rose-700 text-white shadow-md'
                    : 'text-rose-400 hover:bg-rose-950/20 border border-rose-900/15'
                }`}
              >
                <AlertTriangle className="h-4.5 w-4.5 shrink-0 animate-pulse text-rose-500" />
                <span>Emergency Vitals Dashboard</span>
              </button>

              {/* Patient Profile Link */}
              <button
                onClick={() => {
                  setDocMode('prototype');
                  setActiveView('profile');
                  setSelectedRecord(null);
                }}
                className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-all text-left cursor-pointer ${
                  docMode === 'prototype' && activeView === 'profile' && !selectedRecord
                    ? 'bg-teal-600 text-white shadow-md shadow-teal-700/10'
                    : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <User className="h-4.5 w-4.5 shrink-0" />
                <span>Patient Profile & Logs</span>
              </button>

              <div className="h-px bg-slate-800 my-4" />
              
              <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest px-2.5 block mb-2 font-mono">Requirements & Docs</span>

              {/* Requirements PRD Link */}
              <button
                onClick={() => {
                  setDocMode('prd');
                }}
                className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-all text-left cursor-pointer ${
                  docMode === 'prd'
                    ? 'bg-teal-600 text-white shadow-md shadow-teal-700/10'
                    : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <BookOpen className="h-4.5 w-4.5 shrink-0" />
                <span>Requirements (PRD Spec)</span>
              </button>
            </div>

            {/* Logout Footer Section inside Sidebar */}
            <div className="p-5 border-t border-slate-800 bg-slate-950/20">
              <button
                onClick={handleLogout}
                className="w-full bg-rose-905/65 hover:bg-rose-900/60 border border-rose-900/40 text-rose-300 hover:text-rose-100 rounded-xl py-3 text-xs font-bold flex items-center justify-center space-x-2 transition-all cursor-pointer select-none active:scale-98"
              >
                <LogOut className="h-4 w-4 shrink-0" />
                <span>Secure Session Logout</span>
              </button>
            </div>
          </aside>
        )}

        {/* Main Content Pane */}
        <main className="flex-1 flex flex-col min-w-0">
        {docMode === 'prd' ? (
          <PRDViewer />
        ) : (
          /* Prototype View Mode */
          <div className="flex-1 flex flex-col relative">
            
            {/* Inner Route rendering */}
            {selectedRecord ? (
              <ReportDetail record={selectedRecord} onBack={handleBackToDashboard} />
            ) : (
              <>
                {!isVerified ? (
                  activeView === 'emergency' ? (
                    <div className="flex-1 flex flex-col animate-fade-in">
                      {/* Emergency top navigation bar to go back */}
                      <div className="bg-slate-900 border-b border-slate-800 px-4 py-3 flex items-center justify-between text-white">
                        <span className="text-xs text-rose-400 font-bold flex items-center space-x-1.5 uppercase font-mono">
                          <AlertTriangle className="h-4 w-4 text-rose-500 animate-pulse" />
                          <span>Emergency Mode (Break-Glass)</span>
                        </span>
                        <button
                          onClick={() => setActiveView('verify')}
                          className="px-3.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white rounded-xl text-xs font-bold transition-all cursor-pointer select-none border border-slate-750"
                        >
                          ← Back to Login
                        </button>
                      </div>
                      <EmergencyDashboard onTimerExpire={handleEmergencyTimerExpire} isVerified={isVerified} />
                    </div>
                  ) : (
                    <div className="flex-1 flex flex-col py-8 px-4 w-full">
                      {/* Prominent Emergency Access banner trigger */}
                      <div className="max-w-md mx-auto w-full mb-2">
                        <button
                          onClick={() => setActiveView('emergency')}
                          className="w-full bg-rose-50 border border-rose-200 hover:border-rose-300 rounded-2xl p-4 flex items-center justify-between text-left text-xs font-bold text-rose-800 transition-all cursor-pointer hover:shadow-sm select-none active:scale-[0.99]"
                        >
                          <div className="flex items-center space-x-3.5 text-rose-700 font-sans">
                            <AlertTriangle className="h-5.5 w-5.5 text-rose-500 animate-pulse flex-shrink-0" />
                            <div>
                              <span className="font-extrabold text-sm block text-rose-950">⚠️ Critical Emergency Vitals?</span>
                              <span className="text-[10px] text-rose-600/90 font-medium font-sans block mt-0.5">Access break-glass patient summary records instantly.</span>
                            </div>
                          </div>
                          <ChevronRight className="h-4.5 w-4.5 text-rose-500 flex-shrink-0" />
                        </button>
                      </div>

                      {/* Secure login view */}
                      <IdentityVerification onVerifySuccess={handleVerificationSuccess} />
                    </div>
                  )
                ) : (
                  <>
                    {activeView === 'home' && (
                  <Dashboard
                    records={records}
                    isVerified={isVerified}
                    onUploadClick={() => setIsUploadOpen(true)}
                    onLinkHealthIdClick={() => handleTabChange('records')}
                    onEmergencyClick={() => setActiveView('emergency')}
                    onSelectRecord={handleSelectRecord}
                  />
                )}

                {activeView === 'verify' && (
                  <IdentityVerification onVerifySuccess={handleVerificationSuccess} />
                )}

                {activeView === 'emergency' && (
                  <EmergencyDashboard onTimerExpire={handleEmergencyTimerExpire} isVerified={isVerified} />
                )}

                {activeView === 'records' && isVerified && (
                  <div className="bg-slate-50 min-h-[calc(100vh-140px)] py-6 px-4 md:px-8 animate-fade-in">
                    <div className="max-w-7xl mx-auto space-y-6">
                      <div className="space-y-1">
                        <h2 className="text-2xl font-bold tracking-tight text-slate-900">Your Medical Records Vault</h2>
                        <p className="text-xs text-slate-500">Decrypting records dynamically from clinical nodes. Auth principal matches authenticated ID.</p>
                      </div>

                      {/* Decryption status */}
                      <div className="p-4 bg-green-50 border border-green-200 rounded-2xl flex items-center space-x-3.5 text-green-800 text-xs shadow-sm">
                        <ShieldCheck className="h-5.5 w-5.5 text-green-600 flex-shrink-0 animate-pulse" />
                        <div>
                          <span className="font-bold block">Biometric Decryption Active</span>
                          You have full authorized access to the patient records. Credentials verified via OTP.
                        </div>
                      </div>

                      {/* Active records */}
                      <div className="space-y-3">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Available Encrypted Files ({records.length})</span>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                          {records.map((rec) => (
                            <div
                              key={rec.id}
                              onClick={() => setSelectedRecord(rec)}
                              className="bg-white border border-slate-200 rounded-xl p-4 hover:border-teal-500 hover:shadow-sm transition-all flex items-center justify-between group cursor-pointer animate-fade-in"
                            >
                              <div className="flex items-center space-x-3">
                                <div className="p-2.5 bg-teal-50 text-teal-600 rounded-xl">
                                  <FileText className="h-5.5 w-5.5" />
                                </div>
                                <div>
                                  <h4 className="font-bold text-xs text-slate-900 group-hover:text-teal-600 transition-colors">{rec.title}</h4>
                                  <p className="text-[10px] text-slate-400 mt-1">{rec.facility} · {rec.date}</p>
                                </div>
                              </div>
                              <span className="text-[9px] font-bold font-mono text-teal-700 bg-teal-50 border border-teal-100 rounded px-2 py-0.5">
                                {rec.encryption}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Hospital Records Portal Section */}
                      <div className="space-y-4 border-t border-slate-200/80 pt-6">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Hospital-Direct Repositories</span>
                          {viewingHospitalRecords && (
                            <button
                              id="btn-back-to-vault"
                              onClick={() => setViewingHospitalRecords(false)}
                              className="text-xs font-bold text-teal-600 hover:text-teal-700 select-none bg-white border border-slate-200 px-3 py-1.5 rounded-xl shadow-sm hover:shadow transition-all flex items-center space-x-1 cursor-pointer active:scale-95"
                            >
                              <span>← Back to Vault Files</span>
                            </button>
                          )}
                        </div>

                        {!viewingHospitalRecords ? (
                          <div
                            id="card-hospital-portal"
                            onClick={() => setViewingHospitalRecords(true)}
                            className="bg-gradient-to-r from-slate-900 to-slate-950 text-white border border-slate-800 rounded-2xl p-6 hover:shadow-lg transition-all cursor-pointer group flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
                          >
                            <div className="flex items-start space-x-4">
                              <div className="p-3 bg-white/10 text-teal-400 rounded-2xl group-hover:bg-teal-600 group-hover:text-white transition-all shadow-inner">
                                <Database className="h-6 w-6" />
                              </div>
                              <div className="space-y-1">
                                <h3 className="font-extrabold text-sm text-slate-100 uppercase tracking-wide">Access Connected Hospital Records</h3>
                                <p className="text-xs text-slate-400 max-w-2xl leading-relaxed font-sans">
                                  Secure, multi-facility federated gateways linking diagnostics from <span className="font-semibold text-slate-200">Apollo</span>, <span className="font-semibold text-slate-200">ACS Hospital</span>, and <span className="font-semibold text-slate-200">Kauvery</span> directly to Patient V Rahul.
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center space-x-1.5 text-teal-400 group-hover:text-white font-bold text-xs select-none uppercase tracking-wider font-mono bg-white/5 group-hover:bg-teal-600/20 px-3.5 py-2 rounded-xl border border-white/5 transition-all">
                              <span>Enter Portal</span>
                              <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                            </div>
                          </div>
                        ) : (
                          <div className="space-y-6">
                            {/* Hospital Listing Grid */}
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                              {hospitalRecords.map((hospital) => (
                                <div
                                  key={hospital.id}
                                  id={`card-hospital-${hospital.id}`}
                                  className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between min-h-[340px]"
                                >
                                  <div className="space-y-4">
                                    {/* Hospital Brand Header */}
                                    <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                                      <div>
                                        <h4 className="font-black text-xs text-slate-900 tracking-tight uppercase">{hospital.hospitalName}</h4>
                                        <span className="text-[9px] font-bold text-slate-400 mt-0.5 block font-mono">ID: {hospital.id}</span>
                                      </div>
                                      <div className="p-2 bg-slate-50 border border-slate-100 text-teal-600 rounded-xl font-mono text-[9px] font-bold">
                                        {hospital.fileSize}
                                      </div>
                                    </div>

                                    {/* Demographics */}
                                    <div className="grid grid-cols-2 gap-2 text-[10px] bg-slate-50 p-2.5 rounded-xl border border-slate-100/50">
                                      <div>
                                        <span className="text-slate-400 block font-semibold uppercase tracking-wider text-[8px]">Patient Name</span>
                                        <span className="font-bold text-slate-800">{hospital.patientName}</span>
                                      </div>
                                      <div>
                                        <span className="text-slate-400 block font-semibold uppercase tracking-wider text-[8px]">Visit Date</span>
                                        <span className="font-bold text-slate-800">{hospital.visitedDate}</span>
                                      </div>
                                      <div className="col-span-2 pt-1 border-t border-slate-100">
                                        <span className="text-slate-400 block font-semibold uppercase tracking-wider text-[8px]">Attending Physician</span>
                                        <span className="font-bold text-slate-800">{hospital.provider}</span>
                                      </div>
                                    </div>

                                    {/* Diagnosis Block */}
                                    <div className="space-y-1 bg-rose-50/20 border border-rose-100/30 p-3 rounded-xl">
                                      <span className="text-[8px] font-bold text-rose-500 uppercase tracking-widest block font-mono">Clinical Diagnosis</span>
                                      <p className="text-xs font-extrabold text-slate-900 leading-snug">{hospital.diagnosis}</p>
                                    </div>
                                  </div>

                                  {/* AI Summarizer Block */}
                                  <div className="pt-4 border-t border-slate-100 mt-4">
                                    {generatingId === hospital.id ? (
                                      <div className="flex flex-col items-center justify-center p-4 space-y-2 bg-teal-50/30 border border-teal-150 rounded-2xl border-dashed">
                                        <RefreshCw className="h-5 w-5 text-teal-600 animate-spin" />
                                        <span className="text-[9px] font-bold text-teal-700 animate-pulse font-mono uppercase tracking-wider">Decrypting Hospital Vault...</span>
                                      </div>
                                    ) : hospital.isGenerated ? (
                                      <div className="space-y-3">
                                        <div className="flex items-center space-x-1.5 text-emerald-600 text-[10px] font-bold bg-emerald-50 border border-emerald-100 px-2.5 py-1 rounded-lg w-max">
                                          <Check className="h-3.5 w-3.5 text-emerald-500 stroke-[3px]" />
                                          <span>AI CLINICAL REPORT ACTIVE</span>
                                        </div>
                                        <div className="space-y-2 text-xs">
                                          <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                                            <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest block mb-0.5">Clinical Insight Summary</span>
                                            <p className="text-slate-700 leading-relaxed text-[11px] font-medium">{hospital.summaryText}</p>
                                          </div>
                                          <div className="bg-teal-50/10 p-3 rounded-xl border border-teal-100/30">
                                            <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest block mb-0.5">Patient Explanation</span>
                                            <p className="text-slate-600 leading-relaxed text-[11px] italic font-normal">"{hospital.patientExplanation}"</p>
                                          </div>
                                          <div className="flex flex-wrap gap-1">
                                            {hospital.medications.map((m, idx) => (
                                              <span key={idx} className="px-2 py-0.5 bg-teal-50 border border-teal-100 text-teal-700 rounded text-[8px] font-bold uppercase font-mono">{m}</span>
                                            ))}
                                            {hospital.diagnosesList.map((d, idx) => (
                                              <span key={idx} className="px-2 py-0.5 bg-rose-50 border border-rose-100 text-rose-700 rounded text-[8px] font-bold uppercase font-mono">{d}</span>
                                            ))}
                                          </div>
                                        </div>
                                      </div>
                                    ) : (
                                      <button
                                        id={`btn-generate-${hospital.id}`}
                                        onClick={() => handleGenerateSummary(hospital.id)}
                                        className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs py-2.5 px-4 rounded-xl transition-all shadow-md shadow-teal-600/15 flex items-center justify-center space-x-2 cursor-pointer active:scale-95 hover:shadow-lg"
                                      >
                                        <Sparkles className="h-3.5 w-3.5 text-teal-200" />
                                        <span>GENERATE AI SUMMARY</span>
                                      </button>
                                    )}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {activeView === 'ai' && isVerified && (
                  <div className="bg-slate-50 min-h-[calc(100vh-140px)] py-6 px-4 md:px-8 animate-fade-in">
                    <div className="max-w-7xl mx-auto space-y-6">
                      <div className="space-y-1">
                        <h2 className="text-2xl font-bold tracking-tight text-slate-900">AI Medical Insights Engine</h2>
                        <p className="text-xs text-slate-500 font-medium">Aggregated real-time report structures and diagnostic trends.</p>
                      </div>

                      {/* Pipeline health metrics */}
                      <div className="grid grid-cols-3 gap-4 font-sans">
                        <div className="bg-white border border-slate-200 p-4 rounded-xl text-center shadow-sm">
                          <span className="text-[10px] font-bold text-slate-400 uppercase block">Analyzed Reports</span>
                          <span className="text-2xl font-extrabold text-teal-600 mt-1 block">{records.length + hospitalRecords.filter(h => h.isGenerated).length}</span>
                        </div>
                        <div className="bg-white border border-slate-200 p-4 rounded-xl text-center shadow-sm">
                          <span className="text-[10px] font-bold text-slate-400 uppercase block">Extracted Entities</span>
                          <span className="text-2xl font-extrabold text-teal-600 mt-1 block">{(records.length + hospitalRecords.filter(h => h.isGenerated).length) * 4}</span>
                        </div>
                        <div className="bg-white border border-slate-200 p-4 rounded-xl text-center shadow-sm">
                          <span className="text-[10px] font-bold text-slate-400 uppercase block">Accuracy Rating</span>
                          <span className="text-2xl font-extrabold text-emerald-600 mt-1 block">99.8%</span>
                        </div>
                      </div>

                      {/* Overall AI Summary Block */}
                      <div className="bg-gradient-to-br from-slate-900 via-teal-950 to-slate-900 text-white rounded-2xl p-6 shadow-xl border border-teal-800/40 relative overflow-hidden animate-fade-in font-sans">
                        <div className="absolute top-0 right-0 p-8 opacity-5">
                          <Activity className="h-40 w-40" />
                        </div>
                        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                          <div className="space-y-2 max-w-2xl">
                            <div className="flex items-center space-x-2">
                              <span className="px-2 py-0.5 bg-teal-500/20 text-teal-300 rounded-md text-[9px] font-bold uppercase tracking-widest border border-teal-500/30 font-mono">CONSOLIDATED MULTI-HOSPITAL AGGREGATION</span>
                              <span className="text-slate-500 text-xs">•</span>
                              <span className="text-slate-300 text-xs font-medium">Patient: V Rahul</span>
                            </div>
                            <h3 className="text-xl font-bold tracking-tight">Overall Multi-Hospital Synthesis</h3>
                            <p className="text-xs text-slate-300 leading-relaxed">
                              Synthesize medical reports, physiological systems, drug-drug compatibility, and lifestyle guidelines from all three connected nodes (Apollo, ACS, Kauvery) into one unified clinical diagnostic profile.
                            </p>
                          </div>
                          <div className="flex-shrink-0 self-start md:self-center">
                            {overallSummaryState === 'idle' && (
                              <button
                                id="btn-overall-summary-trigger"
                                onClick={handleGenerateOverallSummary}
                                className="bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 text-slate-950 font-extrabold text-xs py-3 px-6 rounded-xl transition-all shadow-lg hover:shadow-teal-500/20 flex items-center space-x-2 cursor-pointer active:scale-95"
                              >
                                <Sparkles className="h-4 w-4 text-slate-950" />
                                <span>OVERALL AI SUMMARY</span>
                              </button>
                            )}
                            {overallSummaryState === 'generating' && (
                              <button
                                disabled
                                className="bg-slate-800 text-slate-400 font-extrabold text-xs py-3 px-6 rounded-xl border border-slate-700 flex items-center space-x-2 cursor-not-allowed"
                              >
                                <RefreshCw className="h-4 w-4 animate-spin text-teal-400" />
                                <span>COMPUTING MULTI-SYSTEM DATA...</span>
                              </button>
                            )}
                            {overallSummaryState === 'completed' && (
                              <button
                                onClick={handleGenerateOverallSummary}
                                className="bg-slate-800 hover:bg-slate-700 text-slate-200 font-extrabold text-xs py-3 px-6 rounded-xl border border-slate-700 transition-all flex items-center space-x-2 cursor-pointer active:scale-95"
                              >
                                <RefreshCw className="h-4 w-4 text-teal-400" />
                                <span>RE-GENERATE SUMMARY</span>
                              </button>
                            )}
                          </div>
                        </div>

                        {/* Rendering the generated Consolidated Summary */}
                        {overallSummaryState === 'completed' && (
                          <div className="mt-6 border-t border-slate-800/80 pt-6 space-y-6 animate-fade-in text-slate-100 font-sans">
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                              {/* Left column: Clinical Narrative & Multi-System Profile */}
                              <div className="lg:col-span-2 space-y-4">
                                <div className="bg-slate-950/40 rounded-xl p-5 border border-slate-800/60 space-y-3">
                                  <div className="flex items-center space-x-2">
                                    <FileText className="h-4 w-4 text-teal-400" />
                                    <h4 className="font-bold text-xs text-teal-300 uppercase tracking-wider font-sans">Executive Clinical Narrative</h4>
                                  </div>
                                  <p className="text-xs text-slate-350 leading-relaxed font-normal font-sans">
                                    Patient <span className="font-semibold text-white">V Rahul</span> exhibits a complex, multi-system health profile requiring careful coordination. Currently, there are active indicators across three distinct physiological systems:
                                  </p>
                                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
                                    <div className="p-3 bg-rose-950/20 border border-rose-900/30 rounded-lg">
                                      <span className="text-[9px] font-bold text-rose-400 uppercase tracking-wider block font-mono">Respiratory System</span>
                                      <p className="text-[11px] text-slate-300 mt-1 leading-relaxed">Subacute Bronchitis combined with Mild Asthma Exacerbation, causing a persistent bronchial cough.</p>
                                    </div>
                                    <div className="p-3 bg-amber-950/20 border border-amber-900/30 rounded-lg">
                                      <span className="text-[9px] font-bold text-amber-400 uppercase tracking-wider block font-mono">Gastrointestinal System</span>
                                      <p className="text-[11px] text-slate-300 mt-1 leading-relaxed">Mild Mucosal Gastritis and Gastroesophageal Reflux Disease (GERD) with esophageal sphincter laxity.</p>
                                    </div>
                                    <div className="p-3 bg-teal-950/20 border border-teal-900/30 rounded-lg">
                                      <span className="text-[9px] font-bold text-teal-400 uppercase tracking-wider block font-mono">Metabolic & Cardio</span>
                                      <p className="text-[11px] text-slate-300 mt-1 leading-relaxed">Stage 1 Essential Hypertension coupled with stable, controlled Type 2 Diabetes Mellitus.</p>
                                    </div>
                                  </div>
                                </div>

                                <div className="bg-slate-950/40 rounded-xl p-5 border border-slate-800/60 space-y-3">
                                  <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-2">
                                      <AlertTriangle className="h-4 w-4 text-amber-400 animate-pulse" />
                                      <h4 className="font-bold text-xs text-amber-300 uppercase tracking-wider">Clinical Pharmacology & Drug-Drug Safety Alert</h4>
                                    </div>
                                    <span className="px-2 py-0.5 bg-amber-500/10 border border-amber-500/30 text-amber-400 rounded text-[9px] font-bold uppercase font-mono">HIGH PRIORITY</span>
                                  </div>
                                  <div className="space-y-2.5 text-xs">
                                    <div className="flex items-start space-x-2.5 bg-slate-950/60 p-3 rounded-lg border-l-2 border-amber-500">
                                      <div className="bg-amber-500/10 p-1 rounded text-amber-400 font-mono text-[9px] font-bold">SPACING</div>
                                      <div className="space-y-0.5">
                                        <h5 className="font-bold text-[11px] text-white">Sucralfate Absorption Binding (Crucial Interaction)</h5>
                                        <p className="text-[11px] text-slate-300 leading-relaxed">
                                          Sucralfate suspension forms a protective barrier in the stomach but is a heavy chelating agent. It will <span className="text-amber-300 font-semibold">significantly impair the systemic absorption of Metformin and Lisinopril</span> if taken together. 
                                          <span className="text-emerald-400 font-medium"> Clinical Action:</span> Administer Lisinopril and Metformin at least 2 hours BEFORE or 4-6 hours AFTER Sucralfate.
                                        </p>
                                      </div>
                                    </div>
                                    <div className="flex items-start space-x-2.5 bg-slate-950/60 p-3 rounded-lg border-l-2 border-teal-500">
                                      <div className="bg-teal-500/10 p-1 rounded text-teal-400 font-mono text-[9px] font-bold">TIMING</div>
                                      <div className="space-y-0.5">
                                        <h5 className="font-bold text-[11px] text-white">Proton Pump Inhibitor (Pantoprazole) Optimization</h5>
                                        <p className="text-[11px] text-slate-300 leading-relaxed">
                                          Pantoprazole 40mg must be taken strictly on an empty stomach 30 to 60 minutes before breakfast to ensure effective proton pump blockade prior to acid secretion stimulus.
                                        </p>
                                      </div>
                                    </div>
                                    <div className="flex items-start space-x-2.5 bg-slate-950/60 p-3 rounded-lg border-l-2 border-rose-500">
                                      <div className="bg-rose-500/10 p-1 rounded text-rose-400 font-mono text-[9px] font-bold">HYGIENE</div>
                                      <div className="space-y-0.5">
                                        <h5 className="font-bold text-[11px] text-white">Inhaled Corticosteroid Washout Protocol</h5>
                                        <p className="text-[11px] text-slate-300 leading-relaxed">
                                          Budesonide 200mcg inhalation therapy can cause localized immunosuppression in the pharynx, leading to oral candidiasis (thrush). 
                                          <span className="text-rose-400 font-medium"> Clinical Action:</span> Instruct the patient to rinse their mouth and spit thoroughly with warm water immediately after each inhalation.
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              {/* Right column: Consolidated Medication Map & Lifestyle */}
                              <div className="space-y-4">
                                <div className="bg-slate-950/40 rounded-xl p-5 border border-slate-800/60 space-y-3">
                                  <div className="flex items-center space-x-2">
                                    <Pill className="h-4 w-4 text-emerald-400" />
                                    <h4 className="font-bold text-xs text-emerald-300 uppercase tracking-wider">Consolidated Medication Schedule</h4>
                                  </div>
                                  <div className="space-y-2">
                                    <div className="bg-slate-950/80 p-2.5 rounded-lg border border-slate-800/60 flex justify-between items-center">
                                      <div>
                                        <span className="text-[10px] font-bold text-white block font-sans">Pantoprazole 40mg</span>
                                        <span className="text-[9px] text-slate-400">1x Daily (Empty stomach)</span>
                                      </div>
                                      <span className="px-2 py-0.5 bg-blue-500/10 text-blue-300 rounded text-[9px] font-bold uppercase font-mono">Morning</span>
                                    </div>
                                    <div className="bg-slate-950/80 p-2.5 rounded-lg border border-slate-800/60 flex justify-between items-center">
                                      <div>
                                        <span className="text-[10px] font-bold text-white block font-sans">Metformin 500mg</span>
                                        <span className="text-[9px] text-slate-400">2x Daily (With breakfast/dinner)</span>
                                      </div>
                                      <span className="px-2 py-0.5 bg-orange-500/10 text-orange-300 rounded text-[9px] font-bold uppercase font-mono">With Meals</span>
                                    </div>
                                    <div className="bg-slate-950/80 p-2.5 rounded-lg border border-slate-800/60 flex justify-between items-center">
                                      <div>
                                        <span className="text-[10px] font-bold text-white block font-sans">Lisinopril 10mg</span>
                                        <span className="text-[9px] text-slate-400">1x Daily (Consistent timing)</span>
                                      </div>
                                      <span className="px-2 py-0.5 bg-purple-500/10 text-purple-300 rounded text-[9px] font-bold uppercase font-mono">Once Daily</span>
                                    </div>
                                    <div className="bg-slate-950/80 p-2.5 rounded-lg border border-slate-800/60 flex justify-between items-center">
                                      <div>
                                        <span className="text-[10px] font-bold text-white block font-sans">Budesonide 200mcg</span>
                                        <span className="text-[9px] text-slate-400">Inhaler (2x Daily, rinse post-dose)</span>
                                      </div>
                                      <span className="px-2 py-0.5 bg-teal-500/10 text-teal-300 rounded text-[9px] font-bold uppercase font-mono">BID</span>
                                    </div>
                                    <div className="bg-slate-950/80 p-2.5 rounded-lg border border-slate-800/60 flex justify-between items-center">
                                      <div>
                                        <span className="text-[10px] font-bold text-white block font-sans">Sucralfate 10ml</span>
                                        <span className="text-[9px] text-slate-400">As Needed (Space 2 hrs from drugs)</span>
                                      </div>
                                      <span className="px-2 py-0.5 bg-red-500/10 text-red-300 rounded text-[9px] font-bold uppercase font-mono">PRN</span>
                                    </div>
                                  </div>
                                </div>

                                <div className="bg-slate-950/40 rounded-xl p-5 border border-slate-800/60 space-y-3 font-sans">
                                  <div className="flex items-center space-x-2">
                                    <CheckCircle2 className="h-4 w-4 text-teal-400" />
                                    <h4 className="font-bold text-xs text-teal-300 uppercase tracking-wider">Lifestyle Synergy Guidelines</h4>
                                  </div>
                                  <ul className="space-y-2 text-[11px] text-slate-300 list-disc list-inside">
                                    <li><strong className="text-white">Sodium & Glycemic Control:</strong> Limit total daily sodium to &lt;2000mg and emphasize low-glycemic, whole foods to keep HbA1c (6.9%) and BP (138/88) stable.</li>
                                    <li><strong className="text-white">Anti-Reflux Posture:</strong> Avoid laying flat for at least 3 hours after eating to let the stomach empty and prevent acid reflux flare-ups.</li>
                                    <li><strong className="text-white">Airway Care:</strong> Steer clear of cold air drafts, smoke, dust, and sudden temperature shifts which trigger asthmatic hyper-responsiveness.</li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Summaries quick review list */}
                      <div className="space-y-3">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">AI-Generated Summaries</span>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                          {records.map((rec) => (
                            <div key={rec.id} className="bg-white border border-slate-200 rounded-xl p-4 space-y-3 shadow-sm hover:border-slate-350 transition-colors">
                              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                                <h4 className="font-bold text-xs text-slate-955">{rec.title}</h4>
                                <span className="text-[9px] font-mono text-slate-400">ID: {rec.id}</span>
                              </div>
                              <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-lg border border-slate-100 min-h-[80px]">
                                {rec.summary.text}
                              </p>
                              <div className="flex flex-wrap gap-1">
                                {rec.summary.medications.map((m, i) => (
                                  <span key={i} className="px-2 py-0.5 bg-teal-50 border border-teal-100 text-teal-700 rounded text-[9px] font-bold uppercase">{m}</span>
                                ))}
                                {rec.summary.diagnoses.map((d, i) => (
                                  <span key={i} className="px-2 py-0.5 bg-teal-50 border border-teal-100 text-teal-700 rounded text-[9px] font-bold uppercase">{d}</span>
                                ))}
                              </div>
                            </div>
                          ))}

                          {/* Dynamically append generated hospital records! */}
                          {hospitalRecords.map((hospital) => {
                            if (!hospital.isGenerated) return null;
                            return (
                              <div key={hospital.id} className="bg-gradient-to-br from-teal-50/10 to-white border border-teal-200 rounded-xl p-4 space-y-3 shadow-sm hover:border-teal-300 transition-colors relative overflow-hidden animate-fade-in">
                                <div className="absolute top-0 right-0">
                                  <span className="text-[8px] font-bold bg-teal-600 text-white px-2 py-0.5 rounded-bl shadow-sm uppercase tracking-wider font-mono">HOSPITAL SYNC</span>
                                </div>
                                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                                  <div>
                                    <h4 className="font-extrabold text-xs text-slate-900">{hospital.hospitalName} - AI Insight</h4>
                                    <p className="text-[9px] text-slate-400 mt-0.5">Visited Date: {hospital.visitedDate}</p>
                                  </div>
                                  <span className="text-[9px] font-mono text-slate-400 pr-16 font-semibold">ID: {hospital.id}</span>
                                </div>
                                <div className="space-y-2">
                                  <div className="bg-rose-50/30 border border-rose-100/20 p-2 rounded-lg text-[10px]">
                                    <span className="text-[8px] font-bold text-rose-500 uppercase tracking-widest block font-mono">Diagnosis</span>
                                    <span className="font-bold text-slate-800">{hospital.diagnosis}</span>
                                  </div>
                                  <div className="bg-slate-50/80 p-3 rounded-lg border border-slate-100/60 min-h-[80px]">
                                    <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest block mb-0.5">Clinical Insight Summary</span>
                                    <p className="text-xs text-slate-600 leading-relaxed font-medium">
                                      {hospital.summaryText}
                                    </p>
                                  </div>
                                  <div className="bg-teal-50/15 p-2.5 rounded-lg border border-teal-100/20 italic text-[11px] text-slate-500">
                                    "{hospital.patientExplanation}"
                                  </div>
                                </div>
                                <div className="flex flex-wrap gap-1">
                                  {hospital.medications.map((m, i) => (
                                    <span key={i} className="px-1.5 py-0.5 bg-teal-50 border border-teal-100 text-teal-700 rounded text-[9px] font-bold uppercase font-mono">{m}</span>
                                  ))}
                                  {hospital.diagnosesList.map((d, i) => (
                                    <span key={i} className="px-1.5 py-0.5 bg-rose-50 border border-rose-100 text-rose-700 rounded text-[9px] font-bold uppercase font-mono">{d}</span>
                                  ))}
                                </div>
                              </div>
                            );
                          })}

                          {hospitalRecords.every((h) => !h.isGenerated) && (
                            <div className="bg-white border-2 border-dashed border-slate-200 rounded-xl p-6 flex flex-col items-center justify-center text-center min-h-[160px] col-span-full">
                              <Sparkles className="h-6 w-6 text-slate-300 mb-1.5 animate-pulse" />
                              <h4 className="font-extrabold text-xs text-slate-700">Hospital Summaries Pending</h4>
                              <p className="text-[10px] text-slate-400 max-w-sm mt-1 leading-relaxed">
                                No hospital-direct reports have been decrypted yet. Go to the <span className="font-bold text-teal-600 underline cursor-pointer" onClick={() => { setViewingHospitalRecords(true); setActiveView('records'); }}>Medical Records Vault</span>, and click "Generate AI Summary" on any of the connected hospital gate nodes (Apollo, ACS, Kauvery) to trigger real-time decryption.
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeView === 'current-drugs' && isVerified && (
                  <CurrentDrugs />
                )}

                {activeView === 'ai-drugs-predictor' && isVerified && (
                  <AiDrugsPredictor />
                )}

                {activeView === 'profile' && (
                  <div className="bg-slate-50 min-h-[calc(100vh-140px)] py-6 px-4 md:px-8 animate-fade-in">
                    <div className="max-w-7xl mx-auto space-y-6">
                      
                      {isVerified ? (
                        /* Patient demographic view (Logged In) */
                        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                              <div className="h-12 w-12 bg-teal-600 text-white rounded-2xl flex items-center justify-center font-bold text-lg shadow-lg">
                                VR
                              </div>
                              <div>
                                <h3 className="font-bold text-slate-900 text-base">V Rahul</h3>
                                <p className="text-xs text-slate-400 font-mono">ID: CV-88122-PT · Phone: +91 76959 72940</p>
                              </div>
                            </div>
                            <button
                              onClick={handleLogout}
                              className="flex items-center space-x-1.5 px-3 py-1.5 bg-rose-50 text-rose-600 hover:bg-rose-100 hover:text-rose-700 rounded-xl text-xs font-bold transition-all cursor-pointer select-none border border-rose-100"
                            >
                              <LogOut className="h-3.5 w-3.5" />
                              <span>Log Out</span>
                            </button>
                          </div>

                          <div className="grid grid-cols-2 gap-3 text-xs border-t border-slate-100 pt-4 font-sans font-medium">
                            <div>
                              <span className="text-slate-400 block">Date of Birth</span>
                              <span className="font-bold text-slate-800">July 24, 1988</span>
                            </div>
                            <div>
                              <span className="text-slate-400 block">Linked Systems</span>
                              <span className="font-bold text-slate-800">Quest, LabCorp, Apollo Hospital</span>
                            </div>
                          </div>
                        </div>
                      ) : (
                        /* Locked Profile View (Logged Out) */
                        <div className="bg-white border border-slate-200 rounded-2xl p-6 text-center shadow-sm space-y-4">
                          <div className="h-14 w-14 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto shadow-inner">
                            <Lock className="h-6 w-6" />
                          </div>
                          <div className="space-y-1">
                            <h3 className="font-bold text-slate-955 text-base">Profile Encrypted</h3>
                            <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">
                              You are currently logged out. To protect private patient data, full demographic profile details are secured.
                            </p>
                          </div>
                          <button
                            onClick={() => setActiveView('verify')}
                            className="inline-flex items-center space-x-2 bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs py-2.5 px-5 rounded-xl transition-all cursor-pointer shadow-lg shadow-teal-600/15 active:scale-95"
                          >
                            <ShieldCheck className="h-4 w-4" />
                            <span>Verify Identity & Log In</span>
                          </button>
                        </div>
                      )}

                      {/* Interactive Admin Logs */}
                      <div className="bg-slate-950 text-white rounded-2xl border border-slate-850 overflow-hidden shadow-lg">
                        <div className="p-4 bg-slate-900 border-b border-slate-850 flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Terminal className="h-4.5 w-4.5 text-teal-400 animate-pulse" />
                            <h3 className="font-bold text-xs text-slate-200 uppercase tracking-wider">Immutable Security Audit Logs</h3>
                          </div>
                          <span className="text-[9px] font-bold font-mono bg-slate-950 text-emerald-500 border border-emerald-500/20 px-2 py-0.5 rounded">
                            SHA-256 HASH-CHAINING ACTIVE
                          </span>
                        </div>

                        {!adminUnlocked ? (
                          <div className="p-6 text-center space-y-4">
                            <p className="text-xs text-slate-400 max-w-xs mx-auto font-sans font-medium">Access restricted to authorized Security Officers. Enter credential passcode <span className="font-mono text-teal-400 bg-slate-900 px-1 rounded">12345</span> to unlock.</p>
                            <div className="flex max-w-xs mx-auto space-x-2">
                              <input
                                type="password"
                                placeholder="Security Passcode"
                                value={adminPasswordInput}
                                onChange={(e) => setAdminPasswordInput(e.target.value)}
                                className="flex-1 bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-teal-500 text-white font-mono"
                              />
                              <button
                                onClick={() => {
                                  if (adminPasswordInput === '12345') {
                                    setAdminUnlocked(true);
                                  } else {
                                    alert('Access Denied. Violation reported to security node.');
                                  }
                                }}
                                className="bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold px-4 py-1.5 rounded-lg active:scale-95 transition-all cursor-pointer"
                              >
                                Unlock
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div className="space-y-4 pb-4">
                            {/* Statistics Grid */}
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 bg-slate-900/50 border-b border-slate-850 text-left">
                              <div className="bg-slate-900 border border-slate-800 p-3 rounded-xl space-y-1">
                                <div className="flex items-center space-x-1.5 text-teal-400">
                                  <Users className="h-4 w-4" />
                                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Patient IDs</span>
                                </div>
                                <div className="text-sm font-mono font-bold text-slate-200">1 Active ID</div>
                                <div className="text-[9px] text-slate-500 font-mono truncate">CV-88122-PT</div>
                              </div>

                              <div className="bg-slate-900 border border-slate-800 p-3 rounded-xl space-y-1">
                                <div className="flex items-center space-x-1.5 text-emerald-400">
                                  <Activity className="h-4 w-4" />
                                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Session Vitals</span>
                                </div>
                                <div className="text-sm font-mono font-bold text-slate-200 flex items-center space-x-1.5">
                                  <span className="text-teal-400 font-bold">L: {logs.filter(l => l.action === 'MFA DECRYPTION UNLOCK' && l.status === 'SUCCESS').length}</span>
                                  <span className="text-slate-600">|</span>
                                  <span className="text-rose-450 font-bold">O: {logs.filter(l => l.action === 'SECURE LOGOUT' && l.status === 'SUCCESS').length}</span>
                                </div>
                                <div className="text-[9px] text-slate-500 font-mono">Logins & Logouts</div>
                              </div>

                              <div className="bg-slate-900 border border-slate-800 p-3 rounded-xl space-y-1">
                                <div className="flex items-center space-x-1.5 text-teal-400">
                                  <Database className="h-4 w-4" />
                                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">EHR Ingestion</span>
                                </div>
                                <div className="text-sm font-mono font-bold text-slate-200">{records.length} Reports</div>
                                <div className="text-[9px] text-slate-500 font-mono">Hospital Sync Active</div>
                              </div>
                            </div>

                            {/* Reports Added by Hospital */}
                            <div className="px-4 py-1 space-y-3 text-left">
                              <div className="flex items-center justify-between">
                                <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono">Hospital Ingestion Log</h4>
                                <span className="text-[9px] text-slate-500 font-mono">Auto-Timestamped</span>
                              </div>
                              <div className="bg-slate-900/40 border border-slate-900 rounded-xl overflow-hidden divide-y divide-slate-900 max-h-56 overflow-y-auto">
                                {records.map((rec) => (
                                  <div key={rec.id} className="p-3 flex items-center justify-between hover:bg-slate-900/20 transition-colors">
                                    <div className="space-y-1 pr-2 min-w-0">
                                      <div className="text-xs font-bold text-slate-200 truncate">{rec.title}</div>
                                      <div className="text-[10px] text-slate-400 flex items-center space-x-1.5 truncate">
                                        <span className="bg-teal-950/40 border border-teal-900/45 text-teal-400 px-1.5 py-0.2 rounded font-mono text-[9px] uppercase flex-shrink-0">{rec.facility}</span>
                                        <span className="text-slate-500">· Dr. {rec.provider}</span>
                                      </div>
                                    </div>
                                    <div className="text-right space-y-0.5 flex-shrink-0">
                                      <div className="text-[10px] font-mono font-medium text-slate-300">{rec.date}</div>
                                      <div className="text-[9px] font-mono text-emerald-500 uppercase tracking-wider font-extrabold">{rec.encryption} verified</div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* Raw Activity Logs Stream */}
                            <div className="border-t border-slate-900 pt-3 text-left">
                              <div className="px-4 py-2 bg-slate-900/20 flex items-center justify-between border-b border-slate-900">
                                <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono">Raw Secure Event Stream</h4>
                                <span className="text-[9px] font-mono text-slate-500">{logs.length} Events Listed</span>
                              </div>
                              <div className="divide-y divide-slate-900 max-h-56 overflow-y-auto">
                                {logs.map((log) => (
                                  <div key={log.id} className="p-3.5 space-y-2 text-[11px] font-mono hover:bg-slate-900/30 transition-colors">
                                    <div className="flex items-center justify-between text-slate-400">
                                      <span className="font-bold text-teal-450">{log.action}</span>
                                      <span>{log.id}</span>
                                    </div>
                                    <p className="text-slate-300">
                                      <span className="text-slate-400 font-semibold">Actor:</span> {log.actor} ({log.role})
                                    </p>
                                    {log.justification && (
                                      <p className="text-slate-400 leading-normal bg-slate-900/50 p-2 rounded border border-slate-900 italic">
                                        &ldquo;{log.justification}&rdquo;
                                      </p>
                                    )}
                                    <div className="flex items-center justify-between text-slate-500 text-[10px]">
                                      <span>IP: {log.ipAddress}</span>
                                      <span>{new Date(log.timestamp).toLocaleString()}</span>
                                      <span className="font-extrabold text-emerald-500">{log.status}</span>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>

                    </div>
                  </div>
                )}
                  </>
                )}
              </>
            )}

          </div>
        )}
      </main>
    </div>

      {/* Upload pipeline modal */}
      {isUploadOpen && (
        <UploadModal
          onClose={() => setIsUploadOpen(false)}
          onUploadSuccess={handleUploadSuccess}
        />
      )}

    </div>
  );
}
