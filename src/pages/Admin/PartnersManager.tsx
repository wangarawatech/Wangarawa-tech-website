import React, { useState, useEffect } from 'react';
import { db } from '../../services/db';
import { Partner } from '../../types';
import { Plus, Trash2, X, Handshake } from 'lucide-react';

export const PartnersManager: React.FC = () => {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [isAdding, setIsAdding] = useState(false);

  const [form, setForm] = useState<Partial<Partner>>({
    name: '',
    logoUrl: '/images/office_innovation_hub.jpg',
    type: 'Government',
    published: true,
  });

  const reload = () => {
    setPartners(db.getPartners());
  };

  useEffect(() => {
    reload();
  }, []);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name) return;

    const p: Partner = {
      id: `part-${Date.now()}`,
      name: form.name,
      logoUrl: form.logoUrl || '/images/office_innovation_hub.jpg',
      type: (form.type as any) || 'Government',
      published: true,
    };

    db.savePartner(p);
    setIsAdding(false);
    setForm({ name: '', logoUrl: '', type: 'Government' });
    reload();
  };

  const handleDelete = (id: string) => {
    if (confirm('Delete partner?')) {
      db.deletePartner(id);
      reload();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Partners & Collaborations</h2>
          <p className="text-xs text-slate-500">
            Manage government, academic, and community ecosystem partners.
          </p>
        </div>

        {!isAdding && (
          <button
            onClick={() => setIsAdding(true)}
            className="px-4 py-2.5 rounded-xl bg-[#0B2545] text-white text-xs font-bold hover:bg-[#133E87] transition-colors flex items-center gap-2 shadow"
          >
            <Plus className="w-4 h-4 text-amber-400" />
            <span>Add Partner</span>
          </button>
        )}
      </div>

      {isAdding && (
        <div className="bg-white rounded-2xl border border-slate-300 p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b pb-3">
            <h3 className="text-base font-bold text-slate-900">New Partner Organization</h3>
            <button onClick={() => setIsAdding(false)} className="text-slate-400 hover:text-slate-600">
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSave} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Organization Name *</label>
                <input
                  type="text"
                  required
                  value={form.name || ''}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Sector / Category</label>
                <select
                  value={form.type}
                  onChange={(e) => setForm({ ...form, type: e.target.value as any })}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 outline-none bg-white"
                >
                  <option value="Government">Government</option>
                  <option value="Tech Community">Tech Community</option>
                  <option value="Corporate">Corporate</option>
                  <option value="Academic">Academic</option>
                  <option value="NGO">NGO</option>
                </select>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Logo Image URL</label>
              <input
                type="text"
                value={form.logoUrl || ''}
                onChange={(e) => setForm({ ...form, logoUrl: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 outline-none"
                placeholder="/src/assets/... or external URL"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t">
              <button
                type="button"
                onClick={() => setIsAdding(false)}
                className="px-4 py-2 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-100"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-lg bg-[#0B2545] text-white text-xs font-bold hover:bg-[#133E87]"
              >
                Save Partner
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Partners List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {partners.map((p) => (
          <div
            key={p.id}
            className="bg-white rounded-2xl border border-slate-200 p-4 flex items-center justify-between shadow-sm"
          >
            <div className="flex items-center gap-3">
              <img
                src={p.logoUrl}
                alt=""
                className="w-10 h-10 rounded-full object-cover bg-slate-100 border"
              />
              <div>
                <p className="text-xs font-bold text-slate-900">{p.name}</p>
                <p className="text-[10px] text-slate-500">{p.type}</p>
              </div>
            </div>

            <button
              onClick={() => handleDelete(p.id)}
              className="p-1 rounded text-slate-400 hover:text-rose-600"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
