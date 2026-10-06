import React, { useState, useEffect } from 'react';
import { db } from '../../services/db';
import { HeroSlide } from '../../types';
import { Plus, Edit2, Trash2, X, Sliders, Check, Eye } from 'lucide-react';

export const HomepageManager: React.FC = () => {
  const [slides, setSlides] = useState<HeroSlide[]>([]);
  const [editingSlide, setEditingSlide] = useState<HeroSlide | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const [form, setForm] = useState<Partial<HeroSlide>>({
    headline: '',
    subheadline: '',
    bgImageUrl: '/images/hero_wangarawa_tech.jpg',
    primaryCtaText: 'Explore Our Work',
    primaryCtaLink: '#projects',
    secondaryCtaText: 'Work With Us',
    secondaryCtaLink: '#contact',
    active: true,
    displayOrder: 1,
  });

  const reload = () => {
    setSlides(db.getHeroSlides());
  };

  useEffect(() => {
    reload();
  }, []);

  const handleStartCreate = () => {
    setForm({
      headline: '',
      subheadline: '',
      bgImageUrl: '/images/project_ai_youth_bootcamp.jpg',
      primaryCtaText: 'Explore Our Work',
      primaryCtaLink: '#projects',
      secondaryCtaText: 'Work With Us',
      secondaryCtaLink: '#contact',
      active: true,
      displayOrder: slides.length + 1,
    });
    setEditingSlide(null);
    setIsCreating(true);
  };

  const handleStartEdit = (slide: HeroSlide) => {
    setEditingSlide(slide);
    setForm({ ...slide });
    setIsCreating(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.headline) return;

    const slideToSave: HeroSlide = {
      id: editingSlide ? editingSlide.id : `slide-${Date.now()}`,
      headline: form.headline || '',
      subheadline: form.subheadline || '',
      bgImageUrl: form.bgImageUrl || '/images/hero_wangarawa_tech.jpg',
      bgVideoUrl: form.bgVideoUrl || '',
      primaryCtaText: form.primaryCtaText || 'Explore Our Work',
      primaryCtaLink: form.primaryCtaLink || '#projects',
      secondaryCtaText: form.secondaryCtaText || 'Work With Us',
      secondaryCtaLink: form.secondaryCtaLink || '#contact',
      active: Boolean(form.active),
      displayOrder: Number(form.displayOrder) || 1,
    };

    db.saveHeroSlide(slideToSave);
    setIsCreating(false);
    setEditingSlide(null);
    reload();
  };

  const handleDelete = (id: string) => {
    if (confirm('Delete this hero slide?')) {
      db.deleteHeroSlide(id);
      reload();
    }
  };

  const toggleActive = (slide: HeroSlide) => {
    db.saveHeroSlide({ ...slide, active: !slide.active });
    reload();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Homepage Hero Slider Management</h2>
          <p className="text-xs text-slate-500">
            Customize hero slides, background photos, video backdrops, headlines, and call-to-action buttons.
          </p>
        </div>

        {!isCreating && (
          <button
            onClick={handleStartCreate}
            className="px-4 py-2.5 rounded-xl bg-[#0B2545] text-white text-xs font-bold hover:bg-[#133E87] transition-colors flex items-center gap-2 shadow"
          >
            <Plus className="w-4 h-4 text-amber-400" />
            <span>Add Hero Slide</span>
          </button>
        )}
      </div>

      {/* Editor Modal / Card */}
      {isCreating && (
        <div className="bg-white rounded-2xl border border-slate-300 p-6 sm:p-8 shadow-xl space-y-6">
          <div className="flex items-center justify-between border-b pb-4">
            <h3 className="text-lg font-bold text-slate-900">
              {editingSlide ? 'Edit Hero Slide' : 'Add New Hero Slide'}
            </h3>
            <button onClick={() => setIsCreating(false)} className="text-slate-400 hover:text-slate-600">
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSave} className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Headline Title *</label>
              <input
                type="text"
                required
                value={form.headline || ''}
                onChange={(e) => setForm({ ...form, headline: e.target.value })}
                className="w-full px-3.5 py-2 text-xs rounded-lg border border-slate-300 outline-none"
                placeholder="e.g. Empowering the Next Generation of Innovators."
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Subheadline Supporting Text</label>
              <textarea
                rows={3}
                value={form.subheadline || ''}
                onChange={(e) => setForm({ ...form, subheadline: e.target.value })}
                className="w-full px-3.5 py-2 text-xs rounded-lg border border-slate-300 outline-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Background Image URL *</label>
                <input
                  type="text"
                  required
                  value={form.bgImageUrl || ''}
                  onChange={(e) => setForm({ ...form, bgImageUrl: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs rounded-lg border border-slate-300 outline-none"
                  placeholder="/images/... or Cloudinary URL"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Background Video URL (Optional)</label>
                <input
                  type="text"
                  value={form.bgVideoUrl || ''}
                  onChange={(e) => setForm({ ...form, bgVideoUrl: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs rounded-lg border border-slate-300 outline-none"
                  placeholder="https://... video stream"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200">
              <div className="space-y-2">
                <p className="text-xs font-bold text-slate-800">Primary CTA Button</p>
                <input
                  type="text"
                  value={form.primaryCtaText || ''}
                  onChange={(e) => setForm({ ...form, primaryCtaText: e.target.value })}
                  placeholder="Button text (e.g. Explore Our Work)"
                  className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-300 bg-white"
                />
                <input
                  type="text"
                  value={form.primaryCtaLink || ''}
                  onChange={(e) => setForm({ ...form, primaryCtaLink: e.target.value })}
                  placeholder="Button target (e.g. #projects)"
                  className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-300 bg-white"
                />
              </div>

              <div className="space-y-2">
                <p className="text-xs font-bold text-slate-800">Secondary CTA Button</p>
                <input
                  type="text"
                  value={form.secondaryCtaText || ''}
                  onChange={(e) => setForm({ ...form, secondaryCtaText: e.target.value })}
                  placeholder="Button text (e.g. Work With Us)"
                  className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-300 bg-white"
                />
                <input
                  type="text"
                  value={form.secondaryCtaLink || ''}
                  onChange={(e) => setForm({ ...form, secondaryCtaLink: e.target.value })}
                  placeholder="Button target (e.g. #contact)"
                  className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-300 bg-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Display Order</label>
                <input
                  type="number"
                  value={form.displayOrder || 1}
                  onChange={(e) => setForm({ ...form, displayOrder: Number(e.target.value) })}
                  className="w-full px-3.5 py-2 text-xs rounded-lg border border-slate-300 outline-none"
                />
              </div>

              <div className="flex items-center pt-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.active}
                    onChange={(e) => setForm({ ...form, active: e.target.checked })}
                    className="rounded text-[#0B2545]"
                  />
                  <span className="text-xs font-bold text-slate-800">Slide is Active in Carousel</span>
                </label>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-4 border-t">
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
                Save Slide
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Slides Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {slides.map((slide) => (
          <div
            key={slide.id}
            className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
          >
            <div>
              <div className="aspect-16/9 bg-slate-900 relative">
                <img
                  src={slide.bgImageUrl}
                  alt={slide.headline}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute top-2 right-2">
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      slide.active ? 'bg-emerald-500 text-white' : 'bg-slate-500 text-white'
                    }`}
                  >
                    {slide.active ? 'Active' : 'Inactive'}
                  </span>
                </div>
                <div className="absolute bottom-2 left-3 right-3 text-white text-xs font-bold line-clamp-1">
                  #{slide.displayOrder}: {slide.headline}
                </div>
              </div>

              <div className="p-4 space-y-2">
                <p className="text-xs text-slate-600 line-clamp-2">{slide.subheadline}</p>
                <div className="flex items-center gap-2 text-[10px] text-slate-400">
                  <span>CTA 1: {slide.primaryCtaText}</span>
                  <span>·</span>
                  <span>CTA 2: {slide.secondaryCtaText}</span>
                </div>
              </div>
            </div>

            <div className="p-4 pt-0 border-t border-slate-100 flex items-center justify-between">
              <button
                onClick={() => toggleActive(slide)}
                className="text-xs font-semibold text-slate-600 hover:text-slate-900"
              >
                {slide.active ? 'Deactivate' : 'Activate'}
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleStartEdit(slide)}
                  className="p-1.5 rounded-lg text-slate-500 hover:text-[#0B2545] hover:bg-slate-100"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleDelete(slide.id)}
                  className="p-1.5 rounded-lg text-slate-500 hover:text-rose-600 hover:bg-rose-50"
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
