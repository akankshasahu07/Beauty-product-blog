import React, { useState, useEffect } from 'react';
import { articles as initialArticles, authors, sampleComments } from './data/articles';
import { Article, CategoryFilter, Comment } from './types/blog';
import { Header } from './components/Header';
import { LeadHero } from './components/LeadHero';
import { ArticleCard } from './components/ArticleCard';
import { ArticleDetailView } from './components/ArticleDetailView';
import { CapsulePlannerModal } from './components/CapsulePlannerModal';
import { NewsletterModal } from './components/NewsletterModal';
import { SavedArticlesModal } from './components/SavedArticlesModal';
import { AuthorProfileModal } from './components/AuthorProfileModal';
import { Footer } from './components/Footer';
import { Sparkles, BookOpen, FlaskConical } from 'lucide-react';

export default function App() {
  const [articles] = useState<Article[]>(initialArticles);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [readTimeFilter, setReadTimeFilter] = useState<'all' | 'quick' | 'deep'>('all');
  
  // Modals state
  const [isSavedModalOpen, setIsSavedModalOpen] = useState(false);
  const [isNewsletterModalOpen, setIsNewsletterModalOpen] = useState(false);
  const [isCapsuleModalOpen, setIsCapsuleModalOpen] = useState(false);
  const [selectedAuthorId, setSelectedAuthorId] = useState<string | null>(null);

  // Saved articles in localStorage
  const [savedArticleIds, setSavedArticleIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('etoffe_beauty_saved_articles');
      return saved ? JSON.parse(saved) : ['art-01', 'art-02'];
    } catch {
      return ['art-01', 'art-02'];
    }
  });

  // Comments in localStorage
  const [comments, setComments] = useState<Comment[]>(() => {
    try {
      const saved = localStorage.getItem('etoffe_beauty_comments');
      return saved ? JSON.parse(saved) : sampleComments;
    } catch {
      return sampleComments;
    }
  });

  // Persist saved articles
  useEffect(() => {
    try {
      localStorage.setItem('etoffe_beauty_saved_articles', JSON.stringify(savedArticleIds));
    } catch (e) {
      console.warn('Could not save to localStorage', e);
    }
  }, [savedArticleIds]);

  // Persist comments
  useEffect(() => {
    try {
      localStorage.setItem('etoffe_beauty_comments', JSON.stringify(comments));
    } catch (e) {
      console.warn('Could not save comments', e);
    }
  }, [comments]);

  const handleToggleSave = (articleId: string) => {
    setSavedArticleIds(prev => 
      prev.includes(articleId) ? prev.filter(id => id !== articleId) : [...prev, articleId]
    );
  };

  const handleRemoveSaved = (articleId: string) => {
    setSavedArticleIds(prev => prev.filter(id => id !== articleId));
  };

  const handleClearSaved = () => {
    setSavedArticleIds([]);
  };

  const handleAddComment = (articleId: string, authorName: string, content: string) => {
    const newComment: Comment = {
      id: `c-${Date.now()}`,
      articleId,
      authorName,
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      content,
      likes: 1,
    };
    setComments(prev => [newComment, ...prev]);
  };

  // Filtered articles
  const filteredArticles = articles.filter(article => {
    // Category match
    const categoryMatch = selectedCategory === 'All' || article.category === selectedCategory;
    
    // Search match
    const query = searchQuery.toLowerCase().trim();
    const searchMatch = !query || (
      article.title.toLowerCase().includes(query) ||
      article.subtitle.toLowerCase().includes(query) ||
      article.excerpt.toLowerCase().includes(query) ||
      article.tags.some(t => t.toLowerCase().includes(query)) ||
      article.author.name.toLowerCase().includes(query)
    );

    // Read time filter
    const minutes = parseInt(article.readTime, 10);
    const timeMatch = readTimeFilter === 'all' 
      ? true 
      : readTimeFilter === 'quick' 
        ? minutes <= 6 
        : minutes >= 7;

    return categoryMatch && searchMatch && timeMatch;
  });

  // Lead article (first featured or first filtered)
  const leadArticle = filteredArticles.find(a => a.featured) || filteredArticles[0];
  const secondaryArticles = filteredArticles.filter(a => a.id !== leadArticle?.id);

  // Selected author object
  const currentAuthor = selectedAuthorId ? authors[selectedAuthorId] || null : null;
  const articlesBySelectedAuthor = selectedAuthorId 
    ? articles.filter(a => a.author.id === selectedAuthorId) 
    : [];

  const savedArticlesList = articles.filter(a => savedArticleIds.includes(a.id));

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1C1917] flex flex-col font-modern-sans">
      {/* Top Header */}
      <Header
        currentCategory={selectedCategory}
        onSelectCategory={(cat) => {
          setSelectedCategory(cat);
          setSelectedArticle(null);
        }}
        savedCount={savedArticleIds.length}
        onOpenSaved={() => setIsSavedModalOpen(true)}
        onOpenNewsletter={() => setIsNewsletterModalOpen(true)}
        onOpenCapsulePlanner={() => setIsCapsuleModalOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        isSearchOpen={isSearchOpen}
        onToggleSearch={() => setIsSearchOpen(!isSearchOpen)}
        onLogoClick={() => {
          setSelectedArticle(null);
          setSelectedCategory('All');
          setSearchQuery('');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12">
        {selectedArticle ? (
          /* Longform Article Reading View */
          <ArticleDetailView
            article={selectedArticle}
            allArticles={articles}
            onBack={() => {
              setSelectedArticle(null);
              window.scrollTo({ top: 0, behavior: 'instant' });
            }}
            onSelectArticle={(art) => {
              setSelectedArticle(art);
            }}
            isSaved={savedArticleIds.includes(selectedArticle.id)}
            onToggleSave={handleToggleSave}
            onAuthorClick={(authorId) => setSelectedAuthorId(authorId)}
            comments={comments}
            onAddComment={handleAddComment}
          />
        ) : (
          /* Magazine Front-Page / Archive Index */
          <div>
            {/* Lead Story: Salience Tier 1 */}
            {leadArticle && !searchQuery && selectedCategory === 'All' && readTimeFilter === 'all' && (
              <LeadHero
                article={leadArticle}
                onRead={(art) => setSelectedArticle(art)}
                isSaved={savedArticleIds.includes(leadArticle.id)}
                onToggleSave={handleToggleSave}
                onAuthorClick={(authorId) => setSelectedAuthorId(authorId)}
              />
            )}

            {/* Curatorial Filter & Filter Ribbon */}
            <section className="mb-10 pb-6 border-b border-[#E7E2DA]">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                {/* Functional Segmented Filter Buttons */}
                <div className="flex items-center gap-1 overflow-x-auto pb-2 md:pb-0">
                  <span className="text-[11px] uppercase tracking-wider text-[#78716C] mr-2 font-mono hidden sm:inline">
                    Discipline:
                  </span>
                  {(['All', 'Skincare Science', 'Haute Perfumery', 'Pigments & Color', 'Botanical Ferments', 'Vanity Rituals'] as CategoryFilter[]).map(cat => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-3 py-1.5 text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
                        selectedCategory === cat
                          ? 'bg-[#1C1917] text-[#FAF8F5]'
                          : 'bg-white/60 text-[#57534E] hover:text-[#1C1917] border border-[#E7E2DA]'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                {/* Secondary Filters: Read Time & Results Count */}
                <div className="flex items-center gap-4 self-end md:self-auto text-xs text-[#78716C]">
                  {/* Read Time Quick Filter */}
                  <div className="flex items-center gap-1 border border-[#E7E2DA] bg-white/70 p-0.5">
                    <button
                      onClick={() => setReadTimeFilter('all')}
                      className={`px-2.5 py-1 text-[11px] cursor-pointer ${readTimeFilter === 'all' ? 'bg-[#1C1917] text-[#FAF8F5]' : 'text-[#78716C] hover:text-[#1C1917]'}`}
                    >
                      All Times
                    </button>
                    <button
                      onClick={() => setReadTimeFilter('quick')}
                      className={`px-2.5 py-1 text-[11px] cursor-pointer ${readTimeFilter === 'quick' ? 'bg-[#1C1917] text-[#FAF8F5]' : 'text-[#78716C] hover:text-[#1C1917]'}`}
                    >
                      ≤ 6 min
                    </button>
                    <button
                      onClick={() => setReadTimeFilter('deep')}
                      className={`px-2.5 py-1 text-[11px] cursor-pointer ${readTimeFilter === 'deep' ? 'bg-[#1C1917] text-[#FAF8F5]' : 'text-[#78716C] hover:text-[#1C1917]'}`}
                    >
                      7+ min
                    </button>
                  </div>

                  <span className="font-mono text-[11px] tabular-nums">
                    {filteredArticles.length} {filteredArticles.length === 1 ? 'Monograph' : 'Monographs'}
                  </span>
                </div>
              </div>

              {/* Active Search / Category Notification */}
              {(searchQuery || selectedCategory !== 'All' || readTimeFilter !== 'all') && (
                <div className="mt-4 flex items-center justify-between text-xs text-[#57534E] bg-[#F5EFE8] px-3 py-2 border border-[#E7E2DA]">
                  <span>
                    Viewing monographs {selectedCategory !== 'All' ? `in “${selectedCategory}”` : ''}
                    {searchQuery ? ` matching query “${searchQuery}”` : ''}
                    {readTimeFilter !== 'all' ? ` (${readTimeFilter === 'quick' ? 'quick reads' : 'deep formulation studies'})` : ''}
                  </span>
                  <button
                    onClick={() => {
                      setSelectedCategory('All');
                      setSearchQuery('');
                      setReadTimeFilter('all');
                    }}
                    className="font-medium underline hover:text-[#1C1917] cursor-pointer text-xs"
                  >
                    Reset Filters
                  </button>
                </div>
              )}
            </section>

            {/* Empty State */}
            {filteredArticles.length === 0 ? (
              <div className="py-24 text-center border border-[#E7E2DA] bg-white/40 my-8">
                <BookOpen className="w-10 h-10 mx-auto text-[#A8A29E] mb-3" />
                <h3 className="text-xl font-editorial-serif font-medium text-[#1C1917] mb-2">
                  No Beauty Monographs Found
                </h3>
                <p className="text-xs text-[#57534E] font-reading-serif italic max-w-md mx-auto mb-6">
                  No published essays matched your current filter criteria. Try adjusting your query or resetting the category.
                </p>
                <button
                  onClick={() => {
                    setSelectedCategory('All');
                    setSearchQuery('');
                    setReadTimeFilter('all');
                  }}
                  className="px-5 py-2.5 bg-[#1C1917] text-[#FAF8F5] text-xs uppercase tracking-wider font-medium hover:bg-[#322D29] cursor-pointer"
                >
                  View All 10 Monographs
                </button>
              </div>
            ) : (
              /* Salience Tier 2: Curated 3-Column Editorial Grid */
              <div>
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <span className="text-[11px] uppercase tracking-widest text-[#78716C] font-semibold block">
                      Curated Beauty Archive
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-editorial-serif font-medium text-[#1C1917]">
                      {selectedCategory === 'All' ? 'Monographs in This Volume' : selectedCategory}
                    </h2>
                  </div>
                  <span className="text-xs text-[#78716C] font-mono">
                    Autumn 2026 Volume
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {(searchQuery || selectedCategory !== 'All' || readTimeFilter !== 'all' ? filteredArticles : secondaryArticles).map((article) => (
                    <ArticleCard
                      key={article.id}
                      article={article}
                      onRead={(art) => {
                        setSelectedArticle(art);
                      }}
                      isSaved={savedArticleIds.includes(article.id)}
                      onToggleSave={handleToggleSave}
                      onAuthorClick={(authorId) => setSelectedAuthorId(authorId)}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Editorial Feature Spotlight: Interactive Vanity Builder */}
            <div className="mt-20 p-8 sm:p-10 bg-[#1C1917] text-[#FAF8F5] relative overflow-hidden">
              <div className="relative z-10 max-w-2xl">
                <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#D5CCC3] mb-3">
                  <FlaskConical className="w-3.5 h-3.5 text-[#EAB308]" />
                  <span>Curatorial Formulation Tool</span>
                </div>
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-editorial-serif font-normal leading-tight mb-4 text-balance">
                  The Vanity Matrix: Architect Your AM & PM Formulation Ritual
                </h3>
                <p className="text-xs sm:text-sm text-[#D5CCC3] font-reading-serif italic leading-relaxed mb-6">
                  Based on our scientific monographs on lipid bilayers, copper peptides, and botanical fermentation. Select your active ingredients, assess formula synergy, and prevent barrier friction.
                </p>
                <div className="flex flex-wrap items-center gap-4">
                  <button
                    onClick={() => setIsCapsuleModalOpen(true)}
                    className="px-5 py-2.5 bg-[#FAF8F5] text-[#1C1917] text-xs uppercase tracking-widest font-semibold hover:bg-[#EFEAE2] transition-colors cursor-pointer"
                  >
                    Open Vanity Matrix
                  </button>
                  <button
                    onClick={() => {
                      const barrierArticle = articles.find(a => a.slug === 'biomimetic-skin-barrier-ceramides-ectoin');
                      if (barrierArticle) setSelectedArticle(barrierArticle);
                    }}
                    className="text-xs uppercase tracking-wider text-[#FAF8F5] underline underline-offset-4 hover:text-[#D5CCC3] cursor-pointer"
                  >
                    Read Monograph: The Skin Barrier
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer Colophon */}
      <Footer
        onSelectCategory={(cat) => {
          setSelectedCategory(cat);
          setSelectedArticle(null);
          window.scrollTo({ top: 300, behavior: 'smooth' });
        }}
        onOpenNewsletter={() => setIsNewsletterModalOpen(true)}
        onOpenCapsulePlanner={() => setIsCapsuleModalOpen(true)}
      />

      {/* Interactive Modals */}
      <CapsulePlannerModal
        isOpen={isCapsuleModalOpen}
        onClose={() => setIsCapsuleModalOpen(false)}
        onSelectArticleSlug={(slug) => {
          const found = articles.find(a => a.slug === slug);
          if (found) {
            setSelectedArticle(found);
            setIsCapsuleModalOpen(false);
          }
        }}
      />

      <NewsletterModal
        isOpen={isNewsletterModalOpen}
        onClose={() => setIsNewsletterModalOpen(false)}
      />

      <SavedArticlesModal
        isOpen={isSavedModalOpen}
        onClose={() => setIsSavedModalOpen(false)}
        savedArticles={savedArticlesList}
        onSelectArticle={(art) => {
          setSelectedArticle(art);
          setIsSavedModalOpen(false);
        }}
        onRemoveSaved={handleRemoveSaved}
        onClearAll={handleClearSaved}
      />

      <AuthorProfileModal
        author={currentAuthor}
        isOpen={!!selectedAuthorId}
        onClose={() => setSelectedAuthorId(null)}
        articlesByAuthor={articlesBySelectedAuthor}
        onSelectArticle={(art) => {
          setSelectedArticle(art);
          setSelectedAuthorId(null);
        }}
      />
    </div>
  );
}
