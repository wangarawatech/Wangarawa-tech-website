import React, { useState, useEffect } from 'react';
import { db } from '../../services/db';
import { TeamMember } from '../../types';
import { Plus, Edit2, Trash2, X } from 'lucide-react';

export const TeamManager: React.FC = () => {
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const [form, setForm] = useState<Partial<TeamMember>>({
    name: '',
    position: '',
    biography: '',
    profileImage: '/src/assets/images/hero_wangarawa_tech_1791310982051.jpg',
    linkedIn: '',
    email: 'wangarawatech@gmail.com',
    displayOrder: 1,
    published: true,
  });

  const reload = () => {
    setTeam(db.getTeam());
  };

  useEffect(() => {
    reload();
  }, []);

  const handleStartCreate = () => {
    setEditingMember(null);
    setForm({
      name: '',
      position: '',
      biography: '',
      profileImage: '/src/assets/images/hero_wangarawa_tech_1791310982051.jpg',
      linkedIn: '',
      email: 'wangarawatech@gmail.com',
      displayOrder: team.length + 1,
      published: true,
    });
    setIsCreating(true);
  };

  const handleStartEdit = (m: TeamMember) => {
    setEditingMember(m);
    setForm({ ...m });
    setIsCreating(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name) return;

    const memberToSave: TeamMember = {
      id: editingMember ? editingMember.id : `team-${Date.now()}`,
      name: form.name || '',
      position: form.position || '',
      biography: form.biography || '',
      profileImage: form.profileImage || '/src/assets/images/hero_wangarawa_tech_1791310982051.jpg',
      linkedIn: form.linkedIn || '',
      email: form.email || 'wangarawatech@gmail.com',
      twitter: form.twitter || '',
      displayOrder: Number(form.displayOrder) || 1,
      published: Boolean(form.published),
    };

    db.saveTeamMember(memberToSave);
    setIsCreating(false);
    setEditingMember(null);
    reload();
  };

  const handleDelete = (id: string) => {
    if (confirm('Delete this team member profile?')) {
      db.deleteTeamMember(id);
      reload();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Leadership & Faculty Management</h2>
          <p className="text-xs text-slate-500">
            Add instructors, executive directors, and technical leads to the team roster.
          </p>
        </div>

        {!isCreating && (
          <button
            onClick={handleStartCreate}
            className="px-4 py-2.5 rounded-xl bg-[#0B2545] text-white text-xs font-bold hover:bg-[#133E87] transition-colors flex items-center gap-2 shadow"
          >
            <Plus className="w-4 h-4 text-amber-400" />
            <span>Add Team Member</span>
          </button>
        )}
      </div>

      {isCreating && (
        <div className="bg-white rounded-2xl border border-slate-300 p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b pb-3">
            <h3 className="text-base font-bold text-slate-900">
              {editingMember ? 'Edit Profile' : 'New Team Member'}
            </h3>
            <button onClick={() => setIsCreating(false)} className="text-slate-400 hover:text-slate-600">
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSave} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Full Name *</label>
                <input
                  type="text"
                  required
                  value={form.name || ''}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Position / Title *</label>
                <input
                  type="text"
                  required
                  value={form.position || ''}
                  onChange={(e) => setForm({ ...form, position: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 outline-none"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Profile Image URL</label>
              <input
                type="text"
                value={form.profileImage || ''}
                onChange={(e) => setForm({ ...form, profileImage: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Biography</label>
              <textarea
                rows={3}
                value={form.biography || ''}
                onChange={(e) => setForm({ ...form, biography: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 outline-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Email Address</label>
                <input
                  type="email"
                  value={form.email || ''}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">LinkedIn URL</label>
                <input
                  type="text"
                  value={form.linkedIn || ''}
                  onChange={(e) => setForm({ ...form, linkedIn: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Display Order</label>
                <input
                  type="number"
                  value={form.displayOrder || 1}
                  onChange={(e) => setForm({ ...form, displayOrder: Number(e.target.value) })}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 outline-none"
                />
              </div>
            </div>

            <div className="pt-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.published}
                  onChange={(e) => setForm({ ...form, published: e.target.checked })}
                  className="rounded text-[#0B2545]"
                />
                <span className="text-xs font-bold text-slate-800">Show on Team page</span>
              </label>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t">
              <button
                type="button"
                onClick={() => setIsCreating(false)}
                className="px-4 py-2 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-100"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-lg bg-[#0B2545] text-white text-xs font-bold hover:bg-[#133E87]"
              >
                Save Member
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Team Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {team.map((m) => (
          <div
            key={m.id}
            className="bg-white rounded-2xl border border-slate-200 p-4 space-y-3 shadow-sm flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="aspect-square rounded-xl overflow-hidden bg-slate-100">
                <img
                  src={m.profileImage}
                  alt={m.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-900">{m.name}</p>
                <p className="text-[11px] font-semibold text-amber-600">{m.position}</p>
              </div>
              <p className="text-xs text-slate-500 line-clamp-2">{m.biography}</p>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[10px] font-mono text-slate-400">Order: {m.displayOrder}</span>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => handleStartEdit(m)}
                  className="p-1 rounded text-slate-500 hover:text-[#0B2545] hover:bg-slate-100"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleDelete(m.id)}
                  className="p-1 rounded text-slate-500 hover:text-rose-600 hover:bg-rose-50"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
