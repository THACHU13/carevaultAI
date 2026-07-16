import React, { useState, useEffect } from 'react';
import { Fingerprint, Shield, ArrowRight, Lock, Key, AlertCircle, RefreshCw, Smartphone, Check, Sparkles, AlertTriangle, ShieldCheck } from 'lucide-react';

interface IdentityVerificationProps {
  onVerifySuccess: () => void;
}

export default function IdentityVerification({ onVerifySuccess }: IdentityVerificationProps) {
  const [method, setMethod] = useState<'phone' | 'aadhaar'>('phone');
  const [identifier, setIdentifier] = useState('');
  const [otpMode, setOtpMode] = useState(false);
  const [otpDigits, setOtpDigits] = useState(['', '', '', '', '', '']);
  const [countdown, setCountdown] = useState(120);
  const [error, setError] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [smsToast, setSmsToast] = useState<{ show: boolean; code: string } | null>(null);

  // Timer countdown
  useEffect(() => {
    if (!otpMode || countdown <= 0) return;
    const interval = setInterval(() => {
      setCountdown(c => c - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [otpMode, countdown]);

  const formatTime = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const secs = sec % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleRequestOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!identifier) {
      setError(`Please enter a valid ${method === 'phone' ? 'phone number' : 'Aadhaar ID'}.`);
      return;
    }
    
    setError('');

    if (method === 'phone') {
      const cleanNumber = identifier.replace(/\D/g, '');
      if (cleanNumber !== '7695972940' && cleanNumber !== '917695972940') {
        setError('unauthorised credentials');
        return;
      }

      // Generate random 6-digit OTP
      const generatedCode = Math.floor(100000 + Math.random() * 900000).toString();
      setSmsToast({ show: true, code: generatedCode });

      // Auto-hide the SMS alert after 15 seconds
      setTimeout(() => {
        setSmsToast(prev => prev ? { ...prev, show: false } : null);
      }, 15000);
    } else {
      const cleanNumber = identifier.replace(/\D/g, '');
      if (cleanNumber !== '7695972940') {
        setError('unauthorised credentials');
        return;
      }
      // Aadhaar dispatch simulation code
      const generatedCode = "123456";
      setSmsToast({ show: true, code: generatedCode });
    }

    setOtpMode(true);
    setCountdown(120);
    setOtpDigits(['', '', '', '', '', '']);
  };

  const handleOtpChange = (index: number, val: string) => {
    if (isNaN(Number(val))) return;
    const newOtp = [...otpDigits];
    newOtp[index] = val.substring(val.length - 1);
    setOtpDigits(newOtp);

    // Focus next input automatically
    if (val && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    const enteredCode = otpDigits.join('');
    if (enteredCode.length < 6) {
      setError('Please fill in the 6-digit OTP code.');
      return;
    }

    setIsVerifying(true);
    setError('');

    // Verify against dynamically dispatched code
    setTimeout(() => {
      setIsVerifying(false);
      const targetCode = smsToast?.code || '123456';
      if (enteredCode === targetCode) {
        setSmsToast(null);
        onVerifySuccess();
      } else {
        setError('Invalid verification code. Please check the simulated SMS dispatch toast at the top.');
      }
    }, 1200);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-140px)] bg-slate-50/30 py-12 px-4 relative overflow-hidden" id="identity-verification">
      
      {/* Innovative Ambient Gradient Blur Background Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-10 left-[5%] w-[450px] h-[450px] rounded-full bg-teal-400/20 blur-[130px] animate-pulse duration-[8000ms]" />
        <div className="absolute bottom-10 right-[5%] w-[450px] h-[450px] rounded-full bg-indigo-500/20 blur-[130px] animate-pulse duration-[10000ms]" />
        <div className="absolute top-1/4 right-[25%] w-96 h-96 rounded-full bg-cyan-400/15 blur-[120px] animate-pulse duration-[9000ms]" />
        <div className="absolute bottom-1/4 left-[20%] w-[350px] h-[350px] rounded-full bg-amber-300/10 blur-[110px]" />
      </div>

      {/* Dynamic Simulated SMS Dispatch Toast */}
      {smsToast && smsToast.show && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 w-full max-w-sm px-4 animate-fade-in">
          <div className="bg-slate-900/95 backdrop-blur-md border border-slate-800 text-white rounded-2xl shadow-2xl p-4 flex items-start space-x-3.5 relative overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-teal-400 via-cyan-400 to-indigo-500" />
            <div className="bg-slate-850 p-2.5 rounded-xl text-teal-400 flex-shrink-0 border border-slate-800/80 shadow-md">
              <Smartphone className="h-5.5 w-5.5 animate-bounce text-cyan-400" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span className="font-extrabold text-[9px] bg-gradient-to-r from-teal-400 to-cyan-300 bg-clip-text text-transparent uppercase tracking-wider font-mono">Incoming OTP SMS</span>
                <span className="text-[8px] text-slate-500 font-mono">Just now</span>
              </div>
              <p className="text-xs text-slate-200 mt-1.5 leading-relaxed font-sans font-medium">
                [CareVault Secure Auth] Your verification OTP code is <strong className="text-cyan-400 font-mono tracking-widest text-sm bg-slate-950 px-2 py-0.5 rounded border border-slate-800 shadow-inner select-all">{smsToast.code}</strong>.
              </p>
              <button
                type="button"
                onClick={() => {
                  // Autofill code digits directly
                  const digits = smsToast.code.split('');
                  setOtpDigits(digits);
                }}
                className="mt-2.5 bg-gradient-to-r from-teal-500 via-cyan-500 to-indigo-500 hover:from-teal-400 hover:via-cyan-400 hover:to-indigo-400 text-white font-extrabold text-[10px] uppercase tracking-wider px-3.5 py-2 rounded-lg transition-all shadow-lg shadow-teal-500/25 active:scale-95 cursor-pointer"
              >
                Autofill OTP Code
              </button>
            </div>
            <button
              type="button"
              onClick={() => setSmsToast(prev => prev ? { ...prev, show: false } : null)}
              className="text-slate-500 hover:text-slate-300 text-xs font-bold leading-none p-1 transition-colors"
            >
              ×
            </button>
          </div>
        </div>
      )}

      {/* Container Card with Glowing Border Accent */}
      <div className="w-full max-w-md lg:max-w-4xl bg-white/95 backdrop-blur-md border border-slate-200/80 rounded-3xl shadow-[0_24px_60px_rgba(13,148,136,0.08)] overflow-hidden relative z-10 before:absolute before:top-0 before:left-0 before:right-0 before:h-[5px] before:bg-gradient-to-r before:from-teal-500 via-cyan-400 to-indigo-600">
        <div className="grid grid-cols-1 lg:grid-cols-12">
          {/* Left Column: Tech Info Sidebar (Visible on Laptop/PC) */}
          <div className="hidden lg:flex lg:col-span-5 bg-gradient-to-br from-slate-900 via-slate-900 to-teal-950 text-white p-8 flex-col justify-between relative overflow-hidden text-left border-r border-slate-800">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 h-40 w-40 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 h-40 w-40 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
            
            <div className="space-y-6 relative z-10">
              <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700/50 text-teal-400 text-[9px] font-extrabold uppercase tracking-widest font-mono">
                <Shield className="h-3.5 w-3.5 text-teal-450 animate-pulse" />
                <span>Security Engine</span>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-xl font-display font-extrabold tracking-tight text-white leading-tight">Your Health. Private. Secured.</h3>
                <p className="text-[11px] text-slate-400 leading-relaxed font-sans font-medium">
                  CareVault protects patient health information through zero-knowledge key derivations and offline-first decryption.
                </p>
              </div>

              <div className="space-y-4.5 pt-2">
                <div className="flex items-start space-x-3 text-left">
                  <div className="h-6 w-6 rounded-lg bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400 shrink-0 mt-0.5">
                    <span className="text-[10px] font-bold font-mono">01</span>
                  </div>
                  <div>
                    <h5 className="font-bold text-[11px] text-slate-200">Local Sandbox Decryption</h5>
                    <p className="text-[10px] text-slate-400 font-sans font-medium leading-relaxed">All clinical documents are decrypted strictly inside your browser memory cache.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 text-left">
                  <div className="h-6 w-6 rounded-lg bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400 shrink-0 mt-0.5">
                    <span className="text-[10px] font-bold font-mono">02</span>
                  </div>
                  <div>
                    <h5 className="font-bold text-[11px] text-slate-200">Grounded AI Ingestion</h5>
                    <p className="text-[10px] text-slate-400 font-sans font-medium leading-relaxed">Medical reports are digested via AI with clinician verification checks to prevent errors.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 text-left">
                  <div className="h-6 w-6 rounded-lg bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400 shrink-0 mt-0.5">
                    <span className="text-[10px] font-bold font-mono">03</span>
                  </div>
                  <div>
                    <h5 className="font-bold text-[11px] text-slate-200">Break-Glass Emergencies</h5>
                    <p className="text-[10px] text-slate-400 font-sans font-medium leading-relaxed">Emergency override allows authorized first responders instantaneous summary access.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-800/80 text-[10px] text-slate-400 font-mono space-y-1 relative z-10 mt-6">
              <div className="flex items-center space-x-1.5 text-slate-300 font-semibold uppercase tracking-wider text-[9px]">
                <ShieldCheck className="h-3.5 w-3.5 text-teal-400" />
                <span>HIPAA Compliant Vault</span>
              </div>
              <p className="text-[9px] text-slate-500">AES-256 GCM Cryptographic Tunnel</p>
            </div>
          </div>

          {/* Right Column: Verification Form */}
          <div className="col-span-1 lg:col-span-7 p-6 md:p-8 space-y-6">
            
            {/* Top Header Block with Dynamic Tech Accents */}
        <div className="flex flex-col items-center justify-center text-center">
          <div className="mb-2.5">
            <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-teal-50 to-indigo-50 border border-teal-100/70 text-teal-700 text-[10px] font-extrabold uppercase tracking-widest font-mono shadow-sm">
              <span className="h-1.5 w-1.5 bg-teal-500 rounded-full animate-ping" />
              <span className="bg-gradient-to-r from-teal-700 to-indigo-750 bg-clip-text text-transparent">SECURED AUTHENTICATION NODE</span>
            </span>
          </div>

          <div className="relative group mb-3">
            {/* Glowing Ring Backdrops */}
            <div className="absolute -inset-2.5 rounded-full bg-gradient-to-r from-teal-500 via-cyan-500 to-indigo-600 opacity-20 blur-lg group-hover:opacity-40 transition-all duration-700 animate-pulse" />
            <div className="absolute -inset-1 rounded-full bg-gradient-to-tr from-teal-400 to-indigo-500 opacity-15 blur-sm" />
            
            {/* Biometric Circle Frame */}
            <div className="relative h-20 w-20 rounded-full bg-gradient-to-tr from-teal-500 via-cyan-400 to-indigo-600 p-[2px] flex items-center justify-center shadow-xl shadow-teal-500/10">
              <div className="h-full w-full bg-slate-900 rounded-full flex items-center justify-center relative overflow-hidden">
                {/* Horizontal Scanline Animation */}
                <div className="absolute w-full h-[2px] bg-gradient-to-r from-transparent via-cyan-300 to-transparent shadow-[0_0_12px_#22d3ee] animate-[bounce_2.5s_infinite]" />
                <div className="absolute inset-0 bg-gradient-to-b from-teal-500/5 via-transparent to-indigo-500/5" />
                <Fingerprint className="h-10 w-10 text-cyan-400 animate-pulse relative z-10 drop-shadow-[0_0_10px_rgba(34,211,238,0.75)]" />
              </div>
            </div>
          </div>

          <h2 className="text-2xl md:text-3xl font-display font-extrabold tracking-tight bg-gradient-to-r from-slate-900 via-teal-950 to-indigo-950 bg-clip-text text-transparent">
            Identity Verification
          </h2>
          <p className="text-slate-500 text-xs mt-2 max-w-xs mx-auto leading-relaxed font-sans font-medium">
            {!otpMode 
              ? 'Provide your authorized patient credentials to decrypt your protected health vault records.'
              : `A verification OTP has been securely dispatched. Check the SMS notification at the top.`
            }
          </p>
        </div>

        {error && (
          <div className="p-3.5 bg-rose-50 border border-rose-100 text-rose-700 text-xs rounded-xl flex items-start space-x-2.5 animate-pulse shadow-sm">
            <AlertCircle className="h-4.5 w-4.5 flex-shrink-0 mt-0.5 text-rose-500" />
            <div>
              <span className="font-extrabold uppercase text-[9px] tracking-wider block text-rose-800">Verification Alert</span>
              <span className="font-semibold text-rose-700">{error}</span>
            </div>
          </div>
        )}

        {/* Input Forms */}
        {!otpMode ? (
          <form onSubmit={handleRequestOtp} className="space-y-5">
            {/* Retrieval Method Toggle Selector */}
            <div className="space-y-2.5">
              <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest block font-mono">Select Retrieval Node</span>
              <div className="grid grid-cols-2 p-1.5 bg-slate-50/90 border border-slate-200/80 rounded-2xl relative shadow-inner">
                <button
                  type="button"
                  onClick={() => { setMethod('phone'); setIdentifier(''); setError(''); }}
                  className={`py-2.5 rounded-xl text-xs font-bold transition-all relative z-10 cursor-pointer flex items-center justify-center space-x-1.5 select-none ${
                    method === 'phone'
                      ? 'bg-gradient-to-r from-teal-500 via-cyan-500 to-indigo-600 text-white shadow-md shadow-teal-600/15'
                      : 'text-slate-400 hover:text-slate-600'
                  }`}
                >
                  <Smartphone className="h-3.5 w-3.5" />
                  <span>Phone Number</span>
                </button>
                <button
                  type="button"
                  onClick={() => { setMethod('aadhaar'); setIdentifier(''); setError(''); }}
                  className={`py-2.5 rounded-xl text-xs font-bold transition-all relative z-10 cursor-pointer flex items-center justify-center space-x-1.5 select-none ${
                    method === 'aadhaar'
                      ? 'bg-gradient-to-r from-teal-500 via-cyan-500 to-indigo-600 text-white shadow-md shadow-teal-600/15'
                      : 'text-slate-400 hover:text-slate-600'
                  }`}
                >
                  <Key className="h-3.5 w-3.5" />
                  <span>Aadhaar ID</span>
                </button>
              </div>
            </div>

            {/* Input fields */}
            <div className="space-y-2">
              <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest block font-mono">
                {method === 'phone' ? 'Authorized Mobile Number' : 'Aadhaar ID / Health Number'}
              </label>
              
              <div className="relative">
                {method === 'phone' ? (
                  <>
                    <input
                      type="tel"
                      placeholder="7695972940"
                      className="w-full pl-14 pr-10 py-3.5 bg-white border border-slate-250 rounded-xl text-sm font-extrabold text-slate-900 focus:outline-none focus:ring-4 focus:ring-cyan-500/10 focus:border-cyan-500 shadow-2xs placeholder-slate-400 transition-all"
                      value={identifier}
                      onChange={(e) => setIdentifier(e.target.value)}
                    />
                    <span className="absolute left-4 top-3.5 bg-gradient-to-r from-teal-600 to-indigo-650 bg-clip-text text-transparent font-extrabold text-sm font-sans">+91</span>
                  </>
                ) : (
                  <>
                    <input
                      type="text"
                      placeholder="7695-9729-40"
                      maxLength={14}
                      className="w-full pl-11 pr-10 py-3.5 bg-white border border-slate-250 rounded-xl text-sm font-extrabold tracking-widest text-slate-900 focus:outline-none focus:ring-4 focus:ring-cyan-500/10 focus:border-cyan-500 shadow-2xs placeholder-slate-400 transition-all"
                      value={identifier}
                      onChange={(e) => {
                        // Auto dash insertion for Aadhaar digits
                        let val = e.target.value.replace(/\D/g, '');
                        if (val.length > 4 && val.length <= 8) val = `${val.slice(0, 4)}-${val.slice(4)}`;
                        else if (val.length > 8) val = `${val.slice(0, 4)}-${val.slice(4, 8)}-${val.slice(8, 12)}`;
                        setIdentifier(val);
                      }}
                    />
                    <Key className="absolute left-4 top-4 h-4.5 w-4.5 text-cyan-500" />
                  </>
                )}
                <div className="absolute right-4 top-4">
                  <Shield className="h-4.5 w-4.5 text-teal-500 animate-pulse" />
                </div>
              </div>

              {method === 'phone' && (
                <div className="flex items-center justify-between text-[11px] mt-2.5 p-3.5 bg-gradient-to-r from-teal-50/80 via-cyan-50/50 to-indigo-50/30 border border-teal-100/50 rounded-xl shadow-xs">
                  <span className="text-slate-550 font-semibold font-sans">Authorized Patient: <strong className="font-mono text-slate-900 bg-white/90 border border-teal-100 px-2 py-0.5 rounded shadow-2xs">7695972940</strong></span>
                  <button
                    type="button"
                    onClick={() => setIdentifier('7695972940')}
                    className="text-teal-600 hover:text-indigo-650 font-extrabold transition-all cursor-pointer bg-white px-2.5 py-1 rounded-lg border border-teal-100 hover:border-teal-350 hover:shadow-2xs text-[10px] uppercase select-none active:scale-95"
                  >
                    Autofill
                  </button>
                </div>
              )}
            </div>

            {/* Submit Request with beautiful gradient design */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-teal-500 via-cyan-500 to-indigo-600 hover:from-teal-600 hover:via-cyan-600 hover:to-indigo-700 text-white font-extrabold text-xs uppercase tracking-widest py-3.5 px-4 rounded-xl flex items-center justify-center space-x-2 hover:space-x-3.5 transition-all cursor-pointer select-none active:scale-98 shadow-[0_4px_20px_rgba(20,184,166,0.15)] hover:shadow-[0_6px_25px_rgba(79,70,229,0.25)] border-t border-white/20"
            >
              <span>Send OTP Passcode</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>
        ) : (
          /* OTP Digit Blocks Input with Custom Innovative Colors */
          <form onSubmit={handleVerifyOtp} className="space-y-6">
            <div className="flex flex-col items-center justify-center space-y-4">
              <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest font-mono">Secured Auth OTP Code</span>
              <div className="flex items-center space-x-2 md:space-x-2.5">
                {otpDigits.map((digit, i) => (
                  <input
                    key={i}
                    id={`otp-${i}`}
                    type="text"
                    maxLength={1}
                    className={`w-11 h-12 md:w-12 md:h-13 border rounded-xl text-center text-lg font-extrabold focus:outline-none focus:ring-4 focus:ring-cyan-500/15 focus:border-cyan-500 shadow-sm transition-all ${
                      digit 
                        ? 'border-teal-500 bg-gradient-to-br from-teal-50/60 to-cyan-50/40 text-teal-900 font-extrabold ring-1 ring-teal-500/10'
                        : 'border-slate-250 bg-slate-50 text-slate-900'
                    }`}
                    value={digit}
                    onChange={(e) => handleOtpChange(i, e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Backspace' && !digit && i > 0) {
                        const prevInput = document.getElementById(`otp-${i - 1}`);
                        prevInput?.focus();
                      }
                    }}
                  />
                ))}
              </div>

              {/* Timer status badge */}
              <div className="text-[11px] text-slate-500 flex items-center space-x-2 bg-gradient-to-r from-slate-50 to-slate-100 border border-slate-200/60 px-3.5 py-1.5 rounded-full shadow-2xs font-sans">
                <span className="h-1.5 w-1.5 bg-amber-500 rounded-full animate-ping" />
                <span className="font-medium">Resend window open in:</span>
                <span className="font-extrabold text-teal-600 font-mono tracking-wide">{formatTime(countdown)}</span>
              </div>
            </div>

            {/* Action buttons */}
            <div className="space-y-3">
              <button
                type="submit"
                disabled={isVerifying}
                className="w-full bg-gradient-to-r from-teal-500 via-cyan-500 to-indigo-600 hover:from-teal-600 hover:via-cyan-600 hover:to-indigo-700 text-white font-extrabold text-xs uppercase tracking-widest py-3.5 px-4 rounded-xl flex items-center justify-center space-x-2 active:scale-98 transition-all shadow-[0_4px_20px_rgba(20,184,166,0.15)] hover:shadow-[0_6px_25px_rgba(79,70,229,0.25)] cursor-pointer border-t border-white/20"
              >
                {isVerifying ? (
                  <>
                    <RefreshCw className="h-4 w-4 animate-spin" />
                    <span>Authorizing credentials...</span>
                  </>
                ) : (
                  <>
                    <Check className="h-4 w-4 text-cyan-350" />
                    <span>Verify OTP & Decrypt Vault</span>
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={() => setOtpMode(false)}
                className="w-full text-center text-slate-500 hover:text-indigo-600 text-xs font-bold py-1 transition-colors cursor-pointer select-none"
              >
                Change Method or Identifier
              </button>
            </div>
          </form>
        )}

        {/* Dynamic Privacy Shield Message */}
        <div className="p-4 bg-gradient-to-br from-indigo-50/60 via-teal-50/40 to-cyan-50/20 border border-indigo-100/50 rounded-2xl flex items-start space-x-3 text-left shadow-2xs">
          <Shield className="h-4.5 w-4.5 text-teal-600 mt-0.5 flex-shrink-0 animate-pulse" />
          <p className="text-[10px] text-slate-550 leading-relaxed font-sans font-medium">
            End-to-end clinical grade sandbox. Decrypted personal health information (PHI) is held strictly in volatile client state memory nodes and automatically purged on logout or browser close.
          </p>
        </div>
          </div>
        </div>
      </div>

      {/* Trust Compliant Tagline with Premium Styling */}
      <div className="mt-8 flex items-center space-x-2 text-[9px] md:text-[10px] font-extrabold text-slate-400 uppercase tracking-widest font-mono select-none bg-white/90 border border-slate-200/80 py-2 px-4 rounded-full shadow-sm">
        <Lock className="h-3.5 w-3.5 text-teal-500" />
        <span className="bg-gradient-to-r from-slate-500 via-teal-600 to-indigo-600 bg-clip-text text-transparent">AES-256 Bit Decryption · HIPAA COMPLIANT CRYPTO ROUTE</span>
      </div>
    </div>
  );
}
