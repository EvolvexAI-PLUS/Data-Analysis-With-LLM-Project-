import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';
import { theme } from '../styles/theme';

export const TransformNode = ({ id, data }) => {
  const [transformType, setTransformType] = useState(data?.transformType || 'filter');
  const [expression, setExpression] = useState(data?.expression || 'item => item > 0');

  const handles = [
    { type: 'target', position: Position.Left, id: `${id}-input` },
    { type: 'source', position: Position.Right, id: `${id}-output` }
  ];

  const transforms = [
    { value: 'filter', label: 'Filter' },
    { value: 'map', label: 'Map' },
    { value: 'reduce', label: 'Reduce' },
    { value: 'sort', label: 'Sort' }
  ];

  return (
    <BaseNode id={id} data={data} title="Transform" handles={handles} width={280}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: theme.spacing.sm }}>
        <label style={{ fontSize: '12px', color: theme.colors.textSecondary }}>
          Type:
          <select
            value={transformType}
            onChange={(e) => setTransformType(e.target.value)}
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
            {transforms.map(t => (
              <option key={t.value} value={t.value}>{t.label}</option>
            ))}
          </select>
        </label>
        <label style={{ fontSize: '12px', color: theme.colors.textSecondary }}>
          Expression:
          <textarea
            value={expression}
            onChange={(e) => setExpression(e.target.value)}
            placeholder="Enter JavaScript expression"
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
