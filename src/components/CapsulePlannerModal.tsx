import React, { useState } from 'react';
import { X, Sparkles, Check, RefreshCw, Layers, ShieldCheck, Sun, Moon, FlaskConical } from 'lucide-react';

interface VanityItem {
  id: string;
  name: string;
  category: 'Barrier Repair' | 'Hydration & Ferment' | 'Active Correction' | 'Lipid Seals' | 'Haute Pigments' | 'Olfactory & Tools';
  keyActive: string;
  timeOfDay: 'AM' | 'PM' | 'Both';
  origin: string;
}

const vanityCatalog: VanityItem[] = [
  { id: 'v1', name: 'Lamellar 3:1:1 Bilayer Concentrate', category: 'Barrier Repair', keyActive: 'Ceramides NP/AP/EOP + Cholesterol', timeOfDay: 'Both', origin: 'Zurich' },
  { id: 'v2', name: 'Restorative 5% Ectoin Cream', category: 'Barrier Repair', keyActive: 'Pure Extremolyte Ectoin + Bisabolol', timeOfDay: 'Both', origin: 'Tokyo' },
  
  { id: 'v3', name: '94% Galactomyces Ferment Essence', category: 'Hydration & Ferment', keyActive: 'Sake Yeast Filtrate + 2% Niacinamide', timeOfDay: 'Both', origin: 'Seoul' },
  { id: 'v4', name: 'Hydro-Matrix Copper Tripeptide-1 Vial', category: 'Hydration & Ferment', keyActive: 'GHK-Cu Azure Peptide + Polyglutamic Acid', timeOfDay: 'AM', origin: 'Seoul' },
  
  { id: 'v5', name: 'Tetrahexyldecyl Ascorbate 15% Lipid C', category: 'Active Correction', keyActive: 'Lipid-Soluble Vitamin C + Ferulic Acid', timeOfDay: 'AM', origin: 'Paris' },
  { id: 'v6', name: 'Micro-Encapsulated Retinaldehyde 0.1%', category: 'Active Correction', keyActive: 'Time-Released Retinal + Bakuchiol', timeOfDay: 'PM', origin: 'Zurich' },
  
  { id: 'v7', name: 'Moroccan Prickly Pear Seed Elixir', category: 'Lipid Seals', keyActive: 'Virgin Cold-Pressed Tocopherols (88%)', timeOfDay: 'PM', origin: 'Taroudant' },
  { id: 'v8', name: '100% Sugarcane Squalane Fluid', category: 'Lipid Seals', keyActive: 'Bio-Fermented Pure Plant Squalane', timeOfDay: 'Both', origin: 'Kyoto' },
  
  { id: 'v9', name: 'Sovereign Velvet Rouge Bullet #09', category: 'Haute Pigments', keyActive: 'Encapsulated Plant Carmine + Camellia', timeOfDay: 'Both', origin: 'Paris' },
  { id: 'v10', name: 'Luminous Squalane Skin Tint #02', category: 'Haute Pigments', keyActive: 'Jojoba-Coated Mineral Iron Oxides', timeOfDay: 'AM', origin: 'Paris' },
  
  { id: 'v11', name: 'Orris & Smoked Labdanum Extrait de Parfum', category: 'Olfactory & Tools', keyActive: '6-Year Florentine Orris Butter (32%)', timeOfDay: 'Both', origin: 'Grasse' },
  { id: 'v12', name: 'Hand-Tied Kumano Saikoho Fude Brush', category: 'Olfactory & Tools', keyActive: 'Virgin Undulated Bio-Sabelene Bristles', timeOfDay: 'Both', origin: 'Hiroshima' },
];

interface CapsulePlannerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectArticleSlug?: (slug: string) => void;
}

