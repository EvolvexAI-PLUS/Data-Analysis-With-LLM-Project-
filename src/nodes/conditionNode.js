import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';
import { theme } from '../styles/theme';

export const ConditionNode = ({ id, data }) => {
  const [condition, setCondition] = useState(data?.condition || 'x > 0');

  const handles = [
    { type: 'target', position: Position.Left, id: `${id}-input` },
    { type: 'source', position: Position.Right, id: `${id}-true`, style: { top: '33%' } },
    { type: 'source', position: Position.Right, id: `${id}-false`, style: { top: '66%' } }
  ];

  return (
    <BaseNode id={id} data={data} title="Condition" handles={handles} width={240}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: theme.spacing.sm }}>
        <label style={{ fontSize: '12px', color: theme.colors.textSecondary }}>
          Condition:
          <textarea
            value={condition}
            onChange={(e) => setCondition(e.target.value)}
            placeholder="Enter condition (e.g., x > 0)"
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
        <div style={{ display: 'flex', gap: theme.spacing.md, fontSize: '10px' }}>
          <span style={{ color: theme.colors.success }}>✓ True</span>
          <span style={{ color: theme.colors.error }}>✗ False</span>
        </div>
      </div>
    </BaseNode>
  );
};
