import React, { useState } from 'react';
import { X, Check, Mail } from 'lucide-react';

interface NewsletterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NewsletterModal: React.FC<NewsletterModalProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [frequency, setFrequency] = useState<'weekly' | 'monthly'>('weekly');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    setSubmitted(true);
    setTimeout(() => {
      // keep message open for reading
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-[#FAF8F5] border border-[#D5CCC3] max-w-lg w-full p-6 sm:p-8 relative shadow-2xl animate-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-[#78716C] hover:text-[#1C1917] transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <div>
            <div className="text-[11px] uppercase tracking-widest text-[#854D0E] font-semibold mb-2">
              Printed & Digital Missives
            </div>
            <h2 className="text-2xl sm:text-3xl font-editorial-serif font-medium text-[#1C1917] mb-3">
              The Sunday Dispatch
            </h2>
            <p className="text-xs sm:text-sm text-[#57534E] font-reading-serif italic leading-relaxed mb-6">
              A private weekly dispatch authored by our Paris and London bureaus. Curated essays on textile discoveries, haute couture auction records, pattern architecture, and quiet luxury criticism. Never promotional advertising.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#78716C] mb-1 font-sans">
                  Email Address
                </label>
                <div className="relative">
                  <input
                    type="email"
                    required
                    placeholder="editor@atelier.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2.5 text-xs bg-white border border-[#D5CCC3] focus:border-[#1C1917] focus:outline-none font-reading-serif"
                  />
                  <Mail className="w-4 h-4 text-[#78716C] absolute right-3 top-3" />
                </div>
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#78716C] mb-1.5 font-sans">
                  Cadence
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setFrequency('weekly')}
                    className={`py-2 px-3 text-xs border text-center transition-colors cursor-pointer ${
                      frequency === 'weekly' 
                        ? 'border-[#1C1917] bg-[#F4EFEB] font-medium text-[#1C1917]' 
                        : 'border-[#E7E2DA] text-[#78716C]'
                    }`}
                  >
                    Every Sunday Morning
                  </button>
                  <button
                    type="button"
                    onClick={() => setFrequency('monthly')}
                    className={`py-2 px-3 text-xs border text-center transition-colors cursor-pointer ${
                      frequency === 'monthly' 
                        ? 'border-[#1C1917] bg-[#F4EFEB] font-medium text-[#1C1917]' 
                        : 'border-[#E7E2DA] text-[#78716C]'
                    }`}
                  >
                    Monthly Archival Digest
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-[#1C1917] text-[#FAF8F5] text-xs uppercase tracking-widest font-medium hover:bg-[#322D29] transition-colors cursor-pointer mt-2"
              >
                Join the Private Salon
              </button>

              <p className="text-[10px] text-[#A8A29E] text-center font-reading-serif italic mt-2">
                Unsubscribe effortlessly anytime. We respect your reading quietude.
              </p>
            </form>
          </div>
        ) : (
          <div className="py-8 text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 flex items-center justify-center mx-auto">
              <Check className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-editorial-serif font-medium text-[#1C1917]">
              Welcome to the ÉTOFFE Salon
            </h3>
            <p className="text-xs sm:text-sm text-[#57534E] font-reading-serif italic max-w-sm mx-auto">
              Your subscription has been recorded for <span className="font-semibold text-[#1C1917]">{email}</span>. Look for our opening dispatch this Sunday at 08:00 CET.
            </p>
            <button
              onClick={onClose}
              className="mt-4 px-6 py-2 border border-[#1C1917] text-xs uppercase tracking-wider font-medium text-[#1C1917] hover:bg-[#1C1917] hover:text-[#FAF8F5] transition-colors cursor-pointer"
            >
              Return to Journal
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
