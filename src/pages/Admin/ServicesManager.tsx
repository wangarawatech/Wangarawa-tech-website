import React, { useState, useEffect } from 'react';
import { db } from '../../services/db';
import { Service } from '../../types';
import { Plus, Edit2, Trash2, X, Check } from 'lucide-react';

export const ServicesManager: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [editingService, setEditingService] = useState<Service | null>(null);

  const reload = () => {
    setServices(db.getServices());
  };

  useEffect(() => {
    reload();
  }, []);

  const handleTogglePublish = (srv: Service) => {
    db.saveService({ ...srv, published: !srv.published });
    reload();
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingService) return;
    db.saveService(editingService);
    setEditingService(null);
    reload();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Services Catalog Management</h2>
          <p className="text-xs text-slate-500">
            Control the 12 core tech competencies, training descriptions, and visibility.
          </p>
        </div>
      </div>

      {editingService && (
        <div className="bg-white rounded-2xl border border-slate-300 p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b pb-3">
            <h3 className="text-base font-bold text-slate-900">Edit Service: {editingService.title}</h3>
            <button onClick={() => setEditingService(null)} className="text-slate-400 hover:text-slate-600">
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSave} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Service Title</label>
                <input
                  type="text"
                  required
                  value={editingService.title}
                  onChange={(e) => setEditingService({ ...editingService, title: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Category</label>
                <select
                  value={editingService.category}
                  onChange={(e) => setEditingService({ ...editingService, category: e.target.value as any })}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 outline-none bg-white"
                >
                  <option value="AI & Emerging Tech">AI & Emerging Tech</option>
                  <option value="Digital Skills">Digital Skills</option>
                  <option value="Software & Development">Software & Development</option>
                  <option value="Hardware & Support">Hardware & Support</option>
                  <option value="Enterprise Services">Enterprise Services</option>
                </select>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Brief Card Description</label>
              <textarea
                rows={2}
                value={editingService.description}
                onChange={(e) => setEditingService({ ...editingService, description: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Detailed Scope Description</label>
              <textarea
                rows={3}
                value={editingService.longDescription || ''}
                onChange={(e) => setEditingService({ ...editingService, longDescription: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 outline-none"
              />
            </div>

            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={editingService.published}
                  onChange={(e) => setEditingService({ ...editingService, published: e.target.checked })}
                  className="rounded text-[#0B2545]"
                />
                <span className="text-xs font-bold text-slate-800">Published online</span>
              </label>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t">
              <button
                type="button"
                onClick={() => setEditingService(null)}
                className="px-4 py-2 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-100"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-lg bg-[#0B2545] text-white text-xs font-bold hover:bg-[#133E87]"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Services Table */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 uppercase font-semibold">
            <tr>
              <th className="py-3 px-4">Order</th>
              <th className="py-3 px-4">Service</th>
              <th className="py-3 px-4">Category</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4 text-right">Edit</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {services.map((srv, idx) => (
              <tr key={srv.id} className="hover:bg-slate-50/60">
                <td className="py-3 px-4 font-mono text-slate-400 font-bold">{idx + 1}</td>
                <td className="py-3 px-4 font-bold text-slate-900">{srv.title}</td>
                <td className="py-3 px-4 text-slate-600">{srv.category}</td>
                <td className="py-3 px-4">
                  <button
                    onClick={() => handleTogglePublish(srv)}
                    className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      srv.published ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-600'
                    }`}
                  >
                    {srv.published ? 'Visible' : 'Hidden'}
                  </button>
                </td>
                <td className="py-3 px-4 text-right">
                  <button
                    onClick={() => setEditingService(srv)}
                    className="p-1.5 rounded-lg text-slate-500 hover:text-[#0B2545] hover:bg-slate-100"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
