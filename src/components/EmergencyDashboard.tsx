import React, { useState, useEffect } from 'react';
import { Shield, Timer, Heart, AlertTriangle, AlertCircle, Activity, Pill, Sparkles, Phone, ShieldCheck, ChevronRight, Fingerprint, Lock, Check } from 'lucide-react';
import { emergencyProfile } from '../data';

interface EmergencyDashboardProps {
  onTimerExpire?: () => void;
  isVerified?: boolean;
}

export default function EmergencyDashboard({ onTimerExpire, isVerified = false }: EmergencyDashboardProps = {}) {
  const [timeLeft, setTimeLeft] = useState(20); // 20 seconds session limit
  const [callActive, setCallActive] = useState<string | null>(null);
  const [showVitals, setShowVitals] = useState(false);
  const [showRecordsRequest, setShowRecordsRequest] = useState(false);
  const [recordsRequestPassword, setRecordsRequestPassword] = useState('');
  const [recordsRequested, setRecordsRequested] = useState(false);

  // Dynamic ticking countdown timer
  useEffect(() => {
    if (isVerified) return; // No countdown if authenticated
    if (timeLeft <= 0) {
      if (onTimerExpire) {
        onTimerExpire();
      }
      return;
    }
    const interval = setInterval(() => {
      setTimeLeft(t => t - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timeLeft, onTimerExpire, isVerified]);

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleCall = (contactName: string) => {
    setCallActive(contactName);
    setTimeout(() => {
      setCallActive(null);
    }, 3000);
  };

  const handleRecordsRequest = (e: React.FormEvent) => {
    e.preventDefault();
    if (recordsRequestPassword === '123456' || recordsRequestPassword === 'admin') {
      setRecordsRequested(true);
      setShowRecordsRequest(false);
    } else {
      alert('Invalid licensing credentials code. Access blocked by security node.');
    }
  };

  return (
    <div className="bg-[#f8fafc] min-h-[calc(100vh-70px)] pb-12" id="emergency-dashboard">
      
      {/* Red Blinking Emergency Active Banner or Green Shield Badge depending on verification status */}
      {isVerified ? (
        <div className="bg-teal-700 text-white text-center py-3 px-4 font-bold text-xs uppercase tracking-widest flex items-center justify-center space-x-2 shadow-md select-none">
          <ShieldCheck className="h-4 w-4 text-white" />
          <span>Authorized Clinical Emergency Review Active</span>
        </div>
      ) : (
        <div className="bg-rose-700 text-white text-center py-3 px-4 font-bold text-xs uppercase tracking-widest flex items-center justify-center space-x-2 animate-pulse shadow-md select-none">
          <AlertTriangle className="h-4 w-4 text-white" />
          <span>Critical Emergency Break-Glass Session Active</span>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 space-y-6">
        
        {/* Stopwatch Countdown */}
        {isVerified ? (
          <div className="bg-teal-50/60 border border-teal-100 rounded-2xl p-4.5 flex items-center space-x-4 shadow-sm">
            <div className="bg-teal-100 text-teal-600 p-2.5 rounded-xl">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div className="flex-1 space-y-0.5 text-left">
              <h3 className="font-bold text-teal-950 text-xs uppercase tracking-wider">Session Authenticated</h3>
              <p className="text-[11px] text-teal-700/80 leading-relaxed font-sans font-medium">You are logged in with valid credentials. This emergency panel is secure and unrestricted.</p>
            </div>
            <div className="text-xs font-extrabold text-teal-600 font-mono tracking-wider shrink-0 uppercase px-3 py-1 bg-teal-100/50 rounded-lg border border-teal-200">
              SECURE
            </div>
          </div>
        ) : (
          <div className="bg-rose-50/60 border border-rose-100 rounded-2xl p-4.5 flex items-center space-x-4 shadow-sm">
            <div className="bg-rose-100 text-rose-600 p-2.5 rounded-xl animate-bounce">
              <Timer className="h-5 w-5" />
            </div>
            <div className="flex-1 space-y-0.5 text-left">
              <h3 className="font-bold text-rose-950 text-xs uppercase tracking-wider">Break-Glass Session Time</h3>
              <p className="text-[11px] text-rose-700/80 leading-relaxed font-sans font-medium">Temporary session will auto-revoke shortly. Close window to lock immediately.</p>
            </div>
            <div className="text-2xl font-extrabold text-rose-600 font-mono tracking-wider shrink-0">
              {formatTimer(timeLeft)}
            </div>
          </div>
        )}

        {/* Responsive Dual Column Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left Column: Profile, Conditions, Medications & AI Summary */}
          <div className="lg:col-span-7 space-y-6">

            {/* Patient Profile Card (James A Morrison) */}
        <div className="bg-gradient-to-br from-slate-900 to-slate-950 text-white rounded-2xl p-5.5 shadow-lg space-y-4 relative overflow-hidden border border-slate-800 text-left">
          {/* Subtle grid pattern or watermark */}
          <div className="absolute top-0 right-0 h-28 w-28 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-xl md:text-2xl font-display font-extrabold tracking-tight text-white">{emergencyProfile.name}</h2>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-slate-400 text-[10px] font-mono mt-1">
                <span>DOB: {emergencyProfile.dob}</span>
                <span>ID: {emergencyProfile.id}</span>
                {emergencyProfile.gender && <span>GENDER: {emergencyProfile.gender.toUpperCase()}</span>}
              </div>
            </div>
            
            <div className="flex items-center space-x-1 bg-teal-500/15 border border-teal-500/30 text-teal-400 rounded-full px-3 py-1 text-[9px] font-bold self-start sm:self-center">
              <ShieldCheck className="h-3.5 w-3.5" />
              <span>PASSCODE VERIFIED</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-1">
            {/* Blood type */}
            <div className="bg-slate-900/60 border border-slate-800/80 p-3.5 rounded-xl space-y-1.5">
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block">Blood Group</span>
              <div className="flex items-center space-x-2">
                <Heart className="h-5 w-5 text-rose-500 fill-rose-500" />
                <span className="font-extrabold text-white text-base font-display">{emergencyProfile.bloodType}</span>
              </div>
            </div>

            {/* Allergies */}
            <div className="bg-slate-900/60 border border-slate-800/80 p-3.5 rounded-xl space-y-1.5">
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block">Severe Allergies</span>
              <div className="flex flex-wrap gap-1">
                {emergencyProfile.allergies.map((all, i) => (
                  <span key={i} className="text-[9px] font-bold bg-rose-600/25 border border-rose-500/30 text-rose-300 px-2 py-0.5 rounded uppercase tracking-wider font-sans">
                    {all}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Chronic Conditions */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm space-y-3.5 text-left">
          <div className="flex items-center space-x-2 border-b border-slate-100 pb-3">
            <Activity className="h-4.5 w-4.5 text-rose-500" />
            <h3 className="font-display font-bold text-slate-900 text-sm">Chronic Conditions</h3>
          </div>
          <ul className="space-y-2.5 text-xs text-slate-700 pl-1 font-sans font-medium">
            {emergencyProfile.conditions.map((con, i) => (
              <li key={i} className="flex items-center space-x-2">
                <span className="h-1.5 w-1.5 bg-rose-500 rounded-full shrink-0" />
                <span>{con}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Current Medications */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm space-y-3.5 text-left">
          <div className="flex items-center space-x-2 border-b border-slate-100 pb-3">
            <Pill className="h-4.5 w-4.5 text-teal-600" />
            <h3 className="font-display font-bold text-slate-900 text-sm">Current Medications</h3>
          </div>
          <div className="divide-y divide-slate-100">
            {emergencyProfile.medications.map((med, i) => (
              <div key={i} className="py-3 flex items-center justify-between text-xs font-sans font-medium">
                <div>
                  <span className="font-bold text-slate-900">{med.name}</span>
                  <span className="text-slate-400 font-mono text-[9px] ml-1.5 bg-slate-50 border border-slate-100 px-1.5 py-0.5 rounded">{med.freq}</span>
                </div>
                <span className="font-bold text-teal-700 bg-teal-50 border border-teal-100 px-2.5 py-0.5 rounded-full text-[10px]">
                  {med.dose}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* AI-Generated Emergency Summary */}
        <div className="bg-white border border-teal-200 border-dashed rounded-2xl p-5 shadow-sm relative overflow-hidden space-y-3.5 text-left">
          <div className="absolute top-0 right-0 h-16 w-16 bg-teal-500/5 rounded-full blur-xl pointer-events-none" />
          
          <div className="flex items-center space-x-2">
            <Sparkles className="h-4.5 w-4.5 text-teal-600" />
            <h3 className="font-bold text-teal-800 text-xs uppercase tracking-wider font-mono">AI-Generated Patient Clinical Summary</h3>
          </div>

          <p className="text-slate-700 text-xs leading-relaxed bg-teal-50/20 p-4 rounded-xl border border-teal-100/40 font-sans font-medium">
            {emergencyProfile.summary}
          </p>
        </div>

          </div>

          {/* Right Column: Contacts, Requests & Auditing Logs */}
          <div className="lg:col-span-5 space-y-6">

        {/* Emergency Contacts */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm space-y-4 text-left">
          <h3 className="font-display font-bold text-slate-900 text-sm border-b border-slate-100 pb-3">Primary Contacts</h3>
          <div className="grid grid-cols-1 gap-3">
            {emergencyProfile.contacts.map((contact, i) => (
              <div key={i} className="p-3.5 bg-slate-50 border border-slate-200/60 rounded-xl flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-slate-900 text-xs">{contact.name}</h4>
                  <p className="text-[10px] text-slate-500 mt-0.5 font-sans font-medium">{contact.relation}</p>
                </div>
                <button
                  onClick={() => handleCall(contact.name)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center space-x-1.5 transition-all cursor-pointer select-none active:scale-95 ${
                    callActive === contact.name
                      ? 'bg-emerald-600 text-white animate-pulse'
                      : 'bg-teal-600 hover:bg-teal-550 text-white'
                  }`}
                >
                  <Phone className="h-3.5 w-3.5" />
                  <span>{callActive === contact.name ? 'Calling...' : 'Call'}</span>
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Interactive Actions (Full Records & Vitals Log) */}
        <div className="space-y-2.5">
          {/* Full records request button */}
          <button
            onClick={() => {
              if (recordsRequested) {
                alert('Full patient records released. Scanning database nodes.');
              } else {
                setShowRecordsRequest(true);
              }
            }}
            className="w-full bg-white hover:bg-slate-50/50 border border-slate-200 hover:border-teal-300 rounded-xl p-4 flex items-center justify-between text-left text-xs font-bold text-slate-800 transition-all cursor-pointer shadow-xs select-none active:scale-[0.99]"
          >
            <div className="flex items-center space-x-3 text-slate-700">
              <Lock className="h-4.5 w-4.5 text-slate-400" />
              <span>Emergency Records Request</span>
            </div>
            {recordsRequested ? (
              <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 border border-emerald-100 px-2.5 py-0.5 rounded-full">APPROVED</span>
            ) : (
              <ChevronRight className="h-4.5 w-4.5 text-slate-400" />
            )}
          </button>

          {/* Records request modal/inline prompt */}
          {showRecordsRequest && (
            <form onSubmit={handleRecordsRequest} className="p-4 bg-slate-900 text-white border border-slate-850 rounded-xl space-y-3.5 animate-fade-in text-left">
              <div className="text-[10px] font-bold uppercase tracking-wider text-teal-400 flex items-center space-x-1 font-mono">
                <Fingerprint className="h-4 w-4 text-teal-400" />
                <span>Enter Licensing Credentials Code</span>
              </div>
              <p className="text-[10px] text-slate-400 leading-relaxed font-sans">This is a protected clinical request. Type <span className="font-mono text-teal-400 font-bold bg-slate-950 px-1.5 py-0.5 rounded">123456</span> to simulate overriding locked records.</p>
              <div className="flex space-x-2">
                <input
                  type="password"
                  placeholder="Licensing Code"
                  className="flex-1 bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-teal-500 font-mono text-white"
                  value={recordsRequestPassword}
                  onChange={(e) => setRecordsRequestPassword(e.target.value)}
                />
                <button
                  type="submit"
                  className="bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs px-4 py-1.5 rounded-lg active:scale-95 transition-all cursor-pointer"
                >
                  Verify
                </button>
              </div>
            </form>
          )}

          {/* Recent vitals log button */}
          <button
            onClick={() => setShowVitals(!showVitals)}
            className="w-full bg-white hover:bg-slate-50/50 border border-slate-200 hover:border-teal-300 rounded-xl p-4 flex items-center justify-between text-left text-xs font-bold text-slate-800 transition-all cursor-pointer shadow-xs select-none active:scale-[0.99]"
          >
            <div className="flex items-center space-x-3 text-slate-700">
              <Activity className="h-4.5 w-4.5 text-slate-400" />
              <span>Recent Vitals Stream</span>
            </div>
            {showVitals ? <ChevronRight className="h-4.5 w-4.5 text-slate-400 rotate-90 transition-transform" /> : <ChevronRight className="h-4.5 w-4.5 text-slate-400 transition-transform" />}
          </button>

          {showVitals && (
            <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-3 animate-fade-in text-xs text-left">
              <h4 className="font-bold text-slate-900 font-display">Vitals Log (Last 12 Hours)</h4>
              <div className="overflow-x-auto border border-slate-100 rounded-xl">
                <table className="min-w-full divide-y divide-slate-100 text-[11px] font-sans font-medium">
                  <thead>
                    <tr className="bg-slate-50 font-bold text-slate-400 uppercase tracking-wider">
                      <th className="px-3 py-2 text-left">Timestamp</th>
                      <th className="px-3 py-2 text-left">BP</th>
                      <th className="px-3 py-2 text-left">Pulse</th>
                      <th className="px-3 py-2 text-left">Oxygen (SpO2)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700 bg-white">
                    <tr>
                      <td className="px-3 py-2 font-mono">08:15 AM</td>
                      <td className="px-3 py-2 font-semibold text-rose-600 font-mono">142/95 mmHg</td>
                      <td className="px-3 py-2 font-mono">88 bpm</td>
                      <td className="px-3 py-2 font-mono">94%</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2 font-mono">04:30 AM</td>
                      <td className="px-3 py-2 font-mono">130/82 mmHg</td>
                      <td className="px-3 py-2 font-mono">74 bpm</td>
                      <td className="px-3 py-2 font-mono">96%</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2 font-mono">11:15 PM</td>
                      <td className="px-3 py-2 font-mono">122/78 mmHg</td>
                      <td className="px-3 py-2 font-mono">68 bpm</td>
                      <td className="px-3 py-2 font-semibold text-emerald-600 font-mono">98%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        {/* Identity Locked Card */}
        <div className="bg-teal-50/50 border border-teal-100 p-4.5 rounded-2xl flex items-center space-x-3.5 text-left">
          <div className="h-10 w-10 bg-teal-100/70 text-teal-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-inner">
            <Fingerprint className="h-5.5 w-5.5 animate-pulse" />
          </div>
          <div className="space-y-0.5">
            <h4 className="font-bold text-teal-900 text-xs uppercase tracking-wider">Identity Locked</h4>
            <p className="text-[11px] text-teal-700/80 leading-normal font-sans font-medium">Biometric and PIN verification active on local terminal nodes.</p>
          </div>
        </div>

        {/* Audit Log Justification message banner */}
        <div className="p-4.5 bg-slate-900 text-slate-300 rounded-2xl text-[10px] space-y-3 leading-relaxed border border-slate-800 text-left">
          <div className="flex items-start space-x-2.5">
            <AlertCircle className="h-4 w-4 text-teal-400 mt-0.5 flex-shrink-0" />
            <div>
              <span className="font-bold text-white uppercase font-sans">LOG JUSTIFICATION:</span> Emergency life-safety event triggered. Audit trail: <span className="font-mono text-teal-400 font-semibold bg-slate-950 px-1.5 py-0.5 rounded border border-slate-800">TXN-4882-EM-99</span>. A full event audit is automatically dispatched to the Patient Vault.
            </div>
          </div>
          <div className="flex space-x-1.5 border-t border-slate-800 pt-3">
            <span className="px-2 py-0.5 bg-slate-950 border border-slate-800 text-slate-500 font-bold uppercase tracking-wider rounded font-mono text-[9px]">HIPAA COMPLIANT</span>
            <span className="px-2 py-0.5 bg-slate-950 border border-slate-800 text-teal-500 font-bold uppercase tracking-wider rounded font-mono text-[9px]">AES-255 PROTECTED</span>
          </div>
        </div>

          </div>
        </div>

      </div>
    </div>
  );
}
