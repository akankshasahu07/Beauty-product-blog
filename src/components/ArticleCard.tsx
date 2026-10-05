import React from 'react';
import { Article } from '../types/blog';
import { Bookmark, BookmarkCheck, ArrowUpRight } from 'lucide-react';

interface ArticleCardProps {
  article: Article;
  onRead: (article: Article) => void;
  isSaved: boolean;
  onToggleSave: (articleId: string) => void;
  onAuthorClick: (authorId: string) => void;
  layoutVariant?: 'standard' | 'compact' | 'featured-compact';
}

export const ArticleCard: React.FC<ArticleCardProps> = ({
  article,
  onRead,
  isSaved,
  onToggleSave,
  onAuthorClick,
  layoutVariant = 'standard',
}) => {
  if (layoutVariant === 'compact') {
    return (
      <article className="group py-5 border-b border-[#E7E2DA] flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 text-[11px] uppercase tracking-wider text-[#78716C] mb-1">
            <span className="text-[#1C1917] font-medium">{article.category}</span>
            <span aria-hidden="true">·</span>
            <span>{article.readTime}</span>
          </div>
          <h3
            onClick={() => onRead(article)}
            className="text-lg font-editorial-serif font-medium text-[#1C1917] group-hover:text-[#78716C] transition-colors cursor-pointer leading-snug"
          >
            {article.title}
          </h3>
          <p className="text-xs text-[#57534E] mt-1 font-reading-serif italic line-clamp-1">
            {article.subtitle}
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0 pt-1">
          <button
            onClick={() => onToggleSave(article.id)}
            className="p-1.5 text-[#78716C] hover:text-[#1C1917] transition-colors cursor-pointer"
            aria-label="Bookmark article"
          >
            {isSaved ? <BookmarkCheck className="w-4 h-4 text-[#854D0E]" /> : <Bookmark className="w-4 h-4" />}
          </button>
          <button
            onClick={() => onRead(article)}
            className="p-1.5 text-[#78716C] group-hover:text-[#1C1917] group-hover:translate-x-0.5 transition-all cursor-pointer"
            aria-label="Read essay"
          >
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      </article>
    );
  }

  return (
    <article className="group flex flex-col justify-between h-full bg-[#FAF8F5] border border-[#E7E2DA] hover:border-[#B8ADA0] transition-colors duration-300">
      <div>
        {/* Card Visual with Aspect Ratio */}
        <div 
          onClick={() => onRead(article)}
          className="relative aspect-[16/10] overflow-hidden bg-[#ECE6DE] cursor-pointer"
        >
          <img
            src={article.coverImage}
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-600 ease-out"
            referrerPolicy="no-referrer"
          />
          <div className="absolute top-3 right-3">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleSave(article.id);
              }}
              className="p-2 bg-[#FAF8F5]/85 backdrop-blur-xs text-[#1C1917] hover:bg-[#FAF8F5] transition-colors cursor-pointer border border-[#E7E2DA]"
              title={isSaved ? 'Remove from Saved' : 'Save for later'}
            >
              {isSaved ? (
                <BookmarkCheck className="w-3.5 h-3.5 text-[#854D0E]" />
              ) : (
                <Bookmark className="w-3.5 h-3.5 text-[#57534E]" />
              )}
            </button>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-5 sm:p-6">
          {/* Unboxed Metadata (NO PILLS) */}
          <div className="flex items-center gap-2 text-[11px] uppercase tracking-widest text-[#78716C] mb-2 font-modern-sans">
            <span className="font-semibold text-[#1C1917]">{article.category}</span>
            <span aria-hidden="true">·</span>
            <span>{article.readTime}</span>
            <span aria-hidden="true">·</span>
            <span>{article.publishDate.split(',')[0]}</span>
          </div>

          <h3
            onClick={() => onRead(article)}
            className="text-xl sm:text-2xl font-editorial-serif font-medium text-[#1C1917] group-hover:text-[#57534E] transition-colors cursor-pointer leading-snug mb-2 line-clamp-2 text-balance"
          >
            {article.title}
          </h3>

          <p className="text-xs sm:text-sm text-[#57534E] font-reading-serif italic line-clamp-2 mb-4 leading-relaxed">
            {article.subtitle}
          </p>

          <p className="text-xs text-[#44403C] line-clamp-2 font-modern-sans leading-relaxed">
            {article.excerpt}
          </p>
        </div>
      </div>

      {/* Card Footer: Author & Read */}
      <div className="px-5 sm:px-6 py-4 border-t border-[#E7E2DA] flex items-center justify-between text-xs">
        <button
          onClick={() => onAuthorClick(article.author.id)}
          className="text-[#78716C] hover:text-[#1C1917] text-[11px] font-medium transition-colors cursor-pointer text-left truncate max-w-[170px]"
        >
          By <span className="text-[#1C1917] font-semibold">{article.author.name}</span>
        </button>

        <button
          onClick={() => onRead(article)}
          className="inline-flex items-center gap-1 text-[11px] uppercase tracking-wider font-semibold text-[#1C1917] hover:text-[#78716C] transition-colors cursor-pointer"
        >
          <span>Read</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </article>
  );
};
