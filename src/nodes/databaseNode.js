import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';
import { theme } from '../styles/theme';

export const DatabaseNode = ({ id, data }) => {
  const [dbType, setDbType] = useState(data?.dbType || 'postgresql');
  const [query, setQuery] = useState(data?.query || 'SELECT * FROM table');

  const handles = [
    { type: 'target', position: Position.Left, id: `${id}-input` },
    { type: 'source', position: Position.Right, id: `${id}-output` }
  ];

  const dbTypes = ['PostgreSQL', 'MySQL', 'MongoDB', 'SQLite'];

  return (
    <BaseNode id={id} data={data} title="Database" handles={handles} width={280}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: theme.spacing.sm }}>
        <label style={{ fontSize: '12px', color: theme.colors.textSecondary }}>
          Database:
          <select
            value={dbType}
            onChange={(e) => setDbType(e.target.value)}
            style={{
              width: '100%',
              marginTop: '4px',
              padding: theme.spacing.xs,
              backgroundColor: theme.colors.background,
              border: `1px solid ${theme.colors.borderLight}`,
              borderRadius: theme.borderRadius.sm,
              color: theme.colors.text,
              fontSize: '12px',
              cursor: 'pointer'
            }}
          >
            {dbTypes.map(db => (
              <option key={db} value={db}>{db}</option>
            ))}
          </select>
        </label>
        <label style={{ fontSize: '12px', color: theme.colors.textSecondary }}>
          Query:
          <textarea
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{
              width: '100%',
              minHeight: '50px',
              marginTop: '4px',
              padding: theme.spacing.xs,
              backgroundColor: theme.colors.background,
              border: `1px solid ${theme.colors.borderLight}`,
              borderRadius: theme.borderRadius.sm,
              color: theme.colors.text,
              fontSize: '11px',
              fontFamily: 'monospace',
              resize: 'none'
            }}
          />
        </label>
      </div>
    </BaseNode>
  );
};
