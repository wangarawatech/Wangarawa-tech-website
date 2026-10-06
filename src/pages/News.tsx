import React, { useState, useEffect } from 'react';
import { db } from '../services/db';
import { NewsArticle } from '../types';
import {
  Calendar,
  Clock,
  User,
  ChevronLeft,
  ArrowRight,
  Share2,
  Tag,
  BookOpen,
} from 'lucide-react';

interface NewsProps {
  onNavigate: (path: string) => void;
  selectedSlug?: string | null;
  onSelectArticle?: (slug: string | null) => void;
}

export const News: React.FC<NewsProps> = ({
  onNavigate,
  selectedSlug,
  onSelectArticle,
}) => {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  const [activeArticle, setActiveArticle] = useState<NewsArticle | null>(null);

  useEffect(() => {
    const list = db.getNews().filter((n) => n.published);
    setArticles(list);

    if (selectedSlug) {
      const match = list.find((n) => n.slug === selectedSlug || n.id === selectedSlug);
      if (match) setActiveArticle(match);
    }
  }, [selectedSlug]);

  const categories = ['All', 'Announcement', 'Community Impact', 'Technology', 'Education', 'Partnerships'];

  const filteredArticles = categoryFilter === 'All'
    ? articles
    : articles.filter((a) => a.category === categoryFilter);

  // Single Article View
  if (activeArticle) {
    const related = articles
      .filter((a) => a.id !== activeArticle.id)
      .slice(0, 2);

    return (
      <div className="space-y-12 py-8 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => {
            setActiveArticle(null);
            if (onSelectArticle) onSelectArticle(null);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="inline-flex items-center gap-2 text-xs font-bold text-[#0B2545] hover:text-[#133E87]"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Back to All News</span>
        </button>

        <article className="space-y-6">
          <div className="space-y-3">
            <span className="px-3 py-1 rounded bg-amber-100 text-amber-800 text-xs font-bold">
              {activeArticle.category}
            </span>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-[#0B2545] leading-tight">
              {activeArticle.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pt-2 border-b border-slate-200 pb-4">
              <span className="flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-amber-600" />
                {activeArticle.author}
              </span>
              <span aria-hidden="true">·</span>
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-amber-600" />
                {activeArticle.date}
              </span>
              <span aria-hidden="true">·</span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-amber-600" />
                {activeArticle.readTimeMinutes} min read
              </span>
            </div>
          </div>

          <div className="aspect-16/9 rounded-2xl overflow-hidden bg-slate-900 border border-slate-200">
            <img
              src={activeArticle.featuredImage}
              alt={activeArticle.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed space-y-4 text-base whitespace-pre-line">
            {activeArticle.content}
          </div>
        </article>

        {/* Related Articles */}
        {related.length > 0 && (
          <div className="space-y-6 pt-10 border-t border-slate-200">
            <h3 className="text-xl font-bold text-[#0B2545]">Related Stories</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {related.map((item) => (
                <div
                  key={item.id}
                  onClick={() => {
                    setActiveArticle(item);
                    if (onSelectArticle) onSelectArticle(item.slug);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="cursor-pointer bg-white rounded-xl border border-slate-200 p-4 space-y-2 hover:shadow-md transition-shadow"
                >
                  <p className="text-[11px] font-bold text-amber-600 uppercase">{item.category}</p>
                  <h4 className="text-sm font-bold text-slate-900 line-clamp-2">{item.title}</h4>
                  <p className="text-xs text-slate-500 line-clamp-2">{item.excerpt}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  // Articles Directory
  return (
    <div className="space-y-16 sm:space-y-20 py-8">
      {/* Header Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#0B2545] rounded-3xl p-8 sm:p-14 text-white relative overflow-hidden shadow-xl">
          <div className="max-w-3xl space-y-4">
            <div className="text-xs uppercase font-bold tracking-widest text-amber-400">
              Company Journal & Press
            </div>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
              News & Updates
            </h1>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
              Read the latest stories on technology education, graduate achievements, lab enhancements, and regional community initiatives by Wangarawa Global Technology.
            </p>
          </div>
        </div>
      </section>

      {/* Directory Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="flex flex-wrap items-center gap-2 p-1.5 bg-slate-100 rounded-xl max-w-fit">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                categoryFilter === cat
                  ? 'bg-white text-[#0B2545] shadow-sm font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredArticles.map((article) => (
            <article
              key={article.id}
              onClick={() => {
                setActiveArticle(article);
                if (onSelectArticle) onSelectArticle(article.slug);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="group cursor-pointer bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-16/10 overflow-hidden bg-slate-900">
                  <img
                    src={article.featuredImage}
                    alt={article.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 rounded bg-slate-950/80 backdrop-blur-sm text-amber-300 text-[11px] font-semibold border border-white/10">
                      {article.category}
                    </span>
                  </div>
                </div>

                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <span>{article.date}</span>
                    <span aria-hidden="true">·</span>
                    <span>{article.readTimeMinutes} min read</span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 group-hover:text-[#0B2545] transition-colors leading-snug line-clamp-2">
                    {article.title}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                    {article.excerpt}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs font-bold text-[#0B2545] group-hover:text-amber-600 transition-colors inline-flex items-center gap-1">
                  <span>Read Full Story</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </span>
                <span className="text-[11px] text-slate-400">By {article.author}</span>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};
