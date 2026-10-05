import React, { useState, useEffect } from 'react';
import { Article, Comment } from '../types/blog';
import { 
  ArrowLeft, 
  Bookmark, 
  BookmarkCheck, 
  Heart, 
  Share2, 
  Sparkles, 
  Check, 
  MessageSquare, 
  Layers,
  Send,
  FlaskConical,
  Sparkle
} from 'lucide-react';
import { ArticleCard } from './ArticleCard';

interface ArticleDetailViewProps {
  article: Article;
  allArticles: Article[];
  onBack: () => void;
  onSelectArticle: (article: Article) => void;
  isSaved: boolean;
  onToggleSave: (articleId: string) => void;
  onAuthorClick: (authorId: string) => void;
  comments: Comment[];
  onAddComment: (articleId: string, authorName: string, content: string) => void;
}

export const ArticleDetailView: React.FC<ArticleDetailViewProps> = ({
  article,
  allArticles,
  onBack,
  onSelectArticle,
  isSaved,
  onToggleSave,
  onAuthorClick,
  comments,
  onAddComment,
}) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'larger'>('normal');
  const [likesCount, setLikesCount] = useState(article.likes);
  const [hasLiked, setHasLiked] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [newCommentName, setNewCommentName] = useState('');
  const [newCommentText, setNewCommentText] = useState('');
  const [commentSuccess, setCommentSuccess] = useState(false);
  const [activeProductTab, setActiveProductTab] = useState<number>(0);

  // Track scroll depth
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (windowHeight > 0) {
        const scroll = (totalScroll / windowHeight) * 100;
        setScrollProgress(Math.min(100, Math.max(0, scroll)));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll to top on article change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    setLikesCount(article.likes);
    setHasLiked(false);
    setActiveProductTab(0);
  }, [article.id]);

  const handleLike = () => {
    if (!hasLiked) {
      setLikesCount(prev => prev + 1);
      setHasLiked(true);
    } else {
      setLikesCount(prev => prev - 1);
      setHasLiked(false);
    }
  };

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    } catch {
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentName.trim() || !newCommentText.trim()) return;

    onAddComment(article.id, newCommentName.trim(), newCommentText.trim());
    setNewCommentName('');
    setNewCommentText('');
    setCommentSuccess(true);
    setTimeout(() => setCommentSuccess(false), 3000);
  };

  const articleComments = comments.filter(c => c.articleId === article.id);
  const relatedArticles = allArticles.filter(a => article.relatedSlugs.includes(a.slug) || a.category === article.category && a.id !== article.id).slice(0, 3);

  const fontSizeClasses = {
    normal: 'text-base leading-[1.8] font-reading-serif',
    large: 'text-lg leading-[1.85] font-reading-serif',
    larger: 'text-xl leading-[1.9] font-reading-serif',
  };

  return (
    <div className="relative pb-24">
      {/* Reading Progress Indicator */}
      <div 
        className="fixed top-0 left-0 h-1 bg-[#1C1917] z-50 transition-all duration-75"
        style={{ width: `${scrollProgress}%` }}
        role="progressbar"
        aria-valuenow={Math.round(scrollProgress)}
        aria-valuemin={0}
        aria-valuemax={100}
      />

      {/* Reading Utility Bar */}
      <div className="sticky top-18 z-30 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-[#E7E2DA] py-2.5 px-4 sm:px-8">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-medium text-[#57534E] hover:text-[#1C1917] transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Journal</span>
          </button>

          <div className="flex items-center gap-3 sm:gap-4">
            {/* Font Size Selector */}
            <div className="hidden sm:flex items-center gap-1 border border-[#D5CCC3] p-0.5 bg-[#F4EFEB]">
              <button
                onClick={() => setFontSize('normal')}
                className={`px-2 py-0.5 text-xs font-serif cursor-pointer ${fontSize === 'normal' ? 'bg-[#1C1917] text-[#FAF8F5]' : 'text-[#57534E] hover:text-[#1C1917]'}`}
                title="Standard font size"
              >
                A
              </button>
              <button
                onClick={() => setFontSize('large')}
                className={`px-2 py-0.5 text-sm font-serif cursor-pointer ${fontSize === 'large' ? 'bg-[#1C1917] text-[#FAF8F5]' : 'text-[#57534E] hover:text-[#1C1917]'}`}
                title="Comfortable font size"
              >
                A+
              </button>
            </div>

            {/* Like / Applaud Button */}
            <button
              onClick={handleLike}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs border transition-colors cursor-pointer ${
                hasLiked 
                  ? 'border-[#991B1B] text-[#991B1B] bg-red-50/40' 
                  : 'border-[#D5CCC3] text-[#57534E] hover:border-[#1C1917] hover:text-[#1C1917]'
              }`}
            >
              <Heart className={`w-3.5 h-3.5 ${hasLiked ? 'fill-[#991B1B]' : ''}`} />
              <span className="font-mono text-[11px]">{likesCount}</span>
            </button>

            {/* Bookmark Button */}
            <button
              onClick={() => onToggleSave(article.id)}
              className="p-1.5 text-[#57534E] hover:text-[#1C1917] border border-[#D5CCC3] hover:border-[#1C1917] transition-colors cursor-pointer"
              title={isSaved ? 'Saved to library' : 'Save essay'}
            >
              {isSaved ? <BookmarkCheck className="w-4 h-4 text-[#854D0E]" /> : <Bookmark className="w-4 h-4" />}
            </button>

            {/* Share / Copy Link */}
            <button
              onClick={handleShare}
              className="inline-flex items-center gap-1 px-3 py-1.5 text-xs uppercase tracking-wider border border-[#D5CCC3] hover:border-[#1C1917] text-[#57534E] hover:text-[#1C1917] transition-colors cursor-pointer"
            >
              {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
              <span className="hidden sm:inline">{copiedLink ? 'Copied' : 'Share'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Article Canvas */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12">
        {/* Editorial Header */}
        <header className="mb-10 text-center max-w-3xl mx-auto">
          {/* Zero-Pill Unboxed Metadata */}
          <div className="flex items-center justify-center gap-2 text-xs uppercase tracking-widest text-[#78716C] mb-4">
            <span className="font-semibold text-[#1C1917]">{article.editorialVol || 'Monograph Essay'}</span>
            <span aria-hidden="true">·</span>
            <span>{article.category}</span>
            <span aria-hidden="true">·</span>
            <span>{article.readTime}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-editorial-serif font-medium text-[#1C1917] leading-[1.12] mb-6 text-balance">
            {article.title}
          </h1>

          <p className="text-lg sm:text-xl font-reading-serif italic text-[#57534E] leading-relaxed mb-8 text-balance">
            {article.subtitle}
          </p>

          {/* Author Byline Lockup */}
          <div className="inline-flex items-center justify-center gap-4 py-4 px-6 border-y border-[#E7E2DA]">
            <div 
              onClick={() => onAuthorClick(article.author.id)}
              className="flex items-center gap-3 cursor-pointer group text-left"
            >
              <div className="w-11 h-11 rounded-full overflow-hidden border border-[#D5CCC3]">
                <img
                  src={article.author.avatar}
                  alt={article.author.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
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

            <span className="text-[#D5CCC3] select-none" aria-hidden="true">|</span>

            <div className="text-left text-[11px] text-[#78716C] font-mono">
              <span className="block font-sans text-xs text-[#1C1917]">Published</span>
              <span>{article.publishDate}</span>
            </div>
          </div>
        </header>

        {/* Featured Cover Photography */}
        <div className="mb-12">
          <div className="overflow-hidden border border-[#D5CCC3] bg-[#EAE4DC]">
            <img
              src={article.coverImage}
              alt={article.title}
              className="w-full aspect-[16/10] sm:aspect-[16/9] object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <p className="text-xs font-reading-serif italic text-[#78716C] mt-2.5 text-center">
            {article.coverCaption}
          </p>
        </div>

        {/* Formulation Thesis Box */}
        <div className="max-w-2xl mx-auto my-10 p-6 bg-[#F5EFE8] border-l-2 border-[#1C1917]">
          <h2 className="text-xs uppercase tracking-widest font-semibold text-[#1C1917] mb-3 flex items-center gap-2">
            <FlaskConical className="w-3.5 h-3.5 text-[#854D0E]" />
            <span>Formulation Principles & Key Takeaways</span>
          </h2>
          <ul className="space-y-2 text-xs sm:text-sm text-[#44403C] font-modern-sans">
            {article.keyTakeaways.map((point, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-[#854D0E] font-serif font-bold text-sm shrink-0">0{idx + 1}.</span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Article Longform Sections */}
        <div className="max-w-2xl mx-auto space-y-12 text-[#292524]">
          {article.sections.map((section, sIdx) => (
            <section key={section.id} className="space-y-6">
              {section.heading && (
                <h2 className="text-2xl sm:text-3xl font-editorial-serif font-medium text-[#1C1917] pt-4 border-t border-[#E7E2DA]">
                  {section.heading}
                </h2>
              )}

              {section.paragraphs.map((para, pIdx) => (
                <p 
                  key={pIdx} 
                  className={`${fontSizeClasses[fontSize]} ${sIdx === 0 && pIdx === 0 ? 'drop-cap' : ''}`}
                >
                  {para}
                </p>
              ))}

              {/* Editorial Pull Quote */}
              {section.pullQuote && (
                <figure className="my-8 py-6 px-6 sm:px-8 border-y border-[#D5CCC3] bg-[#FAF8F5] text-center">
                  <blockquote className="text-xl sm:text-2xl font-editorial-serif italic text-[#1C1917] leading-snug">
                    “{section.pullQuote}”
                  </blockquote>
                </figure>
              )}

              {/* Formulation Note Callout */}
              {section.formulationNote && (
                <div className="my-8 p-5 sm:p-6 bg-[#F5F0E8] border border-[#E7E2DA]">
                  <div className="text-[11px] uppercase tracking-widest font-semibold text-[#854D0E] mb-1 font-modern-sans flex items-center gap-1.5">
                    <Sparkle className="w-3 h-3 text-[#854D0E]" />
                    <span>Laboratory Note · {section.formulationNote.title}</span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#44403C] font-reading-serif leading-relaxed italic">
                    {section.formulationNote.description}
                  </p>
                </div>
              )}

              {/* Inline Figure Photography */}
              {section.figure && (
                <figure className="my-8">
                  <div className="overflow-hidden border border-[#D5CCC3] bg-[#EAE4DC]">
                    <img
                      src={section.figure.src}
                      alt={section.figure.alt}
                      className="w-full aspect-[4/3] object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <figcaption className="text-xs font-reading-serif italic text-[#78716C] mt-2">
                    {section.figure.caption}
                  </figcaption>
                </figure>
              )}
            </section>
          ))}
        </div>

        {/* Interactive Formulation & Vanity Anatomy Drawer */}
        {article.products && article.products.length > 0 && (
          <div className="max-w-2xl mx-auto my-16 p-6 sm:p-8 bg-[#F4EFEB] border border-[#D5CCC3]">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#D5CCC3]">
              <div>
                <span className="text-[11px] uppercase tracking-widest text-[#78716C] font-sans font-semibold block">
                  Vanity Architecture
                </span>
                <h3 className="text-xl font-editorial-serif font-medium text-[#1C1917]">
                  Formulation Blueprint & Application Protocol
                </h3>
              </div>
              <Layers className="w-5 h-5 text-[#854D0E]" />
            </div>

            {/* Tab navigation for formulations */}
            <div className="flex gap-2 mb-6 border-b border-[#D5CCC3] pb-2 overflow-x-auto">
              {article.products.map((p, idx) => (
                <button
                  key={p.id}
                  onClick={() => setActiveProductTab(idx)}
                  className={`text-xs uppercase tracking-wider py-1.5 px-3 whitespace-nowrap cursor-pointer transition-colors ${
                    activeProductTab === idx
                      ? 'bg-[#1C1917] text-[#FAF8F5]'
                      : 'bg-transparent text-[#78716C] hover:text-[#1C1917]'
                  }`}
                >
                  {p.name}
                </button>
              ))}
            </div>

            {/* Active Formulation Card */}
            {article.products[activeProductTab] && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-3 bg-white/70 border border-[#E7E2DA]">
                    <span className="text-[10px] uppercase tracking-wider text-[#78716C] block">Classification</span>
                    <span className="text-xs font-semibold text-[#1C1917]">
                      {article.products[activeProductTab].category}
                    </span>
                  </div>
                  <div className="p-3 bg-white/70 border border-[#E7E2DA]">
                    <span className="text-[10px] uppercase tracking-wider text-[#78716C] block">Key Active Complex</span>
                    <span className="text-xs font-semibold text-[#1C1917]">
                      {article.products[activeProductTab].keyActives}
                    </span>
                  </div>
                </div>

                <div className="p-4 bg-white/70 border border-[#E7E2DA]">
                  <span className="text-[10px] uppercase tracking-wider text-[#78716C] block mb-1">Application Ritual</span>
                  <p className="text-xs text-[#44403C] font-reading-serif italic leading-relaxed">
                    {article.products[activeProductTab].applicationRitual}
                  </p>
                  <div className="mt-3 pt-2 border-t border-[#E7E2DA] flex flex-col sm:flex-row sm:items-center justify-between text-[11px] text-[#78716C] gap-1">
                    <span>Sensory Texture: <span className="text-[#1C1917] font-medium">{article.products[activeProductTab].texture}</span></span>
                    <span className="font-mono text-[10px]">{article.products[activeProductTab].origin}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Tags Row */}
        <div className="max-w-2xl mx-auto pt-8 border-t border-[#E7E2DA] flex flex-wrap items-center gap-2">
          <span className="text-xs text-[#78716C] font-mono mr-2">INDEXED IN:</span>
          {article.tags.map((tag, idx) => (
            <span key={idx} className="text-xs text-[#57534E] hover:text-[#1C1917] transition-colors">
              #{tag} {idx < article.tags.length - 1 ? '·' : ''}
            </span>
          ))}
        </div>

        {/* Reader Comments & Discourse Section */}
        <section className="max-w-2xl mx-auto mt-16 pt-12 border-t border-[#D5CCC3]">
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="text-xs uppercase tracking-widest text-[#78716C] font-sans font-semibold">
                Salon Dialogue
              </span>
              <h3 className="text-2xl font-editorial-serif font-medium text-[#1C1917]">
                Reader Observations ({articleComments.length})
              </h3>
            </div>
            <MessageSquare className="w-5 h-5 text-[#78716C]" />
          </div>

          {/* Add Comment Form */}
          <form onSubmit={handleCommentSubmit} className="mb-10 p-5 bg-[#F5EFE8] border border-[#E7E2DA]">
            <h4 className="text-xs uppercase tracking-wider font-semibold text-[#1C1917] mb-3">
              Contribute to the Salon Discourse
            </h4>
            <div className="space-y-3">
              <input
                type="text"
                placeholder="Your Name / Title (e.g. Dr. Geneviève Moreau, Dermatologist)"
                value={newCommentName}
                onChange={(e) => setNewCommentName(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-white border border-[#D5CCC3] focus:border-[#1C1917] focus:outline-none"
                required
              />
              <textarea
                rows={3}
                placeholder="Share your perspective on this formulation, active ingredient, or beauty ritual..."
                value={newCommentText}
                onChange={(e) => setNewCommentText(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-white border border-[#D5CCC3] focus:border-[#1C1917] focus:outline-none font-reading-serif"
                required
              />
              <div className="flex items-center justify-between">
                <span className="text-[11px] text-[#78716C] italic font-reading-serif">
                  Submissions are reviewed for intellectual decorum.
                </span>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#1C1917] text-[#FAF8F5] text-xs uppercase tracking-wider font-medium hover:bg-[#322D29] transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <Send className="w-3 h-3" />
                  <span>Publish Note</span>
                </button>
              </div>
            </div>
            {commentSuccess && (
              <div className="mt-3 text-xs text-emerald-800 bg-emerald-50 p-2 border border-emerald-200">
                Your observation has been appended to this essay.
              </div>
            )}
          </form>

          {/* Comment List */}
          <div className="space-y-6">
            {articleComments.length === 0 ? (
              <p className="text-xs text-[#78716C] italic font-reading-serif py-4 text-center">
                Be the first to open the salon discussion for this monograph.
              </p>
            ) : (
              articleComments.map(comment => (
                <div key={comment.id} className="pb-6 border-b border-[#E7E2DA] last:border-0">
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="font-semibold text-[#1C1917]">{comment.authorName}</span>
                    <span className="text-[11px] text-[#78716C] font-mono">{comment.date}</span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#44403C] font-reading-serif leading-relaxed">
                    {comment.content}
                  </p>
                </div>
              ))
            )}
          </div>
        </section>

        {/* Related Articles Strip */}
        {relatedArticles.length > 0 && (
          <section className="mt-20 pt-12 border-t border-[#D5CCC3]">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="text-xs uppercase tracking-widest text-[#78716C] font-sans font-semibold">
                  Continued Reading
                </span>
                <h3 className="text-2xl font-editorial-serif font-medium text-[#1C1917]">
                  From the Beauty Archives
                </h3>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedArticles.map(rel => (
                <ArticleCard
                  key={rel.id}
                  article={rel}
                  onRead={onSelectArticle}
                  isSaved={false}
                  onToggleSave={onToggleSave}
                  onAuthorClick={onAuthorClick}
                />
              ))}
            </div>
          </section>
        )}
      </article>
    </div>
  );
};
