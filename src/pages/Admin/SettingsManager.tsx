import React, { useState } from 'react';
import { db } from '../../services/db';
import { SiteSettings } from '../../types';
import {
  Database,
  Cloud,
  Download,
  Upload,
  RefreshCw,
  Key,
  CheckCircle,
  Copy,
  ExternalLink,
  Shield,
  BookOpen,
} from 'lucide-react';

export const SettingsManager: React.FC = () => {
  const [settings, setSettings] = useState<SiteSettings>(db.getSettings());
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [copiedSql, setCopiedSql] = useState(false);
  const [activeSetupTab, setActiveSetupTab] = useState<'supabase' | 'cloudinary' | 'deployment' | 'credentials'>('supabase');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    db.saveSettings(settings);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  const handleExportData = () => {
    const jsonStr = db.exportAllDataJSON();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `wangarawa_tech_backup_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      const content = evt.target?.result as string;
      if (content && db.importAllDataJSON(content)) {
        alert('Database backup restored successfully! Reloading...');
        window.location.reload();
      } else {
        alert('Failed to parse backup JSON. Please check file format.');
      }
    };
    reader.readAsText(file);
  };

  const copySqlSchema = async () => {
    try {
      const res = await fetch('/supabase/schema.sql');
      const text = await res.text();
      navigator.clipboard.writeText(text);
      setCopiedSql(true);
      setTimeout(() => setCopiedSql(false), 2000);
    } catch {
      navigator.clipboard.writeText('-- See /supabase/schema.sql in repository');
      setCopiedSql(true);
      setTimeout(() => setCopiedSql(false), 2000);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <h2 className="text-xl font-bold text-slate-900">System Settings & Infrastructure</h2>
        <p className="text-xs text-slate-500 mt-1">
          Configure corporate identifiers, Supabase PostgreSQL synchronization, Cloudinary media storage, and data backups.
        </p>
      </div>

      {/* Corporate Metadata Form */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex items-center justify-between border-b pb-4">
          <div>
            <h3 className="text-base font-bold text-slate-900">Official Corporate Identity</h3>
            <p className="text-xs text-slate-500">Official legal credentials shown across the public portal and footer.</p>
          </div>
          {saveSuccess && (
            <span className="text-xs text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full font-bold flex items-center gap-1">
              <CheckCircle className="w-3.5 h-3.5" />
              <span>Settings Saved!</span>
            </span>
          )}
        </div>

        <form onSubmit={handleSave} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Company Legal Name</label>
              <input
                type="text"
                value={settings.companyName}
                onChange={(e) => setSettings({ ...settings, companyName: e.target.value })}
                className="w-full px-3.5 py-2 text-xs rounded-lg border border-slate-300 outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">CAC Registration Number</label>
              <input
                type="text"
                value={settings.rcNumber}
                onChange={(e) => setSettings({ ...settings, rcNumber: e.target.value })}
                className="w-full px-3.5 py-2 text-xs rounded-lg border border-slate-300 outline-none font-mono"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">Official Tagline</label>
            <input
              type="text"
              value={settings.tagline}
              onChange={(e) => setSettings({ ...settings, tagline: e.target.value })}
              className="w-full px-3.5 py-2 text-xs rounded-lg border border-slate-300 outline-none"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">Physical Office Address</label>
            <input
              type="text"
              value={settings.address}
              onChange={(e) => setSettings({ ...settings, address: e.target.value })}
              className="w-full px-3.5 py-2 text-xs rounded-lg border border-slate-300 outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Company Email</label>
              <input
                type="email"
                value={settings.email}
                onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                className="w-full px-3.5 py-2 text-xs rounded-lg border border-slate-300 outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Phone (Primary)</label>
              <input
                type="text"
                value={settings.phonePrimary}
                onChange={(e) => setSettings({ ...settings, phonePrimary: e.target.value })}
                className="w-full px-3.5 py-2 text-xs rounded-lg border border-slate-300 outline-none font-mono"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Phone (Secondary)</label>
              <input
                type="text"
                value={settings.phoneSecondary}
                onChange={(e) => setSettings({ ...settings, phoneSecondary: e.target.value })}
                className="w-full px-3.5 py-2 text-xs rounded-lg border border-slate-300 outline-none font-mono"
              />
            </div>
          </div>

          {/* Admin Security Section */}
          <div className="pt-4 border-t space-y-3">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wide flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-amber-500" />
              <span>Staff / Administrator Access Password</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700">Custom Admin Password</label>
                <input
                  type="password"
                  placeholder="Set custom password (leave blank to use company default)..."
                  value={settings.adminPassword || ''}
                  onChange={(e) => setSettings({ ...settings, adminPassword: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs rounded-lg border border-slate-300 outline-none font-mono"
                />
                <p className="text-[10px] text-slate-500">
                  Changing this saves a custom private password for /admin. Can also be set via VITE_ADMIN_PASSWORD environment variable.
                </p>
              </div>
            </div>
          </div>

          {/* Cloud Integrations Section */}
          <div className="pt-6 border-t space-y-4">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
              Cloud Database & Media Keys
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Supabase Project URL</label>
                <input
                  type="text"
                  placeholder="https://your-project.supabase.co"
                  value={settings.supabaseUrl || ''}
                  onChange={(e) => setSettings({ ...settings, supabaseUrl: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs rounded-lg border border-slate-300 outline-none font-mono"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Supabase Anon Public Key</label>
                <input
                  type="password"
                  placeholder="eyJhbGciOiJIUzI1NiIsIn..."
                  value={settings.supabaseAnonKey || ''}
                  onChange={(e) => setSettings({ ...settings, supabaseAnonKey: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs rounded-lg border border-slate-300 outline-none font-mono"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Cloudinary Cloud Name</label>
                <input
                  type="text"
                  placeholder="e.g. wangarawa-tech"
                  value={settings.cloudinaryCloudName || ''}
                  onChange={(e) => setSettings({ ...settings, cloudinaryCloudName: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs rounded-lg border border-slate-300 outline-none font-mono"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Cloudinary Upload Preset</label>
                <input
                  type="text"
                  placeholder="e.g. wangarawa_public_preset"
                  value={settings.cloudinaryUploadPreset || ''}
                  onChange={(e) => setSettings({ ...settings, cloudinaryUploadPreset: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs rounded-lg border border-slate-300 outline-none font-mono"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <button
              type="submit"
              className="px-6 py-2.5 rounded-lg bg-[#0B2545] text-white text-xs font-bold hover:bg-[#133E87] shadow"
            >
              Save All Settings
            </button>
          </div>
        </form>
      </div>

      {/* Setup & Deployment Documentation Accordion */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-amber-500" />
            <h3 className="text-base font-bold text-slate-900">
              Production Architecture & Setup Guides
            </h3>
          </div>
          <p className="text-xs text-slate-500">
            Clear instructions for Supabase, Environment Variables, Cloudinary, Local Dev, and Free-Tier Deployment.
          </p>
        </div>

        <div className="flex flex-wrap gap-2 border-b pb-3">
          <button
            onClick={() => setActiveSetupTab('supabase')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${
              activeSetupTab === 'supabase' ? 'bg-[#0B2545] text-white' : 'bg-slate-100 text-slate-700'
            }`}
          >
            1. Supabase PostgreSQL
          </button>
          <button
            onClick={() => setActiveSetupTab('cloudinary')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${
              activeSetupTab === 'cloudinary' ? 'bg-[#0B2545] text-white' : 'bg-slate-100 text-slate-700'
            }`}
          >
            2. Cloudinary Storage
          </button>
          <button
            onClick={() => setActiveSetupTab('credentials')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${
              activeSetupTab === 'credentials' ? 'bg-[#0B2545] text-white' : 'bg-slate-100 text-slate-700'
            }`}
          >
            3. Admin & Security
          </button>
          <button
            onClick={() => setActiveSetupTab('deployment')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${
              activeSetupTab === 'deployment' ? 'bg-[#0B2545] text-white' : 'bg-slate-100 text-slate-700'
            }`}
          >
            4. Local & Production Deploy
          </button>
        </div>

        {/* Tab Content */}
        {activeSetupTab === 'supabase' && (
          <div className="space-y-4 text-xs text-slate-700 leading-relaxed">
            <p className="font-semibold text-slate-900 text-sm">Setting Up Your Free Supabase Database:</p>
            <ol className="list-decimal pl-5 space-y-2">
              <li>Create a free account at <strong>supabase.com</strong> and create a new project (e.g. <code className="bg-slate-100 px-1 py-0.5 rounded font-mono">wangarawa-tech</code>).</li>
              <li>Open the <strong>SQL Editor</strong> tab in the Supabase Dashboard.</li>
              <li>Copy and run the schema file generated in this project at <code className="bg-slate-100 px-1 py-0.5 rounded font-mono">supabase/schema.sql</code>.</li>
              <li>Go to <strong>Project Settings &rarr; API</strong> and copy your <strong>Project URL</strong> and <strong>Anon Public Key</strong>.</li>
              <li>Paste them in the fields above or add them to your <code className="bg-slate-100 px-1 py-0.5 rounded font-mono">.env</code> file as <code className="bg-slate-100 px-1 py-0.5 rounded font-mono">VITE_SUPABASE_URL</code> and <code className="bg-slate-100 px-1 py-0.5 rounded font-mono">VITE_SUPABASE_ANON_KEY</code>.</li>
            </ol>

            <div className="pt-2">
              <button
                onClick={copySqlSchema}
                className="px-4 py-2 rounded-lg bg-blue-50 hover:bg-blue-100 text-[#0B2545] font-bold inline-flex items-center gap-1.5"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>{copiedSql ? 'SQL Copied to Clipboard!' : 'Copy SQL Schema Script (supabase/schema.sql)'}</span>
              </button>
            </div>
          </div>
        )}

        {activeSetupTab === 'cloudinary' && (
          <div className="space-y-4 text-xs text-slate-700 leading-relaxed">
            <p className="font-semibold text-slate-900 text-sm">Connecting Cloudinary for Media & Videos:</p>
            <ol className="list-decimal pl-5 space-y-2">
              <li>Sign up for a free account at <strong>cloudinary.com</strong> (free tier provides 25GB monthly bandwidth and storage).</li>
              <li>In your Cloudinary Console, locate your <strong>Cloud Name</strong>.</li>
              <li>Go to <strong>Settings &rarr; Upload &rarr; Upload presets</strong> and click <strong>Add upload preset</strong>.</li>
              <li>Set <em>Signing Mode</em> to <strong>Unsigned</strong> and save it.</li>
              <li>Enter your Cloud Name and Preset into the settings above or set <code className="bg-slate-100 px-1 py-0.5 rounded font-mono">VITE_CLOUDINARY_CLOUD_NAME</code> and <code className="bg-slate-100 px-1 py-0.5 rounded font-mono">VITE_CLOUDINARY_UPLOAD_PRESET</code> in your <code className="bg-slate-100 px-1 py-0.5 rounded font-mono">.env</code>.</li>
            </ol>
          </div>
        )}

        {activeSetupTab === 'credentials' && (
          <div className="space-y-4 text-xs text-slate-700 leading-relaxed">
            <p className="font-semibold text-slate-900 text-sm">Admin Access & Security:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Default authorized admin passcode: <code className="bg-slate-100 px-1 py-0.5 rounded font-mono font-bold">wangarawa2026</code>.</li>
              <li>Protected route: <code className="bg-slate-100 px-1 py-0.5 rounded font-mono">/admin</code> requiring authentication token.</li>
              <li>Row Level Security (RLS) policies restrict database writes strictly to authenticated administrators while enabling public read access for published programs, projects, and services.</li>
            </ul>
          </div>
        )}

        {activeSetupTab === 'deployment' && (
          <div className="space-y-4 text-xs text-slate-700 leading-relaxed">
            <p className="font-semibold text-slate-900 text-sm">Deployment & Local Development:</p>
            <div className="p-4 bg-slate-900 text-slate-200 rounded-xl font-mono text-[11px] space-y-1">
              <p># 1. Install dependencies</p>
              <p className="text-amber-400">npm install</p>
              <p className="pt-2"># 2. Run local development server</p>
              <p className="text-amber-400">npm run dev</p>
              <p className="pt-2"># 3. Build optimized production bundle</p>
              <p className="text-amber-400">npm run build</p>
            </div>
            <p>
              The build output in <code className="bg-slate-100 px-1 py-0.5 rounded font-mono">dist/</code> can be deployed to any modern static hosting provider such as Vercel, Netlify, Cloudflare Pages, or Google Cloud Run for zero server hosting costs.
            </p>
          </div>
        )}
      </div>

      {/* Backup, Export & Factory Reset */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-4">
        <h3 className="text-base font-bold text-slate-900">Database Backup & Recovery</h3>
        <p className="text-xs text-slate-500">
          Export your entire CMS database (all projects, news, slides, services, messages) as an encrypted JSON file, or restore from a previous snapshot.
        </p>

        <div className="flex flex-wrap items-center gap-3 pt-2">
          <button
            onClick={handleExportData}
            className="px-4 py-2.5 rounded-lg bg-[#0B2545] text-white text-xs font-bold hover:bg-[#133E87] flex items-center gap-1.5 shadow"
          >
            <Download className="w-3.5 h-3.5 text-amber-400" />
            <span>Export Complete Backup (JSON)</span>
          </button>

          <label className="px-4 py-2.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold cursor-pointer flex items-center gap-1.5">
            <Upload className="w-3.5 h-3.5" />
            <span>Restore from JSON File</span>
            <input type="file" accept=".json" onChange={handleImportData} className="hidden" />
          </label>

          <button
            onClick={() => {
              if (confirm('Reset database to authentic default Wangarawa Global Technology records? Any custom additions will be cleared.')) {
                db.resetToFactoryDefaults();
                window.location.reload();
              }
            }}
            className="px-4 py-2.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-bold flex items-center gap-1.5"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset to Factory Defaults</span>
          </button>
        </div>
      </div>
    </div>
  );
};
