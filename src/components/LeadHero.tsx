import React from 'react';
import { Article } from '../types/blog';
import { ArrowRight, Bookmark, BookmarkCheck } from 'lucide-react';

interface LeadHeroProps {
  article: Article;
  onRead: (article: Article) => void;
  isSaved: boolean;
  onToggleSave: (articleId: string) => void;
  onAuthorClick: (authorId: string) => void;
}

export const LeadHero: React.FC<LeadHeroProps> = ({
  article,
  onRead,
  isSaved,
  onToggleSave,
  onAuthorClick,
}) => {
  return (
    <article className="border-b border-[#E7E2DA] pb-12 sm:pb-16 mb-12 sm:mb-16">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left Column: Editorial Text (7 cols) */}
        <div className="lg:col-span-7 flex flex-col justify-between">
          <div>
            {/* Unboxed Editorial Kicker (NO PILLS) */}
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#78716C] mb-3">
              <span className="font-semibold text-[#1C1917]">{article.editorialVol || 'Editorial Lead'}</span>
              <span aria-hidden="true">·</span>
              <span>{article.category}</span>
              <span aria-hidden="true">·</span>
              <span>{article.readTime}</span>
            </div>

            {/* Dominant Headline */}
            <h1 
              onClick={() => onRead(article)}
              className="text-3xl sm:text-4xl lg:text-5xl font-editorial-serif font-medium tracking-tight text-[#1C1917] leading-[1.1] mb-4 hover:text-[#57534E] transition-colors cursor-pointer text-balance"
            >
              {article.title}
            </h1>

            {/* Subtitle / Deck */}
            <p className="text-base sm:text-lg text-[#57534E] font-reading-serif italic leading-relaxed mb-6">
              {article.subtitle}
            </p>

            {/* Excerpt */}
            <p className="text-sm text-[#44403C] leading-relaxed line-clamp-3 mb-8 font-modern-sans">
              {article.excerpt}
            </p>
          </div>

          {/* Author Byline & Actions */}
          <div className="pt-6 border-t border-[#E7E2DA] flex flex-wrap items-center justify-between gap-4">
            <div 
              onClick={() => onAuthorClick(article.author.id)}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <div className="w-10 h-10 rounded-full overflow-hidden bg-[#E7E2DA] border border-[#D5CCC3] shrink-0">
                <img
                  src={article.author.avatar}
                  alt={article.author.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
              </div>
              <div>
                <span className="text-xs font-semibold text-[#1C1917] block group-hover:underline">
                  {article.author.name}
                </span>
                <span className="text-[11px] text-[#78716C] block">
                  {article.author.role} · {article.author.city}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => onToggleSave(article.id)}
                className="p-2.5 text-[#57534E] hover:text-[#1C1917] transition-colors border border-[#D5CCC3] hover:border-[#1C1917] cursor-pointer"
                title={isSaved ? 'Remove from Saved' : 'Save for later'}
              >
                {isSaved ? (
                  <BookmarkCheck className="w-4 h-4 text-[#854D0E]" />
                ) : (
                  <Bookmark className="w-4 h-4" />
                )}
              </button>

              <button
                onClick={() => onRead(article)}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#1C1917] text-[#FAF8F5] text-xs uppercase tracking-widest font-medium hover:bg-[#322D29] transition-colors cursor-pointer"
              >
                <span>Read Longform</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Hero Visual Framing (5 cols) */}
        <div className="lg:col-span-5">
          <div 
            onClick={() => onRead(article)}
            className="group cursor-pointer relative overflow-hidden bg-[#EAE4DC] border border-[#D5CCC3]"
          >
            <div className="aspect-[4/5] sm:aspect-[16/11] lg:aspect-[4/5] w-full overflow-hidden">
              <img
                src={article.coverImage}
                alt={article.title}
                className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700 ease-out"
                referrerPolicy="no-referrer"
              />
            </div>
            {/* Subtle Gradient Scrim at base */}
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent p-4 text-white">
              <p className="text-[11px] font-reading-serif italic text-stone-200">
                {article.coverCaption}
              </p>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};
