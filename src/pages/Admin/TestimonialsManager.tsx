import React, { useState, useEffect } from 'react';
import { db } from '../../services/db';
import { Testimonial } from '../../types';
import { Plus, Edit2, Trash2, X, Star } from 'lucide-react';

export const TestimonialsManager: React.FC = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [form, setForm] = useState<Partial<Testimonial>>({
    name: '',
    role: '',
    organization: '',
    quote: '',
    programOrProject: 'AI Accelerator',
    rating: 5,
    published: true,
  });

  const reload = () => {
    setTestimonials(db.getTestimonials());
  };

  useEffect(() => {
    reload();
  }, []);

  const handleStartCreate = () => {
    setEditingId(null);
    setForm({
      name: '',
      role: 'Alumnus',
      organization: 'Dutse Tech Trainee',
      quote: '',
      programOrProject: 'Prompt Engineering & AI',
      rating: 5,
      published: true,
    });
    setIsEditing(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.quote) return;

    const item: Testimonial = {
      id: editingId || `test-${Date.now()}`,
      name: form.name,
      role: form.role || 'Participant',
      organization: form.organization || 'Dutse Community',
      quote: form.quote,
      programOrProject: form.programOrProject || 'Wangarawa Program',
      rating: Number(form.rating) || 5,
      published: Boolean(form.published),
    };

    db.saveTestimonial(item);
    setIsEditing(false);
    reload();
  };

  const handleDelete = (id: string) => {
    if (confirm('Delete this testimonial?')) {
      db.deleteTestimonial(id);
      reload();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Student & Partner Testimonials</h2>
          <p className="text-xs text-slate-500">
            Showcase authentic graduate outcomes and partner feedback.
          </p>
        </div>

        {!isEditing && (
          <button
            onClick={handleStartCreate}
            className="px-4 py-2.5 rounded-xl bg-[#0B2545] text-white text-xs font-bold hover:bg-[#133E87] transition-colors flex items-center gap-2 shadow"
          >
            <Plus className="w-4 h-4 text-amber-400" />
            <span>Add Testimonial</span>
          </button>
        )}
      </div>

      {isEditing && (
        <div className="bg-white rounded-2xl border border-slate-300 p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b pb-3">
            <h3 className="text-base font-bold text-slate-900">Add / Edit Testimonial</h3>
            <button onClick={() => setIsEditing(false)} className="text-slate-400 hover:text-slate-600">
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSave} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
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
                <label className="text-xs font-bold text-slate-700">Role / Title</label>
                <input
                  type="text"
                  value={form.role || ''}
                  onChange={(e) => setForm({ ...form, role: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Organization</label>
                <input
                  type="text"
                  value={form.organization || ''}
                  onChange={(e) => setForm({ ...form, organization: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 outline-none"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Program / Initiative Attended</label>
              <input
                type="text"
                value={form.programOrProject || ''}
                onChange={(e) => setForm({ ...form, programOrProject: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Testimonial Quote *</label>
              <textarea
                rows={3}
                required
                value={form.quote || ''}
                onChange={(e) => setForm({ ...form, quote: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 outline-none"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-100"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-lg bg-[#0B2545] text-white text-xs font-bold hover:bg-[#133E87]"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Testimonials List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.map((t) => (
          <div
            key={t.id}
            className="bg-white rounded-2xl border border-slate-200 p-5 space-y-3 shadow-sm flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="flex items-center gap-1 text-amber-500">
                {[...Array(t.rating || 5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current" />
                ))}
              </div>
              <p className="text-xs text-slate-700 italic leading-relaxed">"{t.quote}"</p>
              <div>
                <p className="text-xs font-bold text-slate-900">{t.name}</p>
                <p className="text-[11px] text-slate-500">{t.role} · {t.organization}</p>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[10px] text-amber-600 font-semibold">{t.programOrProject}</span>
              <button
                onClick={() => handleDelete(t.id)}
                className="p-1 rounded text-slate-400 hover:text-rose-600"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
