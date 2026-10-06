import React, { useState, useEffect } from 'react';
import { db } from '../../services/db';
import { NewsArticle } from '../../types';
import { Plus, Edit2, Trash2, X } from 'lucide-react';

export const NewsManager: React.FC = () => {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [form, setForm] = useState<Partial<NewsArticle>>({
    title: '',
    slug: '',
    featuredImage: '/src/assets/images/project_ai_youth_bootcamp_1791310992784.jpg',
    excerpt: '',
    content: '',
    author: 'Wangarawa Tech',
    date: 'April 2026',
    category: 'Announcement',
    readTimeMinutes: 4,
    published: true,
  });

  const reload = () => {
    setArticles(db.getNews());
  };

  useEffect(() => {
    reload();
  }, []);

  const handleStartCreate = () => {
    setEditingId(null);
    setForm({
      title: '',
      slug: '',
      featuredImage: '/src/assets/images/office_innovation_hub_1791311014618.jpg',
      excerpt: '',
      content: '',
      author: 'Wangarawa Tech Editorial',
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      category: 'Announcement',
      readTimeMinutes: 3,
      published: true,
    });
    setIsEditing(true);
  };

  const handleStartEdit = (article: NewsArticle) => {
    setEditingId(article.id);
    setForm({ ...article });
    setIsEditing(true);
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

    const articleToSave: NewsArticle = {
      id: editingId || `news-${Date.now()}`,
      title: form.title || 'Untitled Post',
      slug,
      featuredImage: form.featuredImage || '/src/assets/images/hero_wangarawa_tech_1791310982051.jpg',
      excerpt: form.excerpt || '',
      content: form.content || '',
      author: form.author || 'Wangarawa Tech',
      date: form.date || new Date().toLocaleDateString(),
      category: (form.category as any) || 'Announcement',
      images: form.images || [],
      published: Boolean(form.published),
      readTimeMinutes: Number(form.readTimeMinutes) || 3,
      createdAt: form.createdAt || new Date().toISOString(),
    };

    db.saveNews(articleToSave);
    setIsEditing(false);
    setEditingId(null);
    reload();
  };

  const handleDelete = (id: string) => {
    if (confirm('Delete this article?')) {
      db.deleteNews(id);
      reload();
    }
  };

  const togglePublish = (article: NewsArticle) => {
    db.saveNews({ ...article, published: !article.published });
    reload();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <h2 className="text-xl font-bold text-slate-900">News & Journal Management</h2>
          <p className="text-xs text-slate-500">
            Publish blog articles, press releases, and impact stories.
          </p>
        </div>

        {!isEditing && (
          <button
            onClick={handleStartCreate}
            className="px-4 py-2.5 rounded-xl bg-[#0B2545] text-white text-xs font-bold hover:bg-[#133E87] transition-colors flex items-center gap-2 shadow"
          >
            <Plus className="w-4 h-4 text-amber-400" />
            <span>Write New Article</span>
          </button>
        )}
      </div>

      {isEditing && (
        <div className="bg-white rounded-2xl border border-slate-300 p-6 sm:p-8 shadow-xl space-y-6">
          <div className="flex items-center justify-between border-b pb-4">
            <h3 className="text-lg font-bold text-slate-900">
              {editingId ? 'Edit Article' : 'Compose New Article'}
            </h3>
            <button onClick={() => setIsEditing(false)} className="text-slate-400 hover:text-slate-600">
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSave} className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Article Title *</label>
              <input
                type="text"
                required
                value={form.title || ''}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="w-full px-3.5 py-2 text-xs rounded-lg border border-slate-300 outline-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Category</label>
                <select
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value as any })}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 outline-none bg-white"
                >
                  <option value="Announcement">Announcement</option>
                  <option value="Community Impact">Community Impact</option>
                  <option value="Technology">Technology</option>
                  <option value="Education">Education</option>
                  <option value="Partnerships">Partnerships</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Author</label>
                <input
                  type="text"
                  value={form.author || ''}
                  onChange={(e) => setForm({ ...form, author: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Date Display</label>
                <input
                  type="text"
                  value={form.date || ''}
                  onChange={(e) => setForm({ ...form, date: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 outline-none"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Featured Image URL</label>
              <input
                type="text"
                value={form.featuredImage || ''}
                onChange={(e) => setForm({ ...form, featuredImage: e.target.value })}
                className="w-full px-3.5 py-2 text-xs rounded-lg border border-slate-300 outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Short Summary Excerpt</label>
              <textarea
                rows={2}
                value={form.excerpt || ''}
                onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
                className="w-full px-3.5 py-2 text-xs rounded-lg border border-slate-300 outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Full Article Content</label>
              <textarea
                rows={8}
                value={form.content || ''}
                onChange={(e) => setForm({ ...form, content: e.target.value })}
                className="w-full px-3.5 py-2 text-xs rounded-lg border border-slate-300 outline-none font-sans"
                placeholder="Write article paragraphs here..."
              />
            </div>

            <div className="pt-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.published}
                  onChange={(e) => setForm({ ...form, published: e.target.checked })}
                  className="rounded text-[#0B2545]"
                />
                <span className="text-xs font-bold text-slate-800">Publish immediately on website</span>
              </label>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t">
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
                Save Article
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Article List */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 uppercase font-semibold">
              <tr>
                <th className="py-3 px-4">Article</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Author</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {articles.map((a) => (
                <tr key={a.id} className="hover:bg-slate-50/60">
                  <td className="py-3.5 px-4">
                    <p className="font-bold text-slate-900 line-clamp-1">{a.title}</p>
                    <p className="text-[11px] text-slate-400 font-mono">/{a.slug}</p>
                  </td>
                  <td className="py-3.5 px-4 text-slate-700">{a.category}</td>
                  <td className="py-3.5 px-4 text-slate-600">{a.author}</td>
                  <td className="py-3.5 px-4 text-slate-500">{a.date}</td>
                  <td className="py-3.5 px-4">
                    <button
                      onClick={() => togglePublish(a)}
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        a.published ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-600'
                      }`}
                    >
                      {a.published ? 'Published' : 'Draft'}
                    </button>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleStartEdit(a)}
                        className="p-1.5 rounded-lg text-slate-500 hover:text-[#0B2545] hover:bg-slate-100"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(a.id)}
                        className="p-1.5 rounded-lg text-slate-500 hover:text-rose-600 hover:bg-rose-50"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
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
