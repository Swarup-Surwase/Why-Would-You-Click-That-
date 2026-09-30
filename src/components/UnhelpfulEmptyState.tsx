import React, { useState } from 'react';
import { SearchX, AlertTriangle } from 'lucide-react';
import { FrustratingButton } from './FrustratingButton';

export const UnhelpfulEmptyState: React.FC = () => {
  const [searchingHarder, setSearchingHarder] = useState(false);
  const [searchMessage, setSearchMessage] = useState('Nothing appears to be here right now.');

  const handleSearchHarder = () => {
    setSearchingHarder(true);
    setSearchMessage('Searching everywhere under every pixel...');
    setTimeout(() => {
      setSearchingHarder(false);
      setSearchMessage('Confirmed: Still nothing.');
    }, 1200);
  };

  return (
    <div
      className="glass-panel"
      style={{
        padding: '36px',
        textAlign: 'center',
        border: '1px dashed var(--neon-purple)',
        margin: '24px 0',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '16px'
      }}
    >
      <SearchX size={48} color="var(--neon-purple)" />
      <h3 style={{ fontSize: '20px' }} className="gradient-text-purple">
        {searchMessage}
      </h3>
      <p style={{ fontSize: '13px', color: 'var(--text-secondary)', maxWidth: '450px' }}>
        We looked everywhere. We are starting to think you are looking in the wrong place. Try another approach or adjust your 14 preferences.
      </p>

      <FrustratingButton
        initialText="Search Harder"
        hoverTextSequence={['Search Deeper', 'Are You Sure?']}
        onClick={handleSearchHarder}
        variant="primary"
        size="md"
        disabled={searchingHarder}
      />
    </div>
  );
};

export const TheatricalErrorState: React.FC = () => {
  const [recovered, setRecovered] = useState(false);

  if (recovered) {
    return (
      <div
        className="glass-panel"
        style={{
          padding: '24px',
          textAlign: 'center',
          border: '1px solid var(--neon-green)',
          color: 'var(--neon-green)',
          margin: '24px 0',
          fontFamily: 'var(--font-mono)',
          fontSize: '13px'
        }}
      >
        ✅ Error successfully ignored! System pretends nothing happened.
      </div>
    );
  }

  return (
    <div
      className="glass-panel"
      style={{
        padding: '36px',
        textAlign: 'center',
        border: '2px solid var(--warning-red)',
        boxShadow: '0 0 40px rgba(239, 68, 68, 0.4)',
        margin: '24px 0',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '16px'
      }}
    >
      <AlertTriangle size={52} color="var(--warning-red)" className="animate-float" />
      <h2 style={{ fontSize: '26px', fontWeight: 800, color: 'var(--warning-red)' }}>
        OH NO.
      </h2>
      <h4 style={{ fontSize: '16px', color: 'var(--text-primary)' }}>
        We encountered an unexpected situation.
      </h4>
      <div
        style={{
          background: 'rgba(10, 5, 24, 0.9)',
          border: '1px solid var(--glass-border)',
          borderRadius: '8px',
          padding: '8px 16px',
          fontSize: '12px',
          fontFamily: 'var(--font-mono)',
          color: 'var(--bright-yellow)'
        }}
      >
        Technical details: Probably fine.
      </div>

      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center' }}>
        <FrustratingButton
          initialText="Try Again"
          onClick={() => setRecovered(true)}
          variant="danger"
          size="md"
        />
        <FrustratingButton
          initialText="Try Again Again"
          onClick={() => setRecovered(true)}
          variant="warning"
          size="md"
        />
        <FrustratingButton
          initialText="Ignore"
          onClick={() => setRecovered(true)}
          variant="secondary"
          size="md"
        />
        <FrustratingButton
          initialText="Pretend Nothing Happened"
          onClick={() => setRecovered(true)}
          variant="primary"
          size="md"
        />
      </div>
    </div>
  );
};
