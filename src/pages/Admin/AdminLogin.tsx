import React, { useState } from 'react';
import { Logo } from '../../components/common/Logo';
import { db } from '../../services/db';
import { Lock, Key, ArrowRight, ShieldCheck, AlertCircle } from 'lucide-react';

interface AdminLoginProps {
  onLoginSuccess: () => void;
  onBackToWebsite: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({
  onLoginSuccess,
  onBackToWebsite,
}) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (db.loginAdmin(password)) {
      setError(false);
      onLoginSuccess();
    } else {
      setError(true);
    }
  };

  const fillDemoPassword = (pass: string) => {
    setPassword(pass);
    if (db.loginAdmin(pass)) {
      setError(false);
      onLoginSuccess();
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-3">
          <div className="inline-block">
            <Logo variant="light" size="lg" showRc />
          </div>
          <div className="space-y-1">
            <h1 className="text-xl font-bold text-white tracking-tight">
              Staff CMS Administration Portal
            </h1>
            <p className="text-xs text-slate-400">
              Sign in to manage projects, programs, hero slides, and messages.
            </p>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl">
          {error && (
            <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>Invalid administrator password. Access is restricted to authorized staff.</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-amber-400" />
                <span>Administrator Password</span>
              </label>
              <input
                type="password"
                required
                autoFocus
                placeholder="Enter authorized password..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs placeholder:text-slate-500 focus:border-amber-400 focus:ring-1 focus:ring-amber-400 outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold transition-all flex items-center justify-center gap-2 shadow"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Authenticate & Enter CMS</span>
            </button>
          </form>

          <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80 text-[11px] text-slate-400 leading-relaxed flex items-start gap-2.5">
            <Key className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-slate-300">Protected Corporate System</p>
              <p className="text-slate-500 mt-0.5">
                Authorized staff of Wangarawa Global Technology Limited. Contact the Director General or Tech Lead if you need credential assistance.
              </p>
            </div>
          </div>
        </div>

        <div className="text-center">
          <button
            onClick={onBackToWebsite}
            className="text-xs text-slate-400 hover:text-white transition-colors"
          >
            &larr; Return to Wangarawa Public Website
          </button>
        </div>
      </div>
    </div>
  );
};
