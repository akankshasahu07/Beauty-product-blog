import React from 'react';
import { CategoryFilter } from '../types/blog';

interface FooterProps {
  onSelectCategory: (category: CategoryFilter) => void;
  onOpenNewsletter: () => void;
  onOpenCapsulePlanner: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectCategory,
  onOpenNewsletter,
  onOpenCapsulePlanner,
}) => {
  return (
    <footer className="border-t border-[#E7E2DA] bg-[#F5EFE8] text-[#1C1917] mt-24">
      {/* Editorial Colophon Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          {/* Brand & Masthead Statement (4 cols) */}
          <div className="md:col-span-4">
            <span className="text-3xl font-editorial-serif tracking-tight font-semibold text-[#1C1917] block leading-none mb-2">
              ÉTOFFE
            </span>
            <span className="text-xs uppercase tracking-widest text-[#78716C] block mb-4">
              Revue de Mode et Haute Beauté
            </span>
            <p className="text-xs sm:text-sm text-[#57534E] font-reading-serif italic leading-relaxed mb-6">
              An independent critical quarterly exploring cosmetic biochemistry, cellular lipid barriers, Grasse haute perfumery, ancient fermented botanicals, and cosmetic craftsmanship.
            </p>
            <div className="text-xs text-[#78716C] space-y-1 font-mono">
              <p>BUREAUX: Paris (Vendôme) · Zurich · Grasse · Seoul (Gangnam)</p>
              <p>ISSN 2984-884X · Printed on Munken Pure 130gsm</p>
            </div>
          </div>

          {/* Navigation Departments (3 cols) */}
          <div className="md:col-span-3">
            <h4 className="text-xs uppercase tracking-widest font-semibold text-[#1C1917] mb-4">
              Formulation Disciplines
            </h4>
            <ul className="space-y-2 text-xs text-[#57534E]">
              <li>
                <button
                  onClick={() => onSelectCategory('All')}
                  className="hover:text-[#1C1917] transition-colors cursor-pointer"
                >
                  All Monograph Essays
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('Skincare Science')}
                  className="hover:text-[#1C1917] transition-colors cursor-pointer"
                >
                  Skincare Science & Lipid Bilayers
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('Haute Perfumery')}
                  className="hover:text-[#1C1917] transition-colors cursor-pointer"
                >
                  Haute Perfumery & Olfactory Time
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('Pigments & Color')}
                  className="hover:text-[#1C1917] transition-colors cursor-pointer"
                >
                  Cosmetic Pigments & Rouge Chemistry
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('Botanical Ferments')}
                  className="hover:text-[#1C1917] transition-colors cursor-pointer"
                >
                  Living Ferments & Single-Origin Oils
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('Vanity Rituals')}
                  className="hover:text-[#1C1917] transition-colors cursor-pointer"
                >
                  Artisanal Brushes & Glass Skin
                </button>
              </li>
            </ul>
          </div>

          {/* Curatorial Tools & Missives (5 cols) */}
          <div className="md:col-span-5">
            <h4 className="text-xs uppercase tracking-widest font-semibold text-[#1C1917] mb-4">
              Vanity Matrix & The Beauty Dispatch
            </h4>
            <p className="text-xs text-[#57534E] font-reading-serif italic mb-4 leading-relaxed">
              Architect your personalized active formulation regimen or join our Sunday reader salon for clinical insights.
            </p>

            <div className="flex flex-wrap gap-3 mb-6">
              <button
                onClick={onOpenCapsulePlanner}
                className="px-4 py-2 border border-[#1C1917] text-xs uppercase tracking-wider font-semibold text-[#1C1917] hover:bg-[#1C1917] hover:text-[#FAF8F5] transition-colors cursor-pointer"
              >
                Launch Vanity Matrix
              </button>
              <button
                onClick={onOpenNewsletter}
                className="px-4 py-2 bg-[#1C1917] text-[#FAF8F5] text-xs uppercase tracking-wider font-semibold hover:bg-[#322D29] transition-colors cursor-pointer"
              >
                Subscribe to The Dispatch
              </button>
            </div>

            <div className="p-3 bg-white/60 border border-[#E7E2DA] text-[11px] text-[#78716C] leading-normal font-sans">
              <span className="font-semibold text-[#1C1917]">Notice of Scientific Independence:</span> ÉTOFFE accepts zero sponsored beauty reviews, affiliate kickbacks, or brand gifting. All chemical critiques and olfactory reviews reflect independent laboratory scrutiny.
            </div>
          </div>
        </div>

        {/* Hairline Lower Bar */}
        <div className="mt-16 pt-8 border-t border-[#E7E2DA] flex flex-col sm:flex-row items-center justify-between text-xs text-[#78716C] gap-4">
          <p>© 2026 ÉTOFFE Beauté. All rights reserved. Registered under international cosmetic copyright.</p>
          <div className="flex items-center gap-6 text-[11px] uppercase tracking-wider">
            <span className="hover:text-[#1C1917] cursor-pointer">Masthead</span>
            <span className="hover:text-[#1C1917] cursor-pointer">Scientific Council</span>
            <span className="hover:text-[#1C1917] cursor-pointer">Archive Index</span>
            <span className="hover:text-[#1C1917] cursor-pointer">Clinical Standards</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
