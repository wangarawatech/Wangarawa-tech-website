import React, { useState, useEffect } from 'react';
import { db } from '../../services/db';
import { Project } from '../../types';
import {
  Plus,
  Edit2,
  Trash2,
  Eye,
  EyeOff,
  Star,
  Check,
  X,
  Upload,
  Image as ImageIcon,
  Video,
} from 'lucide-react';

export const ProjectsManager: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  // Form State
  const [form, setForm] = useState<Partial<Project>>({
    title: '',
    slug: '',
    shortDescription: '',
    fullDescription: '',
    coverImage: '/images/project_ai_youth_bootcamp.jpg',
    images: [],
    videos: [],
    projectDate: '',
    location: 'Dutse, Jigawa State',
    category: 'AI Education',
    beneficiariesCount: 100,
    impactMetrics: [{ label: 'Beneficiaries', value: '100+' }],
    partners: ['Wangarawa Community Hub'],
    status: 'In Progress',
    featured: false,
    published: true,
  });

  const [newImageInput, setNewImageInput] = useState('');
  const [newPartnerInput, setNewPartnerInput] = useState('');
  const [metricLabel, setMetricLabel] = useState('');
  const [metricValue, setMetricValue] = useState('');

  const reload = () => {
    setProjects(db.getProjects());
  };

  useEffect(() => {
    reload();
  }, []);

  const handleStartCreate = () => {
    setForm({
      title: '',
      slug: '',
      shortDescription: '',
      fullDescription: '',
      coverImage: '/images/project_ai_youth_bootcamp.jpg',
      images: ['/images/project_ai_youth_bootcamp.jpg'],
      videos: [],
      projectDate: 'April 2026',
      location: 'Dutse, Jigawa State',
      category: 'AI Education',
      beneficiariesCount: 250,
      impactMetrics: [
        { label: 'Youth Certified', value: '250+' },
        { label: 'Practical Labs', value: '12' },
      ],
      partners: ['Jigawa Innovation Network'],
      status: 'In Progress',
      featured: false,
      published: true,
    });
    setEditingProject(null);
    setIsCreating(true);
  };

  const handleStartEdit = (p: Project) => {
    setEditingProject(p);
    setForm({ ...p });
    setIsCreating(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title) return;

    const slug =
      form.slug ||
      form.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');

    const projectToSave: Project = {
      id: editingProject ? editingProject.id : `proj-${Date.now()}`,
      title: form.title || 'Untitled Project',
      slug,
      shortDescription: form.shortDescription || '',
      fullDescription: form.fullDescription || '',
      coverImage: form.coverImage || '/images/hero_wangarawa_tech.jpg',
      images: form.images || [],
      videos: form.videos || [],
      projectDate: form.projectDate || '2026',
      location: form.location || 'Dutse, Jigawa State',
      category: (form.category as any) || 'AI Education',
      beneficiariesCount: Number(form.beneficiariesCount) || 0,
      impactMetrics: form.impactMetrics || [],
      partners: form.partners || [],
      status: (form.status as any) || 'Completed',
      featured: Boolean(form.featured),
      published: Boolean(form.published),
      createdAt: editingProject?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    db.saveProject(projectToSave);
    setIsCreating(false);
    setEditingProject(null);
    reload();
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this project?')) {
      db.deleteProject(id);
      reload();
    }
  };

  const togglePublish = (p: Project) => {
    db.saveProject({ ...p, published: !p.published });
    reload();
  };

  const toggleFeatured = (p: Project) => {
    db.saveProject({ ...p, featured: !p.featured });
    reload();
  };

  const addImageToForm = () => {
    if (newImageInput.trim()) {
      setForm({ ...form, images: [...(form.images || []), newImageInput.trim()] });
      setNewImageInput('');
    }
  };

  const removeImageFromForm = (idx: number) => {
    const list = [...(form.images || [])];
    list.splice(idx, 1);
    setForm({ ...form, images: list });
  };

  const addMetricToForm = () => {
    if (metricLabel.trim() && metricValue.trim()) {
      setForm({
        ...form,
        impactMetrics: [...(form.impactMetrics || []), { label: metricLabel.trim(), value: metricValue.trim() }],
      });
      setMetricLabel('');
      setMetricValue('');
    }
  };

  const removeMetricFromForm = (idx: number) => {
    const list = [...(form.impactMetrics || [])];
    list.splice(idx, 1);
    setForm({ ...form, impactMetrics: list });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Project Management</h2>
          <p className="text-xs text-slate-500">
            Publish, edit, and organize community impact projects and case studies.
          </p>
        </div>

        {!isCreating && (
          <button
            onClick={handleStartCreate}
            className="px-4 py-2.5 rounded-xl bg-[#0B2545] text-white text-xs font-bold hover:bg-[#133E87] transition-colors flex items-center gap-2 shadow"
          >
            <Plus className="w-4 h-4 text-amber-400" />
            <span>Create New Project</span>
          </button>
        )}
      </div>

      {/* Editor Modal / Card */}
      {isCreating && (
        <div className="bg-white rounded-2xl border border-slate-300 p-6 sm:p-8 shadow-xl space-y-6">
          <div className="flex items-center justify-between border-b border-slate-200 pb-4">
            <h3 className="text-lg font-bold text-slate-900">
              {editingProject ? 'Edit Project' : 'Create New Project'}
            </h3>
            <button
              onClick={() => {
                setIsCreating(false);
                setEditingProject(null);
              }}
              className="text-slate-400 hover:text-slate-600"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSave} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Project Title *</label>
                <input
                  type="text"
                  required
                  value={form.title || ''}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs rounded-lg border border-slate-300 outline-none focus:border-[#0B2545]"
                  placeholder="e.g. Dutse AI Youth Accelerator"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Slug (URL friendly)</label>
                <input
                  type="text"
                  value={form.slug || ''}
                  onChange={(e) => setForm({ ...form, slug: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs rounded-lg border border-slate-300 outline-none focus:border-[#0B2545]"
                  placeholder="auto-generated from title if blank"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Category</label>
                <select
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value as any })}
                  className="w-full px-3.5 py-2 text-xs rounded-lg border border-slate-300 outline-none bg-white"
                >
                  <option value="AI Education">AI Education</option>
                  <option value="Youth Empowerment">Youth Empowerment</option>
                  <option value="Digital Skills">Digital Skills</option>
                  <option value="Technology">Technology</option>
                  <option value="Community Development">Community Development</option>
                  <option value="Innovation">Innovation</option>
                  <option value="Training">Training</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Project Status</label>
                <select
                  value={form.status}
                  onChange={(e) => setForm({ ...form, status: e.target.value as any })}
                  className="w-full px-3.5 py-2 text-xs rounded-lg border border-slate-300 outline-none bg-white"
                >
                  <option value="Completed">Completed</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Upcoming">Upcoming</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Beneficiaries Count</label>
                <input
                  type="number"
                  value={form.beneficiariesCount || 0}
                  onChange={(e) => setForm({ ...form, beneficiariesCount: Number(e.target.value) })}
                  className="w-full px-3.5 py-2 text-xs rounded-lg border border-slate-300 outline-none"
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
                  placeholder="e.g. Dutse, Jigawa State"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Project Date / Period</label>
                <input
                  type="text"
                  value={form.projectDate || ''}
                  onChange={(e) => setForm({ ...form, projectDate: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs rounded-lg border border-slate-300 outline-none"
                  placeholder="e.g. January 2026"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Cover Image URL *</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  required
                  value={form.coverImage || ''}
                  onChange={(e) => setForm({ ...form, coverImage: e.target.value })}
                  className="flex-1 px-3.5 py-2 text-xs rounded-lg border border-slate-300 outline-none"
                  placeholder="/images/... or Cloudinary URL"
                />
                <button
                  type="button"
                  onClick={() => setForm({ ...form, coverImage: '/images/project_ai_youth_bootcamp.jpg' })}
                  className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-medium"
                >
                  Use Default Image
                </button>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Short Summary (for card)</label>
              <textarea
                rows={2}
                value={form.shortDescription || ''}
                onChange={(e) => setForm({ ...form, shortDescription: e.target.value })}
                className="w-full px-3.5 py-2 text-xs rounded-lg border border-slate-300 outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Full Detailed Description</label>
              <textarea
                rows={4}
                value={form.fullDescription || ''}
                onChange={(e) => setForm({ ...form, fullDescription: e.target.value })}
                className="w-full px-3.5 py-2 text-xs rounded-lg border border-slate-300 outline-none"
              />
            </div>

            {/* Gallery Images Builder */}
            <div className="space-y-2 p-4 rounded-xl bg-slate-50 border border-slate-200">
              <label className="text-xs font-bold text-slate-800">Additional Project Gallery Images</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newImageInput}
                  onChange={(e) => setNewImageInput(e.target.value)}
                  placeholder="Paste image URL..."
                  className="flex-1 px-3 py-1.5 text-xs rounded-lg border border-slate-300 bg-white"
                />
                <button
                  type="button"
                  onClick={addImageToForm}
                  className="px-3 py-1.5 rounded-lg bg-[#0B2545] text-white text-xs font-bold"
                >
                  Add Image
                </button>
              </div>

              <div className="flex flex-wrap gap-2 pt-2">
                {(form.images || []).map((img, i) => (
                  <div key={i} className="flex items-center gap-1.5 px-2.5 py-1 bg-white rounded-md border text-[11px]">
                    <span className="truncate max-w-[150px]">{img}</span>
                    <button
                      type="button"
                      onClick={() => removeImageFromForm(i)}
                      className="text-rose-500 hover:text-rose-700"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Impact Metrics Builder */}
            <div className="space-y-2 p-4 rounded-xl bg-slate-50 border border-slate-200">
              <label className="text-xs font-bold text-slate-800">Impact Metrics (Label & Value)</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={metricLabel}
                  onChange={(e) => setMetricLabel(e.target.value)}
                  placeholder="e.g. Youth Certified"
                  className="flex-1 px-3 py-1.5 text-xs rounded-lg border border-slate-300 bg-white"
                />
                <input
                  type="text"
                  value={metricValue}
                  onChange={(e) => setMetricValue(e.target.value)}
                  placeholder="e.g. 1,200+"
                  className="w-28 px-3 py-1.5 text-xs rounded-lg border border-slate-300 bg-white"
                />
                <button
                  type="button"
                  onClick={addMetricToForm}
                  className="px-3 py-1.5 rounded-lg bg-[#0B2545] text-white text-xs font-bold"
                >
                  Add Metric
                </button>
              </div>

              <div className="flex flex-wrap gap-2 pt-2">
                {(form.impactMetrics || []).map((m, i) => (
                  <div key={i} className="flex items-center gap-1.5 px-2.5 py-1 bg-white rounded-md border text-[11px]">
                    <span className="font-semibold">{m.label}:</span>
                    <span className="text-amber-600 font-bold">{m.value}</span>
                    <button
                      type="button"
                      onClick={() => removeMetricFromForm(i)}
                      className="text-rose-500 hover:text-rose-700 ml-1"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Checkboxes: Published & Featured */}
            <div className="flex items-center gap-6 pt-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.published}
                  onChange={(e) => setForm({ ...form, published: e.target.checked })}
                  className="rounded text-[#0B2545]"
                />
                <span className="text-xs font-bold text-slate-800">Publish Online immediately</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.featured}
                  onChange={(e) => setForm({ ...form, featured: e.target.checked })}
                  className="rounded text-amber-500"
                />
                <span className="text-xs font-bold text-slate-800">Feature on Homepage</span>
              </label>
            </div>

            {/* Form Actions */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200">
              <button
                type="button"
                onClick={() => {
                  setIsCreating(false);
                  setEditingProject(null);
                }}
                className="px-4 py-2 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-100"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 rounded-lg bg-[#0B2545] text-white text-xs font-bold hover:bg-[#133E87] shadow"
              >
                {editingProject ? 'Save Changes' : 'Publish Project'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Projects Table */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 uppercase font-semibold">
              <tr>
                <th className="py-3 px-4">Project</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Beneficiaries</th>
                <th className="py-3 px-4">Featured</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {projects.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50/60 transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={p.coverImage}
                        alt=""
                        referrerPolicy="no-referrer"
                        className="w-10 h-10 rounded-lg object-cover bg-slate-100 shrink-0"
                      />
                      <div>
                        <p className="font-bold text-slate-900 line-clamp-1">{p.title}</p>
                        <p className="text-[11px] text-slate-500 font-mono">/{p.slug}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 font-medium text-slate-700">{p.category}</td>
                  <td className="py-3.5 px-4 font-mono font-bold text-slate-800">
                    {p.beneficiariesCount}+
                  </td>
                  <td className="py-3.5 px-4">
                    <button
                      onClick={() => toggleFeatured(p)}
                      className={`p-1.5 rounded-lg transition-colors ${
                        p.featured
                          ? 'text-amber-500 bg-amber-50'
                          : 'text-slate-300 hover:text-slate-500'
                      }`}
                      title={p.featured ? 'Featured on Homepage' : 'Not Featured'}
                    >
                      <Star className="w-4 h-4 fill-current" />
                    </button>
                  </td>
                  <td className="py-3.5 px-4">
                    <button
                      onClick={() => togglePublish(p)}
                      className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                        p.published
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-slate-200 text-slate-600'
                      }`}
                    >
                      {p.published ? 'Published' : 'Draft'}
                    </button>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleStartEdit(p)}
                        className="p-1.5 rounded-lg text-slate-500 hover:text-[#0B2545] hover:bg-slate-100"
                        title="Edit"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(p.id)}
                        className="p-1.5 rounded-lg text-slate-500 hover:text-rose-600 hover:bg-rose-50"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
