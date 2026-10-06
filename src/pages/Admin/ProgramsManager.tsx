import React, { useState, useEffect } from 'react';
import { db } from '../../services/db';
import { Program } from '../../types';
import { Plus, Edit2, Trash2, X, Calendar, MapPin, Users } from 'lucide-react';

export const ProgramsManager: React.FC = () => {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [form, setForm] = useState<Partial<Program>>({
    title: '',
    description: '',
    coverImage: '/images/project_ai_youth_bootcamp.jpg',
    startDate: 'May 1, 2026',
    endDate: 'June 15, 2026',
    location: 'Wangarawa Tech Lab, Dutse, Jigawa State',
    targetAudience: 'Youth, university students, aspiring tech workers',
    registrationLink: '#contact',
    status: 'Open for Registration',
    curriculumHighlights: ['Module 1: Principles', 'Module 2: Practical Labs'],
    published: true,
  });

  const [moduleInput, setModuleInput] = useState('');

  const reload = () => {
    setPrograms(db.getPrograms());
  };

  useEffect(() => {
    reload();
  }, []);

  const handleStartCreate = () => {
    setEditingId(null);
    setForm({
      title: '',
      description: '',
      coverImage: '/images/project_digital_skills_training.jpg',
      startDate: 'May 15, 2026',
      endDate: 'June 30, 2026',
      location: 'No. 003 Wangara Shopping Complex, Sabuwar Takur, Dutse',
      targetAudience: 'Secondary school leavers, beginners & undergraduates',
      registrationLink: '#contact',
      status: 'Open for Registration',
      curriculumHighlights: ['Foundational Concepts', 'Hands-on Workstations', 'Capstone Project'],
      published: true,
    });
    setIsEditing(true);
  };

  const handleStartEdit = (p: Program) => {
    setEditingId(p.id);
    setForm({ ...p });
    setIsEditing(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title) return;

    const progToSave: Program = {
      id: editingId || `prog-${Date.now()}`,
      title: form.title || 'Untitled Program',
      description: form.description || '',
      coverImage: form.coverImage || '/images/project_ai_youth_bootcamp.jpg',
      startDate: form.startDate || '',
      endDate: form.endDate || '',
      location: form.location || 'Dutse, Jigawa State',
      targetAudience: form.targetAudience || 'General Youth',
      registrationLink: form.registrationLink || '#contact',
      status: (form.status as any) || 'Open for Registration',
      gallery: form.gallery || [],
      curriculumHighlights: form.curriculumHighlights || [],
      published: Boolean(form.published),
      createdAt: form.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    db.saveProgram(progToSave);
    setIsEditing(false);
    setEditingId(null);
    reload();
  };

  const handleDelete = (id: string) => {
    if (confirm('Delete this training program?')) {
      db.deleteProgram(id);
      reload();
    }
  };

  const togglePublish = (p: Program) => {
    db.saveProgram({ ...p, published: !p.published });
    reload();
  };

  const addModule = () => {
    if (moduleInput.trim()) {
      setForm({
        ...form,
        curriculumHighlights: [...(form.curriculumHighlights || []), moduleInput.trim()],
      });
      setModuleInput('');
    }
  };

  const removeModule = (idx: number) => {
    const list = [...(form.curriculumHighlights || [])];
    list.splice(idx, 1);
    setForm({ ...form, curriculumHighlights: list });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Training Programs & Cohorts</h2>
          <p className="text-xs text-slate-500">
            Manage cohort schedules, admission statuses, and course curriculums.
          </p>
        </div>

        {!isEditing && (
          <button
            onClick={handleStartCreate}
            className="px-4 py-2.5 rounded-xl bg-[#0B2545] text-white text-xs font-bold hover:bg-[#133E87] transition-colors flex items-center gap-2 shadow"
          >
            <Plus className="w-4 h-4 text-amber-400" />
            <span>Create New Program</span>
          </button>
        )}
      </div>

      {isEditing && (
        <div className="bg-white rounded-2xl border border-slate-300 p-6 sm:p-8 shadow-xl space-y-6">
          <div className="flex items-center justify-between border-b border-slate-200 pb-4">
            <h3 className="text-lg font-bold text-slate-900">
              {editingId ? 'Edit Program' : 'Create Program Cohort'}
            </h3>
            <button onClick={() => setIsEditing(false)} className="text-slate-400 hover:text-slate-600">
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSave} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Program Title *</label>
                <input
                  type="text"
                  required
                  value={form.title || ''}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs rounded-lg border border-slate-300 outline-none"
                  placeholder="e.g. AI & Prompt Engineering Accelerator (Cohort 5)"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Admission Status</label>
                <select
                  value={form.status}
                  onChange={(e) => setForm({ ...form, status: e.target.value as any })}
                  className="w-full px-3.5 py-2 text-xs rounded-lg border border-slate-300 outline-none bg-white"
                >
                  <option value="Open for Registration">Open for Registration</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Upcoming">Upcoming</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Start Date</label>
                <input
                  type="text"
                  value={form.startDate || ''}
                  onChange={(e) => setForm({ ...form, startDate: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs rounded-lg border border-slate-300 outline-none"
                  placeholder="e.g. May 10, 2026"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">End Date</label>
                <input
                  type="text"
                  value={form.endDate || ''}
                  onChange={(e) => setForm({ ...form, endDate: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs rounded-lg border border-slate-300 outline-none"
                  placeholder="e.g. June 20, 2026"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Location</label>
                <input
                  type="text"
                  value={form.location || ''}
                  onChange={(e) => setForm({ ...form, location: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs rounded-lg border border-slate-300 outline-none"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Target Audience</label>
                <input
                  type="text"
                  value={form.targetAudience || ''}
                  onChange={(e) => setForm({ ...form, targetAudience: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs rounded-lg border border-slate-300 outline-none"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Cover Image URL</label>
              <input
                type="text"
                value={form.coverImage || ''}
                onChange={(e) => setForm({ ...form, coverImage: e.target.value })}
                className="w-full px-3.5 py-2 text-xs rounded-lg border border-slate-300 outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Description</label>
              <textarea
                rows={3}
                value={form.description || ''}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                className="w-full px-3.5 py-2 text-xs rounded-lg border border-slate-300 outline-none"
              />
            </div>

            {/* Curriculum Highlights */}
            <div className="space-y-2 p-4 rounded-xl bg-slate-50 border border-slate-200">
              <label className="text-xs font-bold text-slate-800">Curriculum Highlights / Modules</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={moduleInput}
                  onChange={(e) => setModuleInput(e.target.value)}
                  placeholder="e.g. Advanced Prompt Architectures"
                  className="flex-1 px-3 py-1.5 text-xs rounded-lg border border-slate-300 bg-white"
                />
                <button
                  type="button"
                  onClick={addModule}
                  className="px-3 py-1.5 rounded-lg bg-[#0B2545] text-white text-xs font-bold"
                >
                  Add Module
                </button>
              </div>

              <div className="space-y-1.5 pt-2">
                {(form.curriculumHighlights || []).map((mod, i) => (
                  <div key={i} className="flex items-center justify-between p-2 bg-white rounded border text-xs">
                    <span>{mod}</span>
                    <button
                      type="button"
                      onClick={() => removeModule(i)}
                      className="text-rose-500 hover:text-rose-700 text-xs font-bold"
                    >
                      ✕
                    </button>
                  </div>
                ))}
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
                <span className="text-xs font-bold text-slate-800">Visible on public Programs page</span>
              </label>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-slate-200">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-100"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 rounded-lg bg-[#0B2545] text-white text-xs font-bold hover:bg-[#133E87]"
              >
                Save Program
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Program List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {programs.map((p) => (
          <div
            key={p.id}
            className="bg-white rounded-2xl border border-slate-200 p-5 space-y-4 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <img
                    src={p.coverImage}
                    alt=""
                    className="w-12 h-12 rounded-lg object-cover bg-slate-100 shrink-0"
                  />
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 leading-tight">{p.title}</h4>
                    <span className="text-[10px] font-semibold text-amber-600">{p.status}</span>
                  </div>
                </div>

                <button
                  onClick={() => togglePublish(p)}
                  className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    p.published ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-600'
                  }`}
                >
                  {p.published ? 'Live' : 'Draft'}
                </button>
              </div>

              <p className="text-xs text-slate-600 line-clamp-2">{p.description}</p>
              <div className="text-[11px] text-slate-500 space-y-0.5">
                <p>Dates: {p.startDate} – {p.endDate}</p>
                <p>Location: {p.location}</p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
              <button
                onClick={() => handleStartEdit(p)}
                className="px-3 py-1.5 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-1"
              >
                <Edit2 className="w-3.5 h-3.5" />
                <span>Edit</span>
              </button>
              <button
                onClick={() => handleDelete(p.id)}
                className="px-3 py-1.5 rounded bg-rose-50 hover:bg-rose-100 text-rose-600 text-xs font-semibold flex items-center gap-1"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
