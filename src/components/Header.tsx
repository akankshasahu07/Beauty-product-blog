import React from 'react';
import { Search, Bookmark, Sparkles } from 'lucide-react';
import { CategoryFilter } from '../types/blog';

interface HeaderProps {
  currentCategory: CategoryFilter;
  onSelectCategory: (category: CategoryFilter) => void;
  savedCount: number;
  onOpenSaved: () => void;
  onOpenNewsletter: () => void;
  onOpenCapsulePlanner: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  isSearchOpen: boolean;
  onToggleSearch: () => void;
  onLogoClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentCategory,
  onSelectCategory,
  savedCount,
  onOpenSaved,
  onOpenNewsletter,
  onOpenCapsulePlanner,
  searchQuery,
  onSearchChange,
  isSearchOpen,
  onToggleSearch,
  onLogoClick,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#FAF8F5]/90 backdrop-blur-md border-b border-[#E7E2DA] transition-all">
      {/* Editorial Announcement Bar */}
      <div className="bg-[#1C1917] text-[#FAF8F5] text-xs py-1.5 px-4 text-center tracking-widest uppercase font-medium flex items-center justify-center gap-3">
        <span>Vol. XXIV · Haute Beauty & Formulation Edition</span>
        <span className="opacity-40" aria-hidden="true">/</span>
        <span className="hidden sm:inline">Paris · Zurich · Grasse · Seoul</span>
        <span className="opacity-40 hidden sm:inline" aria-hidden="true">/</span>
        <button
          onClick={onOpenNewsletter}
          className="underline underline-offset-2 hover:text-[#D5CCC3] transition-colors cursor-pointer text-xs"
        >
          Subscribe to The Beauty Dispatch
        </button>
      </div>

      {/* Top Bar Contract (3 Zones) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Zone 1: Single text element wordmark in display face */}
        <button
          onClick={onLogoClick}
          className="text-left group cursor-pointer focus-visible:outline-none"
        >
          <span className="text-2xl sm:text-3xl font-editorial-serif tracking-tight font-semibold text-[#1C1917] block leading-none">
            ÉTOFFE
          </span>
          <span className="text-[10px] tracking-[0.2em] uppercase text-[#78716C] font-modern-sans block mt-0.5">
            Journal of Fashion & Haute Beauty
          </span>
        </button>

        {/* Zone 2: 4-6 text navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-xs uppercase tracking-wider font-medium text-[#78716C]">
          <button
            onClick={() => onSelectCategory('All')}
            className={`transition-colors hover:text-[#1C1917] cursor-pointer pb-0.5 ${
              currentCategory === 'All' ? 'text-[#1C1917] border-b border-[#1C1917]' : ''
            }`}
          >
            All Essays
          </button>
          <button
            onClick={() => onSelectCategory('Skincare Science')}
            className={`transition-colors hover:text-[#1C1917] cursor-pointer pb-0.5 ${
              currentCategory === 'Skincare Science' ? 'text-[#1C1917] border-b border-[#1C1917]' : ''
            }`}
          >
            Skincare Science
          </button>
          <button
            onClick={() => onSelectCategory('Haute Perfumery')}
            className={`transition-colors hover:text-[#1C1917] cursor-pointer pb-0.5 ${
              currentCategory === 'Haute Perfumery' ? 'text-[#1C1917] border-b border-[#1C1917]' : ''
            }`}
          >
            Haute Perfumery
          </button>
          <button
            onClick={() => onSelectCategory('Pigments & Color')}
            className={`transition-colors hover:text-[#1C1917] cursor-pointer pb-0.5 ${
              currentCategory === 'Pigments & Color' ? 'text-[#1C1917] border-b border-[#1C1917]' : ''
            }`}
          >
            Pigments & Color
          </button>
          <button
            onClick={() => onSelectCategory('Botanical Ferments')}
            className={`transition-colors hover:text-[#1C1917] cursor-pointer pb-0.5 ${
              currentCategory === 'Botanical Ferments' ? 'text-[#1C1917] border-b border-[#1C1917]' : ''
            }`}
          >
            Botanicals
          </button>
          <button
            onClick={onOpenCapsulePlanner}
            className="transition-colors hover:text-[#1C1917] cursor-pointer flex items-center gap-1.5 text-[#854D0E] font-semibold"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Vanity Matrix
          </button>
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleSearch}
            className="p-2 text-[#57534E] hover:text-[#1C1917] transition-colors rounded-full hover:bg-[#EFEAE2] cursor-pointer"
            aria-label="Search beauty essays"
          >
            <Search className="w-4 h-4" />
          </button>

          <button
            onClick={onOpenSaved}
            className="relative p-2 text-[#57534E] hover:text-[#1C1917] transition-colors rounded-full hover:bg-[#EFEAE2] cursor-pointer"
            aria-label="Saved beauty essays"
          >
            <Bookmark className="w-4 h-4" />
            {savedCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#1C1917] text-[#FAF8F5] text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-mono">
                {savedCount}
              </span>
            )}
          </button>

          <button
            onClick={onOpenNewsletter}
            className="hidden sm:inline-flex px-4 py-2 text-xs uppercase tracking-wider font-medium text-[#FAF8F5] bg-[#1C1917] rounded-none hover:bg-[#322D29] transition-colors whitespace-nowrap cursor-pointer shadow-xs"
          >
            The Dispatch
          </button>
        </div>
      </div>

      {/* Expandable Search Drawer */}
      {isSearchOpen && (
        <div className="border-t border-[#E7E2DA] bg-[#F5F0E8] px-4 py-3 sm:px-8 animate-in fade-in duration-200">
          <div className="max-w-3xl mx-auto flex items-center gap-3">
            <Search className="w-4 h-4 text-[#78716C] shrink-0" />
            <input
              type="text"
              placeholder="Search formulations, ingredients, perfumes, lipsticks (e.g. Ceramides, Ectoin, Iris Pallida, Squalane)..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full bg-transparent border-0 text-sm text-[#1C1917] placeholder-[#78716C] focus:ring-0 focus:outline-none font-reading-serif italic"
              autoFocus
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="text-xs uppercase tracking-widest text-[#78716C] hover:text-[#1C1917] cursor-pointer font-sans"
              >
                Clear
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
