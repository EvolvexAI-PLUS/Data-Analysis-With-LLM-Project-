import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';
import { theme } from '../styles/theme';

export const APINode = ({ id, data }) => {
  const [method, setMethod] = useState(data?.method || 'GET');
  const [endpoint, setEndpoint] = useState(data?.endpoint || 'https://api.example.com');

  const handles = [
    { type: 'target', position: Position.Left, id: `${id}-input` },
    { type: 'source', position: Position.Right, id: `${id}-response` }
  ];

  const methods = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'];

  return (
    <BaseNode id={id} data={data} title="API Call" handles={handles} width={280}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: theme.spacing.sm }}>
        <label style={{ fontSize: '12px', color: theme.colors.textSecondary }}>
          Method:
          <select
            value={method}
            onChange={(e) => setMethod(e.target.value)}
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
            {methods.map(m => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>
        </label>
        <label style={{ fontSize: '12px', color: theme.colors.textSecondary }}>
          Endpoint:
          <input
            type="text"
            value={endpoint}
            onChange={(e) => setEndpoint(e.target.value)}
            placeholder="https://api.example.com/endpoint"
            style={{
              width: '100%',
              marginTop: '4px',
              padding: theme.spacing.xs,
              backgroundColor: theme.colors.background,
              border: `1px solid ${theme.colors.borderLight}`,
              borderRadius: theme.borderRadius.sm,
              color: theme.colors.text,
              fontSize: '12px',
              boxSizing: 'border-box'
            }}
          />
        </label>
      </div>
    </BaseNode>
  );
};
