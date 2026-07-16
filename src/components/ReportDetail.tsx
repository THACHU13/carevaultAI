import React, { useState } from 'react';
import { MedicalRecord } from '../types';
import { ArrowLeft, Shield, Sparkles, ChevronDown, ChevronUp, Lock, Eye, Download, Share2, MapPin, CheckCircle, FileText, Fingerprint, Globe, ShieldCheck } from 'lucide-react';

interface ReportDetailProps {
  record: MedicalRecord;
  onBack: () => void;
}

export default function ReportDetail({ record, onBack }: ReportDetailProps) {
  const [patientExplanationOpen, setPatientExplanationOpen] = useState(false);
  const [reportBlurred, setReportBlurred] = useState(true);
  const [shareOpen, setShareOpen] = useState(false);
  const [shareDays, setShareDays] = useState(3);
  const [shareLinkGenerated, setShareLinkGenerated] = useState('');
  const [biometricEnabled, setBiometricEnabled] = useState(true);

  const handleShareGenerate = () => {
    // Generate a secure FHIR consent bound share link
    const randomHash = Math.random().toString(36).substring(2, 10);
    const mockLink = `https://carevault.ai/consent/verify?token=cv-con-${record.id.toLowerCase()}-${randomHash}&exp=${shareDays}d`;
    setShareLinkGenerated(mockLink);
  };

  return (
    <div className="bg-[#f8fafc] min-h-[calc(100vh-70px)] py-8 px-4 md:px-8 text-left" id="report-detail">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Navigation / Back Bar */}
        <div className="flex items-center justify-between">
          <button onClick={onBack} className="flex items-center space-x-1.5 text-slate-600 hover:text-slate-900 font-bold text-sm transition-colors cursor-pointer select-none">
            <ArrowLeft className="h-4.5 w-4.5 text-slate-500" />
            <span>Back to Dashboard</span>
          </button>
          
          <div className="flex items-center space-x-1.5 text-xs text-teal-750 font-bold bg-teal-50 border border-teal-100 rounded-full px-3.5 py-1">
            <ShieldCheck className="h-4 w-4 text-teal-600" />
            <span>AES-256 Verified Node</span>
          </div>
        </div>

        {/* Desktop Responsive Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left Column: Core clinical details and documents */}
          <div className="lg:col-span-7 xl:col-span-8 space-y-6">

            {/* Record Header Card */}
            <div className="bg-white border border-slate-200/80 rounded-2xl p-5 md:p-6 shadow-sm space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center space-x-2">
              <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-md bg-teal-600 text-white tracking-wider shadow-sm">
                {record.status}
              </span>
              <span className="text-xs text-slate-400 font-mono font-medium">REF: {record.id}</span>
            </div>
            
            {/* Action buttons */}
            <div className="flex space-x-2">
              <button
                onClick={() => { setShareOpen(!shareOpen); setShareLinkGenerated(''); }}
                className="p-2 border border-slate-200 rounded-xl hover:border-teal-300 hover:bg-teal-50/10 text-slate-600 hover:text-teal-700 transition-colors flex items-center space-x-1.5 text-xs font-bold cursor-pointer select-none active:scale-95"
              >
                <Share2 className="h-4 w-4" />
                <span>Share Securely</span>
              </button>
              <button
                onClick={() => alert('Secure file export initiated. Data downloaded in standardized encrypted FHIR JSON and Signed ZIP format.')}
                className="p-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl transition-colors flex items-center space-x-1.5 text-xs font-bold cursor-pointer select-none active:scale-95 shadow-sm"
              >
                <Download className="h-4 w-4" />
                <span>Export File</span>
              </button>
            </div>
          </div>

          <div className="space-y-1">
            <h1 className="text-xl md:text-2xl font-display font-extrabold text-slate-900 tracking-tight">{record.title}</h1>
            <p className="text-xs md:text-sm text-slate-500 font-sans font-medium">{record.date} • {record.provider}</p>
          </div>

          {/* Secure Share Dropdown */}
          {shareOpen && (
            <div className="p-4 bg-teal-50/30 border border-teal-100 rounded-xl space-y-3.5 animate-fade-in text-left">
              <div className="flex items-center space-x-2">
                <Shield className="h-4.5 w-4.5 text-teal-600" />
                <h4 className="text-xs font-bold text-teal-900 uppercase tracking-wider font-mono">FHIR Cryptographic Consent Manager</h4>
              </div>
              
              {!shareLinkGenerated ? (
                <div className="space-y-3">
                  <p className="text-xs text-slate-600 font-sans leading-relaxed">
                    Generate a temporary, highly secure authorization token to share this document with health providers. This creates a cryptographically signed FHIR <code className="font-mono bg-teal-100/50 text-teal-800 px-1 py-0.5 rounded text-[10px]">Consent</code> profile.
                  </p>
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="text-xs text-slate-500 font-bold">Expiration Period:</span>
                    <div className="flex space-x-1 bg-white border border-slate-200 p-0.5 rounded-lg shadow-inner">
                      {[1, 3, 7, 30].map(d => (
                        <button
                          key={d}
                          onClick={() => setShareDays(d)}
                          className={`px-3 py-1 text-xs font-bold rounded-md transition-colors cursor-pointer select-none ${shareDays === d ? 'bg-teal-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-750'}`}
                        >
                          {d} days
                        </button>
                      ))}
                    </div>
                  </div>
                  <button
                    onClick={handleShareGenerate}
                    className="w-full bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs py-2.5 rounded-xl transition-all cursor-pointer select-none active:scale-95 shadow-md shadow-teal-600/10"
                  >
                    Generate Secure Link
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="bg-white border border-teal-100 p-3 rounded-lg text-xs font-mono text-teal-850 break-all select-all flex items-center justify-between shadow-inner">
                    <span>{shareLinkGenerated}</span>
                  </div>
                  <div className="text-[11px] text-emerald-600 font-bold flex items-center space-x-1 font-sans">
                    <CheckCircle className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                    <span>Consent link created. Access will automatically expire in {shareDays} days.</span>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* AI-Generated Summary card */}
        <div className="bg-white border border-teal-200 border-dashed rounded-2xl p-5 md:p-6 space-y-4 shadow-sm relative overflow-hidden">
          {/* Subtle gradient background */}
          <div className="absolute top-0 right-0 h-24 w-24 bg-teal-500/5 rounded-full blur-2xl pointer-events-none" />

          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center space-x-3.5">
              <div className="h-9 w-9 bg-teal-50 text-teal-600 rounded-xl flex items-center justify-center shadow-sm shrink-0">
                <Sparkles className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-display font-bold text-slate-900 text-sm">AI-Generated Summary</h3>
                <p className="text-[10px] text-slate-400 font-sans font-medium flex items-center space-x-1 mt-0.5">
                  <CheckCircle className="h-3.5 w-3.5 text-emerald-500" />
                  <span>Verified by {record.summary.reviewedBy || 'Dr. Sarah Chen'}</span>
                </p>
              </div>
            </div>
            <span className="text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-md bg-teal-50 text-teal-700 border border-teal-100 font-mono tracking-wider shadow-inner shrink-0">
              {record.summary.accuracy} Clinical Accuracy
            </span>
          </div>

          {/* Core Summary Paragraph */}
          <div className="text-slate-700 text-xs leading-relaxed whitespace-pre-line bg-slate-50/50 p-4 rounded-xl border border-slate-100 font-sans font-medium">
            {record.summary.text.split(' ').map((word, i) => {
              const cleaned = word.replace(/[.,()]/g, '');
              if (cleaned === 'Normal' || cleaned === 'Vitals' || cleaned === 'renal' || cleaned === 'stable') {
                return <span key={i} className="font-bold text-slate-900">{word} </span>;
              }
              if (cleaned === 'LDL' || cleaned === 'cholesterol' || cleaned === 'elevated' || cleaned === 'Hyperglycemia') {
                return <span key={i} className="text-rose-600 font-extrabold">{word} </span>;
              }
              return word + ' ';
            })}
          </div>

          {/* Extracted pills arrays */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div className="space-y-2">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block font-mono">Extracted Medications (RxNorm)</span>
              <div className="flex flex-wrap gap-1.5">
                {record.summary.medications.map((med, idx) => (
                  <span key={idx} className="px-3 py-1 bg-teal-50 border border-teal-100/60 text-teal-700 rounded-full text-xs font-bold font-sans">
                    {med}
                  </span>
                ))}
                {record.summary.medications.length === 0 && (
                  <span className="text-xs text-slate-400 italic font-sans font-medium">No medications recorded in report</span>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block font-mono">Identified Diagnoses (ICD-10)</span>
              <div className="flex flex-wrap gap-1.5">
                {record.summary.diagnoses.map((diag, idx) => (
                  <span key={idx} className="px-3 py-1 bg-teal-50 border border-teal-100/60 text-teal-700 rounded-full text-xs font-bold font-sans">
                    {diag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Patient Friendly Dropdown Accordion */}
        <div className="bg-white border border-slate-200/80 rounded-2xl overflow-hidden shadow-sm">
          <button
            onClick={() => setPatientExplanationOpen(!patientExplanationOpen)}
            className="w-full flex items-center justify-between p-4 bg-slate-50/50 hover:bg-slate-50 transition-colors cursor-pointer select-none"
          >
            <div className="flex items-center space-x-2.5">
              <div className="h-7 w-7 bg-teal-50 text-teal-600 rounded-lg flex items-center justify-center shadow-sm">
                <Globe className="h-4 w-4" />
              </div>
              <span className="font-display font-bold text-slate-800 text-sm">Patient-Friendly Explanation</span>
            </div>
            {patientExplanationOpen ? <ChevronUp className="h-4.5 w-4.5 text-slate-400" /> : <ChevronDown className="h-4.5 w-4.5 text-slate-400" />}
          </button>
          
          {patientExplanationOpen && (
            <div className="p-5 border-t border-slate-100 text-slate-600 text-xs leading-relaxed whitespace-pre-wrap bg-white animate-slide-down font-sans font-medium">
              {record.summary.patientExplanation}
            </div>
          )}
        </div>

        {/* Original Report PDF with Blur Click Reveal */}
        <div className="bg-white border border-slate-200/80 rounded-2xl overflow-hidden shadow-sm space-y-4 p-4 md:p-6">
          <div className="flex items-center justify-between">
            <h3 className="font-display font-bold text-slate-900 text-sm">Original Diagnostic Record</h3>
            <span className="text-xs text-slate-400 font-mono font-medium">Size: {record.fileSize}</span>
          </div>

          {/* Blur box */}
          <div className="relative border border-slate-100 rounded-xl overflow-hidden min-h-[160px] flex items-center justify-center bg-slate-50">
            <div className={`absolute inset-0 bg-slate-100/90 transition-all duration-500 p-6 flex flex-col space-y-3 justify-center ${reportBlurred ? 'backdrop-blur-md' : 'backdrop-blur-none bg-white opacity-100 select-all pointer-events-auto'}`}>
              {reportBlurred ? (
                <div className="flex flex-col items-center justify-center text-center space-y-2.5 max-w-sm mx-auto">
                  <button
                    type="button"
                    onClick={() => setReportBlurred(false)}
                    className="h-10 w-10 bg-slate-900 hover:bg-slate-800 text-white rounded-full flex items-center justify-center shadow-md cursor-pointer hover:scale-105 active:scale-95 transition-transform"
                  >
                    <Lock className="h-4 w-4 text-white" />
                  </button>
                  <h4 className="font-bold text-slate-850 text-xs">Unlock Secure Record View</h4>
                  <p className="text-[10px] text-slate-400 leading-relaxed font-sans font-medium">This report contains HIPAA protected information. For shoulder-surfing safety, it remains masked until you touch to reveal.</p>
                </div>
              ) : (
                <div className="font-mono text-[11px] text-slate-700 leading-relaxed max-h-56 overflow-y-auto space-y-3.5 p-2 select-all text-left">
                  <div className="border-b border-slate-200 pb-2 flex items-center justify-between font-sans">
                    <span className="font-bold text-slate-950 uppercase">{record.facility} Clinical Labs</span>
                    <span className="text-slate-400 text-xs">ID: {record.id}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-[9px] font-sans text-slate-400 border-b border-slate-100 pb-2">
                    <div>PATIENT NAME: V RAHUL</div>
                    <div>PHYSICIAN: {record.provider}</div>
                    <div>DATE COMPLETED: {record.date}</div>
                    <div>SECURE NODE: CRYPTO_VAULT_NODE_248</div>
                  </div>
                  <div className="space-y-1.5 bg-slate-50 p-3 rounded-lg border border-slate-100">
                    <div className="font-bold text-slate-950 uppercase tracking-wider text-[9px] mb-2 font-sans">Laboratory Analysis Metrics</div>
                    <div className="grid grid-cols-3 gap-1 text-[9px] border-b border-slate-150 pb-1 font-bold text-slate-400 uppercase tracking-wider font-sans">
                      <div>Metric</div>
                      <div>Value Observed</div>
                      <div>Reference Limit</div>
                    </div>
                    <div className="grid grid-cols-3 gap-1 py-1 border-b border-slate-150">
                      <div>CHOLESTEROL, TOTAL</div>
                      <div className="font-bold text-rose-600">245 mg/dL [H]</div>
                      <div>&lt; 200 mg/dL</div>
                    </div>
                    <div className="grid grid-cols-3 gap-1 py-1 border-b border-slate-150">
                      <div>HDL CHOLESTEROL</div>
                      <div className="text-emerald-600 font-semibold">42 mg/dL</div>
                      <div>&gt; 40 mg/dL</div>
                    </div>
                    <div className="grid grid-cols-3 gap-1 py-1 border-b border-slate-150">
                      <div>LDL CHOLESTEROL</div>
                      <div className="font-bold text-rose-600">167 mg/dL [H]</div>
                      <div>&lt; 100 mg/dL</div>
                    </div>
                    <div className="grid grid-cols-3 gap-1 py-1">
                      <div>TRIGLYCERIDES</div>
                      <div className="font-bold text-rose-600">180 mg/dL [H]</div>
                      <div>&lt; 150 mg/dL</div>
                    </div>
                  </div>
                  <button onClick={() => setReportBlurred(true)} className="text-[10px] font-bold text-teal-600 hover:text-teal-700 uppercase font-sans hover:underline block pt-2 text-right ml-auto cursor-pointer select-none">Hide & Shield Record</button>
                </div>
              )}
            </div>
          </div>

          <button
            onClick={() => alert('PDF report binary rendered inside virtual canvas. File hash is signed and linked.')}
            className="w-full border border-slate-200 hover:border-teal-300 hover:bg-teal-50/5 rounded-xl py-3 text-slate-700 hover:text-teal-900 font-bold text-xs transition-colors flex items-center justify-center space-x-2 cursor-pointer select-none active:scale-[0.99]"
          >
            <FileText className="h-4.5 w-4.5 text-slate-400 group-hover:text-teal-600" />
            <span>Open Original PDF View</span>
          </button>
        </div>

          </div>

          {/* Right Column: Node details, metadata and biometric settings */}
          <div className="lg:col-span-5 xl:col-span-4 space-y-6">

            {/* Facility & Provider info card */}
            <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-5 text-left">
          {/* Facility */}
          <div className="flex items-start space-x-3.5">
            <div className="p-3 bg-teal-50 text-teal-600 rounded-xl shadow-sm shrink-0">
              <MapPin className="h-5 w-5" />
            </div>
            <div className="space-y-1">
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block font-mono">Verified Facility</span>
              <h4 className="font-bold text-slate-900 text-sm leading-tight">{record.facility}</h4>
              <p className="text-xs text-slate-400 font-sans font-medium">Rochester, Minnesota, US</p>
              <div className="text-[10px] text-emerald-600 font-bold flex items-center space-x-1 mt-1 font-sans">
                <CheckCircle className="h-3.5 w-3.5" />
                <span>Authorized FHIR Ingress</span>
              </div>
            </div>
          </div>

          {/* Practitioner */}
          <div className="flex items-start space-x-3.5 border-t md:border-t-0 md:border-l border-slate-100 pt-4 md:pt-0 md:pl-5">
            <div className="p-3 bg-teal-50 text-teal-600 rounded-xl shadow-sm shrink-0">
              <CheckCircle className="h-5 w-5" />
            </div>
            <div className="space-y-1">
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block font-mono">Sign-Off Provider</span>
              <h4 className="font-bold text-slate-900 text-sm leading-tight">{record.provider}</h4>
              <p className="text-xs text-slate-400 font-sans font-medium">Internal Medicine · Cardiological Consultant</p>
            </div>
          </div>
        </div>

        {/* Record Metadata Card */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm space-y-3 text-left">
          <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">Secure Node Metadata</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs font-sans font-medium">
            <div className="space-y-0.5">
              <span className="text-slate-400 block text-[10px]">Ingress Date</span>
              <span className="font-bold text-slate-800">Oct 16, 2023</span>
            </div>
            <div className="space-y-0.5">
              <span className="text-slate-400 block text-[10px]">Ingress Source</span>
              <span className="font-bold text-slate-800">{record.source}</span>
            </div>
            <div className="space-y-0.5">
              <span className="text-slate-400 block text-[10px]">Encryption Standard</span>
              <span className="font-bold text-emerald-600 flex items-center space-x-1">
                <span className="h-1.5 w-1.5 bg-emerald-500 rounded-full animate-pulse" />
                <span>{record.encryption}</span>
              </span>
            </div>
            <div className="space-y-0.5">
              <span className="text-slate-400 block text-[10px]">Payload envelope</span>
              <span className="font-bold text-slate-800">{record.fileSize}</span>
            </div>
          </div>
        </div>

        {/* Biometric Shield Enabled lock */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-teal-950 border border-teal-900/30 p-5 rounded-2xl text-white flex flex-col md:flex-row md:items-center justify-between gap-4 text-left">
          <div className="flex items-center space-x-3.5">
            <div className="h-10 w-10 bg-teal-500/10 text-teal-400 rounded-xl flex items-center justify-center shrink-0">
              <Fingerprint className="h-6 w-6 animate-pulse" />
            </div>
            <div>
              <h4 className="font-bold text-sm">Biometric Shield Protection</h4>
              <p className="text-xs text-slate-400 mt-0.5 font-sans">Mandate device biometrics (face ID, touch ID, PIN) on decryption request.</p>
            </div>
          </div>
          <div className="flex items-center space-x-4 shrink-0 justify-between md:justify-end">
            <button
              onClick={() => setBiometricEnabled(!biometricEnabled)}
              className={`w-11 h-6 rounded-full p-0.5 transition-colors duration-300 focus:outline-none cursor-pointer ${biometricEnabled ? 'bg-teal-500' : 'bg-slate-800'}`}
            >
              <div className={`w-5 h-5 bg-white rounded-full shadow-md transform duration-300 ${biometricEnabled ? 'translate-x-5' : 'translate-x-0'}`} />
            </button>
            <button
              onClick={() => alert('Biometric security tokens generated and synchronized.')}
              className="px-3.5 py-1.5 bg-slate-950/60 border border-slate-800 hover:bg-slate-800 rounded-lg text-xs font-bold text-slate-300 transition-colors cursor-pointer select-none"
            >
              Configure Policy
            </button>
          </div>
        </div>

          </div>
        </div>

      </div>
    </div>
  );
}
