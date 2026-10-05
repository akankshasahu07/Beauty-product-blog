import React from 'react';
import { X, Bookmark, ArrowRight, Trash2 } from 'lucide-react';
import { Article } from '../types/blog';

interface SavedArticlesModalProps {
  isOpen: boolean;
  onClose: () => void;
  savedArticles: Article[];
  onSelectArticle: (article: Article) => void;
  onRemoveSaved: (articleId: string) => void;
  onClearAll: () => void;
}

export const SavedArticlesModal: React.FC<SavedArticlesModalProps> = ({
  isOpen,
  onClose,
  savedArticles,
  onSelectArticle,
  onRemoveSaved,
  onClearAll,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-end">
      <div className="bg-[#FAF8F5] border-l border-[#D5CCC3] w-full max-w-md h-full flex flex-col shadow-2xl animate-in slide-in-from-right duration-250">
        {/* Drawer Header */}
        <div className="p-5 border-b border-[#E7E2DA] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bookmark className="w-4 h-4 text-[#854D0E]" />
            <h2 className="text-lg font-editorial-serif font-medium text-[#1C1917]">
              Saved Reading Salon ({savedArticles.length})
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#78716C] hover:text-[#1C1917] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Content */}
        <div className="flex-1 overflow-y-auto p-5 divide-y divide-[#E7E2DA]">
          {savedArticles.length === 0 ? (
            <div className="py-20 text-center text-[#78716C]">
              <Bookmark className="w-8 h-8 mx-auto mb-3 opacity-30" />
              <p className="text-sm font-reading-serif italic">Your personal reading library is currently empty.</p>
              <p className="text-xs text-[#A8A29E] mt-1 font-modern-sans">
                Bookmark essays while browsing to build your private archive.
              </p>
            </div>
          ) : (
            savedArticles.map(article => (
              <div key={article.id} className="py-4 first:pt-0 group">
                <div className="flex items-center justify-between text-[11px] text-[#78716C] uppercase tracking-wider mb-1">
                  <span>{article.category}</span>
                  <span>{article.readTime}</span>
                </div>
                <h3
                  onClick={() => {
                    onSelectArticle(article);
                    onClose();
                  }}
                  className="text-base font-editorial-serif font-medium text-[#1C1917] group-hover:text-[#854D0E] transition-colors cursor-pointer leading-snug line-clamp-2"
                >
                  {article.title}
                </h3>
                <div className="flex items-center justify-between mt-3 text-xs">
                  <span className="text-[11px] text-[#78716C]">By {article.author.name}</span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onRemoveSaved(article.id)}
                      className="p-1 text-[#A8A29E] hover:text-red-700 transition-colors cursor-pointer"
                      title="Remove from saved"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => {
                        onSelectArticle(article);
                        onClose();
                      }}
                      className="inline-flex items-center gap-1 text-[11px] uppercase tracking-wider font-semibold text-[#1C1917] hover:underline cursor-pointer"
                    >
                      <span>Read</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Drawer Footer */}
        {savedArticles.length > 0 && (
          <div className="p-4 bg-[#F5EFE8] border-t border-[#E7E2DA] flex items-center justify-between">
            <button
              onClick={onClearAll}
              className="text-xs text-[#78716C] hover:text-red-700 transition-colors cursor-pointer font-sans"
            >
              Clear Library
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-[#1C1917] text-[#FAF8F5] text-xs uppercase tracking-wider font-medium hover:bg-[#322D29] cursor-pointer"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
