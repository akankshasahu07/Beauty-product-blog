import React from 'react';
import { X, BookOpen, MapPin } from 'lucide-react';
import { Author, Article } from '../types/blog';

interface AuthorProfileModalProps {
  author: Author | null;
  isOpen: boolean;
  onClose: () => void;
  articlesByAuthor: Article[];
  onSelectArticle: (article: Article) => void;
}

export const AuthorProfileModal: React.FC<AuthorProfileModalProps> = ({
  author,
  isOpen,
  onClose,
  articlesByAuthor,
  onSelectArticle,
}) => {
  if (!isOpen || !author) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-[#FAF8F5] border border-[#D5CCC3] max-w-xl w-full p-6 sm:p-8 relative shadow-2xl animate-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-[#78716C] hover:text-[#1C1917] transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-start gap-4 mb-6">
          <div className="w-16 h-16 rounded-full overflow-hidden border border-[#D5CCC3] shrink-0 bg-[#EAE4DC]">
            <img
              src={author.avatar}
              alt={author.name}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div>
            <div className="flex items-center gap-1.5 text-xs text-[#854D0E] font-medium uppercase tracking-wider mb-1">
              <MapPin className="w-3.5 h-3.5" />
              <span>{author.city} Bureau</span>
            </div>
            <h2 className="text-2xl font-editorial-serif font-medium text-[#1C1917]">
              {author.name}
            </h2>
            <p className="text-xs text-[#78716C] font-modern-sans mt-0.5">
              {author.role}
            </p>
          </div>
        </div>

        <p className="text-sm text-[#44403C] font-reading-serif italic leading-relaxed mb-6 p-4 bg-[#F5EFE8] border border-[#E7E2DA]">
          {author.bio}
        </p>

        <div>
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest font-semibold text-[#1C1917] mb-3">
            <BookOpen className="w-4 h-4 text-[#854D0E]" />
            <span>Monographs in This Issue ({articlesByAuthor.length})</span>
          </div>

          <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
            {articlesByAuthor.map(art => (
              <div
                key={art.id}
                onClick={() => {
                  onSelectArticle(art);
                  onClose();
                }}
                className="p-3 border border-[#E7E2DA] bg-white/70 hover:border-[#1C1917] transition-colors cursor-pointer"
              >
                <div className="text-[10px] uppercase tracking-wider text-[#78716C] mb-0.5">
                  {art.category} · {art.readTime}
                </div>
                <div className="text-xs sm:text-sm font-semibold text-[#1C1917] line-clamp-1">
                  {art.title}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