export const CapsulePlannerModal: React.FC<CapsulePlannerModalProps> = ({
  isOpen,
  onClose,
  onSelectArticleSlug,
}) => {
  const [selectedIds, setSelectedIds] = useState<string[]>([
    'v1', 'v3', 'v5', 'v8', 'v9', 'v11'
  ]);

  if (!isOpen) return null;

  const toggleItem = (id: string) => {
    setSelectedIds(prev => 
      prev.includes(id) 
        ? prev.filter(x => x !== id) 
        : prev.length < 8 ? [...prev, id] : prev
    );
  };

  const selectedItems = vanityCatalog.filter(i => selectedIds.includes(i.id));

  // Calculate synergy
  const hasBarrier = selectedItems.some(i => i.category === 'Barrier Repair');
  const hasHydration = selectedItems.some(i => i.category === 'Hydration & Ferment');
  const hasLipid = selectedItems.some(i => i.category === 'Lipid Seals');
  const hasActive = selectedItems.some(i => i.category === 'Active Correction');
  const hasPigmentOrPerfume = selectedItems.some(i => i.category === 'Haute Pigments' || i.category === 'Olfactory & Tools');

  const categoriesCount = [hasBarrier, hasHydration, hasLipid, hasActive, hasPigmentOrPerfume].filter(Boolean).length;
  const synergyScore = Math.min(100, Math.round((categoriesCount / 5) * 100));

  const amItems = selectedItems.filter(i => i.timeOfDay === 'AM' || i.timeOfDay === 'Both');
  const pmItems = selectedItems.filter(i => i.timeOfDay === 'PM' || i.timeOfDay === 'Both');

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-[#FAF8F5] border border-[#D5CCC3] max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-in zoom-in-95 duration-200">
        {/* Modal Header */}
        <div className="sticky top-0 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-[#E7E2DA] p-5 sm:p-6 flex items-center justify-between z-10">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#854D0E] font-semibold">
              <FlaskConical className="w-3.5 h-3.5" />
              <span>Cosmetic Biochemistry & Vanity Curation</span>
            </div>
            <h2 className="text-2xl font-editorial-serif font-medium text-[#1C1917]">
              The Vanity Matrix & Formulation Builder
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-[#78716C] hover:text-[#1C1917] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 space-y-8">
          {/* Theory Banner */}
          <div className="p-4 bg-[#F5EFE8] border border-[#E7E2DA] text-xs sm:text-sm text-[#44403C] font-reading-serif italic leading-relaxed">
            Inspired by our formulation monographs on <span className="font-semibold text-[#1C1917]">“The Biomimetic Skin Barrier”</span> and <span className="font-semibold text-[#1C1917]">“The Glass Skin Codex”</span>. Select up to 8 core formulations to architect a balanced morning and evening vanity ritual without active ingredient conflict.
          </div>

          {/* Matrix Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-y border-[#E7E2DA] py-4">
            <div>
              <span className="text-[11px] uppercase tracking-wider text-[#78716C] block">Selected Essentials</span>
              <span className="text-2xl font-editorial-serif font-bold text-[#1C1917] font-mono">
                {selectedIds.length} / 8
              </span>
            </div>
            <div>
              <span className="text-[11px] uppercase tracking-wider text-[#78716C] block">Barrier & Active Synergy</span>
              <span className="text-2xl font-editorial-serif font-bold text-[#1C1917] font-mono">
                {synergyScore}%
              </span>
            </div>
            <div>
              <span className="text-[11px] uppercase tracking-wider text-[#78716C] block">Formula Balance</span>
              <span className="text-sm font-semibold text-[#1C1917] mt-1 block">
                {hasBarrier && hasLipid ? 'Protected Bilayer' : 'Needs Lipid Barrier'}
              </span>
            </div>
          </div>

          {/* Items Selector */}
          <div>
            <h3 className="text-sm uppercase tracking-widest font-semibold text-[#1C1917] mb-4">
              Curate Your Vanity Archive
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {vanityCatalog.map(item => {
                const isChecked = selectedIds.includes(item.id);
                return (
                  <div
                    key={item.id}
                    onClick={() => toggleItem(item.id)}
                    className={`p-3.5 border transition-all cursor-pointer flex items-start justify-between gap-3 ${
                      isChecked 
                        ? 'border-[#1C1917] bg-[#F4EFEB]' 
                        : 'border-[#E7E2DA] bg-white/60 hover:border-[#B8ADA0]'
                    }`}
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2 text-[10px] uppercase tracking-wider text-[#78716C] mb-0.5">
                        <span className="font-semibold text-[#1C1917]">{item.category}</span>
                        <span>·</span>
                        <span>{item.timeOfDay}</span>
                        <span>·</span>
                        <span>{item.origin}</span>
                      </div>
                      <div className="text-sm font-semibold text-[#1C1917]">{item.name}</div>
                      <div className="text-xs text-[#57534E] font-reading-serif italic mt-0.5">
                        {item.keyActive}
                      </div>
                    </div>
                    <div className={`w-5 h-5 rounded-none border flex items-center justify-center shrink-0 mt-1 ${
                      isChecked ? 'bg-[#1C1917] border-[#1C1917] text-white' : 'border-[#D5CCC3]'
                    }`}>
                      {isChecked && <Check className="w-3.5 h-3.5" />}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* AM / PM Protocol Preview */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-5 bg-white/80 border border-[#E7E2DA]">
              <div className="flex items-center gap-2 text-xs uppercase tracking-widest font-semibold text-[#1C1917] mb-3">
                <Sun className="w-4 h-4 text-amber-600" />
                <span>Morning Luminosity Ritual</span>
              </div>
              <ul className="space-y-1.5 text-xs text-[#44403C] font-reading-serif italic">
                {amItems.length === 0 ? (
                  <li className="text-[#A8A29E]">Select formulations to populate morning routine.</li>
                ) : (
                  amItems.map((item, idx) => (
                    <li key={item.id} className="flex items-center gap-2">
                      <span className="font-mono text-[10px] text-[#78716C] not-italic">{idx + 1}.</span>
                      <span className="font-medium text-[#1C1917] not-italic">{item.name}</span>
                    </li>
                  ))
                )}
              </ul>
            </div>

            <div className="p-5 bg-white/80 border border-[#E7E2DA]">
              <div className="flex items-center gap-2 text-xs uppercase tracking-widest font-semibold text-[#1C1917] mb-3">
                <Moon className="w-4 h-4 text-indigo-700" />
                <span>Nocturnal Cellular Repair</span>
              </div>
              <ul className="space-y-1.5 text-xs text-[#44403C] font-reading-serif italic">
                {pmItems.length === 0 ? (
                  <li className="text-[#A8A29E]">Select formulations to populate evening routine.</li>
                ) : (
                  pmItems.map((item, idx) => (
                    <li key={item.id} className="flex items-center gap-2">
                      <span className="font-mono text-[10px] text-[#78716C] not-italic">{idx + 1}.</span>
                      <span className="font-medium text-[#1C1917] not-italic">{item.name}</span>
                    </li>
                  ))
                )}
              </ul>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-5 bg-[#F5F0E8] border-t border-[#E7E2DA] flex items-center justify-between">
          <button
            onClick={() => setSelectedIds(['v1', 'v3', 'v5', 'v8', 'v9', 'v11'])}
            className="text-xs uppercase tracking-wider text-[#78716C] hover:text-[#1C1917] cursor-pointer flex items-center gap-1.5"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset to Dermatologist Protocol</span>
          </button>
          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-[#1C1917] text-[#FAF8F5] text-xs uppercase tracking-widest font-medium hover:bg-[#322D29] cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
