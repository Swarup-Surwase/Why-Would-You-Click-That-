import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import type { FilterState } from '../types';
import { FrustratingButton } from './FrustratingButton';

interface OverloadedSearchProps {
  isOpen: boolean;
  onClose: () => void;
  onSearchTriggered?: (query: string) => void;
}

export const OverloadedSearch: React.FC<OverloadedSearchProps> = ({
  isOpen,
  onClose,
  onSearchTriggered
}) => {
  const [query, setQuery] = useState('');
  const [placeholder, setPlaceholder] = useState('What are you looking for?');
  const [showAdvanced, setShowAdvanced] = useState(true);

  const [filters, setFilters] = useState<FilterState>({
    query: '',
    learningMode: 'Beginner-ish',
    difficulty: 'Moderately Impossible',
    contentType: 'Interactive Pain',
    aiConfidence: 87,
    personalization: 'Overly Personalized',
    cognitiveLoad: 'Brain Meltdown',
    semanticSimilarity: 94.2,
    learningMomentum: 'Reversing',
    recommendedBy: 'Committee of 7 Designers',
    maybeFilter: true
  });

  const [searchPerformed, setSearchPerformed] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  if (!isOpen) return null;

  const handleInputFocus = () => {
    setPlaceholder('What do you REALLY want?');
  };

  const handleSearch = () => {
    setIsSearching(true);
    setTimeout(() => {
      setIsSearching(false);
      setSearchPerformed(true);
      if (onSearchTriggered) onSearchTriggered(query);
    }, 600);
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(5, 2, 12, 0.85)',
        backdropFilter: 'blur(12px)',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px'
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="glass-panel"
        style={{
          maxWidth: '780px',
          width: '100%',
          maxHeight: '90vh',
          overflowY: 'auto',
          padding: '28px',
          border: '2px solid var(--electric-blue)',
          boxShadow: '0 0 50px rgba(6, 182, 212, 0.4)'
        }}
      >
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Search size={24} color="var(--electric-blue)" />
            <h2 style={{ fontSize: '20px' }} className="gradient-text-blue">
              Search Bar from Hell
            </h2>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--text-muted)'
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Search Bar Input */}
        <div style={{ display: 'flex', gap: '10px', marginBottom: '16px' }}>
          <div style={{ position: 'relative', flex: 1 }}>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={handleInputFocus}
              placeholder={placeholder}
              style={{
                width: '100%',
                background: 'rgba(10, 5, 24, 0.9)',
                border: '1px solid var(--neon-purple)',
                borderRadius: '12px',
                padding: '14px 18px',
                color: 'var(--text-primary)',
                fontFamily: 'var(--font-sans)',
                fontSize: '15px',
                outline: 'none',
                boxShadow: '0 0 15px rgba(168, 85, 247, 0.2)'
              }}
            />
          </div>
          <FrustratingButton
            initialText={isSearching ? "Searching..." : "Query System"}
            hoverTextSequence={['Execute Search', 'Query Now?', 'Are You Sure?']}
            onClick={handleSearch}
            variant="ai"
            size="md"
            disabled={isSearching}
          />
        </div>

        {/* Toggle Advanced Controls Button */}
        <button
          onClick={() => setShowAdvanced(!showAdvanced)}
          style={{
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid var(--glass-border)',
            borderRadius: '8px',
            padding: '8px 14px',
            color: 'var(--electric-blue)',
            fontSize: '12px',
            fontFamily: 'var(--font-mono)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginBottom: '16px',
            width: '100%',
            justifyContent: 'space-between'
          }}
        >
          <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <SlidersHorizontal size={14} />
            10 Dimensional Advanced Filters {showAdvanced ? '▼' : '►'}
          </span>
          <span style={{ color: 'var(--bright-yellow)' }}>
            {showAdvanced ? 'Collapse Overloaded Panel' : 'Expand 10 Dimensions'}
          </span>
        </button>

        {/* Advanced Filters Grid */}
        <AnimatePresence>
          {showAdvanced && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: '14px',
                background: 'rgba(10, 5, 24, 0.6)',
                padding: '16px',
                borderRadius: '12px',
                border: '1px solid var(--glass-border)',
                marginBottom: '20px'
              }}
            >
              {/* Filter 1: Learning Mode */}
              <div>
                <label style={{ fontSize: '11px', color: 'var(--text-secondary)', display: 'block', marginBottom: '4px' }}>
                  Learning Mode
                </label>
                <select
                  value={filters.learningMode}
                  onChange={(e) => setFilters({ ...filters, learningMode: e.target.value })}
                  style={{
                    width: '100%',
                    background: 'var(--bg-secondary)',
                    border: '1px solid var(--glass-border)',
                    borderRadius: '8px',
                    padding: '8px',
                    color: '#fff',
                    fontSize: '12px'
                  }}
                >
                  <option>Completely New</option>
                  <option>Almost New</option>
                  <option>Beginner</option>
                  <option>Beginner+</option>
                  <option>Beginner-ish</option>
                </select>
              </div>

              {/* Filter 2: Difficulty */}
              <div>
                <label style={{ fontSize: '11px', color: 'var(--text-secondary)', display: 'block', marginBottom: '4px' }}>
                  Difficulty Rating
                </label>
                <select
                  value={filters.difficulty}
                  onChange={(e) => setFilters({ ...filters, difficulty: e.target.value })}
                  style={{
                    width: '100%',
                    background: 'var(--bg-secondary)',
                    border: '1px solid var(--glass-border)',
                    borderRadius: '8px',
                    padding: '8px',
                    color: '#fff',
                    fontSize: '12px'
                  }}
                >
                  <option>Easy</option>
                  <option>Moderately Impossible</option>
                  <option>Hardish</option>
                </select>
              </div>

              {/* Filter 3: Content Type */}
              <div>
                <label style={{ fontSize: '11px', color: 'var(--text-secondary)', display: 'block', marginBottom: '4px' }}>
                  Content Format
                </label>
                <select
                  value={filters.contentType}
                  onChange={(e) => setFilters({ ...filters, contentType: e.target.value })}
                  style={{
                    width: '100%',
                    background: 'var(--bg-secondary)',
                    border: '1px solid var(--glass-border)',
                    borderRadius: '8px',
                    padding: '8px',
                    color: '#fff',
                    fontSize: '12px'
                  }}
                >
                  <option>Over-engineered Video</option>
                  <option>Absurd Article</option>
                  <option>Interactive Pain</option>
                </select>
              </div>

              {/* Filter 4: AI Confidence Slider */}
              <div>
                <label style={{ fontSize: '11px', color: 'var(--text-secondary)', display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <span>AI Confidence threshold</span>
                  <span style={{ color: 'var(--bright-yellow)' }}>{filters.aiConfidence}%</span>
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={filters.aiConfidence}
                  onChange={(e) => setFilters({ ...filters, aiConfidence: Number(e.target.value) })}
                  style={{ width: '100%' }}
                />
              </div>

              {/* Filter 5: Cognitive Load */}
              <div>
                <label style={{ fontSize: '11px', color: 'var(--text-secondary)', display: 'block', marginBottom: '4px' }}>
                  Estimated Cognitive Load
                </label>
                <select
                  value={filters.cognitiveLoad}
                  onChange={(e) => setFilters({ ...filters, cognitiveLoad: e.target.value })}
                  style={{
                    width: '100%',
                    background: 'var(--bg-secondary)',
                    border: '1px solid var(--glass-border)',
                    borderRadius: '8px',
                    padding: '8px',
                    color: '#fff',
                    fontSize: '12px'
                  }}
                >
                  <option>Light</option>
                  <option>Intense</option>
                  <option>Brain Meltdown</option>
                </select>
              </div>

              {/* Filter 6: Recommended By */}
              <div>
                <label style={{ fontSize: '11px', color: 'var(--text-secondary)', display: 'block', marginBottom: '4px' }}>
                  Recommended By
                </label>
                <select
                  value={filters.recommendedBy}
                  onChange={(e) => setFilters({ ...filters, recommendedBy: e.target.value })}
                  style={{
                    width: '100%',
                    background: 'var(--bg-secondary)',
                    border: '1px solid var(--glass-border)',
                    borderRadius: '8px',
                    padding: '8px',
                    color: '#fff',
                    fontSize: '12px'
                  }}
                >
                  <option>AI Algorithm #42</option>
                  <option>Committee of 7 Designers</option>
                  <option>Nobody</option>
                </select>
              </div>

              {/* Filter 7: Semantic Similarity */}
              <div>
                <label style={{ fontSize: '11px', color: 'var(--text-secondary)', display: 'block', marginBottom: '4px' }}>
                  Semantic Similarity: {filters.semanticSimilarity}%
                </label>
                <input
                  type="range"
                  min="50"
                  max="100"
                  step="0.1"
                  value={filters.semanticSimilarity}
                  onChange={(e) => setFilters({ ...filters, semanticSimilarity: Number(e.target.value) })}
                  style={{ width: '100%' }}
                />
              </div>

              {/* Filter 8: Learning Momentum */}
              <div>
                <label style={{ fontSize: '11px', color: 'var(--text-secondary)', display: 'block', marginBottom: '4px' }}>
                  Learning Momentum
                </label>
                <select
                  value={filters.learningMomentum}
                  onChange={(e) => setFilters({ ...filters, learningMomentum: e.target.value })}
                  style={{
                    width: '100%',
                    background: 'var(--bg-secondary)',
                    border: '1px solid var(--glass-border)',
                    borderRadius: '8px',
                    padding: '8px',
                    color: '#fff',
                    fontSize: '12px'
                  }}
                >
                  <option>Accelerating</option>
                  <option>Stagnant</option>
                  <option>Reversing</option>
                </select>
              </div>

              {/* Filter 9: Maybe Filter Toggle */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', gridColumn: 'span 2' }}>
                <input
                  type="checkbox"
                  id="maybeCheck"
                  checked={filters.maybeFilter}
                  onChange={(e) => setFilters({ ...filters, maybeFilter: e.target.checked })}
                />
                <label htmlFor="maybeCheck" style={{ fontSize: '12px', color: 'var(--bright-yellow)', fontFamily: 'var(--font-mono)' }}>
                  Enable "Maybe" Filter (Returns results that are probably not relevant)
                </label>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Search Results Display */}
        {searchPerformed && (
          <div style={{ marginTop: '20px' }}>
            <h4 style={{ fontSize: '14px', marginBottom: '10px', color: 'var(--neon-green)', fontFamily: 'var(--font-mono)' }}>
              Search Results (Ranked by: "Probably relevant"):
            </h4>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div className="glass-panel" style={{ padding: '14px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <span style={{ fontWeight: 700, color: 'var(--bright-yellow)' }}>
                    1. Advanced Anti-UX Navigation Masterclass
                  </span>
                  <span style={{ fontSize: '11px', color: 'var(--neon-purple)', fontFamily: 'var(--font-mono)' }}>
                    AI Confidence: {filters.aiConfidence}%
                  </span>
                </div>
                <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                  Learn how to place secondary actions in prominent positions while hiding primary controls inside nested dropdown menus.
                </p>
              </div>

              <div className="glass-panel" style={{ padding: '14px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <span style={{ fontWeight: 700, color: 'var(--electric-blue)' }}>
                    2. Why Buttons Should Shift 3 Pixels On Hover
                  </span>
                  <span style={{ fontSize: '11px', color: 'var(--neon-purple)', fontFamily: 'var(--font-mono)' }}>
                    Cognitive Impact: {filters.cognitiveLoad}
                  </span>
                </div>
                <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                  A research paper proving that magnetic dodge buttons improve user awareness by 420%.
                </p>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};
