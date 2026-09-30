import React, { useState } from 'react';
import { ArrowUpDown } from 'lucide-react';
import { ChaoticTooltip } from './ChaoticTooltip';

export const TableNightmare: React.FC = () => {
  const [density, setDensity] = useState<'normal' | 'dense' | 'ultra'>('normal');

  const rows = [
    {
      id: 1,
      name: 'Anti-UX Navigation Module',
      status: 'Active',
      state: 'Initialized',
      currentState: 'Confused',
      previousState: 'Slightly Confused',
      confidence: '94%',
      trend: '▲ Escalating',
      impact: 'High',
      updated: '10:42 AM',
      lastLastUpdated: '10:41:59 AM',
      notes: 'Contains 7 confirmation modals'
    },
    {
      id: 2,
      name: 'Magnetic Dodge Button Core',
      status: 'Pending',
      state: 'Evading Cursor',
      currentState: 'Moving 3px',
      previousState: 'Static',
      confidence: '87%',
      trend: '▼ Fluctuating',
      impact: 'Moderate',
      updated: '10:40 AM',
      lastLastUpdated: '10:38 AM',
      notes: 'Dodges on hover sequence'
    },
    {
      id: 3,
      name: 'Dark Mode 87% Subsystem',
      status: 'Illuminated',
      state: '87% Dark',
      currentState: 'Darker',
      previousState: 'Dark',
      confidence: '99%',
      trend: '▲ Max Darkness',
      impact: 'Critical',
      updated: '10:35 AM',
      lastLastUpdated: '10:30 AM',
      notes: 'One component left bright'
    },
    {
      id: 4,
      name: 'Search Bar from Hell Filter',
      status: 'Filtering',
      state: '10 Dimensions',
      currentState: 'Processing Maybe',
      previousState: 'Idle',
      confidence: '63%',
      trend: '► Uncertain',
      impact: 'Brain Meltdown',
      updated: '10:20 AM',
      lastLastUpdated: '10:15 AM',
      notes: 'Has cognitive load slider'
    }
  ];

  const getPadding = () => {
    switch (density) {
      case 'normal': return '12px 16px';
      case 'dense': return '8px 12px';
      case 'ultra': return '4px 6px';
    }
  };

  return (
    <div
      className="glass-panel"
      style={{
        padding: '24px',
        border: '1px solid var(--electric-blue)',
        margin: '24px 0'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h3 style={{ fontSize: '18px' }} className="gradient-text-blue">
            Table with 12 Unnecessary Columns
          </h3>
          <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
            Primary actions are placed in narrow columns requiring horizontal scrolling.
          </p>
        </div>

        {/* Density Control Toggle */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>Density:</span>
          {(['normal', 'dense', 'ultra'] as const).map((d) => (
            <button
              key={d}
              onClick={() => setDensity(d)}
              style={{
                background: density === d ? 'var(--electric-blue)' : 'rgba(255,255,255,0.05)',
                color: density === d ? '#000' : 'var(--text-secondary)',
                border: '1px solid var(--glass-border)',
                padding: '4px 10px',
                borderRadius: '6px',
                fontSize: '11px',
                fontFamily: 'var(--font-mono)',
                fontWeight: 700
              }}
            >
              {d.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Horizontal Scrollable Table Wrapper */}
      <div style={{ overflowX: 'auto', borderRadius: '12px', border: '1px solid var(--glass-border)' }}>
        <table style={{ width: '100%', minWidth: '1100px', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ background: 'rgba(10, 5, 24, 0.9)', borderBottom: '1px solid var(--neon-purple)' }}>
              <th style={{ padding: getPadding(), fontSize: '12px', color: 'var(--neon-purple)', width: '180px' }}>Name <ArrowUpDown size={10} /></th>
              <th style={{ padding: getPadding(), fontSize: '12px', color: 'var(--electric-blue)', width: '90px' }}>Status</th>
              <th style={{ padding: getPadding(), fontSize: '12px', color: 'var(--bright-yellow)', width: '100px' }}>State</th>
              <th style={{ padding: getPadding(), fontSize: '12px', color: 'var(--neon-green)', width: '110px' }}>Current State</th>
              <th style={{ padding: getPadding(), fontSize: '12px', color: 'var(--neon-pink)', width: '120px' }}>Previous State</th>
              <th style={{ padding: getPadding(), fontSize: '12px', color: 'var(--neon-orange)', width: '80px' }}>Confidence</th>
              <th style={{ padding: getPadding(), fontSize: '12px', color: 'var(--text-secondary)', width: '110px' }}>Confidence Trend</th>
              <th style={{ padding: getPadding(), fontSize: '12px', color: 'var(--warning-red)', width: '120px' }}>Cognitive Impact</th>
              <th style={{ padding: getPadding(), fontSize: '12px', color: 'var(--text-muted)', width: '90px' }}>Last Updated</th>
              <th style={{ padding: getPadding(), fontSize: '12px', color: 'var(--text-muted)', width: '110px' }}>Last Last Updated</th>
              <th style={{ padding: getPadding(), fontSize: '12px', color: 'var(--bright-yellow)', width: '90px' }}>Action</th>
              <th style={{ padding: getPadding(), fontSize: '12px', color: 'var(--text-secondary)' }}>Notes</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr
                key={row.id}
                style={{
                  borderBottom: '1px solid rgba(255,255,255,0.05)',
                  background: 'rgba(19, 10, 42, 0.4)'
                }}
              >
                <td style={{ padding: getPadding(), fontWeight: 700, fontSize: '13px', color: 'var(--text-primary)' }}>{row.name}</td>
                <td style={{ padding: getPadding(), fontSize: '12px', color: 'var(--neon-green)' }}>{row.status}</td>
                <td style={{ padding: getPadding(), fontSize: '12px', color: 'var(--text-secondary)' }}>{row.state}</td>
                <td style={{ padding: getPadding(), fontSize: '12px', color: 'var(--bright-yellow)' }}>{row.currentState}</td>
                <td style={{ padding: getPadding(), fontSize: '12px', color: 'var(--text-muted)' }}>{row.previousState}</td>
                <td style={{ padding: getPadding(), fontSize: '12px', fontFamily: 'var(--font-mono)', color: 'var(--neon-purple)' }}>{row.confidence}</td>
                <td style={{ padding: getPadding(), fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--electric-blue)' }}>{row.trend}</td>
                <td style={{ padding: getPadding(), fontSize: '12px', color: 'var(--warning-red)' }}>{row.impact}</td>
                <td style={{ padding: getPadding(), fontSize: '11px', color: 'var(--text-muted)' }}>{row.updated}</td>
                <td style={{ padding: getPadding(), fontSize: '11px', color: 'var(--text-muted)' }}>{row.lastLastUpdated}</td>
                <td style={{ padding: getPadding() }}>
                  {/* Tiny useful button in narrow column */}
                  <ChaoticTooltip text="Execute optimize step for row item">
                    <button
                      onClick={() => alert(`Optimized item #${row.id}: ${row.name}`)}
                      style={{
                        background: 'linear-gradient(135deg, var(--neon-purple), var(--electric-blue))',
                        border: 'none',
                        borderRadius: '6px',
                        padding: '4px 8px',
                        fontSize: '10px',
                        color: '#fff',
                        fontWeight: 700
                      }}
                    >
                      Optimize
                    </button>
                  </ChaoticTooltip>
                </td>
                <td style={{ padding: getPadding(), fontSize: '11px', color: 'var(--text-muted)', fontStyle: 'italic' }}>{row.notes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
