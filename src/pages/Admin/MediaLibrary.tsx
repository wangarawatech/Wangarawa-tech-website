import React, { useState, useEffect } from 'react';
import { db } from '../../services/db';
import { MediaItem } from '../../types';
import {
  Upload,
  Trash2,
  Copy,
  Check,
  Image as ImageIcon,
  Video,
  Cloud,
  ExternalLink,
  Plus,
} from 'lucide-react';

export const MediaLibrary: React.FC = () => {
  const [mediaList, setMediaList] = useState<MediaItem[]>([]);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isAddingUrl, setIsAddingUrl] = useState(false);

  const [newMediaForm, setNewMediaForm] = useState({
    name: '',
    url: '',
    type: 'image' as 'image' | 'video',
    provider: 'cloudinary' as 'cloudinary' | 'external' | 'local',
  });

  const reload = () => {
    setMediaList(db.getMedia());
  };

  useEffect(() => {
    reload();
  }, []);

  const handleCopyUrl = (item: MediaItem) => {
    navigator.clipboard.writeText(item.url);
    setCopiedId(item.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDelete = (id: string) => {
    if (confirm('Delete this media reference?')) {
      db.deleteMedia(id);
      reload();
    }
  };

  const handleAddMedia = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMediaForm.url) return;

    const name = newMediaForm.name || newMediaForm.url.split('/').pop() || 'media_asset';
    const item: MediaItem = {
      id: `med-${Date.now()}`,
      name,
      url: newMediaForm.url,
      type: newMediaForm.type,
      sizeBytes: 250000,
      uploadDate: new Date().toISOString().split('T')[0],
      provider: newMediaForm.provider,
    };

    db.saveMedia(item);
    setIsAddingUrl(false);
    setNewMediaForm({
      name: '',
      url: '',
      type: 'image',
      provider: 'cloudinary',
    });
    reload();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Media Library & Cloudinary Assets</h2>
          <p className="text-xs text-slate-500">
            Manage images and video assets. Media URLs are stored in the database while files remain hosted securely in Cloudinary or local assets.
          </p>
        </div>

        <button
          onClick={() => setIsAddingUrl(!isAddingUrl)}
          className="px-4 py-2.5 rounded-xl bg-[#0B2545] text-white text-xs font-bold hover:bg-[#133E87] transition-colors flex items-center gap-2 shadow"
        >
          <Plus className="w-4 h-4 text-amber-400" />
          <span>Add Media Reference</span>
        </button>
      </div>

      {/* Cloudinary Integration Note */}
      <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <Cloud className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
          <div className="text-xs text-blue-900">
            <span className="font-bold">Cloudinary Storage Architecture: </span>
            In production, upload high-resolution photos and videos to your free Cloudinary account and paste the secure HTTPS URL here. Media metadata and descriptions are stored without bloating the PostgreSQL database.
          </div>
        </div>
      </div>

      {/* Add Media Form */}
      {isAddingUrl && (
        <div className="bg-white rounded-2xl border border-slate-300 p-6 shadow-xl space-y-4">
          <h3 className="text-sm font-bold text-slate-900">Register New Image or Video URL</h3>
          <form onSubmit={handleAddMedia} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Display Label</label>
                <input
                  type="text"
                  placeholder="e.g. Dutse Lab Workshop 2026"
                  value={newMediaForm.name}
                  onChange={(e) => setNewMediaForm({ ...newMediaForm, name: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Media Type</label>
                <select
                  value={newMediaForm.type}
                  onChange={(e) => setNewMediaForm({ ...newMediaForm, type: e.target.value as any })}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 outline-none bg-white"
                >
                  <option value="image">Image (PNG, JPG, WebP)</option>
                  <option value="video">Video (MP4, WebM, Stream)</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Hosting Provider</label>
                <select
                  value={newMediaForm.provider}
                  onChange={(e) => setNewMediaForm({ ...newMediaForm, provider: e.target.value as any })}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 outline-none bg-white"
                >
                  <option value="cloudinary">Cloudinary</option>
                  <option value="external">External / YouTube Embed</option>
                  <option value="local">Local Assets</option>
                </select>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Media URL *</label>
              <input
                type="text"
                required
                placeholder="https://res.cloudinary.com/demo/image/upload/... or /src/assets/..."
                value={newMediaForm.url}
                onChange={(e) => setNewMediaForm({ ...newMediaForm, url: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 outline-none"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsAddingUrl(false)}
                className="px-4 py-2 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-100"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-lg bg-[#0B2545] text-white text-xs font-bold hover:bg-[#133E87]"
              >
                Save Media
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Media Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {mediaList.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
          >
            <div>
              <div className="aspect-4/3 bg-slate-900 relative overflow-hidden flex items-center justify-center">
                {item.type === 'image' ? (
                  <img
                    src={item.url}
                    alt={item.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center text-slate-400 gap-2">
                    <Video className="w-10 h-10 text-amber-400" />
                    <span className="text-[11px] font-semibold">Video Resource</span>
                  </div>
                )}
                <div className="absolute top-2 left-2">
                  <span className="px-2 py-0.5 rounded bg-black/70 backdrop-blur-sm text-white text-[10px] font-bold">
                    {item.provider}
                  </span>
                </div>
              </div>

              <div className="p-4 space-y-1">
                <p className="text-xs font-bold text-slate-900 truncate" title={item.name}>
                  {item.name}
                </p>
                <p className="text-[10px] text-slate-400">Added: {item.uploadDate}</p>
                <p className="text-[10px] font-mono text-slate-500 truncate" title={item.url}>
                  {item.url}
                </p>
              </div>
            </div>

            <div className="p-4 pt-0 border-t border-slate-100 flex items-center justify-between">
              <button
                onClick={() => handleCopyUrl(item)}
                className="text-xs font-bold text-[#0B2545] hover:text-amber-600 inline-flex items-center gap-1"
              >
                {copiedId === item.id ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-700">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy URL</span>
                  </>
                )}
              </button>

              <button
                onClick={() => handleDelete(item.id)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50"
                title="Delete"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
